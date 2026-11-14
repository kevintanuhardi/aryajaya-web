import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons';

/** Small label, heading and optional intro text shown at the top of a section. */
export default defineType({
  name: 'sectionHeading',
  type: 'object',
  title: 'Section heading',
  icon: TextIcon,
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Small label',
      description: 'The short coloured label above the heading, e.g. “Partners”.'
    }),
    defineField({ name: 'heading', type: 'string', title: 'Heading' }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      title: 'Intro text',
      description: 'Optional sentence or two under the heading.'
    })
  ],
  preview: { select: { title: 'heading', subtitle: 'eyebrow' } }
});
