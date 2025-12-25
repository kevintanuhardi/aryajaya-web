You are building a production-ready company profile website for an Indonesian medical company:
Name: “Arjaya Langgeng Medika”
Specialty: Orthopedics specialist medical products

Tech constraints:
	•	Use a monorepo with Astro (website) and Sanity Studio (CMS).
	•	Website: Astro + Tailwind, static output, no backend DB.
	•	CMS: Sanity Studio in apps/studio, deployed separately (Sanity-hosted or any SPA host).
	•	Product listing: inquiry-based (WhatsApp), no checkout.
	•	Must be fast, maintainable, mobile-first, SEO-ready.
	•	Medical compliance: avoid exaggerated claims; add disclaimer sitewide.

Real contact info:
	•	WhatsApp: +62 821-1458-2810
	•	Address: Graha Simatupang, Jl. TB Simatupang No.38 Tower 2C, RT.1/RW.8, Jati Padang, Ps. Minggu, Kota Jakarta Selatan, DKI Jakarta 12540
	•	Map URL: https://share.google/5IKGNDSyz0qSzdrDZ

Content model in Sanity:
	•	siteSettings (name, tagline, WA, address, mapUrl, social links)
	•	licenses (placeholders first)
	•	productCategory
	•	product (name, slug, category, shortDesc, body, images, specs, tags, inquiryCTA)

Output:
	•	Full repo structure + commands + TODO list.