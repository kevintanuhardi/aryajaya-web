# Arjaya Design System

One visual language for the public website (`apps/web`) and the admin dashboard (`apps/studio`).

**Source of truth:** [`tokens.json`](./tokens.json). Change a value there and both apps pick it up:

| Consumer | How it reads the tokens |
| --- | --- |
| Website | `apps/web/tailwind.config.cjs` → Tailwind classes (`bg-brand`, `text-ink-600`, `rounded-card`, …) |
| Website | `apps/web/src/styles/global.css` → component classes (`.btn-primary`, `.card`, …) |
| Website | `apps/web/src/layouts/BaseLayout.astro` → Inter font link, `theme-color` |
| Dashboard | `apps/studio/src/theme.ts` → Sanity Studio theme (brand color, navbar, font) |
| Dashboard | `apps/studio/src/StudioLogo.tsx` → navbar monogram |

## Principles

1. **Clinical and calm.** White and near-white surfaces, one brand green, slate neutrals. No decorative gradients beyond the hero.
2. **Trust over hype.** Plain, factual copy. No exaggerated medical claims (see the sitewide disclaimer).
3. **One action color.** Green (`brand`) means “do this”, mainly WhatsApp inquiries. Don’t use it for decoration.
4. **Mobile first.** Every section stacks to one column under `md` (768px).

## Color

| Token | Tailwind | Use |
| --- | --- | --- |
| `brand.500` `#0D7C66` | `brand` | Primary buttons, eyebrows, links, active states |
| `brand.700` `#0A5747` | `brand-dark` | Primary button hover |
| `brand.50–200` | `brand-50` … | Tinted backgrounds, text on dark surfaces |
| `brand.900` `#052E2B` | `brand-900` | Hero gradient, dashboard navbar |
| `ink.900` `#0F172A` | `ink-900` | Headings, body text, dark sections (footer, licenses) |
| `ink.600` | `ink-600` | Secondary/body copy |
| `ink.500` | `ink-500` | Meta text, captions |
| `ink.100–200` | `ink-100`, `ink-200` | Borders and dividers |
| `ink.50` | `ink-50` | Muted surfaces |
| `accent.200/300` | `accent-200` | Compliance highlights on dark backgrounds (registration numbers, disclaimer) |
| `semantic.*` | `success`, `warning`, `danger`, `info` | Status messages only |

`ink` has the same values as Tailwind’s `slate`. Use `ink-*` in new code so it can be retuned in one place.

## Typography

Font: **Inter** (400, 500, 600, 700), with system fallbacks.

| Class | Use |
| --- | --- |
| `.eyebrow` / `.eyebrow-sm` | Small uppercase label above a heading |
| `.heading-page` | Page `<h1>` |
| `.heading-section` | Section `<h2>` |
| `.heading-card` | Card titles |
| `.text-body` | Paragraph copy in cards and sections |

## Components (global.css)

| Class | Notes |
| --- | --- |
| `.container-page` | Max width 72rem, 1rem side gutter |
| `.section` | 4rem vertical padding |
| `.btn` + `.btn-primary` | Main action (green, pill-shaped) |
| `.btn` + `.btn-secondary` | Neutral outline |
| `.btn` + `.btn-outline-brand` | Green outline, fills on hover |
| `.btn` + `.btn-dark` | Dark action (e.g. “Open e-catalogue” next to WhatsApp) |
| `.btn-sm` / `.btn-lg` | Size modifiers |
| `.card` / `.card-muted` | 1rem radius, light border, subtle shadow |
| `.card-interactive` | Lift on hover for clickable cards |
| `.panel` | Larger 1.5rem-radius muted block |
| `.slider-nav` | Round arrow buttons for carousels |

Use `WhatsappButton.astro` for every WhatsApp call to action rather than building the link by hand.

## Shape and depth

- Radius: `rounded-control` (pills) for buttons and chips, `rounded-card` (1rem) for cards, `rounded-panel` (1.5rem) for large media blocks.
- Shadow: `shadow-card` at rest, `shadow-raised` on hover or for floating controls, `shadow-brand` only on primary buttons.

## Dashboard

The dashboard uses Sanity’s own components, themed with the same brand color, navbar color and font. Field labels and help text are written in plain English for non-technical editors.
