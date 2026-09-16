const fs = require("fs");
const opentype = require("opentype.js");

const buf = fs.readFileSync("/System/Library/Fonts/SFNS.ttf");
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

// advance width in inches for a string at a given pt size; bold gets a
// conservative +7% correction since we're measuring the regular weight
function textWidthIn(text, fontSize, { bold = false, charSpacing = 0 } = {}) {
  const base = font.getAdvanceWidth(text, fontSize) * (bold ? 1.07 : 1);
  const tracking = charSpacing * Math.max(0, text.length - 1); // charSpacing is in points, applied between chars
  return (base + tracking) / 72;
}

// greedy word-wrap simulation: how many lines, and does it fit box height?
function wrapLines(text, fontSize, boxWidthIn, opts = {}) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    const trial = cur ? cur + " " + w : w;
    if (textWidthIn(trial, fontSize, opts) <= boxWidthIn || !cur) {
      cur = trial;
    } else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function audit(name, text, { fontSize, boxWidthIn, boxHeightIn, bold = false, charSpacing = 0, lineSpacingMultiple = 1.2, forcedLines = null }) {
  const paragraphs = text.split("\n");
  let allLines = [];
  paragraphs.forEach(p => { allLines = allLines.concat(wrapLines(p, fontSize, boxWidthIn, { bold, charSpacing })); });
  const lines = forcedLines || allLines;
  const maxLineW = Math.max(...lines.map(l => textWidthIn(l, fontSize, { bold, charSpacing })));
  const lineHeightIn = (fontSize * lineSpacingMultiple) / 72;
  const totalHeightIn = lines.length * lineHeightIn;
  const widthOverflow = maxLineW > boxWidthIn + 0.001;
  const heightOverflow = boxHeightIn != null && totalHeightIn > boxHeightIn + 0.001;
  const flag = widthOverflow || heightOverflow ? "OVERFLOW" : "ok";
  console.log(
    `[${flag}] ${name}\n` +
    `    lines=${lines.length} maxLineW=${maxLineW.toFixed(2)}in (box ${boxWidthIn}in) ` +
    `totalH=${totalHeightIn.toFixed(2)}in (box ${boxHeightIn ?? "n/a"}in)\n` +
    (lines.length <= 4 ? `    text: ${JSON.stringify(lines)}\n` : "")
  );
  return { widthOverflow, heightOverflow, lines, maxLineW, totalHeightIn };
}

module.exports = { textWidthIn, wrapLines, audit };
