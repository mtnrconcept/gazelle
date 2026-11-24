# La Gazelle d'Or — SEO & Performance Design

Date: 2026-09-08
Repository: `mtnrconcept/gazelle`
Branch: `codex/seo-performance-20260908`
Canonical production domain: `https://lagazelledor.ch`

## 1. Objective

Improve organic visibility, local SEO and web performance for La Gazelle d'Or while preserving the current visual identity and public feature set.

The implementation must consolidate all SEO signals on `https://lagazelledor.ch`, reduce unnecessary client-side work, improve crawlability and metadata quality, and keep the existing restaurant, menu, reservation, events and gallery experience intact.

Target web-vitals thresholds are:

- LCP <= 2.5 s
- INP < 200 ms
- CLS < 0.1

These are implementation targets, not guarantees of field performance because final field values depend on real users, hosting, devices and network conditions.

## 2. Current Architecture

The project is a Next.js 16 App Router application using React 19, TypeScript and Prisma 7 with a MySQL datasource.

Public routes currently identified:

- `/`
- `/menu`
- `/histoire`
- `/evenements`
- `/contact`

Private/administrative routes live under `/admin`. API routes live under `/api`.

The application is deployed as a Vercel project named `gazelle`, but the Vercel project currently exposes only `vercel.app` domains. `lagazelledor.ch` is therefore not confirmed as being attached directly to this Vercel project. The public site nevertheless serves content matching the repository. Domain/DNS ownership and redirects must not be guessed from the repository alone.

The repository does not contain an `AGENTS.md` file or a `.github/workflows` directory. There are no Prisma migrations committed under `prisma/migrations`; the Prisma directory currently contains the schema and seed only.

Supabase is not part of the detected application architecture. The repository uses Prisma with a MySQL datasource instead.

## 3. Audit Findings

### 3.1 Canonical-domain inconsistency

The application metadata currently uses `https://lagazelledorgeneva.com` as `metadataBase`, Open Graph URL, sitemap host and robots host, while the requested production domain is `https://lagazelledor.ch`.

This fragments canonical signals and risks duplicate-domain indexing.

### 3.2 Robots route is incorrectly named

The repository contains `src/app/robot.ts`. Next.js App Router expects `robots.ts` for the metadata-file convention that generates `/robots.txt`.

The fix is to replace `robot.ts` with `robots.ts`, expose the canonical sitemap and keep API endpoints out of crawler discovery. Administrative pages will rely on explicit page-level `noindex` metadata rather than a robots block so crawlers can actually observe the directive.

### 3.3 Sitemap is incomplete

The sitemap currently contains only `/` and `/menu` and points to the wrong domain.

It must include all canonical indexable public routes:

- `/`
- `/menu`
- `/histoire`
- `/evenements`
- `/contact`

Administrative and API routes must remain absent.

### 3.4 Metadata duplication and weak page differentiation

The global title template appends `La Gazelle d'Or Genève`, while several page titles already contain the business name. This produces repetitive titles such as the history and events titles observed on the live site.

Each public page should have a distinct search intent:

- Home: restaurant érythréen / éthiopien à Genève
- Menu: menu, injera, dishes and dietary options
- Histoire: restaurant story, Eritrean/Ethiopian heritage and authentic experience
- Evenements: private events, African events and catering
- Contact: reservation, address, opening hours and contact

Canonical URLs and social metadata should be page-specific.

### 3.5 Structured data is missing

No dedicated JSON-LD implementation for the restaurant was identified.

The site should expose a central `Restaurant` / `LocalBusiness` entity including only verified facts already present in the site/application:

- name
- canonical URL
- address
- telephone
- cuisine types
- menu URL
- reservation/contact URL
- opening hours
- price range if kept generic and accurate
- sameAs social profiles only when exact URLs are already known in code/content

Breadcrumb structured data should be added on public subpages where it accurately represents navigation.

Do not fabricate aggregate rating/review structured data from static marketing testimonials. Ratings may only be marked up if their source and eligibility satisfy Google structured-data rules.

### 3.6 Global hero preload is over-scoped

`src/app/layout.tsx` globally preloads the homepage LCP hero image. This means the same high-priority resource can be requested on routes that do not display the homepage hero.

The homepage-only LCP preload must move to homepage scope or be handled through the hero image itself so secondary pages do not compete for bandwidth with an unused asset.

### 3.7 Excessive global client JavaScript

The root layout globally mounts client components such as:

- `Header`
- `ScrollReveal`
- `BodySnapManager`
- `PromoPopup`

`BodySnapManager` currently only removes a class on route change and appears to be dead infrastructure unless another dependency is found during implementation.

Global client code should be reduced without altering required behavior.

### 3.8 Hero scroll work causes frequent React updates

The homepage hero stores `window.scrollY` in React state on every scroll event. This triggers repeated component renders during scrolling.

The parallax behavior should be moved to a lower-cost mechanism, preferably CSS where possible or a requestAnimationFrame-driven DOM/CSS-variable update that does not rerender the React tree for every scroll event.

### 3.9 Gallery has unnecessary client complexity

The gallery implements an infinite carousel by cloning slides and tracks viewport width, transitions, touch gestures and a lightbox in one large client component.

This component should be simplified only to the degree that preserves the current UX. Candidate improvements include:

- CSS responsive layout instead of JS viewport-width state
- fewer duplicated image nodes
- isolating the lightbox from the base gallery
- avoiding duplicate semantic headings

The current desktop/mobile heading technique renders two `<h2>` elements with the same text. The visual variation should be implemented with one semantic heading.

### 3.10 Secondary-page video cost

`/menu` and `/histoire` both use large 1080p WebM/MP4 hero video sources. The repository already contains a smaller 720p MP4 asset.

Mobile and reduced-data experiences should avoid unnecessarily downloading 1080p video. Poster-first behavior and appropriate source/media strategies should be used while preserving the hero experience.

### 3.11 CSS debt

`src/app/globals.css` is approximately 129 KB and is loaded globally. A previous cleanup removed some dead selectors, but the file remains large.

The implementation should remove confirmed unused selectors and, where low-risk, separate route-specific styles so pages do not receive unrelated CSS. This must be evidence-driven: no broad visual rewrite is part of this task.

### 3.12 Image and favicon opportunities

The repository already contains substantial image optimization work and responsive AVIF/WebP hero variants. Those gains must be preserved.

Remaining very large PNG/JPG assets should be changed only when the rendered route actually benefits and image quality can be maintained. The favicon is unusually large and should be reviewed for a smaller generated replacement if the source assets allow it without visual degradation.

### 3.13 Security findings discovered during audit

A plaintext SMTP credential is committed in `src/lib/mail.ts`, and the admin JWT logic has a fallback secret.

These are critical security issues, but they are intentionally excluded from this SEO/performance PR to keep the change set reviewable and avoid mixing credential rotation with search/performance changes.

A separate security remediation is required. The exposed SMTP credential should be rotated outside this PR because removing it from the current branch does not invalidate a credential already present in repository history.

## 4. Proposed Architecture

### 4.1 Central SEO/site configuration

Introduce a small server-safe configuration module, for example `src/lib/site.ts`, containing stable public business information used by metadata and structured data:

- canonical origin: `https://lagazelledor.ch`
- restaurant name
- postal address
- telephone
- public email
- opening hours model
- cuisine labels

This prevents domain/address/hours drift across layout, sitemap, robots and JSON-LD.

No private credentials belong in this module.

### 4.2 Root metadata

`src/app/layout.tsx` will provide site-wide defaults only:

- canonical metadata base set to `lagazelledor.ch`
- concise title template
- default description
- Open Graph site identity
- Twitter defaults
- icons
- `fr-CH` language/locale context where supported

Page-specific titles, descriptions, canonicals and social metadata will live on each indexable public route.

The homepage hero preload will be removed from the root layout.

### 4.3 Page metadata

Each public page will define:

- unique title
- unique meta description
- canonical URL
- route-specific Open Graph URL/title/description

Where useful, metadata helpers may be added to avoid repeated boilerplate, but no abstraction should make metadata difficult to inspect.

### 4.4 Robots and indexing policy

Rename `src/app/robot.ts` to `src/app/robots.ts`.

Robots policy:

- allow public pages
- disallow `/api/`
- reference `https://lagazelledor.ch/sitemap.xml`
- use `https://lagazelledor.ch` as host where applicable

Administrative pages must emit `noindex, nofollow` through admin layout metadata and remain crawlable so compliant crawlers can observe that directive. `robots.txt` is not an access-control mechanism and must not be treated as one.

### 4.5 Sitemap

`src/app/sitemap.ts` will use the canonical origin and return all public canonical pages.

`lastModified` must not be generated as `new Date()` on every request solely to simulate freshness. Stable values should be used when known; otherwise omit misleading last-modified data rather than claiming every page changed on every crawl.

### 4.6 Restaurant JSON-LD

Add a server-rendered JSON-LD component or helper that safely serializes a `Restaurant` object into the homepage.

The entity should include verified business facts and links to menu/contact routes. It should not include invented review data.

Subpages can add `BreadcrumbList` JSON-LD through a small reusable server component/helper.

### 4.7 Performance boundaries

Preserve server components by default. Client boundaries should exist only where interaction requires them.

Planned reductions:

- remove `BodySnapManager` if final dependency search confirms it is unused
- move home-only behavior out of root layout
- avoid React state updates for every scroll event in `Hero`
- keep menu filtering client-side but avoid unrelated hydration
- simplify gallery responsive behavior and semantic duplication
- delay or isolate promotional popup logic so it does not compete with initial interaction/rendering

### 4.8 Images and video

Keep the existing responsive homepage AVIF/WebP LCP variants.

For video heroes:

- poster should paint first
- use 720p for mobile where feasible
- avoid downloading both formats unnecessarily
- preserve autoplay/muted/playsInline behavior where browser policy allows it
- respect reduced-motion; users requesting reduced motion should receive a static poster rather than an autoplay loop

No media conversion is required unless repository assets prove insufficient.

### 4.9 CSS

First run the existing CSS audit tooling and static search to identify selectors that are actually unused.

Only confirmed dead CSS will be removed automatically. Route-specific extraction should be limited to clearly isolated blocks where it reduces global CSS without creating cascade regressions.

## 5. Expected Files

Primary files expected to change:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/robot.ts` (delete/rename)
- `src/app/robots.ts` (new)
- `src/app/sitemap.ts`
- `src/app/menu/page.tsx`
- `src/app/histoire/page.tsx`
- `src/app/evenements/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/admin/layout.tsx`
- `src/components/Hero.tsx`
- `src/components/GallerySection.tsx`
- `src/components/ScrollReveal.tsx` if evidence supports a safe optimization
- `src/components/PromoPopup.tsx` if initial-load isolation is beneficial
- `src/components/BodySnapManager.tsx` if confirmed unused (delete)
- `src/app/globals.css` for targeted performance/semantic cleanup only
- `src/lib/site.ts` (new central public site config)
- one focused SEO/structured-data helper/component if required by the final implementation
- focused tests/scripts if the repository lacks coverage for metadata generation

`next.config.ts` will change only if implementation evidence shows a meaningful header/cache/redirect improvement. The old-domain redirect will not be hard-coded there unless this Next.js deployment is confirmed to receive requests for the old domain.

## 6. Explicit Non-Goals

This PR will not:

- redesign the site
- change restaurant business logic
- change reservation behavior
- alter the database schema
- add Prisma migrations
- modify Supabase
- rotate SMTP/JWT secrets
- fabricate SEO landing pages with near-duplicate content
- fabricate reviews, ratings, awards or business facts
- merge into `main`

## 7. Testing Strategy

### 7.1 Static checks

The desired validation commands are:

- `npm ci`
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

The current execution environment cannot clone the repository from GitHub because outbound DNS resolution to GitHub is unavailable. If that remains true during implementation, equivalent branch validation must be performed through connected CI/build infrastructure. Vercel preview/build validation will cover the production build path; if no existing CI can execute lint/typecheck independently, a branch-scoped verification mechanism may be added only if necessary and must be removed or intentionally documented before the PR is finalized.

The repository has no dedicated test script at baseline, so focused automated tests may be added only where they provide value for pure SEO helpers/configuration.

### 7.2 Build-output checks

Validate that the Next.js build exposes:

- `/robots.txt`
- `/sitemap.xml`
- all public routes
- no unexpected dynamic rendering introduced by metadata helpers

### 7.3 HTML/SEO checks

For homepage and each public route verify rendered HTML includes:

- exactly one useful `<h1>`
- a unique `<title>`
- meta description
- canonical pointing to `https://lagazelledor.ch/...`
- correct Open Graph URL
- no duplicate gallery `<h2>` semantics

Validate JSON-LD syntax and expected schema types.

Admin pages must return noindex metadata.

### 7.4 Performance checks

Compare before/after where tooling permits:

- first-load JS by route
- global CSS footprint
- number/priority of initial image requests
- hero resource loading on non-home routes
- mobile video resources
- Lighthouse/PageSpeed lab metrics on a preview deployment

Field Core Web Vitals require production traffic and cannot be guaranteed by local/preview Lighthouse alone.

### 7.5 Regression checks

Manually verify on desktop, tablet and mobile:

- navigation
- mobile menu
- homepage slideshow/parallax
- menu tabs/filtering
- gallery navigation/swipe/lightbox
- history video/poster
- events page
- contact/reservation UI
- promo popup

## 8. Rollout

Implementation will occur only on `codex/seo-performance-20260908`.

Sequence:

1. central site/SEO config
2. domain/canonical metadata
3. robots + admin noindex
4. sitemap
5. structured data
6. semantic heading cleanup
7. global preload/client-boundary cleanup
8. hero scroll optimization
9. video/gallery/CSS performance improvements
10. lint/typecheck/build and focused tests
11. preview deployment / CI verification
12. PR to `main`

No merge into `main` is part of this task unless explicitly requested later.

## 9. Rollback

The implementation will be kept in a dedicated branch and PR. If a regression appears, the PR can be closed or individual commits reverted without database rollback because no schema/data migration is planned.

Performance changes should be committed in logically separated groups so any visual or interaction regression can be reverted independently from the SEO fixes.

## 10. External Follow-ups

These items are important but cannot be safely completed from repository code alone until the owning infrastructure is confirmed:

- configure permanent redirects from `lagazelledorgeneva.com` to matching `lagazelledor.ch` URLs
- ensure `www` and apex versions resolve to one canonical host
- update Google Business Profile and third-party directories that still link to the old domain
- submit/refresh the new sitemap and domain migration signals in Google Search Console
- rotate the exposed SMTP credential and remove hard-coded credentials in a separate security PR

The implementation must not guess DNS, registrar or reverse-proxy configuration.
