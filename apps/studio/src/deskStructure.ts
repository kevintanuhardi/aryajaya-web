import type { StructureResolver } from 'sanity/structure';
import { CalendarIcon, CogIcon, DocumentTextIcon, HomeIcon, PackageIcon, TagIcon } from '@sanity/icons';

const singleton = (S: Parameters<StructureResolver>[0], type: string, id: string, title: string, icon: typeof HomeIcon) =>
  S.listItem()
    .title(title)
    .id(id)
    .icon(icon)
    .child(S.document().title(title).schemaType(type).documentId(id));

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Arjaya Content')
    .items([
      singleton(S, 'homePage', 'homePageSingleton', 'Home Page', HomeIcon),
      singleton(S, 'siteSettings', 'siteSettingsSingleton', 'Site Settings', CogIcon),
      S.divider(),
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
        ),
      S.documentTypeListItem('event').title('Events').icon(CalendarIcon),
      S.documentTypeListItem('license').title('Licenses & Compliance').icon(DocumentTextIcon)
    ]);
