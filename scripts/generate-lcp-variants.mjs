#!/usr/bin/env node
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const SOURCE = 'public/images/5.webp';
const OUT_DIR = 'public/images/hero';
const WIDTHS = [360, 480, 640, 828, 1080, 1280, 1600, 1920];

await fs.mkdir(OUT_DIR, { recursive: true });
const buf = await fs.readFile(SOURCE);
const { width: srcW, height: srcH } = await sharp(buf).metadata();

console.log(`Source: ${SOURCE} (${srcW}x${srcH})`);

for (const w of WIDTHS) {
  if (w > srcW) continue;
  const avifPath = path.join(OUT_DIR, `lcp-${w}w.avif`);
  const webpPath = path.join(OUT_DIR, `lcp-${w}w.webp`);

  const avif = await sharp(buf).resize({ width: w }).avif({ quality: 50, effort: 9 }).toBuffer();
  const webp = await sharp(buf).resize({ width: w }).webp({ quality: 70, effort: 6 }).toBuffer();

  await fs.writeFile(avifPath, avif);
  await fs.writeFile(webpPath, webp);

  console.log(`  ${w}w: AVIF=${(avif.length / 1024).toFixed(1)}KB  WebP=${(webp.length / 1024).toFixed(1)}KB`);
}
