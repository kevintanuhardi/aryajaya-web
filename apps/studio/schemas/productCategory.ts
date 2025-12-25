import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'productCategory',
  title: 'Kategori Produk',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Nama Kategori',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      title: 'Ringkasan'
    }),
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Ikon (emoji atau nama lucide)'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary'
    }
  }
});
