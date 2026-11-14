# Arjaya Langgeng Medika Monorepo

Monorepo that houses the Astro marketing site (`apps/web`) and Sanity Studio (`apps/studio`) for Arjaya Langgeng Medika.

## Repository Structure
```
.
├── package.json              # npm workspaces + dev/build scripts
├── design-system             # Shared design tokens + guide (used by both apps)
│   ├── tokens.json
│   └── README.md
├── apps
│   ├── web                   # Astro + Tailwind company profile site
│   │   ├── src
│   │   │   ├── components    # Hero, CTA, product cards, etc.
│   │   │   ├── lib           # content.ts (Sanity with local fallback), sanity.ts
│   │   │   ├── data          # Local fallback content + seed source
│   │   │   ├── layouts       # Base layout w/ disclaimer + header/footer
│   │   │   └── pages         # Home, Products, Events, About, Contact
│   │   └── public            # Public imagery, logos, and product brochures
│   └── studio                # Sanity Studio v3 (admin dashboard)
│       ├── schemas           # siteSettings, homePage, productCategory, product, event, license
│       ├── src               # Desk structure, theme, logo
│       └── scripts           # generate-seed.mjs
```

## Workspace Commands
| Command | Description |
| --- | --- |
| `npm install` | Install root + workspace dependencies. |
| `npm run dev:web` | Start Astro dev server (apps/web). |
| `npm run dev:studio` | Start Sanity Studio locally (apps/studio). |
| `npm run dev` | Run both dev servers concurrently. |
| `npm run build:web` | Build the Astro site to `apps/web/dist`. |
| `npm run build:studio` | Build the Sanity Studio SPA for deployment. |
| `npm run build` | Build both apps sequentially. |

Design tokens and component guidelines live in [`design-system/`](design-system/README.md).

## Admin Dashboard (Sanity Studio)

### Environment
Create `apps/studio/.env.local` (see `.env.example`):
```
SANITY_STUDIO_PROJECT_ID=<your Sanity project ID>
SANITY_STUDIO_DATASET=production
```
The `SANITY_STUDIO_` prefix is required. Sanity only exposes variables with this prefix to the Studio running in the browser.

### What editors can manage
| Dashboard item | Website |
| --- | --- |
| Pages → Home Page | `/`: hero slides and slide label, featured services, partners, vision & mission, the heading/intro of every section (services, partners, licenses, e-catalogue), the inquiry banner (also on `/about`), SEO title & description |
| Pages → About Page | `/about`: label, heading, optional image, left/right column paragraphs, disclaimer box on/off and label, SEO |
| Pages → Contact Page | `/contact`: heading, intro text, embedded map link, SEO (address, WhatsApp, email come from Site Settings) |
| Pages → Products, E-Catalogue & Events Pages | Heading, intro and SEO of `/products`, `/products/e-catalogue` and `/events`, plus the e-catalogue box on `/products` |
| Site Settings | Name, logo, tagline, WhatsApp number/link and default button text, address, map, socials, header menu (labels, links, order), footer headings, disclaimer |
| Products (+ Categories) | Product items on `/products`, `/products/<slug>`, `/products/e-catalogue` |
| Events | `/events`, `/events/<slug>` |
| Licenses & Compliance | Licenses section on the home page (status “Active” only) |

### Who can edit what
Sanity's free plan only has Administrator and Viewer roles, so editors are invited as **Administrators** and the dashboard decides access with an owner list (`apps/studio/src/access.ts`):

| | Products, Categories, News & Events | Pages, Site Settings, Licenses |
| --- | --- | --- |
| Owners (`SANITY_STUDIO_OWNER_IDS`) | Edit | Edit |
| Everyone else | Edit | Hidden, read-only |

Set owners in `apps/studio/.env.local` (comma-separated user IDs; find yours with `npx sanity debug` while logged in). Empty means no restriction. This is a dashboard-level restriction: editors remain Sanity Administrators, so only invite people you trust and keep API tokens to owners.

### Seeding the dataset from the current site
```
npm run seed:generate --workspace=@aryajaya/studio   # writes apps/studio/seed/content.ndjson
npm run seed:import --workspace=@aryajaya/studio     # imports into the "production" dataset
```
This copies everything the website shows today (including images and brochure PDFs) into Sanity. Re-running `seed:import` overwrites documents with the same IDs, so don’t re-run it after editors have made changes.

### How the website gets content
`apps/web/src/lib/content.ts` queries Sanity once per build. Until Sanity is reachable **and seeded** (the Site Settings document exists), the site uses the local files in `apps/web/src/data/`, so it builds before seeding and when Sanity is down. After that, products, categories, events and licenses come only from Sanity, so unpublishing every item empties that section. Page copy (headings, intros, labels, SEO), home page lists and menu links still fall back field by field, so a blank field shows the text in `apps/web/src/data/pages.ts`, `home.ts` or `siteSettings.ts`. The WhatsApp button link is generated from the WhatsApp number.

Set these on the website build (Vercel → Project → Environment Variables, or `apps/web/.env`):
```
SANITY_PROJECT_ID=<your Sanity project ID>
SANITY_DATASET=production
SANITY_READ_TOKEN=<only if the dataset is private>
```

Because the site is static, publishing in the dashboard needs a rebuild to appear on the site. Create a Vercel **Deploy Hook**, then add it as a Sanity **webhook** (sanity.io/manage → API → Webhooks, trigger on create/update/delete).

## Testing
| Command | What it runs |
| --- | --- |
| `npm test` | Everything below: web unit + integration tests, then the Studio check. |
| `npm run test:unit --workspace=@aryajaya/web` | Vitest unit tests in `apps/web/tests/unit` (under a second). |
| `npm run test:integration --workspace=@aryajaya/web` | Builds the site into a temp folder and checks the HTML (a few seconds). |
| `npm run test:studio` | Studio `tsc --noEmit` and `sanity schema validate`. |

What each layer covers:
- **Unit** (`apps/web/tests/unit`)
  - `sanity.test.ts`: request URL/host/token handling in `sanityFetch`, and null on missing config, HTTP errors or network errors. Also covers `toParagraphs`.
  - `content.test.ts`: stubs env and `fetch`, then re-imports `content.ts`. Checks the local fallback, every Sanity→site mapping, and per-collection and per-field fallback.
  - `data.test.ts`: integrity of `apps/web/src/data`. Slugs are unique, categories exist, image and brochure paths exist in `public/`, and catalogue links use https.
- **Integration** (`apps/web/tests/integration`): runs `astro build` once with Sanity unset. Checks that every product and event has a page, every page has a title, meta description and disclaimer, and the home page has its hero slider, services grid and partners carousel. Also checks the WhatsApp links and that no `href`/`src` is `undefined`.
- **Studio**: `sanity schema validate` needs a project ID to load `sanity.config.ts`. The script uses `SANITY_STUDIO_PROJECT_ID` when it is set and falls back to the dummy `ci-dummy`. Validation never contacts Sanity.

CI (`.github/workflows/ci.yml`) runs `npm install`, `npm test`, `npm run build:web` and `npm run build:studio` on Node 22 for pull requests and pushes to `master`. Vercel handles deploys separately.

## Deployment Notes
### Astro site (apps/web)
- **Vercel**: set the project root to `/` with Install Command `npm install`, Build Command `npm run build:web`, and Output Directory `apps/web/dist`. Add the Sanity env vars only if you plan to fetch CMS content during build.
- **Netlify**: configure Build Command `npm run build:web` and Publish Directory `apps/web/dist`. Use the default Node version ≥18.

### Sanity Studio (apps/studio)
- Deploy via `npm run deploy:studio` (runs `sanity deploy` in `apps/studio`) or directly `cd apps/studio && sanity deploy` to host on Sanity-managed URLs.
- If self-hosting (e.g., Netlify/Vercel SPA), run `npm run build:studio` and deploy the `apps/studio/dist` folder.

## TODO / Next Steps

### 1. Go live with Sanity (owner, ~30 min)
- [x] Seed the Sanity dataset (53 documents + images/PDFs imported).
- [x] Vercel → Environment Variables: `SANITY_PROJECT_ID=u6oj3dj3`, `SANITY_DATASET=production`.
- [x] Merge PR #1 → Vercel deploys `master` to production.
- [ ] Vercel Deploy Hook → add as Sanity webhook (sanity.io/manage → API → Webhooks) so publishing rebuilds the site.
- [ ] `npm run deploy:studio` → hosted dashboard at `*.sanity.studio`; add that URL to Sanity CORS origins.
- [ ] Invite editors (Administrator role on the free plan); keep `SANITY_STUDIO_OWNER_IDS` to owners only.
- [ ] Rename keys in the main checkout's `apps/studio/.env.local` to `SANITY_STUDIO_*` and add `SANITY_STUDIO_OWNER_IDS`.

### 2. Domain & SEO (before announcing the site)
- [ ] Connect the real domain in Vercel, then set `SITE_URL` (e.g. `https://www.example.co.id`) in Vercel env vars. Until then the site uses `https://arjaya-web.vercel.app`.
- [x] `/sitemap.xml` and `/robots.txt` (generated from content).
- [ ] Submit the sitemap in Google Search Console.
- [x] Canonical URL and Open Graph / Twitter tags in `BaseLayout.astro`.
- [x] Custom `404.astro` page.
- [ ] Create/verify a Google Business Profile with the same name, address and WhatsApp number.

### 3. Performance
- [ ] Images: `public/images` is ~41 MB of PNGs. Request Sanity images with `?w=…&auto=format` (WebP/AVIF, right size) and add `width`/`height` to `<img>` to avoid layout shift.
- [x] Remove the unused `Hero.astro` and `CategoryHighlights.astro` components.
- [ ] Run Lighthouse on mobile and fix anything below 90.

### 4. Content & compliance
- [ ] Add verified license, IPAK, ISO and regulatory documents once available.
- [ ] Alt text for product and post images (add an `alt` field in Sanity).
- [ ] Privacy policy page; analytics (e.g. Vercel Web Analytics, no cookies) or a consent banner if using Google Analytics.
- [ ] Decide on Indonesian/English: most visitors are likely Indonesian; consider an `id` locale with Sanity field-level translations.
- [ ] Review product copy for exaggerated clinical claims (medical compliance).

### 5. Maintenance
- [ ] Enable Dependabot (or Renovate) for npm updates; CI already runs tests on every PR.
- [ ] Upgrade path: Sanity v4 and Astro 5 need Node 20+ (CI already uses Node 22).
- [ ] Optional: draft preview for editors (Sanity Presentation tool) — needs a server-rendered preview route.
- [ ] Optional: Playwright smoke tests in a real browser (sliders, mobile menu, product filter).
