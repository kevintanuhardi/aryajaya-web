import { defineField, defineType } from 'sanity';
import { BulbOutlineIcon } from '@sanity/icons';

/** A highlighted box with a heading, short text and a button. */
export default defineType({
  name: 'callToAction',
  type: 'object',
  title: 'Call to action',
  icon: BulbOutlineIcon,
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({ name: 'eyebrow', type: 'string', title: 'Small label' }),
    defineField({ name: 'heading', type: 'string', title: 'Heading' }),
    defineField({ name: 'text', type: 'text', rows: 3, title: 'Text' }),
    defineField({ name: 'buttonLabel', type: 'string', title: 'Button label' })
  ],
  preview: { select: { title: 'heading', subtitle: 'buttonLabel' } }
});
