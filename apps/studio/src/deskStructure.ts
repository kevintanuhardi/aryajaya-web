import type { StructureBuilder } from 'sanity/desk';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Konten Arjaya')
    .items([
      S.listItem()
        .title('Site Settings')
        .schemaType('siteSettings')
        .child(
          S.document()
            .title('Site Settings')
            .schemaType('siteSettings')
            .documentId('siteSettingsSingleton')
        ),
      S.divider(),
      S.documentTypeListItem('productCategory').title('Kategori Produk'),
      S.documentTypeListItem('product').title('Produk'),
      S.documentTypeListItem('license').title('Licenses & Compliance')
    ]);
