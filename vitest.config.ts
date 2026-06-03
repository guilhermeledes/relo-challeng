import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ['test/vitest/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
    },
  },
});
