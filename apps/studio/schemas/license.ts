import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'license',
  title: 'License / Compliance',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Judul Lisensi',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: {
        list: [
          { title: 'Placeholder', value: 'placeholder' },
          { title: 'Aktif', value: 'active' },
          { title: 'Dalam Proses', value: 'in-progress' }
        ]
      },
      initialValue: 'placeholder'
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      title: 'Deskripsi'
    }),
    defineField({
      name: 'documentUrl',
      type: 'url',
      title: 'Tautan Dokumen (opsional)'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status'
    }
  }
});
