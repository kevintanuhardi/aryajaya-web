import type { CurrentUser } from 'sanity';

/**
 * Who can change what in the dashboard.
 *
 * Sanity's free plan only has Administrator and Viewer roles, so every editor is
 * an Administrator in Sanity. Access is therefore decided here, by an owner list:
 *
 * - Owners (user IDs in SANITY_STUDIO_OWNER_IDS) see everything: page text,
 *   menu, site settings, licenses.
 * - Everyone else only sees and edits products, product categories, and
 *   news & events. Layout content is hidden, read-only and can't be published.
 *
 * Find a user's ID: run `npx sanity debug` while logged in as them (or open
 * sanity.io/manage → project → Members). Set it in apps/studio/.env.local:
 *
 *   SANITY_STUDIO_OWNER_IDS=pAbC123,pXyZ789
 *
 * If the list is empty, nobody is restricted (everyone is treated as an owner),
 * so the dashboard keeps working before it's configured.
 *
 * Note: this only exists in the dashboard UI. Editors are still Administrators in
 * Sanity and could change anything through the API or sanity.io/manage, so only
 * invite people you trust and don't share API tokens.
 */
export const editorTypes = new Set(['product', 'productCategory', 'event']);

export const ownerIds = new Set(
  (process.env.SANITY_STUDIO_OWNER_IDS ?? '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
);

type User = Omit<CurrentUser, 'role'> | null | undefined;

export const isOwner = (user: User, owners: Set<string> = ownerIds): boolean =>
  owners.size === 0 ? Boolean(user) : Boolean(user && owners.has(user.id));

export const canEditType = (user: User, schemaType: string, owners: Set<string> = ownerIds): boolean =>
  isOwner(user, owners) || editorTypes.has(schemaType);
