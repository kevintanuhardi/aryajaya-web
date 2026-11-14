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
| Home Page | Hero slides, featured services, partners, vision & mission |
| Site Settings | Name, logo, tagline, WhatsApp, address, map, socials, disclaimer |
| Products (+ Categories) | `/products`, `/products/<slug>`, `/products/e-catalogue` |
| Events | `/events`, `/events/<slug>` |
| Licenses & Compliance | Licenses section on the home page (status “Active” only) |

### Seeding the dataset from the current site
```
npm run seed:generate --workspace=@aryajaya/studio   # writes apps/studio/seed/content.ndjson
npm run seed:import --workspace=@aryajaya/studio     # imports into the "production" dataset
```
This copies everything the website shows today (including images and brochure PDFs) into Sanity. Re-running `seed:import` overwrites documents with the same IDs, so don’t re-run it after editors have made changes.

### How the website gets content
`apps/web/src/lib/content.ts` queries Sanity once per build. For each collection it uses Sanity when there are published documents, otherwise the local files in `apps/web/src/data/`. The site therefore builds before Sanity is seeded, and if Sanity is unreachable.

Set these on the website build (Vercel → Project → Environment Variables, or `apps/web/.env`):
```
SANITY_PROJECT_ID=<your Sanity project ID>
SANITY_DATASET=production
SANITY_READ_TOKEN=<only if the dataset is private>
```

Because the site is static, publishing in the dashboard needs a rebuild to appear on the site. Create a Vercel **Deploy Hook**, then add it as a Sanity **webhook** (sanity.io/manage → API → Webhooks, trigger on create/update/delete).

## Deployment Notes
### Astro site (apps/web)
- **Vercel**: set the project root to `/` with Install Command `npm install`, Build Command `npm run build:web`, and Output Directory `apps/web/dist`. Add the Sanity env vars only if you plan to fetch CMS content during build.
- **Netlify**: configure Build Command `npm run build:web` and Publish Directory `apps/web/dist`. Use the default Node version ≥18.

### Sanity Studio (apps/studio)
- Deploy via `npm run deploy:studio` (runs `sanity deploy` in `apps/studio`) or directly `cd apps/studio && sanity deploy` to host on Sanity-managed URLs.
- If self-hosting (e.g., Netlify/Vercel SPA), run `npm run build:studio` and deploy the `apps/studio/dist` folder.

## TODO / Next Steps
- Seed the Sanity dataset and add the Vercel deploy hook as a Sanity webhook.
- Add verified license, IPAK, ISO, and regulatory documents once available.
- Expand Sanity schemas with localization, spec tables, or regulatory uploads as needed.
- Add analytics / consent tooling prior to production launch.
