import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes, singletonTypes } from './schemas';
import { structure } from './src/deskStructure';
import { arjayaTheme } from './src/theme';
import { StudioLogo } from './src/StudioLogo';
import { canEditType, isAdmin } from './src/access';

// Only variables prefixed with SANITY_STUDIO_ are exposed to the Studio in the browser.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

if (!projectId) {
  throw new Error('Missing SANITY_STUDIO_PROJECT_ID. Copy apps/studio/.env.example to apps/studio/.env.local and fill it in.');
}

export default defineConfig({
  name: 'aryajaya-studio',
  title: 'Arjaya Langgeng Medika',
  projectId,
  dataset,
  icon: StudioLogo,
  theme: arjayaTheme,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: '2024-01-01' })],
  // The query tool (Vision) is for administrators only.
  tools: (tools, { currentUser }) => (isAdmin(currentUser) ? tools : tools.filter((tool) => tool.name !== 'vision')),
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      // Hide "create new" for singletons; they are opened from fixed desk items.
      ...templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
      {
        id: 'product-by-category',
        title: 'Product in category',
        schemaType: 'product',
        parameters: [{ name: 'categoryId', type: 'string' }],
        value: (params: { categoryId: string }) => ({ category: { _type: 'reference', _ref: params.categoryId } })
      }
    ]
  },
  document: {
    // "Create new" menus only offer what the current user may edit.
    newDocumentOptions: (items, { currentUser }) =>
      items.filter((item) => canEditType(currentUser, item.templateId === 'product-by-category' ? 'product' : item.templateId)),
    actions: (input, context) => {
      // Non-admins can't publish, delete or duplicate layout documents.
      if (!canEditType(context.currentUser, context.schemaType)) return [];
      // Singletons can be edited and published, but not duplicated or deleted.
      return singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input;
    }
  }
});
