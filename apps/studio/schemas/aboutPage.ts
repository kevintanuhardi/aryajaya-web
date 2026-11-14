import { defineArrayMember, defineField, defineType } from 'sanity';
import { InfoOutlineIcon } from '@sanity/icons';

export default defineType({
  name: 'aboutPage',
  type: 'document',
  title: 'About Page',
  icon: InfoOutlineIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Small label',
      description: 'Shown above the heading, e.g. “About us”.',
      group: 'content'
    }),
    defineField({ name: 'heading', type: 'string', title: 'Heading', group: 'content' }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image (optional)',
      description: 'Shown under the heading when set. Leave empty for a text-only page.',
      options: { hotspot: true },
      group: 'content',
      fields: [defineField({ name: 'alt', type: 'string', title: 'Image description (for screen readers)' })]
    }),
    defineField({
      name: 'leftColumn',
      type: 'array',
      title: 'Left column paragraphs',
      description: 'On mobile, these come first.',
      group: 'content',
      of: [defineArrayMember({ type: 'text', rows: 4 })]
    }),
    defineField({
      name: 'rightColumn',
      type: 'array',
      title: 'Right column paragraphs',
      group: 'content',
      of: [defineArrayMember({ type: 'text', rows: 4 })]
    }),
    defineField({
      name: 'showDisclaimer',
      type: 'boolean',
      title: 'Show medical disclaimer box',
      description: 'Adds the medical disclaimer (edited in Site Settings → Compliance) under the right column.',
      initialValue: true,
      group: 'content'
    }),
    defineField({
      name: 'disclaimerLabel',
      type: 'string',
      title: 'Disclaimer box label',
      description: 'Bold label at the top of the disclaimer box, e.g. “Disclaimer:”.',
      group: 'content',
      hidden: ({ document }) => document?.showDisclaimer === false
    }),
    defineField({ name: 'seo', type: 'seo', title: 'Search engines (SEO)', group: 'seo' })
  ],
  preview: {
    prepare: () => ({ title: 'About Page' })
  }
});
