import { defineField, defineType } from 'sanity';
import { ThListIcon } from '@sanity/icons';

/**
 * Headings, intro text and SEO for the pages that list products, e-catalogue
 * entries and events. The items themselves are edited in their own sections.
 */
export default defineType({
  name: 'listingPages',
  type: 'document',
  title: 'Listing Pages',
  icon: ThListIcon,
  groups: [
    { name: 'products', title: 'Products page', default: true },
    { name: 'ecatalogue', title: 'E-Catalogue page' },
    { name: 'events', title: 'Events page' }
  ],
  fields: [
    defineField({
      name: 'productsIntro',
      type: 'sectionHeading',
      title: 'Page heading',
      description: 'Top of the /products page.',
      group: 'products'
    }),
    defineField({
      name: 'productsEcatalogueTeaser',
      type: 'callToAction',
      title: 'E-Catalogue box',
      description: 'The highlighted box linking to the e-catalogue page. Only shown when at least one product has an e-catalogue link.',
      group: 'products'
    }),
    defineField({ name: 'productsSeo', type: 'seo', title: 'Search engines (SEO)', group: 'products' }),
    defineField({
      name: 'ecatalogueIntro',
      type: 'sectionHeading',
      title: 'Page heading',
      description: 'Top of the /products/e-catalogue page.',
      group: 'ecatalogue'
    }),
    defineField({ name: 'ecatalogueSeo', type: 'seo', title: 'Search engines (SEO)', group: 'ecatalogue' }),
    defineField({
      name: 'eventsIntro',
      type: 'sectionHeading',
      title: 'Page heading',
      description: 'Top of the /events page.',
      group: 'events'
    }),
    defineField({ name: 'eventsSeo', type: 'seo', title: 'Search engines (SEO)', group: 'events' })
  ],
  preview: {
    prepare: () => ({ title: 'Listing Pages', subtitle: 'Products, E-Catalogue and Events' })
  }
});
