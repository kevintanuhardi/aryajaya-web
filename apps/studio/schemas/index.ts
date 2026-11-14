import siteSettings from './siteSettings';
import homePage from './homePage';
import aboutPage from './aboutPage';
import contactPage from './contactPage';
import listingPages from './listingPages';
import license from './license';
import productCategory from './productCategory';
import product from './product';
import event from './event';
import sectionHeading from './objects/sectionHeading';
import callToAction from './objects/callToAction';
import seo from './objects/seo';
import { editorTypes, isAdmin } from '../src/access';

/** Layout/page documents: read-only for anyone who isn't an administrator (see src/access.ts). */
const adminOnly = <T extends { name: string }>(type: T): T =>
  editorTypes.has(type.name)
    ? type
    : { ...type, readOnly: ({ currentUser }: { currentUser?: Parameters<typeof isAdmin>[0] }) => !isAdmin(currentUser) };

const documentTypes = [
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  listingPages,
  productCategory,
  product,
  event,
  license
].map(adminOnly);

export const schemaTypes = [
  // Reusable field groups
  sectionHeading,
  callToAction,
  seo,
  ...documentTypes
];

/** Document types that exist exactly once (edited from fixed desk items). */
export const singletonTypes = new Set(['siteSettings', 'homePage', 'aboutPage', 'contactPage', 'listingPages']);
