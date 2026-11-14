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

export const schemaTypes = [
  // Reusable field groups
  sectionHeading,
  callToAction,
  seo,
  // Documents
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  listingPages,
  productCategory,
  product,
  event,
  license
];

/** Document types that exist exactly once (edited from fixed desk items). */
export const singletonTypes = new Set(['siteSettings', 'homePage', 'aboutPage', 'contactPage', 'listingPages']);
