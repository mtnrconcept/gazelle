import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGE_ROOT = path.join(process.cwd(), 'public', 'images');
const INPUT_EXTS = new Set(['.jpg', '.jpeg', '.png']);

async function walk(dir, acc = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, acc);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (INPUT_EXTS.has(ext)) acc.push(fullPath);
    }
  }
  return acc;
}

async function convertOne(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const outPath = filePath.replace(ext, '.webp');

  const image = sharp(filePath);
  const meta = await image.metadata();

  let options = { quality: 80 };
  if (meta.hasAlpha) {
    options = { lossless: true };
  } else if (ext === '.png') {
    options = { quality: 90 };
  }

  await image.webp(options).toFile(outPath);
  return { in: filePath, out: outPath };
}

const files = await walk(IMAGE_ROOT);
if (files.length === 0) {
  console.log('No images found to convert.');
  process.exit(0);
}

const results = [];
for (const file of files) {
  results.push(await convertOne(file));
}

const bytes = await Promise.all(
  results.map(async ({ out }) => (await fs.stat(out)).size)
);
const total = bytes.reduce((sum, value) => sum + value, 0);

console.log(`Converted ${results.length} images to WebP.`);
console.log(`Total WebP size: ${(total / (1024 * 1024)).toFixed(2)} MB.`);
