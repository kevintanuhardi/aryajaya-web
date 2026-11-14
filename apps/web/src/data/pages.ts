/** Copy for the About, Contact and listing pages (fallback when Sanity is empty). */

export const aboutPage = {
  seo: {
    title: 'About Arjaya',
    description: 'Arjaya Langgeng Medika company profile'
  },
  eyebrow: 'About us',
  heading: 'Medical supply company specializing in orthopedic products and solutions',
  /** Optional image under the heading (public path or URL). Empty = no image. */
  image: '',
  imageAlt: '',
  leftColumn: [
    'Arjaya Langgeng Medika is a medical supply company specializing in orthopedic products and solutions. We provide comprehensive support for musculoskeletal care, including trauma, spine, hip, knee, and other orthopedic subspecialties.',
    'Our team collaborates with trusted international manufacturers and partners with government and private hospitals across Indonesia.'
  ],
  rightColumn: [
    'We are committed to delivering high-quality products, professional service, and innovative solutions to support better patient outcomes nationwide.'
  ],
  showDisclaimer: true,
  disclaimerLabel: 'Disclaimer:'
};

export const contactPage = {
  seo: {
    title: 'Contact Arjaya',
    description: 'Get in touch with Arjaya Langgeng Medika'
  },
  heading: 'Contact & Location',
  intro:
    'For product demos and medical device procurement needs, contact our team via WhatsApp or visit our office in South Jakarta.',
  mapEmbedUrl: 'https://www.google.com/maps?q=Graha%20Simatupang%20Tower%202C%20Jakarta&output=embed'
};

export const listingPages = {
  products: {
    seo: {
      title: 'Arjaya Products',
      description: 'Catalog of trauma, spine, arthroplasty, and navigation medical devices'
    },
    intro: {
      eyebrow: 'Catalog',
      heading: 'Trauma, Spine & Arthroplasty Products',
      description: "Arjaya Langgeng Medika's product portfolio based on the available catalog and product materials."
    },
    ecatalogueTeaser: {
      eyebrow: 'E-Catalogue',
      heading: 'Official e-catalogue entries now have a dedicated page',
      text: 'Browse all products with active official e-catalogue listings in one place, without extending the main products page.',
      buttonLabel: 'Open e-catalogue page'
    }
  },
  ecatalogue: {
    seo: {
      title: 'Arjaya E-Catalogue',
      description: 'Official e-catalogue product listings from Arjaya Langgeng Medika'
    },
    intro: {
      eyebrow: 'E-Catalogue',
      heading: 'Official E-Catalogue Listings',
      description:
        'Browse products with active official INAPROC e-catalogue entries. Each card links directly to the listing and to the corresponding product detail page.'
    }
  },
  events: {
    seo: {
      title: 'Arjaya News & Events',
      description: 'Training, launches, and workshop activities from Arjaya Langgeng Medika'
    },
    intro: {
      eyebrow: 'News & Events',
      heading: 'Training, launches, and field activities',
      description:
        'A record of Arjaya Langgeng Medika events, workshops, and strategic activities with healthcare professionals and technology partners.'
    }
  }
};
