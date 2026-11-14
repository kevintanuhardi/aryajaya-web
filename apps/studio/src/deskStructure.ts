import type { StructureResolver } from 'sanity/structure';
import {
  CalendarIcon,
  CogIcon,
  DocumentsIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  HomeIcon,
  InfoOutlineIcon,
  PackageIcon,
  TagIcon,
  ThListIcon
} from '@sanity/icons';
import { isOwner } from './access';

const singleton = (S: Parameters<StructureResolver>[0], type: string, id: string, title: string, icon: typeof HomeIcon) =>
  S.listItem()
    .title(title)
    .id(id)
    .icon(icon)
    .child(S.document().title(title).schemaType(type).documentId(id));

type Builder = Parameters<StructureResolver>[0];

const productsItem = (S: Builder) =>
  S.listItem()
    .title('Products')
    .icon(PackageIcon)
    .child(
      S.list()
        .title('Products')
        .items([
          S.listItem()
            .title('All products')
            .icon(PackageIcon)
            .child(S.documentTypeList('product').title('All products').defaultOrdering([{ field: 'title', direction: 'asc' }])),
          S.listItem()
            .title('By category')
            .icon(TagIcon)
            .child(
              S.documentTypeList('productCategory')
                .title('By category')
                .child((categoryId) =>
                  S.documentList()
                    .title('Products')
                    .schemaType('product')
                    .filter('_type == "product" && category._ref == $categoryId')
                    .params({ categoryId })
                    .initialValueTemplates([S.initialValueTemplateItem('product-by-category', { categoryId })])
                )
            ),
          S.divider(),
          S.documentTypeListItem('productCategory').title('Categories').icon(TagIcon)
        ])
    );

const newsItem = (S: Builder) =>
  S.listItem()
    .title('News & Events')
    .icon(CalendarIcon)
    .child(
      S.documentTypeList('event')
        .title('News & Events')
        .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
    );

/** Editors see only products and news; owners (src/access.ts) also see pages, settings and licenses. */
export const structure: StructureResolver = (S, context) => {
  if (!isOwner(context.currentUser)) {
    return S.list().title('Arjaya Content').items([productsItem(S), newsItem(S)]);
  }

  return S.list()
    .title('Arjaya Content')
    .items([
      productsItem(S),
      newsItem(S),
      S.divider(),
      S.listItem()
        .title('Pages (owner)')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              singleton(S, 'homePage', 'homePageSingleton', 'Home Page', HomeIcon),
              singleton(S, 'aboutPage', 'aboutPageSingleton', 'About Page', InfoOutlineIcon),
              singleton(S, 'contactPage', 'contactPageSingleton', 'Contact Page', EnvelopeIcon),
              singleton(S, 'listingPages', 'listingPagesSingleton', 'Products, E-Catalogue & News Pages', ThListIcon)
            ])
        ),
      singleton(S, 'siteSettings', 'siteSettingsSingleton', 'Site Settings (owner)', CogIcon),
      S.documentTypeListItem('license').title('Licenses & Compliance (owner)').icon(DocumentTextIcon)
    ]);
};
