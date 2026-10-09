import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ['app/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
    },
  },
});
