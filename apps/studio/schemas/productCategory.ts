import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons';

export default defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Category name', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Used in the product filter, e.g. /products?category=spine.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({ name: 'summary', type: 'text', rows: 3, title: 'Summary' }),
    defineField({ name: 'icon', type: 'string', title: 'Icon (emoji)' }),
    defineField({ name: 'order', type: 'number', title: 'Sort order', initialValue: 0 })
  ],
  orderings: [{ title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'summary' }
  }
});
