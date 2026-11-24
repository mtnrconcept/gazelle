#!/usr/bin/env node
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const targets = [
  { dir: 'public/images/carte-menu', maxW: 1200, pngQuality: 75, jpgQuality: 80 },
  { dir: 'public/images/_assets', maxW: 1200, pngQuality: 75, jpgQuality: 82 },
  { dir: 'public/images/galerie/retouche', maxW: 1600, pngQuality: 78, jpgQuality: 82 },
];

const SKIP_BELOW_KB = 200;
const formatKB = (n) => `${(n / 1024).toFixed(0)}KB`;

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;

for (const t of targets) {
  const dir = path.join(ROOT, t.dir);
  let files;
  try {
    files = await fs.readdir(dir);
  } catch {
    console.log(`✗ ${t.dir} not found`);
    continue;
  }
  const images = files.filter((f) => /\.(png|jpe?g)$/i.test(f));
  console.log(`\n=== ${t.dir} (${images.length} files) ===`);

  for (const f of images) {
    const inPath = path.join(dir, f);
    const stat = await fs.stat(inPath);
    if (stat.size < SKIP_BELOW_KB * 1024) {
      skipped++;
      continue;
    }
    try {
      const buf = await fs.readFile(inPath);
      const ext = path.extname(f).toLowerCase();
      let pipeline = sharp(buf).resize({ width: t.maxW, withoutEnlargement: true });
      if (ext === '.png') {
        pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: t.pngQuality, effort: 10 });
      } else {
        pipeline = pipeline.jpeg({ quality: t.jpgQuality, mozjpeg: true });
      }
      const out = await pipeline.toBuffer();
      if (out.length < stat.size * 0.95) {
        await fs.writeFile(inPath, out);
        totalBefore += stat.size;
        totalAfter += out.length;
        processed++;
        console.log(`  ✓ ${f}: ${formatKB(stat.size)} → ${formatKB(out.length)} (-${Math.round((1 - out.length / stat.size) * 100)}%)`);
      } else {
        skipped++;
      }
    } catch (err) {
      console.log(`  ✗ ${f}: ${err.message}`);
    }
  }
}

console.log(`\n========== Summary ==========`);
console.log(`Processed: ${processed} files`);
console.log(`Skipped: ${skipped} files`);
console.log(`Total saved: ${formatKB(totalBefore - totalAfter)} (${formatKB(totalBefore)} → ${formatKB(totalAfter)})`);
