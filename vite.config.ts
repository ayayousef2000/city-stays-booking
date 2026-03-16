/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // babel-plugin-react-compiler (React 19 prep) — safe to include now.
      // If your React version doesn't support it yet, remove this option.
      // babel: { plugins: ['babel-plugin-react-compiler'] },
    }),
  ],

  // ── Path Aliases ───────────────────────────────────────────────────────────
  // WHY: Must mirror tsconfig.json `paths` exactly.
  // Vite resolves modules at bundle time; TS resolves at type-check time.
  // Both must agree for `@/` imports to work without errors.
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // ── Dev Server ─────────────────────────────────────────────────────────────
  server: {
    // Open the browser automatically on `npm start`.
    // Default port is 5173 (Vite native default — no override needed).
    open: true,
    // Enable CORS for local API proxying if needed.
    // proxy: { '/api': 'http://localhost:4000' },
  },

  // ── Production Build ───────────────────────────────────────────────────────
  build: {
    // Generate source maps for production.
    // WHY: Netlify + Sentry (or any error tracker) needs source maps to
    // show original TypeScript source in error stack traces.
    sourcemap: true,

    // Minimum chunk size warning threshold — default is 500kb which is
    // too aggressive for a map-heavy app (Leaflet is ~150kb).
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Manual chunk splitting keeps the initial bundle small.
        // WHY: Leaflet + React-Leaflet (~200kb) should only load when a
        // map page is visited, not on login or the home splash screen.
        manualChunks: {
          // Vendor chunk: React core — changes rarely, long cache TTL.
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // Redux chunk: state management libraries.
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],

          // Map chunk: Leaflet is large; lazy-load it separately.
          'vendor-map': ['leaflet', 'react-leaflet'],
        },
      },
    },
  },

  // ── Vitest Configuration ───────────────────────────────────────────────────
  test: {
    // Makes describe/it/expect available globally without importing.
    // Matches the `types: ["vitest/globals"]` setting in tsconfig.json.
    globals: true,

    // jsdom simulates a browser DOM environment for React component testing.
    environment: 'jsdom',

    // Runs once before all test files — sets up @testing-library/jest-dom
    // custom matchers (toBeInTheDocument, toHaveClass, etc.).
    setupFiles: ['./src/setupTests.ts'],

    // Include test files from all these patterns.
    include: ['src/**/*.{test,spec}.{ts,tsx}'],

    // Exclude build artifacts and node_modules from test discovery.
    exclude: ['node_modules', 'dist', 'coverage'],

    coverage: {
      // v8 uses Node's built-in V8 coverage — faster than Istanbul.
      provider: 'v8',

      // Output folder for coverage reports.
      reportsDirectory: './coverage',

      // Formats: text (terminal), html (browser), lcov (CI upload to Coveralls/Codecov).
      reporter: ['text', 'html', 'lcov'],

      // Only measure coverage in src/ — exclude test utilities and type files.
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        // Test files themselves
        'src/**/*.{test,spec}.{ts,tsx}',
        'src/**/__tests__/**',
        'src/setupTests.ts',
        'src/**/*.d.ts',

        // Type-only files add no runtime coverage value.
        'src/types/**',

        // Entry point — trivial bootstrap code, not meaningful to test
        'src/index.tsx',

        // Scaffold pages — temporary hardcoded UI pending Redux integration.
        // These will be fully rewritten and tested once the store is wired up.
        // TODO: Remove these exclusions as each page is properly implemented.
        'src/pages/main-page/**',
        'src/pages/favorites-page/**',
        'src/pages/login-page/**',
        'src/pages/offer-page/**',

        // App.tsx is a thin router shell — covered indirectly by page tests
        'src/App.tsx',

        // Routing layer — scaffold pending Redux auth integration.
        // TODO: Remove these exclusions once PrivateRoute and AppRouter tests are written.
        'src/app/**',
        'src/components/private-route/**',
        'src/pages/not-found-page/**',
      ],

      // Minimum thresholds enforced in CI. Fail the build if coverage drops below.
      // Start conservative and raise as the test suite matures.
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 80,
        statements: 90,
      },
    },
  },
});
