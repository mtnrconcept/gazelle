import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const fallbackPath = resolve(process.cwd(), 'src/app/accent-font-fallback.css');
const layoutPath = resolve(process.cwd(), 'src/app/layout.tsx');

test('decorative headings preserve accented French characters', () => {
  assert.equal(
    existsSync(fallbackPath),
    true,
    'accent-font-fallback.css must define a safe glyph fallback for the decorative African font',
  );

  if (!existsSync(fallbackPath)) return;

  const css = readFileSync(fallbackPath, 'utf8');
  const layout = readFileSync(layoutPath, 'utf8');

  assert.match(css, /font-family:\s*['"]AfricanSafe['"]/);
  assert.match(css, /unicode-range:\s*U\+0020-007E/i);
  assert.match(css, /--font-section-display:\s*['"]AfricanSafe['"],\s*var\(--font-display\),\s*serif/);
  assert.match(layout, /import ['"]\.\/accent-font-fallback\.css['"];?/);
});

test('site fonts are self-hosted so builds never depend on Google Fonts', () => {
  const layout = readFileSync(layoutPath, 'utf8');
  const fontsCss = readFileSync(resolve(process.cwd(), 'src/app/self-hosted-fonts.css'), 'utf8');

  assert.doesNotMatch(layout, /next\/font\/google/);
  assert.match(layout, /import ['"]\.\/self-hosted-fonts\.css['"];?/);
  for (const family of ['Cinzel', 'Cormorant Garamond']) {
    assert.match(fontsCss, new RegExp(`font-family:\\s*'${family}'`));
  }
  for (const match of fontsCss.matchAll(/url\('(\/fonts\/[^']+)'\)/g)) {
    assert.equal(existsSync(resolve(process.cwd(), 'public' + match[1])), true, `${match[1]} must exist`);
  }
});
