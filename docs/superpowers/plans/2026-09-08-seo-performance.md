# La Gazelle d'Or SEO & Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate La Gazelle d'Or on `https://lagazelledor.ch`, improve local search visibility and structured data, and reduce avoidable initial-load and interaction cost without redesigning the site.

**Architecture:** Centralize verified public business data and SEO URL construction in small server-safe modules, keep route metadata explicit, and preserve App Router server rendering by default. Performance changes target unnecessary global preload/hydration, React scroll rerenders, oversized video delivery, duplicate gallery semantics, a broken contact-video request, and confirmed dead client infrastructure while preserving current interactions.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Prisma 7/MySQL, `next/font`, `next/image`, Node test runner through `tsx`, GitHub Actions, Vercel.

**Spec:** `docs/superpowers/specs/2026-09-08-seo-performance-design.md`

## Global Constraints

- Canonical production origin is exactly `https://lagazelledor.ch`.
- Preserve the current visual identity and public feature set.
- Target LCP <= 2.5 s, INP < 200 ms and CLS < 0.1; treat these as targets, not guarantees.
- Public indexable routes are `/`, `/menu`, `/histoire`, `/evenements`, `/contact`.
- `/admin` must emit `noindex, nofollow`; do not block it in robots because crawlers must be able to read the directive.
- `/api/` must be excluded from crawling and omitted from the sitemap.
- Do not fabricate ratings, reviews, awards, social URLs, opening hours or business facts.
- Do not alter reservation behavior, database schema, Prisma models/migrations, Supabase, SMTP/JWT credential handling, or merge into `main`.
- Do not configure old-domain redirects in Next.js unless this deployment is proven to receive `lagazelledorgeneva.com` traffic.
- Use only the verified business facts already present in the repository: La Gazelle d'Or, Rue de Lyon 55, 1203 Genève, +41 22 340 33 50, `lagazelledorgeneva@gmail.com`, Monday-Saturday 11:30-14:30 and 18:30-22:30, Sunday closed, and the existing Facebook/Instagram/TikTok URLs from `Footer.tsx`.
- Because a local worktree cannot be created in this execution environment, all writes must target `codex/seo-performance-20260908` through the GitHub connector; never write to `main`.

---

### Task 1: Add a repeatable quality gate and write the SEO contract tests first

**Files:**
- Modify: `package.json`
- Create: `.github/workflows/quality.yml`
- Create: `tests/seo.test.ts`

**Interfaces:**
- Consumes: current Next.js/TypeScript project and `tsx` dev dependency already present.
- Produces: `npm test`, `npm run typecheck`, and a push/PR CI job that runs install, tests, lint, typecheck and build; tests define the required API for `src/lib/site.ts`, `src/lib/seo.ts`, `src/app/robots.ts`, and `src/app/sitemap.ts` before those files exist.

- [ ] **Step 1: Extend project scripts without changing runtime behavior**

Change the `scripts` object in `package.json` to include:

```json
{
  "dev": "next dev",
  "build": "prisma generate && next build",
  "start": "next start -p $PORT",
  "lint": "eslint",
  "typecheck": "tsc --noEmit",
  "test": "tsx --test tests/**/*.test.ts"
}
```

- [ ] **Step 2: Add CI capable of validating branch pushes before a PR exists**

Create `.github/workflows/quality.yml`:

```yaml
name: Quality

on:
  push:
    branches:
      - "codex/**"
  pull_request:

jobs:
  quality:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    env:
      DATABASE_URL: mysql://ci:ci@127.0.0.1:3306/gazelle_ci
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
```

The fake MySQL URL exists only to satisfy Prisma configuration parsing; the build must not connect to a database for these static/public SEO changes.

- [ ] **Step 3: Write failing SEO contract tests before production modules exist**

Create `tests/seo.test.ts` using `node:test` and `node:assert/strict`. The test file must import the intended public interfaces:

```ts
import test from 'node:test';
import assert from 'node:assert/strict';
import { siteConfig } from '../src/lib/site';
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildRestaurantJsonLd,
} from '../src/lib/seo';
import robots from '../src/app/robots';
import sitemap from '../src/app/sitemap';
```

Tests must assert, independently:

```ts
test('uses lagazelledor.ch as the only canonical origin', () => {
  assert.equal(siteConfig.url, 'https://lagazelledor.ch');
  assert.equal(absoluteUrl('/menu'), 'https://lagazelledor.ch/menu');
});

test('builds canonical and Open Graph URLs for a route', () => {
  const metadata = buildPageMetadata({
    title: 'Menu érythréen & éthiopien à Genève',
    description: 'Menu test',
    path: '/menu',
  });
  assert.equal(metadata.alternates?.canonical, 'https://lagazelledor.ch/menu');
  assert.equal(metadata.openGraph?.url, 'https://lagazelledor.ch/menu');
});

test('restaurant structured data contains only verified core business facts', () => {
  const data = buildRestaurantJsonLd();
  assert.equal(data['@type'], 'Restaurant');
  assert.equal(data.url, 'https://lagazelledor.ch');
  assert.equal(data.telephone, '+41223403350');
  assert.equal(data.address.streetAddress, 'Rue de Lyon 55');
  assert.equal(data.address.postalCode, '1203');
  assert.equal(data.address.addressLocality, 'Genève');
  assert.equal(data.menu, 'https://lagazelledor.ch/menu');
  assert.ok(!('aggregateRating' in data));
});

test('breadcrumb structured data resolves relative paths to canonical URLs', () => {
  const data = buildBreadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Menu', path: '/menu' },
  ]);
  assert.equal(data.itemListElement[1].item, 'https://lagazelledor.ch/menu');
});

test('robots allows pages, excludes APIs and advertises the canonical sitemap', () => {
  const value = robots();
  const rules = Array.isArray(value.rules) ? value.rules[0] : value.rules;
  assert.equal(rules.userAgent, '*');
  assert.equal(rules.allow, '/');
  assert.deepEqual(rules.disallow, ['/api/']);
  assert.equal(value.sitemap, 'https://lagazelledor.ch/sitemap.xml');
  assert.equal(value.host, 'https://lagazelledor.ch');
});

test('sitemap contains every public canonical route and no private route', () => {
  const urls = sitemap().map((entry) => entry.url);
  assert.deepEqual(urls, [
    'https://lagazelledor.ch',
    'https://lagazelledor.ch/menu',
    'https://lagazelledor.ch/histoire',
    'https://lagazelledor.ch/evenements',
    'https://lagazelledor.ch/contact',
  ]);
  assert.ok(urls.every((url) => !url.includes('/admin') && !url.includes('/api')));
});
```

- [ ] **Step 4: Push the failing tests and verify RED through GitHub Actions**

Expected result: `npm test` fails because `src/lib/site.ts`, `src/lib/seo.ts` and/or `src/app/robots.ts` do not exist yet. Confirm that the failure is specifically the missing intended production interface, not YAML syntax or dependency installation.

- [ ] **Step 5: Commit the RED test harness**

Commit message:

```text
test: define SEO performance contracts
```

---

### Task 2: Centralize public site facts and implement canonical SEO helpers

**Files:**
- Create: `src/lib/site.ts`
- Create: `src/lib/seo.ts`
- Modify: `tests/seo.test.ts` only if TypeScript inference requires explicit safe casts without weakening assertions

**Interfaces:**
- Consumes: tests from Task 1.
- Produces: `siteConfig`, `absoluteUrl(path)`, `buildPageMetadata(input)`, `buildRestaurantJsonLd()`, and `buildBreadcrumbJsonLd(items)`.

- [ ] **Step 1: Implement the smallest `siteConfig` that satisfies verified facts**

Create `src/lib/site.ts` with a readonly object containing:

```ts
export const siteConfig = {
  name: "La Gazelle d'Or",
  url: 'https://lagazelledor.ch',
  locale: 'fr_CH',
  language: 'fr-CH',
  email: 'lagazelledorgeneva@gmail.com',
  telephone: '+41223403350',
  telephoneDisplay: '+41 22 340 33 50',
  address: {
    streetAddress: 'Rue de Lyon 55',
    postalCode: '1203',
    addressLocality: 'Genève',
    addressCountry: 'CH',
  },
  cuisines: ['Érythréenne', 'Éthiopienne', 'Africaine'],
  sameAs: [
    'https://www.facebook.com/lagazelledorgeneva',
    'https://www.instagram.com/lagazelledorgeneva',
    'https://www.tiktok.com/@la.gazelle.dor.ge',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:30',
      closes: '14:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '18:30',
      closes: '22:30',
    },
  ],
} as const;
```

Do not encode Sunday as an opening interval.

- [ ] **Step 2: Implement canonical URL and page metadata helpers**

`src/lib/seo.ts` must import `Metadata` as a type and export:

```ts
export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString().replace(/\/$/, path === '/' ? '' : '/');
}
```

Implement `buildPageMetadata({ title, description, path })` so it returns `Metadata` with:

- `title`
- `description`
- `alternates.canonical = absoluteUrl(path)`
- `openGraph.title`
- `openGraph.description`
- `openGraph.url = absoluteUrl(path)`
- `openGraph.siteName = siteConfig.name`
- `openGraph.locale = siteConfig.locale`
- `openGraph.type = 'website'`
- default Open Graph image `/images/_assets/logo-hero-B4ENhAYs.png`
- equivalent Twitter summary-large-image fields

Keep the function pure and server-safe.

- [ ] **Step 3: Implement Restaurant JSON-LD without ratings**

`buildRestaurantJsonLd()` must return a serializable object with:

```ts
{
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${siteConfig.url}/#restaurant`,
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/images/_assets/logo-hero-B4ENhAYs.png`,
  email: siteConfig.email,
  telephone: siteConfig.telephone,
  address: {
    '@type': 'PostalAddress',
    ...siteConfig.address,
  },
  servesCuisine: [...siteConfig.cuisines],
  menu: absoluteUrl('/menu'),
  acceptsReservations: true,
  sameAs: [...siteConfig.sameAs],
  openingHoursSpecification: [...siteConfig.openingHoursSpecification],
}
```

Do not add `aggregateRating`, `review`, coordinates or price range unless a verified eligible source is later added.

- [ ] **Step 4: Implement breadcrumb JSON-LD**

Export:

```ts
type BreadcrumbInput = { name: string; path: string };
export function buildBreadcrumbJsonLd(items: BreadcrumbInput[]) { /* ... */ }
```

The result must use `@type: 'BreadcrumbList'` and 1-based `position` values, resolving every item through `absoluteUrl`.

- [ ] **Step 5: Verify GREEN**

Push the implementation and inspect the branch Quality workflow. Expected: SEO helper tests that do not depend on robots/sitemap pass; robots/sitemap tests remain RED until Task 3.

- [ ] **Step 6: Commit**

```text
feat: centralize canonical SEO data
```

---

### Task 3: Fix robots, sitemap, admin indexing and route metadata

**Files:**
- Delete: `src/app/robot.ts`
- Create: `src/app/robots.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/menu/page.tsx`
- Modify: `src/app/histoire/page.tsx`
- Modify: `src/app/evenements/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/admin/layout.tsx`

**Interfaces:**
- Consumes: `siteConfig`, `absoluteUrl`, `buildPageMetadata`, `buildRestaurantJsonLd`, `buildBreadcrumbJsonLd`.
- Produces: correct `/robots.txt`, complete `/sitemap.xml`, canonical/social metadata per public route, `noindex` admin metadata, homepage Restaurant JSON-LD and subpage breadcrumbs.

- [ ] **Step 1: Replace the incorrectly named robots metadata route**

Delete `src/app/robot.ts` and create `src/app/robots.ts`:

```ts
import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
```

Do not disallow `/admin/`; admin receives noindex metadata below.

- [ ] **Step 2: Make sitemap canonical, complete and honest about freshness**

Replace `sitemap.ts` with a fixed public route list based on `siteConfig.url`. Omit synthetic `lastModified` values. Keep sensible `changeFrequency`/`priority` values if desired, but the URL order must exactly match the test contract: `/`, `/menu`, `/histoire`, `/evenements`, `/contact`.

- [ ] **Step 3: Make root metadata canonical and remove the global homepage-image preload**

In `src/app/layout.tsx`:

- set `metadataBase: new URL(siteConfig.url)`
- keep a concise default title/template that does not duplicate the restaurant name when page helpers are used
- set default description and site-level Open Graph/Twitter values to `lagazelledor.ch`
- retain icons
- set `<html lang={siteConfig.language}>`
- remove the global `<link rel="preload" as="image" ...homepage hero...>` block
- retain the custom font preload only if `african.ttf` is confirmed referenced; otherwise remove the unnecessary preload but not the font file itself

- [ ] **Step 4: Replace route metadata with `buildPageMetadata`**

Use these route intentions and paths:

```ts
// /
buildPageMetadata({
  title: "Restaurant érythréen & éthiopien à Genève | La Gazelle d'Or",
  description: "Découvrez La Gazelle d'Or à Genève : cuisine érythréenne et éthiopienne authentique, injera maison, plats végétariens et vegan, réservation et vente à emporter.",
  path: '/',
});

// /menu
buildPageMetadata({
  title: "Menu érythréen & éthiopien à Genève | La Gazelle d'Or",
  description: "Découvrez notre carte à Genève : injera maison, spécialités érythréennes et éthiopiennes, plats végétariens et vegan, menus dégustation et street food africaine.",
  path: '/menu',
});

// /histoire
buildPageMetadata({
  title: "Notre histoire et la cuisine de la Corne de l'Afrique | La Gazelle d'Or",
  description: "Découvrez l'histoire de La Gazelle d'Or aux Grottes à Genève, ses traditions érythréennes et éthiopiennes, l'injera maison et une expérience africaine authentique.",
  path: '/histoire',
});

// /evenements
buildPageMetadata({
  title: "Événements, privatisation & traiteur africain à Genève | La Gazelle d'Or",
  description: "Privatisez La Gazelle d'Or ou demandez notre service traiteur à Genève pour anniversaires, mariages, entreprises et événements aux saveurs érythréennes et éthiopiennes.",
  path: '/evenements',
});

// /contact
buildPageMetadata({
  title: "Réservation & contact | La Gazelle d'Or Genève",
  description: "Réservez votre table à La Gazelle d'Or, Rue de Lyon 55 à Genève. Retrouvez nos horaires, téléphone, adresse et formulaire de réservation en ligne.",
  path: '/contact',
});
```

- [ ] **Step 5: Add admin noindex metadata**

Type metadata in `src/app/admin/layout.tsx` and add:

```ts
robots: {
  index: false,
  follow: false,
  nocache: true,
}
```

- [ ] **Step 6: Render Restaurant JSON-LD on the homepage**

In the server `src/app/page.tsx`, build once:

```ts
const restaurantJsonLd = buildRestaurantJsonLd();
```

Render a script before the visible page content:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(restaurantJsonLd).replace(/</g, '\\u003c'),
  }}
/>
```

- [ ] **Step 7: Add breadcrumb JSON-LD to the four public subpages**

For `/menu`, `/histoire`, `/evenements` and `/contact`, serialize a breadcrumb list with `Accueil` first and the route page second. Use the same `<script type="application/ld+json">` escaping strategy.

- [ ] **Step 8: Verify GREEN for the complete SEO contract**

Push and verify that `npm test` passes in GitHub Actions. Also confirm lint/typecheck/build status; if a later non-test check fails, fix that exact failure before continuing.

- [ ] **Step 9: Commit**

```text
feat: consolidate canonical SEO metadata
```

---

### Task 4: Remove avoidable global work and stop React rerenders on every hero scroll

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Hero.tsx`
- Delete: `src/components/BodySnapManager.tsx` if usage search still shows only root layout
- Modify: `tests/seo.test.ts` only for a static regression assertion if useful

**Interfaces:**
- Consumes: existing hero visual behavior and CSS custom property `--scroll-y` usage.
- Produces: the same visual hero, without `setScrollY(window.scrollY)` and without dead `BodySnapManager` hydration.

- [ ] **Step 1: Confirm `BodySnapManager` has no consumer other than root layout**

Use repository search for `BodySnapManager` and `snap-enabled`. If no other runtime code depends on the component/class, remove the import/render from `layout.tsx` and delete the component. If another dependency is found, keep it and document the dependency instead of guessing.

- [ ] **Step 2: Add a regression test for the hero source if a pure helper is introduced**

If the rAF logic is extracted to a pure helper, test the helper first. If it remains an effect-only DOM optimization, rely on lint/typecheck/build plus preview interaction testing because adding a DOM test framework is out of scope.

- [ ] **Step 3: Replace hero scroll state with a ref + requestAnimationFrame CSS-variable update**

In `Hero.tsx`:

- remove `const [scrollY, setScrollY] = useState(0)`
- add a section ref
- in one `useEffect`, listen passively to scroll and batch updates with `requestAnimationFrame`
- set `--scroll-y` directly on the section element in pixels
- cancel a pending animation frame and remove the listener on cleanup
- do not call React state setters from the scroll handler

Keep `current` slide state and its six-second timer unchanged.

- [ ] **Step 4: Stop calculating leaf transforms in React**

Remove inline transforms based on `scrollY`. Keep only the leaf background inline style and let the existing CSS consume `--scroll-y`; if the current CSS does not, add the smallest targeted CSS rule only after confirming the selector in `globals.css`.

- [ ] **Step 5: Verify**

Push and require Quality workflow success. On Vercel preview, confirm desktop/mobile hero slideshow and parallax remain visually acceptable and navigation is unaffected.

- [ ] **Step 6: Commit**

```text
perf: reduce global and hero client work
```

---

### Task 5: Optimize hero video delivery and remove the broken contact video request

**Files:**
- Modify: `src/app/menu/MenuPageClient.tsx`
- Modify: `src/app/histoire/page.tsx`
- Modify: `src/app/contact/ContactPageClient.tsx`
- Modify or Delete: `src/components/PingPongVideo.tsx` depending on final usage search

**Interfaces:**
- Consumes: existing `/images/_assets/video_hero-720p.mp4`, 1080p WebM/MP4 and poster WebP; existing still imagery for contact hero.
- Produces: poster-first reduced-motion-aware media on menu/history, no request for the removed `/images/Caféinterior.mp4` asset, and no orphaned ping-pong frame-capture component if unused.

- [ ] **Step 1: Confirm contact video asset absence and `PingPongVideo` usage**

Search the repository for `Caféinterior.mp4`, `Caf%C3%A9interior.mp4` and `PingPongVideo`. If the video is absent and the component is used only by contact, remove that request path and then delete `PingPongVideo.tsx` after contact no longer imports it.

- [ ] **Step 2: Replace the contact hero video with an existing lightweight visual**

Use an existing image already in the repository, preferably the dedicated hero/poster imagery, through `next/image` or a CSS background already supported by the contact hero structure. Do not introduce a new large asset solely for this fix. Preserve the overlay and visible text.

- [ ] **Step 3: Make menu/history video poster-first and mobile-aware**

For each native `<video>`:

- keep `muted`, `loop`, `playsInline`, poster and visual classes
- use `preload="none"` or `preload="metadata"` based on preview behavior, preferring `none` if the poster covers initial paint correctly
- put the 720p MP4 source behind `media="(max-width: 767px)"`
- keep 1080p WebM and MP4 sources for larger screens
- avoid marking the video itself high priority

- [ ] **Step 4: Respect reduced motion without adding a new dependency**

If CSS already has reduced-motion media handling for video, reuse it. Otherwise add a tiny client wrapper only if required; do not convert the entire server history page into a client component. Prefer native/CSS behavior or a small reusable client `ReducedMotionVideo` component if both routes need it.

- [ ] **Step 5: Verify**

Quality workflow must remain green. On preview, inspect menu/history on narrow and wide viewports and confirm the contact page no longer requests a missing MP4.

- [ ] **Step 6: Commit**

```text
perf: optimize decorative video loading
```

---

### Task 6: Simplify gallery semantics and responsive client state without changing UX

**Files:**
- Modify: `src/components/GallerySection.tsx`
- Modify: `src/app/globals.css` only if required for a single-heading responsive treatment

**Interfaces:**
- Consumes: current ten-image gallery, arrows, touch swipe and lightbox.
- Produces: one semantic gallery heading and less viewport-derived React state while preserving carousel/lightbox interactions.

- [ ] **Step 1: Fix semantic heading duplication first**

Replace the desktop and mobile duplicate `<h2>` elements with one `<h2 className="gold-sectionTitle gallery-title">`. Use spans inside the same heading only if a mobile line break is required. Do not render the same heading text twice and hide one with CSS.

- [ ] **Step 2: Remove JS-only viewport sizing where CSS can own it**

If the current track math requires `slidesPerView`, keep only the minimum state required for carousel math. Prefer deriving responsive slide width through CSS custom properties/media queries rather than a `resize` listener that calls `setSlidesPerView` on every breakpoint transition.

Do not rewrite the entire gallery or add a carousel package.

- [ ] **Step 3: Avoid unnecessary duplicate image work**

Keep infinite-loop clones only if they are required for the exact interaction. Ensure cloned images remain lazy and are not accidentally promoted in priority. Do not duplicate semantic captions/headings for cloned slides.

- [ ] **Step 4: Verify interaction regressions manually on preview**

Check one-slide mobile, two-ish tablet layout, desktop layout, arrows, swipe, lightbox open/close, keyboard Escape and previous/next controls.

- [ ] **Step 5: Commit**

```text
perf: simplify gallery rendering semantics
```

---

### Task 7: Perform evidence-driven CSS/resource cleanup only

**Files:**
- Modify: `src/app/globals.css` only for selectors conclusively shown unused or for small rules required by Tasks 4/6
- Modify: `src/app/layout.tsx` if `african.ttf` preload is confirmed unused
- No asset deletion unless repository reference search proves the file is orphaned

**Interfaces:**
- Consumes: existing `scripts/audit-css.mjs`, repository search and preview rendering.
- Produces: smaller or at least less wasteful globally loaded resources without visual redesign.

- [ ] **Step 1: Search for `african.ttf` / African font CSS usage**

If no CSS `@font-face` or component actually consumes `/african.ttf`, remove its preload from root layout. Do not delete the font file in this PR unless orphan status is certain.

- [ ] **Step 2: Review existing CSS audit output/tooling**

Use `scripts/audit-css.mjs` semantics and repository search to identify only selectors with no runtime/component references. Because local execution is unavailable, do not mass-delete based on heuristics alone.

- [ ] **Step 3: Make only confirmed safe CSS changes**

Focus on selectors made dead by this PR (for example removed duplicate gallery-heading classes or removed BodySnapManager state) and exact rules needed for CSS-variable hero transform/reduced-motion behavior.

- [ ] **Step 4: Verify**

Quality workflow and Vercel preview must remain green/READY. Compare public pages visually at desktop, tablet and mobile sizes.

- [ ] **Step 5: Commit**

```text
perf: remove confirmed global resource waste
```

---

### Task 8: Final verification, review and pull request

**Files:**
- No new product files expected; only fixes found by verification/review.

**Interfaces:**
- Consumes: all prior tasks.
- Produces: reviewed PR from `codex/seo-performance-20260908` to `main`, with no merge.

- [ ] **Step 1: Verify branch diff is scoped**

Compare `main...codex/seo-performance-20260908`. The diff must contain only the design/plan docs, quality harness, SEO metadata/structured data, and performance files justified above. It must not contain SMTP/JWT secret changes, database migrations or unrelated redesign work.

- [ ] **Step 2: Require automated validation**

Confirm the latest branch commit has passing results for:

```text
npm test
npm run lint
npm run typecheck
npm run build
```

Use GitHub Actions logs for proof. Also require the corresponding Vercel branch deployment to reach READY.

- [ ] **Step 3: Inspect generated/public SEO endpoints on preview**

Verify:

- `/robots.txt` exists and references `https://lagazelledor.ch/sitemap.xml`
- `/sitemap.xml` contains exactly the five public canonical routes
- homepage and each public route produce their own canonical URL
- admin pages emit noindex
- homepage HTML contains one Restaurant JSON-LD object without aggregateRating
- subpages contain BreadcrumbList JSON-LD
- no page emits `lagazelledorgeneva.com` from the SEO code changed by this PR

- [ ] **Step 4: Inspect performance-sensitive behavior on preview**

Verify:

- non-home routes no longer receive homepage LCP image preload
- hero scrolling no longer creates React-state updates per scroll event
- menu/history poster and video remain functional
- contact hero produces no missing `Caféinterior.mp4` request
- gallery still works on desktop/tablet/mobile
- no new runtime errors appear in Vercel logs

- [ ] **Step 5: Perform code review before claiming completion**

Read the final diff as a reviewer, checking metadata correctness, URL escaping, JSON-LD serialization, client/server boundaries, accessibility and accidental visual regressions. Fix any issue and re-run checks before opening the PR.

- [ ] **Step 6: Open the pull request without merging**

PR title:

```text
Improve SEO, local search signals and web performance
```

PR body must summarize:

- canonical migration to `lagazelledor.ch`
- robots/sitemap/admin noindex fixes
- Restaurant + breadcrumb structured data
- unique route metadata
- reduced global/hero/video/gallery work
- contact missing-video fix
- validation evidence and Vercel preview status
- external follow-ups: old-domain 301/DNS, Google Business Profile/directories/Search Console, separate secret rotation

- [ ] **Step 7: Final report**

Report the PR number/link, latest commit SHA, all automated check states, preview state, and the complete list of changed files. Explicitly state that `main` was not merged.
