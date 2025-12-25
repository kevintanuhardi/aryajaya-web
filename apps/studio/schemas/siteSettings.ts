import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  groups: [
    { name: 'info', title: 'Informasi' },
    { name: 'contact', title: 'Kontak' }
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Nama Perusahaan',
      group: 'info',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'tagline',
      type: 'text',
      rows: 2,
      title: 'Tagline',
      group: 'info'
    }),
    defineField({
      name: 'whatsappNumber',
      type: 'string',
      title: 'Nomor WhatsApp',
      group: 'contact',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'whatsappLink',
      type: 'url',
      title: 'Link WhatsApp',
      initialValue: 'https://wa.me/6282114582810',
      group: 'contact'
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      group: 'contact'
    }),
    defineField({
      name: 'address',
      type: 'text',
      rows: 3,
      title: 'Alamat',
      group: 'contact'
    }),
    defineField({
      name: 'mapUrl',
      type: 'url',
      title: 'Map URL',
      group: 'contact'
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      title: 'Social Links',
      of: [
        defineField({
          name: 'link',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'url', type: 'url', title: 'URL' }
          ]
        })
      ],
      group: 'info'
    }),
    defineField({
      name: 'disclaimer',
      type: 'text',
      rows: 3,
      title: 'Disclaimer',
      description: 'Tampilkan peringatan kepatuhan medis secara sitewide',
      initialValue:
        'Informasi di website ini bersifat edukatif dan bukan pengganti konsultasi dokter. Penggunaan alat kesehatan mengikuti indikasi dan petunjuk penggunaan resmi.'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline'
    }
  }
});
