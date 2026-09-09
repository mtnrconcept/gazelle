#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const CSS_PATH = path.join(ROOT, 'src/app/globals.css');
const SRC_DIR = path.join(ROOT, 'src');

async function walk(dir, exts) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p, exts)));
    else if (exts.some((x) => p.endsWith(x))) out.push(p);
  }
  return out;
}

const css = await fs.readFile(CSS_PATH, 'utf8');
const classRe = /\.([a-zA-Z_][\w-]*)/g;
const allClasses = new Set();
let m;
while ((m = classRe.exec(css))) allClasses.add(m[1]);

const sourceFiles = await walk(SRC_DIR, ['.tsx', '.ts', '.jsx', '.js']);
const allSource = (await Promise.all(sourceFiles.map((f) => fs.readFile(f, 'utf8')))).join('\n');

const unused = [];
for (const cls of allClasses) {
  const re = new RegExp(`\\b${cls.replace(/[-]/g, '\\-')}\\b`);
  if (!re.test(allSource)) unused.push(cls);
}

console.log(`Total CSS classes: ${allClasses.size}`);
console.log(`Unused (not found in any src/**/*.{ts,tsx,js,jsx}): ${unused.length}`);
console.log('---');
unused.sort().forEach((c) => console.log(`  .${c}`));
