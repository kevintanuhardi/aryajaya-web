import { defineArrayMember, defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';

/** Kept as `event` internally so existing documents and /events URLs keep working. */
export const postKinds = [
  { title: 'News', value: 'news' },
  { title: 'Event', value: 'event' },
  { title: 'Article', value: 'article' }
];

const isEvent = (document: Record<string, unknown> | undefined) => (document?.kind ?? 'event') === 'event';

export default defineType({
  name: 'event',
  type: 'document',
  title: 'News & Events',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'kind',
      type: 'string',
      title: 'Type',
      options: { list: postKinds, layout: 'radio', direction: 'horizontal' },
      initialValue: 'news',
      validation: (rule) => rule.required()
    }),
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
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'Posts are listed newest first by this date. News and articles show this date.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'eventDateStart',
      type: 'date',
      title: 'Event start date',
      description: 'Used for search engines.',
      hidden: ({ document }) => !isEvent(document),
      validation: (rule) =>
        rule.custom((value, { document }) => (isEvent(document) && !value ? 'Events need a start date.' : true))
    }),
    defineField({
      name: 'eventDate',
      type: 'string',
      title: 'Event date label',
      description: 'How the date is written on the site, e.g. “August 15-16, 2025”. Leave empty to use the start date.',
      hidden: ({ document }) => !isEvent(document)
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      title: 'Excerpt',
      description: 'Shown on the card and used as the page description for search engines.',
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
    defineField({ name: 'sourceUrl', type: 'url', title: 'Photo / document folder link (optional)' }),
    defineField({ name: 'sourceLabel', type: 'string', title: 'Folder link label', initialValue: 'Open folder' })
  ],
  orderings: [{ title: 'Newest first', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', kind: 'kind', publishedAt: 'publishedAt', media: 'image' },
    prepare: ({ title, kind, publishedAt, media }) => ({
      title,
      subtitle: [postKinds.find((k) => k.value === (kind ?? 'event'))?.title, publishedAt?.slice(0, 10)]
        .filter(Boolean)
        .join(' · '),
      media
    })
  }
});
