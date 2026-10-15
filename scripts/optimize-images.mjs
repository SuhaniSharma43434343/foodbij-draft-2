// Pre-builds every photo the site uses into static WebP files at fixed widths, plus a dominant colour
// for each, so no photo waits on the on-demand image optimiser (which took 0.5-1.3s per image cold and
// left large frames blank while scrolling). Run `npm run images` after adding or changing a photo, and commit
// public/o/ with it: the build does not regenerate these files (Vercel's .vercelignore drops scripts/).
//
// Output: public/o/<hash>-<width>.webp and src/content/image-manifest.json
import sharp from "sharp";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public");
const OUT = path.join(ROOT, "public", "o");
const WIDTHS = [240, 640, 1080, 1600, 2400];

// Every /images/... path referenced in the content files.
const content = ["site.ts"].map((f) => fs.readFileSync(path.join(ROOT, "src", "content", f), "utf8")).join("\n");
const rel = [...new Set([...content.matchAll(/img\(\s*"([^"]+\.jpg)"/g)].map((m) => m[1]))];

fs.mkdirSync(OUT, { recursive: true });
const manifest = {};
for (const r of rel) {
  const file = path.join(SRC, "images", r);
  // Short hashed names keep the srcset strings (repeated in the HTML and its payload) small.
  const name = crypto.createHash("sha1").update(r).digest("hex").slice(0, 10);
  const img = sharp(file).rotate();
  const { width } = await img.metadata();
  const widths = WIDTHS.filter((w) => w < width).concat(width > 2400 ? [] : [width]).filter((w, i, a) => a.indexOf(w) === i);
  for (const w of widths) {
    const out = path.join(OUT, `${name}-${w}.webp`);
    if (!fs.existsSync(out)) await sharp(file).rotate().resize({ width: w }).webp({ quality: 72, effort: 5 }).toFile(out);
  }
  const { dominant } = await sharp(file).stats();
  const hex = "#" + [dominant.r, dominant.g, dominant.b].map((v) => v.toString(16).padStart(2, "0")).join("");
  manifest[`/images/${r}`] = { name, widths, color: hex };
}
fs.writeFileSync(path.join(ROOT, "src", "content", "image-manifest.json"), JSON.stringify(manifest, null, 1));
console.log(`optimised ${rel.length} photos into public/o`);
