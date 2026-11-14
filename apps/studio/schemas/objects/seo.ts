import { defineField, defineType } from 'sanity';
import { SearchIcon } from '@sanity/icons';

/** Browser tab title and search-engine description for one page. */
export default defineType({
  name: 'seo',
  type: 'object',
  title: 'Search engines (SEO)',
  icon: SearchIcon,
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page title',
      description: 'Shown in the browser tab and as the headline in Google results. Keep it under 60 characters.',
      validation: (rule) => rule.max(70).warning('Long titles are cut off in search results.')
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 2,
      title: 'Page description',
      description: 'The short summary under the title in Google results. Aim for 120–160 characters.',
      validation: (rule) => rule.max(200).warning('Long descriptions are cut off in search results.')
    })
  ],
  preview: { select: { title: 'title', subtitle: 'description' } }
});
