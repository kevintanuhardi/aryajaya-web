/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

// getViteConfig gives tests the same Vite setup as `astro build`
// (import.meta.env handling, tsconfig and .astro resolution).
export default getViteConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
    // Each test file runs in its own process, so env stubs and module state never leak.
    pool: 'forks',
    unstubEnvs: true,
    unstubGlobals: true,
    restoreMocks: true
  }
});
