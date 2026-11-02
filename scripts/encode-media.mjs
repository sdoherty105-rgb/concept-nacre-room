// Rebuild public/media from the JPEG masters in assets/source.
// Requires sharp to be resolvable (NODE_PATH or a local install). Not part of the site runtime.
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";

const jobs = [
  ["cover-portrait.jpg", "cover", [800, 864]],
  ["colour-braid.jpg", "colour", [864]],
  ["still-shears.jpg", "shears", [840]],
  ["still-bottles.jpg", "bottles", [840]],
  ["still-basin.jpg", "basin", [1100]],
  ["people-colour.jpg", "people-colour", [800]],
  ["people-cut.jpg", "people-cut", [800]],
  ["people-texture.jpg", "people-texture", [800]],
  ["people-skin.jpg", "people-skin", [864]],
];

for (const [file, name, widths] of jobs) {
  const input = `assets/source/${file}`;
  for (const width of widths) {
    const pipeline = () => sharp(input).rotate().resize({ width, withoutEnlargement: true });
    await pipeline().avif({ quality: name === "cover" ? 44 : 42, effort: 6 }).toFile(`public/media/${name}-${width}.avif`);
    await pipeline().webp({ quality: 62 }).toFile(`public/media/${name}-${width}.webp`);
  }
  const thumb = () => sharp(input).rotate().resize({ width: 240, withoutEnlargement: true });
  await thumb().avif({ quality: 34, effort: 4 }).toFile(`public/media/thumb-${name}.avif`);
  await thumb().webp({ quality: 48 }).toFile(`public/media/thumb-${name}.webp`);
}

let total = 0;
for (const file of readdirSync("public/media")) {
  const size = statSync(`public/media/${file}`).size;
  total += size;
  console.log(file, Math.round(size / 1024) + "KB");
}
console.log("total", Math.round(total / 1024) + "KB");
