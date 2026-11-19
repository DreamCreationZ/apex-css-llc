import { NextRequest, NextResponse } from "next/server";

const AMPLIFY_PREVIEW_SUFFIX = ".amplifyapp.com";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const hostHeader = request.headers.get("host")?.split(",")[0]?.trim() || request.nextUrl.hostname;
  const hostname = hostHeader.replace(/:\d+$/, "").toLowerCase();

  if (hostname.endsWith(AMPLIFY_PREVIEW_SUFFIX)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.svg|manifest.webmanifest).*)"],
};
