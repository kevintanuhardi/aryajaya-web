import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export default defineType({
  name: 'license',
  title: 'License / Compliance',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'License name',
      description: 'e.g. CDAKB, IDAK.',
      validation: (rule) => rule.required()
    }),
    defineField({ name: 'label', type: 'string', title: 'Number label', initialValue: 'Registration Number' }),
    defineField({ name: 'registrationNumber', type: 'string', title: 'Registration number' }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      description: 'Only “Active” licenses are shown on the website.',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'In progress', value: 'in-progress' },
          { title: 'Placeholder', value: 'placeholder' }
        ],
        layout: 'radio'
      },
      initialValue: 'active'
    }),
    defineField({ name: 'description', type: 'text', rows: 3, title: 'Description' }),
    defineField({
      name: 'documentUrl',
      type: 'url',
      title: 'Document link (internal only)',
      description: 'Not published on the website.'
    }),
    defineField({ name: 'order', type: 'number', title: 'Sort order', initialValue: 0 })
  ],
  orderings: [{ title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'registrationNumber', status: 'status' },
    prepare: ({ title, subtitle, status }) => ({ title, subtitle: [status, subtitle].filter(Boolean).join(' · ') })
  }
});
