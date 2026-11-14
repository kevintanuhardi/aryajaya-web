import { defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons';

export default defineType({
  name: 'contactPage',
  type: 'document',
  title: 'Contact Page',
  icon: EnvelopeIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({ name: 'heading', type: 'string', title: 'Heading', group: 'content' }),
    defineField({
      name: 'intro',
      type: 'text',
      rows: 3,
      title: 'Intro text',
      description: 'Shown under the heading. The address, WhatsApp number and email come from Site Settings → Contact.',
      group: 'content'
    }),
    defineField({
      name: 'mapEmbedUrl',
      type: 'url',
      title: 'Embedded map link',
      description:
        'The map shown on the page. Use a Google Maps link ending in “&output=embed”, e.g. https://www.google.com/maps?q=Graha%20Simatupang&output=embed.',
      group: 'content'
    }),
    defineField({ name: 'seo', type: 'seo', title: 'Search engines (SEO)', group: 'seo' })
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' })
  }
});
