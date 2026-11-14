import { describe, expect, it } from 'vitest';
// The dashboard's access rules are plain TypeScript, so they're tested here alongside the site.
import { canEditType, editorTypes, isOwner } from '../../../studio/src/access';

const user = (id: string) => ({ id, name: id, email: `${id}@example.com`, roles: [{ name: 'administrator', title: 'Administrator' }] });
const owners = new Set(['owner-1']);

describe('dashboard owner list', () => {
  it('only listed users are owners, even though everyone is a Sanity administrator', () => {
    expect(isOwner(user('owner-1'), owners)).toBe(true);
    expect(isOwner(user('editor-1'), owners)).toBe(false);
    expect(isOwner(null, owners)).toBe(false);
  });

  it('editors can edit products, categories and news only', () => {
    expect([...editorTypes].sort()).toEqual(['event', 'product', 'productCategory']);
    for (const type of ['product', 'productCategory', 'event']) {
      expect(canEditType(user('editor-1'), type, owners)).toBe(true);
    }
    for (const type of ['homePage', 'aboutPage', 'contactPage', 'listingPages', 'siteSettings', 'license']) {
      expect(canEditType(user('editor-1'), type, owners)).toBe(false);
      expect(canEditType(user('owner-1'), type, owners)).toBe(true);
    }
  });

  it('an empty owner list restricts nobody, so the dashboard works before it is configured', () => {
    expect(isOwner(user('anyone'), new Set())).toBe(true);
    expect(canEditType(user('anyone'), 'siteSettings', new Set())).toBe(true);
    expect(isOwner(null, new Set())).toBe(false);
  });
});
