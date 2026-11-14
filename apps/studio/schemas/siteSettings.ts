import { defineArrayMember, defineField, defineType } from 'sanity';
import { CogIcon, LinkIcon } from '@sanity/icons';

export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  icon: CogIcon,
  groups: [
    { name: 'info', title: 'Company', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'navigation', title: 'Menu & footer' },
    { name: 'compliance', title: 'Compliance' }
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Company name',
      group: 'info',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'tagline',
      type: 'text',
      rows: 2,
      title: 'Tagline',
      description: 'Shown in the footer under the company name.',
      group: 'info'
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      description: 'Square PNG works best. Used in the header, footer and favicon.',
      group: 'info'
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      title: 'Social links',
      group: 'info',
      of: [
        defineArrayMember({
          name: 'link',
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label', validation: (rule) => rule.required() }),
            defineField({ name: 'url', type: 'url', title: 'URL', validation: (rule) => rule.required() })
          ]
        })
      ]
    }),
    defineField({
      name: 'whatsappNumber',
      type: 'string',
      title: 'WhatsApp number (display)',
      description: 'Formatted for people to read, e.g. +62 821-1458-2810.',
      group: 'contact',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'whatsappLink',
      type: 'url',
      title: 'WhatsApp link',
      description: 'Used by every “Consult via WhatsApp” button, e.g. https://wa.me/6282114582810.',
      initialValue: 'https://wa.me/6282114582810',
      group: 'contact',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'whatsappButtonLabel',
      type: 'string',
      title: 'WhatsApp button text',
      description: 'Default text on WhatsApp buttons, e.g. “Consult via WhatsApp”.',
      group: 'contact'
    }),
    defineField({ name: 'email', type: 'string', title: 'Email', group: 'contact' }),
    defineField({ name: 'address', type: 'text', rows: 3, title: 'Address', group: 'contact' }),
    defineField({ name: 'mapUrl', type: 'url', title: 'Google Maps link', group: 'contact' }),
    defineField({
      name: 'navLinks',
      type: 'array',
      title: 'Header menu',
      description: 'Links in the top menu, in this order. Drag to reorder.',
      group: 'navigation',
      of: [
        defineArrayMember({
          name: 'navLink',
          type: 'object',
          icon: LinkIcon,
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label', validation: (rule) => rule.required() }),
            defineField({
              name: 'href',
              type: 'string',
              title: 'Link',
              description: 'A page on this site such as /products, or a full https:// address.',
              validation: (rule) =>
                rule.required().custom((value) =>
                  !value || value.startsWith('/') || /^https?:\/\//.test(value) || value.startsWith('#')
                    ? true
                    : 'Start with “/” for a page on this site, or “https://” for another website.'
                )
            })
          ],
          preview: { select: { title: 'label', subtitle: 'href' } }
        })
      ]
    }),
    defineField({
      name: 'footerContactHeading',
      type: 'string',
      title: 'Footer: contact heading',
      description: 'e.g. “Contact”.',
      group: 'navigation'
    }),
    defineField({
      name: 'footerMapLinkLabel',
      type: 'string',
      title: 'Footer: map link text',
      description: 'e.g. “View location on Google Maps”.',
      group: 'navigation'
    }),
    defineField({
      name: 'footerSocialHeading',
      type: 'string',
      title: 'Footer: social links heading',
      description: 'e.g. “Follow Us”. Only shown when there are social links.',
      group: 'navigation'
    }),
    defineField({
      name: 'disclaimer',
      type: 'text',
      rows: 3,
      title: 'Medical disclaimer',
      description: 'Shown in the footer of every page. Required for medical compliance.',
      group: 'compliance',
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline', media: 'logo' }
  }
});
