import { defineArrayMember, defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons';

export default defineType({
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero slider', default: true },
    { name: 'services', title: 'Featured services' },
    { name: 'partners', title: 'Partners' },
    { name: 'about', title: 'Vision & mission' },
    { name: 'licenses', title: 'Licenses' },
    { name: 'ecatalogue', title: 'E-Catalogue' },
    { name: 'inquiry', title: 'Inquiry banner' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({
      name: 'heroEyebrow',
      type: 'string',
      title: 'Small label above each slide title',
      description: 'Shown on every slide, e.g. the company name.',
      group: 'hero'
    }),
    defineField({
      name: 'heroSlides',
      type: 'array',
      title: 'Hero slides',
      group: 'hero',
      validation: (rule) => rule.min(1),
      of: [
        defineArrayMember({
          name: 'slide',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required() }),
            defineField({ name: 'subtitle', type: 'text', rows: 2, title: 'Subtitle' }),
            defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } })
          ],
          preview: { select: { title: 'title', subtitle: 'subtitle', media: 'image' } }
        })
      ]
    }),
    defineField({
      name: 'servicesHeading',
      type: 'sectionHeading',
      title: 'Section heading',
      group: 'services'
    }),
    defineField({
      name: 'featuredServices',
      type: 'array',
      title: 'Featured services',
      description: 'Shown as three columns on desktop. Three items works best.',
      group: 'services',
      of: [
        defineArrayMember({
          name: 'service',
          type: 'object',
          fields: [
            defineField({ name: 'icon', type: 'string', title: 'Icon (emoji)' }),
            defineField({ name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required() }),
            defineField({ name: 'description', type: 'text', rows: 3, title: 'Description' })
          ],
          preview: { select: { title: 'title', subtitle: 'description', icon: 'icon' },
            prepare: ({ title, subtitle, icon }) => ({ title: `${icon ?? ''} ${title ?? ''}`.trim(), subtitle }) }
        })
      ]
    }),
    defineField({
      name: 'partnersHeading',
      type: 'sectionHeading',
      title: 'Section heading',
      group: 'partners'
    }),
    defineField({
      name: 'partners',
      type: 'array',
      title: 'Partners',
      group: 'partners',
      of: [
        defineArrayMember({
          name: 'partner',
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Name', validation: (rule) => rule.required() }),
            defineField({ name: 'subtitle', type: 'string', title: 'Subtitle', description: 'e.g. “Spine solutions”.' }),
            defineField({ name: 'logo', type: 'image', title: 'Logo' })
          ],
          preview: { select: { title: 'name', subtitle: 'subtitle', media: 'logo' } }
        })
      ]
    }),
    defineField({
      name: 'visionLabel',
      type: 'string',
      title: 'Vision label',
      description: 'Small label above the vision statement, e.g. “Vision”.',
      group: 'about'
    }),
    defineField({ name: 'vision', type: 'text', rows: 3, title: 'Vision', group: 'about' }),
    defineField({
      name: 'missionLabel',
      type: 'string',
      title: 'Mission label',
      description: 'Small label above the mission list, e.g. “Mission”.',
      group: 'about'
    }),
    defineField({
      name: 'mission',
      type: 'array',
      title: 'Mission statements',
      group: 'about',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'licensesHeading',
      type: 'sectionHeading',
      title: 'Section heading',
      description: 'The licenses themselves are edited under “Licenses & Compliance”.',
      group: 'licenses'
    }),
    defineField({
      name: 'ecatalogueHeading',
      type: 'sectionHeading',
      title: 'Section heading',
      description: 'Shows up to six products that have an e-catalogue link.',
      group: 'ecatalogue'
    }),
    defineField({
      name: 'ecatalogueButtonLabel',
      type: 'string',
      title: 'Button label',
      description: 'Links to the full e-catalogue page.',
      group: 'ecatalogue'
    }),
    defineField({
      name: 'inquiryBanner',
      type: 'callToAction',
      title: 'Inquiry banner',
      description: 'The coloured band with a WhatsApp button. Also shown at the bottom of the About page.',
      group: 'inquiry'
    }),
    defineField({ name: 'seo', type: 'seo', title: 'Search engines (SEO)', group: 'seo' })
  ],
  preview: {
    prepare: () => ({ title: 'Home Page' })
  }
});
