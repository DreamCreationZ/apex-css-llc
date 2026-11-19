import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET() {
  const pdfPath = path.join(
    process.cwd(),
    "assets",
    "APEX-CSS-LLC-Capability-Statement-Draft.pdf",
  );
  const pdf = await readFile(pdfPath);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
      "Content-Disposition": 'inline; filename="APEX-CSS-LLC-Capability-Statement-Draft.pdf"',
      "Content-Type": "application/pdf",
    },
  });
}
