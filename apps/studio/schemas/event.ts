import { defineArrayMember, defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';

export default defineType({
  name: 'event',
  type: 'document',
  title: 'Event',
  icon: CalendarIcon,
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL slug',
      description: 'The page address: /events/<slug>.',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'eventDateStart',
      type: 'date',
      title: 'Event start date',
      description: 'Used for search engines and sorting.',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'eventDate',
      type: 'string',
      title: 'Event date label',
      description: 'How the date is written on the site, e.g. “August 15-16, 2025”. Leave empty to use the start date.'
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'Events are listed newest first by this date.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      title: 'Excerpt',
      description: 'Shown on the event card and used as the page description.',
      validation: (rule) => rule.required().max(300)
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Cover image',
      options: { hotspot: true },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [defineArrayMember({ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] })]
    }),
    defineField({ name: 'sourceUrl', type: 'url', title: 'Photo / document folder link' }),
    defineField({ name: 'sourceLabel', type: 'string', title: 'Folder link label', initialValue: 'Open event folder' })
  ],
  orderings: [
    { title: 'Newest first', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }
  ],
  preview: {
    select: { title: 'title', subtitle: 'eventDateStart', media: 'image' }
  }
});
