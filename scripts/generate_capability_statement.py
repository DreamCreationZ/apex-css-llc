from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "APEX-CSS-LLC-Capability-Statement-Draft.pdf"

NAVY = HexColor("#061B3D")
NAVY_2 = HexColor("#0A244A")
GOLD = HexColor("#C9A044")
GOLD_LIGHT = HexColor("#DFBD6A")
LIGHT = HexColor("#F3F6FA")
SLATE = HexColor("#56657A")
DARK = HexColor("#12243C")
AMBER = HexColor("#8A5A00")


def wrap(text: str, font: str, size: float, width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c: canvas.Canvas, text: str, x: float, y: float, width: float, font: str, size: float, leading: float, color=SLATE) -> float:
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrap(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def section_title(c: canvas.Canvas, text: str, x: float, y: float, width: float) -> float:
    c.setFillColor(GOLD)
    c.rect(x, y - 2, 3, 15, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(x + 9, y, text.upper())
    c.setStrokeColor(HexColor("#DCE3EC"))
    c.line(x + 9, y - 5, x + width, y - 5)
    return y - 18


def build() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=letter)
    width, height = letter

    c.setFillColor(white)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.rect(0, height - 152, width, 152, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(0, height - 157, width, 5, fill=1, stroke=0)

    # Original APEX geometric mark.
    c.setStrokeColor(GOLD_LIGHT)
    c.setLineWidth(3)
    c.circle(55, height - 58, 24, fill=0, stroke=1)
    c.setFillColor(GOLD_LIGHT)
    c.setFont("Helvetica-Bold", 19)
    c.drawCentredString(55, height - 65, "A")

    c.setFillColor(white)
    c.setFont("Times-Bold", 27)
    c.drawString(92, height - 54, "APEX CSS LLC")
    c.setFillColor(GOLD_LIGHT)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(93, height - 73, "MISSION. PRECISION. SERVICE.")
    c.setFillColor(white)
    c.setFont("Times-Bold", 17)
    c.drawString(34, height - 112, "Veteran-Led Federal Contracting Solutions")
    c.setFillColor(HexColor("#C8D3E0"))
    c.setFont("Helvetica", 8.5)
    c.drawString(34, height - 130, "Technology  |  Cybersecurity  |  Professional Staffing  |  Facility Services")

    c.setFillColor(HexColor("#FFF6DD"))
    c.roundRect(width - 174, height - 101, 140, 42, 3, fill=1, stroke=0)
    c.setFillColor(AMBER)
    c.setFont("Helvetica-Bold", 8)
    c.drawCentredString(width - 104, height - 77, "PRE-LAUNCH DRAFT")
    c.setFont("Helvetica", 7)
    c.drawCentredString(width - 104, height - 90, "Credentials pending verification")

    margin = 34
    gutter = 22
    col_width = (width - 2 * margin - gutter) / 2
    left_x = margin
    right_x = margin + col_width + gutter
    top = height - 184

    y = section_title(c, "Company Overview", left_x, top, col_width)
    overview = (
        "APEX CSS LLC is a veteran-led small business providing mission-focused IT infrastructure, "
        "cybersecurity, professional staffing, commercial cleaning, window washing, and facility-support solutions."
    )
    y = draw_wrapped(c, overview, left_x, y, col_width, "Helvetica", 8.5, 12)
    y -= 12

    y = section_title(c, "Core Competencies", left_x, y, col_width)
    competencies = [
        "IT infrastructure and cloud enablement",
        "Cybersecurity and security operations",
        "IT support and modernization",
        "Professional staffing and consulting",
        "Commercial cleaning and janitorial services",
        "Window washing and facility management",
    ]
    c.setFont("Helvetica", 8.2)
    for item in competencies:
        c.setFillColor(GOLD)
        c.circle(left_x + 3, y + 2, 1.5, fill=1, stroke=0)
        y = draw_wrapped(c, item, left_x + 10, y, col_width - 10, "Helvetica", 8.2, 11, DARK)
        y -= 2
    y -= 8

    y = section_title(c, "Differentiators", left_x, y, col_width)
    differentiators = [
        "Integrated technology, workforce, and facility capability model",
        "Veteran-led focus on service, readiness, and accountability",
        "Transparent credential posture and requirements-driven delivery",
        "Flexible teaming orientation for prime and subcontract relationships",
    ]
    for item in differentiators:
        c.setFillColor(GOLD)
        c.rect(left_x, y - 3, 3, 8, fill=1, stroke=0)
        y = draw_wrapped(c, item, left_x + 10, y, col_width - 10, "Helvetica", 8.2, 11, DARK)
        y -= 4

    y2 = section_title(c, "Federal Profile", right_x, top, col_width)
    profile = [
        ("SDVOSB", "Verification pending"),
        ("VOSB", "Verification pending"),
        ("SAM.gov", "Verification pending"),
        ("UEI", "Not provided"),
        ("CAGE", "Not provided"),
    ]
    row_h = 28
    for index, (label, value) in enumerate(profile):
        if index % 2 == 0:
            c.setFillColor(LIGHT)
            c.rect(right_x, y2 - 18, col_width, row_h, fill=1, stroke=0)
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(right_x + 8, y2 - 1, label)
        c.setFillColor(AMBER)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawRightString(right_x + col_width - 8, y2 - 1, value)
        y2 -= row_h
    y2 -= 8

    y2 = section_title(c, "Candidate NAICS Alignment", right_x, y2, col_width)
    naics = [
        ("541512", "Computer Systems Design Services"),
        ("541513", "Computer Facilities Management Services"),
        ("541519", "Other Computer Related Services"),
        ("561210", "Facilities Support Services"),
        ("561320", "Temporary Help Services"),
        ("561720", "Janitorial Services"),
    ]
    for code, label in naics:
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(right_x, y2, code)
        draw_wrapped(c, label, right_x + 44, y2, col_width - 44, "Helvetica", 7.5, 9, SLATE)
        y2 -= 19
    c.setFillColor(AMBER)
    c.setFont("Helvetica-Oblique", 6.8)
    c.drawString(right_x, y2 + 3, "Candidate codes only - confirm against the active SAM.gov record.")
    y2 -= 15

    y2 = section_title(c, "Contact Status", right_x, y2, col_width)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(right_x, y2, "apexcssllc@gmail.com")
    c.setFillColor(AMBER)
    c.setFont("Helvetica", 7)
    c.drawString(right_x, y2 - 13, "Confirmed company contact - delivery not independently tested")

    panel_x = margin
    panel_y = 82
    panel_w = width - 2 * margin
    panel_h = 108
    c.setFillColor(LIGHT)
    c.rect(panel_x, panel_y, panel_w, panel_h, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(panel_x, panel_y + panel_h - 4, panel_w, 4, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(panel_x + 14, panel_y + panel_h - 24, "MISSION-FIRST ENGAGEMENT")
    approach = [
        ("01  ALIGN", "Confirm requirements, constraints, standards, and success measures."),
        ("02  EXECUTE", "Coordinate people, process, and delivery around the approved scope."),
        ("03  ACCOUNT", "Track quality, communicate status, and escalate issues responsibly."),
    ]
    cell_w = (panel_w - 28) / 3
    for index, (title, description) in enumerate(approach):
        cell_x = panel_x + 14 + index * cell_w
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawString(cell_x, panel_y + 55, title)
        draw_wrapped(c, description, cell_x, panel_y + 40, cell_w - 16, "Helvetica", 7.3, 9, SLATE)

    footer_h = 52
    c.setFillColor(NAVY_2)
    c.rect(0, 0, width, footer_h, fill=1, stroke=0)
    c.setFillColor(GOLD_LIGHT)
    c.setFont("Helvetica-Bold", 7)
    c.drawString(margin, 34, "VERIFICATION NOTICE")
    notice = (
        "No contract awards, agency relationships, certifications, contract vehicles, or past performance are asserted in this draft. "
        "Replace all pending fields only after documentary verification."
    )
    draw_wrapped(c, notice, margin, 21, width - 2 * margin, "Helvetica", 6.7, 9, HexColor("#D5DEE9"))

    c.setTitle("APEX CSS LLC Capability Statement - Draft")
    c.setAuthor("APEX CSS LLC")
    c.setSubject("Pre-launch capability statement with credentials pending verification")
    c.showPage()
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
