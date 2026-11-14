import type { CurrentUser } from 'sanity';

/**
 * Who can change what in the dashboard.
 *
 * - Administrators (Sanity "Administrator" role) see everything: page text,
 *   menu, site settings, licenses.
 * - Everyone else (e.g. the "Editor" role) only sees and edits products,
 *   product categories, and news & events. Layout content is hidden and read-only.
 *
 * Invite editors at sanity.io/manage → project → Members with the "Editor" role.
 *
 * Note: this is enforced in the Studio UI. On Sanity's non-Enterprise plans the
 * Editor role can still write any document through the API, so only share API
 * tokens with administrators.
 */
export const editorTypes = new Set(['product', 'productCategory', 'event']);

export const isAdmin = (user: Omit<CurrentUser, 'role'> | null | undefined): boolean =>
  Boolean(user?.roles?.some((role) => role.name === 'administrator'));

export const canEditType = (user: Omit<CurrentUser, 'role'> | null | undefined, schemaType: string): boolean =>
  isAdmin(user) || editorTypes.has(schemaType);
