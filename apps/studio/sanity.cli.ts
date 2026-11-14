import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    // SANITY_PROJECT_ID / SANITY_DATASET are still accepted for older .env files.
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || 'production'
  }
});
