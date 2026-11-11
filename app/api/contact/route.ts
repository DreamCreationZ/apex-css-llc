import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedInquiryTypes = new Set([
  "Federal opportunity",
  "Teaming / subcontracting",
  "IT & cloud services",
  "Cybersecurity services",
  "Professional staffing",
  "Facility services",
  "General inquiry",
]);

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  inquiryType?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

const rateBuckets = new Map<string, number[]>();
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 5;

function stringValue(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function requestAddress(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
}

function isRateLimited(address: string) {
  const now = Date.now();
  const recent = (rateBuckets.get(address) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  rateBuckets.set(address, recent);
  return false;
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host");
    return new URL(origin).host === forwardedHost;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ message: "Request origin was rejected." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ message: "JSON content is required." }, { status: 415 });
  }
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20_000) return NextResponse.json({ message: "Request is too large." }, { status: 413 });

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (stringValue(body.website, 200)) {
    return NextResponse.json({ message: "Your inquiry has been received." }, { status: 202 });
  }

  const name = stringValue(body.name, 100);
  const company = stringValue(body.company, 150);
  const email = stringValue(body.email, 254).toLowerCase();
  const inquiryType = stringValue(body.inquiryType, 100);
  const message = stringValue(body.message, 4000);
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (name.length < 2 || company.length < 2 || !emailPattern.test(email) || !allowedInquiryTypes.has(inquiryType) || message.length < 20) {
    return NextResponse.json({ message: "Please complete every required field with valid information." }, { status: 400 });
  }
  if (!startedAt || Date.now() - startedAt < 1500 || Date.now() - startedAt > 24 * 60 * 60 * 1000) {
    return NextResponse.json({ message: "Please refresh the form and try again." }, { status: 400 });
  }
  if (isRateLimited(requestAddress(request))) {
    return NextResponse.json({ message: "Too many inquiries were submitted. Please try again later." }, { status: 429 });
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[contact-preview] validated inquiry", { inquiryType, company, receivedAt: new Date().toISOString() });
    return NextResponse.json({ message: "Preview submission validated successfully. No email was sent in local preview mode." }, { status: 202 });
  }

  const region = process.env.SES_REGION || process.env.AWS_REGION;
  const recipient = process.env.CONTACT_FORM_RECIPIENT;
  const sender = process.env.CONTACT_FORM_SENDER;
  if (!region || !recipient || !sender) {
    return NextResponse.json({ message: "Online delivery is not configured yet. Please try again later." }, { status: 503 });
  }

  try {
    const { SESv2Client, SendEmailCommand } = await import("@aws-sdk/client-sesv2");
    const client = new SESv2Client({ region });
    await client.send(new SendEmailCommand({
      FromEmailAddress: sender,
      Destination: { ToAddresses: [recipient] },
      ReplyToAddresses: [email],
      Content: {
        Simple: {
          Subject: { Data: `APEX website inquiry: ${inquiryType}` },
          Body: { Text: { Data: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nInquiry: ${inquiryType}\n\n${message}` } },
        },
      },
    }));
    return NextResponse.json({ message: "Your inquiry has been received. We will respond as soon as possible." }, { status: 202 });
  } catch (error) {
    console.error("[contact] delivery failed", error instanceof Error ? error.name : "UnknownError");
    return NextResponse.json({ message: "The inquiry could not be delivered. Please try again later." }, { status: 502 });
  }
}
