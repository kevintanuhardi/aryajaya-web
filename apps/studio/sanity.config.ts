import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes, singletonTypes } from './schemas';
import { structure } from './src/deskStructure';
import { arjayaTheme } from './src/theme';
import { StudioLogo } from './src/StudioLogo';

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
    // Singletons can be edited and published, but not duplicated or deleted.
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input
  }
});
