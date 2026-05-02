# Arjaya Langgeng Medika Monorepo

Monorepo that houses the Astro marketing site (`apps/web`) and Sanity Studio (`apps/studio`) for Arjaya Langgeng Medika.

## Repository Structure
```
.
├── package.json              # npm workspaces + dev/build scripts
├── apps
│   ├── web                   # Astro + Tailwind company profile site
│   │   ├── src
│   │   │   ├── components    # Hero, CTA, product cards, etc.
│   │   │   ├── data          # Client-backed catalog, site settings, licenses
│   │   │   ├── layouts       # Base layout w/ disclaimer + header/footer
│   │   │   └── pages         # Home, Products, Product Detail, About, Contact
│   │   └── public            # Public imagery, logos, and product brochures
│   └── studio                # Sanity Studio v3 configuration
│       ├── schemas           # siteSettings, licenses, productCategory, product
│       └── seed              # sample-data.ndjson for quick dataset seeding
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

## Sanity Environment
Create `apps/studio/.env.local` (or export vars) with:
```
SANITY_PROJECT_ID=<your Sanity project ID>
SANITY_DATASET=<dataset name, e.g. production>
```
These values are also referenced in `sanity.cli.ts`/`sanity.config.ts` so CLI and Studio use the same project.

### Seeding Sample Content
```
cd apps/studio
sanity dataset import seed/sample-data.ndjson [dataset]
```
The provided NDJSON seeds singleton `siteSettings`, placeholder licenses, categories, and initial orthopedic/spine/navigation product records. Update this seed before importing if Sanity will become the source of truth.

## Deployment Notes
### Astro site (apps/web)
- **Vercel**: set the project root to `/` with Install Command `npm install`, Build Command `npm run build:web`, and Output Directory `apps/web/dist`. Add the Sanity env vars only if you plan to fetch CMS content during build.
- **Netlify**: configure Build Command `npm run build:web` and Publish Directory `apps/web/dist`. Use the default Node version ≥18.

### Sanity Studio (apps/studio)
- Deploy via `npm run deploy:studio` (runs `sanity deploy` in `apps/studio`) or directly `cd apps/studio && sanity deploy` to host on Sanity-managed URLs.
- If self-hosting (e.g., Netlify/Vercel SPA), run `npm run build:studio` and deploy the `apps/studio/dist` folder.

## TODO / Next Steps
- Connect Astro components to live Sanity content via GROQ queries once the dataset is ready.
- Add verified license, IPAK, ISO, and regulatory documents once available.
- Expand Sanity schemas with localization, spec tables, or regulatory uploads as needed.
- Add analytics / consent tooling prior to production launch.
