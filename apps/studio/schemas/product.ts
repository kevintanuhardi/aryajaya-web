import { defineArrayMember, defineField, defineType } from 'sanity';
import { PackageIcon } from '@sanity/icons';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  groups: [
    { name: 'summary', title: 'Summary', default: true },
    { name: 'content', title: 'Details' },
    { name: 'links', title: 'Links & documents' }
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Product name',
      group: 'summary',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL slug',
      description: 'The page address: /products/<slug>.',
      options: { source: 'title', maxLength: 96 },
      group: 'summary',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{ type: 'productCategory' }],
      group: 'summary',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      rows: 3,
      title: 'Short description',
      description: 'One or two sentences. Avoid exaggerated clinical claims.',
      group: 'summary',
      validation: (rule) => rule.required().max(300)
    }),
    defineField({
      name: 'manufacturer',
      type: 'string',
      title: 'Manufacturer',
      group: 'summary'
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      description: 'The first image is used on product cards and the detail page.',
      group: 'summary',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })]
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Description',
      group: 'content',
      of: [defineArrayMember({ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] })]
    }),
    defineField({
      name: 'highlights',
      type: 'array',
      title: 'Highlights',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
      name: 'specifications',
      type: 'array',
      title: 'Specifications',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'spec',
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label', validation: (rule) => rule.required() }),
            defineField({ name: 'value', type: 'string', title: 'Value', validation: (rule) => rule.required() })
          ],
          preview: { select: { title: 'label', subtitle: 'value' } }
        })
      ]
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' }
    }),
    defineField({
      name: 'catalogUrl',
      type: 'url',
      title: 'INAPROC e-catalogue link',
      description: 'Products with a link appear on the E-Catalogue page.',
      group: 'links'
    }),
    defineField({
      name: 'brochure',
      type: 'file',
      title: 'Brochure (PDF)',
      options: { accept: 'application/pdf' },
      group: 'links'
    }),
    defineField({
      name: 'sourceUrl',
      type: 'url',
      title: 'External document link',
      description: 'Used only when no brochure PDF is uploaded.',
      group: 'links'
    }),
    defineField({
      name: 'sourceLabel',
      type: 'string',
      title: 'Document button label',
      description: 'e.g. “Open JUVENO brochure”.',
      group: 'links'
    }),
    defineField({ name: 'order', type: 'number', title: 'Sort order', initialValue: 0, group: 'summary' })
  ],
  orderings: [
    { title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Name', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] }
  ],
  preview: {
    select: { title: 'title', subtitle: 'category.title', media: 'images.0' }
  }
});
