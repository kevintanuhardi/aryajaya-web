import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Produk',
  type: 'document',
  groups: [
    { name: 'summary', title: 'Ringkasan' },
    { name: 'content', title: 'Konten' },
    { name: 'compliance', title: 'Compliance' }
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Nama Produk',
      group: 'summary',
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
      group: 'summary',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Kategori',
      to: [{ type: 'productCategory' }],
      group: 'summary',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      rows: 3,
      title: 'Deskripsi Singkat',
      group: 'summary',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
      title: 'Konten Detail',
      group: 'content'
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Galeri',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          options: { hotspot: true }
        })
      ],
      group: 'content'
    }),
    defineField({
      name: 'specifications',
      type: 'array',
      title: 'Spesifikasi',
      group: 'content',
      of: [
        defineField({
          name: 'spec',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Nilai' }
          ]
        })
      ]
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tag',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'manufacturer',
      type: 'string',
      title: 'Produsen Referensi',
      description: 'Catat sumber referensi publik jika menggunakan sample data'
    }),
    defineField({
      name: 'sourceUrl',
      type: 'url',
      title: 'Link Produsen'
    }),
    defineField({
      name: 'sampleData',
      type: 'boolean',
      title: 'Sample Data?',
      initialValue: true,
      group: 'compliance'
    }),
    defineField({
      name: 'inquiryCta',
      type: 'string',
      title: 'CTA Kustom',
      description: 'Opsional: override teks tombol WhatsApp',
      group: 'compliance'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'images.0'
    }
  }
});
