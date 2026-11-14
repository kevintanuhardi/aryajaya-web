import siteSettings from './siteSettings';
import homePage from './homePage';
import license from './license';
import productCategory from './productCategory';
import product from './product';
import event from './event';

export const schemaTypes = [siteSettings, homePage, productCategory, product, event, license];

/** Document types that exist exactly once (edited from fixed desk items). */
export const singletonTypes = new Set(['siteSettings', 'homePage']);
