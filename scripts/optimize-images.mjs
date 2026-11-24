#!/usr/bin/env node
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'public/images');

const targets = [
  { in: 'décor2/fond.webp', out: 'décor2/fond.webp', maxW: 1920, quality: 70, format: 'webp' },
  { in: 'décor2/bandeau.webp', out: 'décor2/bandeau.webp', maxW: 1920, quality: 75, format: 'webp' },
  { in: 'décor2/décor5.webp', out: 'décor2/décor5.webp', maxW: 1600, quality: 75, format: 'webp' },
  { in: 'décor2/décor2.webp', out: 'décor2/décor2.webp', maxW: 1200, quality: 80, format: 'webp' },
  { in: 'journaux2.webp', out: 'journaux2.webp', maxW: 2400, quality: 78, format: 'webp' },
  { in: 'logo.webp', out: 'logo.webp', maxW: 800, quality: 85, format: 'webp' },
  { in: 'palm-leaf-left1.png', out: 'palm-leaf-left1.png', maxW: 800, quality: 80, format: 'png' },
  { in: 'palm-leaf-left2.png', out: 'palm-leaf-left2.png', maxW: 800, quality: 80, format: 'png' },
  { in: 'palm-leaf-left3.png', out: 'palm-leaf-left3.png', maxW: 800, quality: 80, format: 'png' },
];

const formatBytes = (n) => `${(n / 1024).toFixed(0)} KB`;

for (const t of targets) {
  const inPath = path.join(ROOT, t.in);
  const outPath = path.join(ROOT, t.out);
  try {
    const inStat = await fs.stat(inPath);
    const buf = await fs.readFile(inPath);
    let pipeline = sharp(buf).resize({ width: t.maxW, withoutEnlargement: true });
    if (t.format === 'webp') pipeline = pipeline.webp({ quality: t.quality, effort: 6 });
    else if (t.format === 'png') pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: t.quality });
    const out = await pipeline.toBuffer();
    if (out.length < inStat.size) {
      await fs.writeFile(outPath, out);
      console.log(`✓ ${t.in}: ${formatBytes(inStat.size)} → ${formatBytes(out.length)} (-${Math.round((1 - out.length / inStat.size) * 100)}%)`);
    } else {
      console.log(`= ${t.in}: already optimized (${formatBytes(inStat.size)})`);
    }
  } catch (err) {
    console.log(`✗ ${t.in}: ${err.message}`);
  }
}
