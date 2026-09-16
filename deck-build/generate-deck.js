/* ================================================================
   Hello World — Sales Pack (.pptx)
   Generated with PptxGenJS. Design tokens lifted directly from the
   Hello World website's CSS (:root custom properties) so the deck
   reads as an extension of the product, not a redesign.
   ================================================================ */
const PptxGenJS = require("pptxgenjs");

const pptx = new PptxGenJS();
// NOTE: PptxGenJS's own "LAYOUT_16x9" constant is 10in x 5.625in (a smaller
// built-in default), NOT the standard PowerPoint widescreen size — using it
// silently shrank the real canvas to ~75% of what every position in this
// file assumes, which is why content was overflowing. "LAYOUT_WIDE" is
// PptxGenJS's name for the actual 13.333in x 7.5in widescreen size.
pptx.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in
pptx.author = "Hello World";
pptx.title = "Hello World — Sales Pack";

const EMU = { W: 13.333, H: 7.5 };

/* ---------------- design tokens (from index.html :root) ---------------- */
const C = {
  ink: "07060E",
  ink2: "100C22",
  cream: "F7F2E9",
  gold: "FFE9B8",   // brightest stop of the hero title's gradient
  lavender: "D9CFFF", // cool stop of the hero title's gradient
  sun: "FFC53D",
  coral: "FF6B3D",
  violet: "8B6BFF",
  cyan: "39E0C8",
  pink: "FF5FA2",
  sky: "59C9FF",
  card: "17132B",   // averaged from the sheet's gradient (28,22,52 / 12,9,26)
  cardDeep: "0C0919",
  white: "FFFFFF",
  black: "000000"
};

// category -> accent colour, exact 1:1 with the site's CAT constant
const CAT = {
  "DJ Sets": C.violet,
  "Live Music": C.coral,
  "Festivals": C.sun,
  "Underground": C.cyan,
  "Art & Culture": C.pink
};

const FONT = "Helvetica Neue";
const FONT_ALT = "Helvetica Neue"; // single family keeps it portable; weight carries via bold

/* ---------------- shared helpers ---------------- */

// site's --stroke / --stroke-2 are rgba(255,255,255, .11 / .18) — express
// as transparency percentages (100 - alpha%) so the same values carry over
const STROKE = { color: C.white, transparency: 89, width: 1 };   // rgba(255,255,255,.11)
const STROKE_2 = { color: C.white, transparency: 82, width: 1 }; // rgba(255,255,255,.18)

function addBg(slide) {
  slide.background = { color: C.ink };
  // ambient wash blobs — coral top-left, violet top-right, cyan lower-left,
  // mirroring .blob.a/.b/.c in the site's CSS (large, soft, low-opacity)
  slide.addShape(pptx.ShapeType.ellipse, {
    x: -2.6, y: -2.4, w: 7.2, h: 7.2,
    fill: { color: C.coral, transparency: 90 }, line: { type: "none" }
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 9.4, y: -2.8, w: 7.6, h: 7.6,
    fill: { color: C.violet, transparency: 88 }, line: { type: "none" }
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: -3.2, y: 4.6, w: 7.4, h: 7.4,
    fill: { color: C.cyan, transparency: 92 }, line: { type: "none" }
  });
}

function addBrandRow(slide, opts = {}) {
  const y = opts.y ?? 0.42;
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 0.55, y: y + 0.03, w: 0.16, h: 0.16,
    fill: { color: C.sun }, line: { type: "none" },
    shadow: { type: "outer", color: C.sun, opacity: 0.6, blur: 8, offset: 0, angle: 0 }
  });
  slide.addText("hello world", {
    x: 0.82, y, w: 3, h: 0.24,
    fontFace: FONT, fontSize: 11, color: C.cream, transparency: 20,
    charSpacing: 1, align: "left", valign: "middle"
  });
}

function addKicker(slide, text, opts = {}) {
  slide.addText(text.toUpperCase(), {
    x: opts.x ?? 0.9, y: opts.y ?? 0.95, w: opts.w ?? 5, h: 0.35,
    fontFace: FONT, fontSize: 12.5, bold: true, color: opts.color ?? C.cyan,
    charSpacing: 2.2, align: "left"
  });
}

function pageNumber(slide, n) {
  slide.addText(String(n).padStart(2, "0"), {
    x: 12.55, y: 7.02, w: 0.6, h: 0.3,
    fontFace: FONT, fontSize: 10, color: C.cream, transparency: 55,
    align: "right", charSpacing: 1
  });
}

// small colored dot + glow, used for city pins / eyebrow pulse
function glowDot(slide, x, y, d, color, glowBlur = 10) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y, w: d, h: d,
    fill: { color }, line: { type: "none" },
    shadow: { type: "outer", color, opacity: 0.65, blur: glowBlur, offset: 0, angle: 0 }
  });
}

// glass card backing panel (no text) — matches .menu-list / #sheet treatment
function glassPanel(slide, x, y, w, h, radius = 0.09, opts = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: radius,
    fill: { color: opts.fill ?? C.card, transparency: opts.transparency ?? 8 },
    line: opts.line ?? STROKE_2,
    shadow: { type: "outer", color: C.black, opacity: 0.45, blur: 18, offset: 6, angle: 90 }
  });
}

// pill / chip — small rounded rect with colored text, optional lead dot
function chip(slide, x, y, w, h, label, color, opts = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.5,
    fill: opts.solid
      ? { color, transparency: 0 }
      : { color, transparency: 84 },
    line: { color, transparency: 55, width: 1 }
  });
  slide.addText(label, {
    x: x + 0.12, y, w: w - 0.24, h,
    fontFace: FONT, fontSize: opts.fontSize ?? 10.5, bold: true,
    color: opts.solid ? C.ink : C.cream,
    align: "center", valign: "middle", charSpacing: 0.6
  });
}

/* ---------------- globe graphic (native shapes, fully vector) ---------------- */
function globe(slide, cx, cy, r, opts = {}) {
  // outer atmosphere halo
  slide.addShape(pptx.ShapeType.ellipse, {
    x: cx - r * 1.35, y: cy - r * 1.35, w: r * 2.7, h: r * 2.7,
    fill: { color: C.violet, transparency: 88 }, line: { type: "none" }
  });
  // sphere body
  slide.addShape(pptx.ShapeType.ellipse, {
    x: cx - r, y: cy - r, w: r * 2, h: r * 2,
    fill: { color: "141033", transparency: 4 },
    line: { color: C.violet, transparency: 70, width: 1 },
    shadow: { type: "outer", color: C.violet, opacity: 0.35, blur: 30, offset: 0, angle: 0 }
  });
  // lit hemisphere (offset lighter overlay for a soft directional highlight)
  slide.addShape(pptx.ShapeType.ellipse, {
    x: cx - r * 0.72, y: cy - r * 0.86, w: r * 1.15, h: r * 1.15,
    fill: { color: C.violet, transparency: 78 }, line: { type: "none" }
  });
  // latitude / longitude wireframe lines
  for (const f of [0.34, 0.62, 0.86]) {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: cx - r, y: cy - r * f, w: r * 2, h: r * f * 2,
      fill: { type: "none" }, line: { color: C.cream, transparency: 88, width: 0.75 }
    });
  }
  slide.addShape(pptx.ShapeType.ellipse, {
    x: cx - r * 0.42, y: cy - r, w: r * 0.84, h: r * 2,
    fill: { type: "none" }, line: { color: C.cream, transparency: 88, width: 0.75 }
  });
  // rim light
  slide.addShape(pptx.ShapeType.ellipse, {
    x: cx - r, y: cy - r, w: r * 2, h: r * 2,
    fill: { type: "none" }, line: { color: C.sky, transparency: 60, width: 1.25 }
  });

  if (opts.pins) {
    opts.pins.forEach(p => {
      const px = cx + p.dx * r, py = cy + p.dy * r;
      glowDot(slide, px - 0.05, py - 0.05, 0.1, p.color, 8);
      const labelW = 0.16 + p.name.length * 0.075;
      const lx = px + (p.side === "left" ? -labelW - 0.12 : 0.12);
      slide.addShape(pptx.ShapeType.roundRect, {
        x: lx, y: py - 0.14, w: labelW, h: 0.28, rectRadius: 0.5,
        fill: { color: C.cardDeep, transparency: 15 },
        line: { color: p.color, transparency: 45, width: 1 }
      });
      slide.addText(p.name, {
        x: lx, y: py - 0.14, w: labelW, h: 0.28,
        fontFace: FONT, fontSize: 9.5, bold: true, color: C.cream,
        align: "center", valign: "middle"
      });
    });
  }
}

/* ================================================================
   SLIDE 1 — Title
   ================================================================ */
{
  const s = pptx.addSlide();
  addBg(s);
  globe(s, 9.7, 3.85, 2.5, {
    pins: [
      { dx: -0.62, dy: -0.35, color: C.coral, name: "Berlin", side: "left" },
      { dx: 0.5, dy: -0.55, color: C.pink, name: "Tokyo", side: "right" },
      { dx: 0.68, dy: 0.3, color: C.cyan, name: "Sydney", side: "right" }
    ]
  });

  chip(s, 0.9, 0.9, 3.1, 0.42, "●  LIVE IN 6 CITIES TONIGHT", C.cream, { fontSize: 10.5 });
  // recolor the leading dot to the pulse cyan to match the site's pulse-dot
  s.addShape(pptx.ShapeType.ellipse, {
    x: 1.08, y: 1.075, w: 0.09, h: 0.09,
    fill: { color: C.cyan }, line: { type: "none" },
    shadow: { type: "outer", color: C.cyan, opacity: 0.7, blur: 6, offset: 0, angle: 0 }
  });

  s.addText("Hello World", {
    x: 0.75, y: 2.15, w: 8.6, h: 2.1,
    fontFace: FONT, fontSize: 96, bold: true, color: C.gold,
    charSpacing: -1, align: "left", valign: "middle"
  });
  s.addText("Discover what's happening.", {
    x: 0.85, y: 4.05, w: 7, h: 0.6,
    fontFace: FONT, fontSize: 24, color: C.cream, transparency: 24,
    align: "left"
  });
  s.addText("MUSIC   ·   CULTURE   ·   EVERYWHERE", {
    x: 0.85, y: 6.55, w: 7, h: 0.4,
    fontFace: FONT, fontSize: 12, color: C.cream, transparency: 55,
    charSpacing: 2, align: "left"
  });
  pageNumber(s, 1);
}

/* ================================================================
   SLIDE 2 — About Hello World
   ================================================================ */
{
  const s = pptx.addSlide();
  addBg(s);
  addBrandRow(s);
  addKicker(s, "About", { color: C.sun });

  s.addText("Discover what's happening,\neverywhere in the world.", {
    x: 0.85, y: 1.35, w: 7, h: 1.9,
    fontFace: FONT, fontSize: 40, bold: true, color: C.cream,
    charSpacing: -0.5, lineSpacingMultiple: 1.05, align: "left", valign: "top"
  });

  s.addText(
    "Hello World is a global discovery platform for nightlife and culture. " +
    "Spin an interactive globe, land on any city, and see exactly what's on — " +
    "tonight or any night. Live music, DJ sets, festivals, and art & culture, " +
    "surfaced from real listings and always up to date.",
    {
      x: 0.85, y: 3.35, w: 6.5, h: 2,
      fontFace: FONT, fontSize: 15, color: C.cream, transparency: 22,
      lineSpacingMultiple: 1.35, align: "left", valign: "top"
    }
  );

  // right-side category panel
  const px = 8.05, py = 1.35, pw = 4.4, ph = 5.05;
  glassPanel(s, px, py, pw, ph, 0.1);
  s.addText("WHAT YOU'LL FIND", {
    x: px + 0.4, y: py + 0.35, w: pw - 0.8, h: 0.35,
    fontFace: FONT, fontSize: 11.5, bold: true, color: C.cream, transparency: 45,
    charSpacing: 1.8
  });

  const cats = [
    ["Live Music", "Bands and artists playing tonight, from basement gigs to arenas."],
    ["DJ Sets", "Club nights and after-hours sets across the world's best rooms."],
    ["Festivals", "Multi-day gatherings and open-airs worth building a trip around."],
    ["Underground", "Warehouse parties and off-grid nights you won't find elsewhere."],
    ["Art & Culture", "Gallery openings, listening bars, and creative happenings."]
  ];
  let cy = py + 0.9;
  const rowH = 0.78;
  cats.forEach(([name, desc]) => {
    glowDot(s, px + 0.4, cy + 0.09, 0.14, CAT[name], 7);
    s.addText(name, {
      x: px + 0.72, y: cy - 0.03, w: pw - 1.1, h: 0.3,
      fontFace: FONT, fontSize: 14, bold: true, color: C.cream, align: "left"
    });
    s.addText(desc, {
      x: px + 0.72, y: cy + 0.25, w: pw - 1.1, h: 0.45,
      fontFace: FONT, fontSize: 10.5, color: C.cream, transparency: 35,
      lineSpacingMultiple: 1.15, align: "left"
    });
    cy += rowH;
  });

  pageNumber(s, 2);
}

/* ================================================================
   SLIDE 3 — Discover the world
   ================================================================ */
{
  const s = pptx.addSlide();
  addBg(s);
  addBrandRow(s);
  addKicker(s, "The Experience", { color: C.pink });

  s.addText("Discover the world.", {
    x: 0.85, y: 1.35, w: 6, h: 1,
    fontFace: FONT, fontSize: 40, bold: true, color: C.cream, charSpacing: -0.5
  });
  s.addText(
    "A living, spinning globe replaces the search bar. Drag to explore — " +
    "glowing pins mark cities that are live right now, sized by how much is " +
    "happening. Tap a pin and fall straight into that city's scene.",
    {
      x: 0.85, y: 2.35, w: 5.5, h: 1.8,
      fontFace: FONT, fontSize: 15, color: C.cream, transparency: 22,
      lineSpacingMultiple: 1.35, align: "left"
    }
  );

  const feats = [
    ["Drag to explore", "A fully interactive 3D globe, not a flat map."],
    ["Pins that pulse", "Pin size and glow reflect real event volume per city."],
    ["One tap in", "Selecting a city opens its live event sheet instantly."]
  ];
  let fy = 4.35;
  feats.forEach(([t, d]) => {
    glowDot(s, 0.87, fy + 0.06, 0.1, C.cyan, 6);
    s.addText(t, { x: 1.12, y: fy - 0.08, w: 5, h: 0.3, fontFace: FONT, fontSize: 13.5, bold: true, color: C.cream });
    s.addText(d, { x: 1.12, y: fy + 0.18, w: 5.3, h: 0.4, fontFace: FONT, fontSize: 10.5, color: C.cream, transparency: 35, lineSpacingMultiple: 1.15 });
    fy += 0.72;
  });

  globe(s, 9.7, 3.85, 2.5, {
    pins: [
      { dx: -0.55, dy: -0.5, color: C.coral, name: "Berlin", side: "left" },
      { dx: 0.62, dy: -0.4, color: C.violet, name: "London", side: "right" },
      { dx: -0.68, dy: 0.35, color: C.pink, name: "Tokyo", side: "left" },
      { dx: 0.35, dy: 0.65, color: C.cyan, name: "Sydney", side: "right" },
      { dx: -0.1, dy: -0.82, color: C.sun, name: "New York", side: "right" }
    ]
  });

  pageNumber(s, 3);
}

/* ================================================================
   SLIDE 4 — 5-day itinerary
   ================================================================ */
{
  const s = pptx.addSlide();
  addBg(s);
  addBrandRow(s);
  addKicker(s, "Sydney · The Week Ahead", { color: C.cyan });
  s.addText([
    { text: "Discover what's going on", options: { bold: true, fontSize: 28, color: C.cream } },
    { text: "  23–27 September 2026", options: { fontSize: 28, color: C.cream, transparency: 45 } }
  ], { x: 0.85, y: 1.3, w: 11.6, h: 0.55, fontFace: FONT, charSpacing: -0.4, align: "left" });

  // real listings pulled from the Ticketmaster Discovery API for Sydney,
  // 23–27 Sep 2026 (fetched live; names lightly trimmed of promoter/date
  // boilerplate where the day/venue is already shown elsewhere on the card)
  const days = [
    { d: "WED", n: "23", events: [
      { t: "19:00", ev: "Dracula", venue: "State Theatre, Sydney", cat: "Art & Culture" },
      { t: "19:30", ev: "Clementine Douglas", venue: "Oxford Art Factory", cat: "Live Music" }
    ]},
    { d: "THU", n: "24", events: [
      { t: "19:00", ev: "PASH", venue: "Lansdowne Hotel", cat: "Live Music" },
      { t: "21:00", ev: "ivy Thursdays", venue: "ivy Sydney", cat: "DJ Sets" }
    ]},
    { d: "FRI", n: "25", events: [
      { t: "19:00", ev: "9lives w/ Kaizo, Jequya, Vanni", venue: "Oxford Art Factory", cat: "Live Music" },
      { t: "21:00", ev: "C'est La Vie ft. Ammara", venue: "Chinese Laundry", cat: "DJ Sets" }
    ]},
    { d: "SAT", n: "26", events: [
      { t: "14:00", ev: "My Fair Lady", venue: "Sydney Opera House", cat: "Art & Culture" },
      { t: "21:00", ev: "Green Velvet", venue: "ivy Sydney", cat: "DJ Sets" }
    ]},
    { d: "SUN", n: "27", events: [
      { t: "13:30", ev: "Dracula", venue: "State Theatre, Sydney", cat: "Art & Culture" },
      { t: "15:00", ev: "My Fair Lady", venue: "Sydney Opera House", cat: "Art & Culture" }
    ]}
  ];

  const colGap = 0.22, startX = 0.85, colW = (12.55 - 0.85 - colGap * 4) / 5, top = 2.15, colH = 4.25;
  days.forEach((day, i) => {
    const x = startX + i * (colW + colGap);
    const innerW = colW - 0.44;
    glassPanel(s, x, top, colW, colH, 0.1);
    // Sydney accent top bar — one city running through the whole slide
    s.addShape(pptx.ShapeType.roundRect, {
      x, y: top, w: colW, h: 0.07, rectRadius: 0.4,
      fill: { color: C.cyan }, line: { type: "none" }
    });
    s.addText(day.d, {
      x: x + 0.22, y: top + 0.24, w: innerW, h: 0.26,
      fontFace: FONT, fontSize: 11, bold: true, color: C.cream, transparency: 40, charSpacing: 1.8
    });
    s.addText(day.n, {
      x: x + 0.2, y: top + 0.44, w: innerW, h: 0.66,
      fontFace: FONT, fontSize: 34, bold: true, color: C.cream
    });
    s.addShape(pptx.ShapeType.line, {
      x: x + 0.22, y: top + 1.14, w: innerW, h: 0,
      line: STROKE_2
    });

    const evTop = top + 1.24, evGap = 1.42;
    day.events.forEach((ev, j) => {
      const ey = evTop + j * evGap;
      const accent = CAT[ev.cat];
      s.addText(ev.t, {
        x: x + 0.22, y: ey, w: innerW, h: 0.2,
        fontFace: FONT, fontSize: 10.5, bold: true, color: C.cream, transparency: 15
      });
      s.addText(ev.ev, {
        x: x + 0.22, y: ey + 0.2, w: innerW, h: 0.42,
        fontFace: FONT, fontSize: 11.5, bold: true, color: C.cream,
        lineSpacingMultiple: 1.08, valign: "top"
      });
      s.addText(ev.venue, {
        x: x + 0.22, y: ey + 0.62, w: innerW, h: 0.3,
        fontFace: FONT, fontSize: 8.5, color: C.cream, transparency: 35,
        lineSpacingMultiple: 1.1, valign: "top"
      });
      chip(s, x + 0.22, ey + 0.94, innerW, 0.28, ev.cat, accent, { fontSize: 8 });
      if (j < day.events.length - 1) {
        s.addShape(pptx.ShapeType.line, {
          x: x + 0.22, y: ey + 1.3, w: innerW, h: 0,
          line: { color: C.white, transparency: 93, width: 1 }
        });
      }
    });
  });

  pageNumber(s, 4);
}

/* ================================================================
   SLIDE 5 — City discovery
   ================================================================ */
{
  const s = pptx.addSlide();
  addBg(s);
  addBrandRow(s);
  addKicker(s, "City Discovery", { color: C.violet });

  s.addText("Select a city.\nUnlock its scene.", {
    x: 0.85, y: 1.35, w: 5.6, h: 1.6,
    fontFace: FONT, fontSize: 34, bold: true, color: C.cream, charSpacing: -0.5, lineSpacingMultiple: 1.05
  });
  s.addText(
    "Every city on the globe opens into a live sheet of what's on — " +
    "filterable by category, browsable day by day. Flip through dates with " +
    "a single tap, or jump straight to any date on the calendar.",
    {
      x: 0.85, y: 2.95, w: 5.3, h: 1.6,
      fontFace: FONT, fontSize: 15, color: C.cream, transparency: 22, lineSpacingMultiple: 1.35
    }
  );

  const bullets = ["Live category filters", "Date-by-date browsing", "Direct ticket links"];
  let by = 4.75;
  bullets.forEach(b => {
    glowDot(s, 0.87, by + 0.06, 0.1, C.pink, 6);
    s.addText(b, { x: 1.12, y: by - 0.07, w: 4.8, h: 0.3, fontFace: FONT, fontSize: 13, bold: true, color: C.cream });
    by += 0.5;
  });

  // mock city sheet
  const px = 7.35, py = 0.95, pw = 5.1, ph = 5.85;
  glassPanel(s, px, py, pw, ph, 0.09);
  s.addText("AFTER HOURS", { x: px + 0.42, y: py + 0.32, w: pw - 0.8, h: 0.28, fontFace: FONT, fontSize: 10.5, bold: true, color: C.pink, charSpacing: 1.8 });
  s.addText("Tokyo", { x: px + 0.4, y: py + 0.56, w: pw - 0.8, h: 0.7, fontFace: FONT, fontSize: 30, bold: true, color: C.cream });
  s.addText("42 events · via Ticketmaster", { x: px + 0.42, y: py + 1.22, w: pw - 0.8, h: 0.3, fontFace: FONT, fontSize: 10.5, color: C.cream, transparency: 40 });

  // date strip
  const dPills = [["TODAY", "16", true], ["THU", "17", false], ["FRI", "18", false], ["SAT", "19", false], ["SUN", "20", false]];
  const dW = 0.72, dGap = 0.1, dStartX = px + 0.42;
  dPills.forEach(([dow, num, sel], i) => {
    const dx = dStartX + i * (dW + dGap);
    s.addShape(pptx.ShapeType.roundRect, {
      x: dx, y: py + 1.68, w: dW, h: 0.62, rectRadius: 0.22,
      fill: sel ? { color: C.pink } : { color: C.white, transparency: 92 },
      line: sel ? { type: "none" } : STROKE
    });
    s.addText(dow, { x: dx, y: py + 1.75, w: dW, h: 0.22, fontFace: FONT, fontSize: 7.5, bold: true, color: sel ? C.ink : C.cream, transparency: sel ? 0 : 25, align: "center", charSpacing: 0.6 });
    s.addText(num, { x: dx, y: py + 1.95, w: dW, h: 0.32, fontFace: FONT, fontSize: 14, bold: true, color: sel ? C.ink : C.cream, align: "center" });
  });

  // category chips
  const chips = [["All", C.pink, true], ["DJ Sets", C.violet, false], ["Live Music", C.coral, false], ["Underground", C.cyan, false]];
  let cx2 = dStartX;
  const cy2 = py + 2.55;
  chips.forEach(([label, color, solid]) => {
    const w = 0.42 + label.length * 0.082;
    chip(s, cx2, cy2, w, 0.36, label, solid ? C.pink : color, { solid, fontSize: 9.5 });
    cx2 += w + 0.14;
  });

  // sample events
  const sampleEvents = [
    ["23:00", "Shibuya After Hours", "Contact Annex", "DJ Sets"],
    ["20:30", "City Pop Revival", "Blue Note Sub, Minato", "Live Music"]
  ];
  let ey = cy2 + 0.62;
  sampleEvents.forEach(([time, name, venue, cat]) => {
    s.addText(time, { x: px + 0.42, y: ey, w: 0.7, h: 0.7, fontFace: FONT, fontSize: 11, bold: true, color: C.cream, transparency: 15, valign: "top" });
    s.addText(name, { x: px + 1.2, y: ey, w: pw - 2, h: 0.32, fontFace: FONT, fontSize: 12.5, bold: true, color: C.cream, valign: "top" });
    s.addText(venue, { x: px + 1.2, y: ey + 0.3, w: pw - 2, h: 0.3, fontFace: FONT, fontSize: 9.5, color: C.cream, transparency: 40, valign: "top" });
    chip(s, px + pw - 1.85, ey + 0.02, 1.45, 0.3, cat, CAT[cat], { fontSize: 8.5 });
    ey += 0.85;
  });

  pageNumber(s, 5);
}

/* ================================================================
   SLIDE 6 — How Hello World works
   ================================================================ */
{
  const s = pptx.addSlide();
  addBg(s);
  addBrandRow(s);
  addKicker(s, "How it works", { color: C.sky });
  s.addText("From spinning the globe to walking through the door.", {
    x: 0.85, y: 1.3, w: 11, h: 0.65,
    fontFace: FONT, fontSize: 26, bold: true, color: C.cream, charSpacing: -0.4
  });

  const steps = [
    ["01", "Explore", "Spin the interactive globe and see the world's nightlife light up in real time.", C.coral],
    ["02", "Discover", "Land on a city and open its live sheet of tonight's music, art and culture.", C.violet],
    ["03", "Choose", "Filter by category and flip through dates to find exactly what you're after.", C.cyan],
    ["04", "Experience", "Tap through to get tickets and go — straight from discovery to the door.", C.pink]
  ];

  const gap = 0.32, startX = 0.85, w = (12.55 - 0.85 - gap * 3) / 4, top = 2.55, h = 3.6;
  steps.forEach((st, i) => {
    const x = startX + i * (w + gap);
    glassPanel(s, x, top, w, h, 0.12);
    glowDot(s, x + 0.35, top + 0.4, 0.16, st[3], 9);
    s.addText(st[0], {
      x: x + 0.32, y: top + 0.7, w: w - 0.6, h: 0.7,
      fontFace: FONT, fontSize: 34, bold: true, color: st[3], transparency: 15
    });
    s.addText(st[1], {
      x: x + 0.32, y: top + 1.45, w: w - 0.6, h: 0.45,
      fontFace: FONT, fontSize: 17, bold: true, color: C.cream
    });
    s.addText(st[2], {
      x: x + 0.32, y: top + 1.95, w: w - 0.6, h: 1.4,
      fontFace: FONT, fontSize: 10.5, color: C.cream, transparency: 30, lineSpacingMultiple: 1.3
    });
    if (i < steps.length - 1) {
      s.addText("→", {
        x: x + w, y: top + (h / 2) - 0.25, w: gap, h: 0.5,
        fontFace: FONT, fontSize: 18, color: C.cream, transparency: 45, align: "center", valign: "middle"
      });
    }
  });

  pageNumber(s, 6);
}

/* ================================================================
   SLIDE 7 — Closing
   ================================================================ */
{
  const s = pptx.addSlide();
  addBg(s);
  globe(s, 6.67, 3.2, 2.05, {
    pins: [
      { dx: -0.6, dy: -0.4, color: C.coral, name: "Berlin", side: "left" },
      { dx: 0.6, dy: -0.35, color: C.violet, name: "London", side: "right" },
      { dx: -0.5, dy: 0.55, color: C.pink, name: "Tokyo", side: "left" },
      { dx: 0.55, dy: 0.5, color: C.cyan, name: "Sydney", side: "right" }
    ]
  });

  s.addText("Hello World", {
    x: 1.665, y: 5.35, w: 10, h: 1.05,
    fontFace: FONT, fontSize: 52, bold: true, color: C.gold,
    charSpacing: -0.8, align: "center"
  });
  s.addText("Discover what's happening. Everywhere.", {
    x: 1.665, y: 6.35, w: 10, h: 0.5,
    fontFace: FONT, fontSize: 16, color: C.cream, transparency: 30, align: "center"
  });

  pageNumber(s, 7);
}

/* ---------------- write file ---------------- */
pptx.writeFile({ fileName: "hello-world-sales-pack.pptx" }).then(fileName => {
  console.log("Wrote:", fileName);
});
