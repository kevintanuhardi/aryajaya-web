import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { structure } from './src/deskStructure';

const projectId = process.env.SANITY_PROJECT_ID || 'yourProjectId';
const dataset = process.env.SANITY_DATASET || 'production';

export default defineConfig({
  name: 'aryajaya-studio',
  title: 'Arjaya Langgeng Medika CMS',
  projectId,
  dataset,
  plugins: [deskTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes
  }
});
