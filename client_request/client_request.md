Refactor the existing site so the Home page matches that structure and hierarchy. Keep existing content/data where possible, but adjust layout, spacing, and components to match the template.

Requirements
	•	Implement the Home page in the exact section order listed above.
	•	Make the navbar sticky (or at least fixed at top) and visually separated from hero.
	•	Hero slider:
	•	Full-width section, centered text overlay, left/right arrows, dot indicators.
	•	Accepts an array of slides (image + title + subtitle). If no images exist yet, use placeholders but keep the structure.
	•	“Layanan yang diunggulkan”:
	•	3-column layout on desktop, stacked on mobile.
	•	Each item: icon + title + short description (or just title if current data is minimal).
	•	Partners carousel:
	•	Horizontal scroll or carousel with arrows + dots.
	•	Each partner appears as a “card tile” (logo, name, short subtitle or CTA).
	•	Vision & Mission:
	•	Two-column on desktop if it fits (Vision + Mission), stacked on mobile.
	•	Footer:
	•	4 blocks like the template.
	•	Include “About us”, “Menu links”, “Alamat”, “Contact/Signup”.
	•	Responsiveness: must look good on mobile/tablet/desktop.
	•	No visual regressions outside Home page unless necessary.

Engineering constraints
	•	Reuse existing components and styling system when possible (Tailwind / CSS modules / styled-components / whatever the repo uses).
	•	If the repo is Next.js: update pages/index.* or app/page.* accordingly.
	•	If the repo is React SPA: update the Home route component.
	•	Avoid heavy new dependencies unless absolutely necessary. If a carousel library already exists in the repo, reuse it.

Deliverables
	1.	Updated Home page layout matching the Keynote template sections.
	2.	Components created/updated:
	•	Navbar/Header
	•	HeroSlider
	•	FeaturedServices
	•	PartnersCarousel
	•	VisionMission
	•	Footer
	3.	Clean, readable code, consistent with repo conventions.
	4.	Ensure build passes and no lint/type errors.

Acceptance checklist (must satisfy)
	•	Home page has 6 sections in correct order.
	•	Hero and Partners have left/right controls and dot indicators.
	•	Services is 3 columns on desktop.
	•	Keep footer as is.
	•	Mobile layout is stacked and readable.
	•	Runs successfully (dev server + build).

Process
	•	First: inspect existing Home page and current components.
	•	Then: map existing content/data into the new sections.
	•	Then: implement/adjust components + styling until it matches the template structure.
	•	Finally: run tests/build and fix issues.

Now start by locating the Home page entry file and existing layout components, then implement the refactor.