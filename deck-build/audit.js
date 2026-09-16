const { audit, textWidthIn } = require("./measure");

console.log("=== SLIDE 1 ===");
audit("eyebrow chip", "●  LIVE IN 6 CITIES TONIGHT", { fontSize: 10.5, bold: true, charSpacing: 0.6, boxWidthIn: 3.1 - 0.24, boxHeightIn: 0.42, lineSpacingMultiple: 1 });
audit("hero title", "Hello World", { fontSize: 96, bold: true, charSpacing: -1, boxWidthIn: 8.6, boxHeightIn: 2.1, lineSpacingMultiple: 1 });
audit("subtitle", "Discover what's happening.", { fontSize: 24, boxWidthIn: 7, boxHeightIn: 0.6, lineSpacingMultiple: 1 });
audit("caption", "MUSIC   ·   CULTURE   ·   EVERYWHERE", { fontSize: 12, charSpacing: 2, boxWidthIn: 7, boxHeightIn: 0.4, lineSpacingMultiple: 1 });

console.log("=== SLIDE 2 ===");
audit("kicker", "ABOUT", { fontSize: 12.5, bold: true, charSpacing: 2.2, boxWidthIn: 5, boxHeightIn: 0.35, lineSpacingMultiple: 1 });
audit("heading", "Discover what's happening,\neverywhere in the world.", { fontSize: 40, bold: true, charSpacing: -0.5, boxWidthIn: 6.6, boxHeightIn: 1.9, lineSpacingMultiple: 1.05, forcedLines: ["Discover what's happening,", "everywhere in the world."] });
audit("body", "Hello World is a global discovery platform for nightlife and culture. Spin an interactive globe, land on any city, and see exactly what's on — tonight or any night. Live music, DJ sets, festivals, and art & culture, surfaced from real listings and always up to date.", { fontSize: 15, boxWidthIn: 6.5, boxHeightIn: 2, lineSpacingMultiple: 1.35 });
audit("panel kicker", "WHAT YOU'LL FIND", { fontSize: 11.5, bold: true, charSpacing: 1.8, boxWidthIn: 4.4 - 0.8, boxHeightIn: 0.35, lineSpacingMultiple: 1 });
["Live Music", "DJ Sets", "Festivals", "Underground", "Art & Culture"].forEach(n => {
  audit(`cat name: ${n}`, n, { fontSize: 14, bold: true, boxWidthIn: 4.4 - 1.1, boxHeightIn: 0.3, lineSpacingMultiple: 1 });
});
audit("cat desc (longest)", "Warehouse parties and off-grid nights you won't find elsewhere.", { fontSize: 10.5, boxWidthIn: 4.4 - 1.1, boxHeightIn: 0.45, lineSpacingMultiple: 1.15 });

console.log("=== SLIDE 3 ===");
audit("heading", "Discover the world.", { fontSize: 40, bold: true, charSpacing: -0.5, boxWidthIn: 6, boxHeightIn: 1, lineSpacingMultiple: 1 });
audit("body", "A living, spinning globe replaces the search bar. Drag to explore — glowing pins mark cities that are live right now, sized by how much is happening. Tap a pin and fall straight into that city's scene.", { fontSize: 15, boxWidthIn: 5.5, boxHeightIn: 1.8, lineSpacingMultiple: 1.35 });
audit("feat title (longest)", "Drag to explore", { fontSize: 13.5, bold: true, boxWidthIn: 5, boxHeightIn: 0.3, lineSpacingMultiple: 1 });
audit("feat desc (longest)", "Pin size and glow reflect real event volume per city.", { fontSize: 10.5, boxWidthIn: 5.3, boxHeightIn: 0.4, lineSpacingMultiple: 1.15 });

console.log("=== SLIDE 4 ===");
audit("title combined", "Discover what's going on  23–27 September 2026", { fontSize: 30, bold: true, charSpacing: -0.4, boxWidthIn: 11.5, boxHeightIn: 0.6, lineSpacingMultiple: 1 });
const colW4 = (12.55 - 0.85 - 0.22 * 4) / 5;
console.log("colW4 =", colW4.toFixed(3));
audit("day label", "WED", { fontSize: 11.5, bold: true, charSpacing: 1.8, boxWidthIn: colW4 - 0.44, boxHeightIn: 0.3, lineSpacingMultiple: 1 });
audit("day number", "23", { fontSize: 44, bold: true, boxWidthIn: colW4 - 0.4, boxHeightIn: 0.85, lineSpacingMultiple: 1 });
audit("event name (longest)", "Nachtstrom w/ Lena Fuchs", { fontSize: 13, bold: true, boxWidthIn: colW4 - 0.44, boxHeightIn: 0.75, lineSpacingMultiple: 1.1 });
audit("event city/venue (longest)", "London · The Foldover, Hackney", { fontSize: 10, boxWidthIn: colW4 - 0.44, boxHeightIn: 0.55, lineSpacingMultiple: 1.15 });
audit("time", "23:30", { fontSize: 15, bold: true, boxWidthIn: colW4 - 0.44, boxHeightIn: 0.35, lineSpacingMultiple: 1 });
audit("cat chip (longest)", "Art & Culture", { fontSize: 10.5, bold: true, boxWidthIn: colW4 - 0.44 - 0.24, boxHeightIn: 0.36, lineSpacingMultiple: 1 });

console.log("=== SLIDE 5 ===");
audit("heading", "Select a city.\nUnlock its scene.", { fontSize: 34, bold: true, charSpacing: -0.5, boxWidthIn: 5.6, boxHeightIn: 1.6, lineSpacingMultiple: 1.05, forcedLines: ["Select a city.", "Unlock its scene."] });
audit("body", "Every city on the globe opens into a live sheet of what's on — filterable by category, browsable day by day. Flip through dates with a single tap, or jump straight to any date on the calendar.", { fontSize: 15, boxWidthIn: 5.3, boxHeightIn: 1.6, lineSpacingMultiple: 1.35 });
audit("mock city name", "Tokyo", { fontSize: 30, bold: true, boxWidthIn: 5.1 - 0.8, boxHeightIn: 0.7, lineSpacingMultiple: 1 });
audit("date pill dow", "TODAY", { fontSize: 7.5, bold: true, charSpacing: 0.6, boxWidthIn: 0.72, boxHeightIn: 0.22, lineSpacingMultiple: 1 });
audit("chip label (longest)", "Underground", { fontSize: 9.5, bold: true, boxWidthIn: 0.42 + "Underground".length * 0.082 - 0.24, boxHeightIn: 0.36, lineSpacingMultiple: 1 });
audit("sample event name", "Shibuya After Hours", { fontSize: 12.5, bold: true, boxWidthIn: 5.1 - 2, boxHeightIn: 0.32, lineSpacingMultiple: 1 });
audit("sample event venue (longest)", "Blue Note Sub, Minato", { fontSize: 9.5, boxWidthIn: 5.1 - 2, boxHeightIn: 0.3, lineSpacingMultiple: 1 });

console.log("=== SLIDE 6 ===");
audit("heading", "From spinning the globe to walking through the door.", { fontSize: 26, bold: true, charSpacing: -0.4, boxWidthIn: 11, boxHeightIn: 0.65, lineSpacingMultiple: 1 });
const colW6 = (12.55 - 0.85 - 0.32 * 3) / 4;
console.log("colW6 =", colW6.toFixed(3));
audit("step number", "01", { fontSize: 34, bold: true, boxWidthIn: colW6 - 0.6, boxHeightIn: 0.7, lineSpacingMultiple: 1 });
audit("step title (longest)", "Experience", { fontSize: 17, bold: true, boxWidthIn: colW6 - 0.6, boxHeightIn: 0.45, lineSpacingMultiple: 1 });
audit("step desc (longest)", "Tap through to get tickets and go — straight from discovery to the door.", { fontSize: 10.5, boxWidthIn: colW6 - 0.6, boxHeightIn: 1.4, lineSpacingMultiple: 1.3 });

console.log("=== SLIDE 7 ===");
audit("closing title", "Hello World", { fontSize: 52, bold: true, charSpacing: -0.8, boxWidthIn: 10, boxHeightIn: 1.05, lineSpacingMultiple: 1 });
audit("closing sub", "Discover what's happening. Everywhere.", { fontSize: 16, boxWidthIn: 10, boxHeightIn: 0.5, lineSpacingMultiple: 1 });
