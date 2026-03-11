// src/vite-env.d.ts
// Type declarations for Vite's special environment variables.
//
// WHY this file:
// Vite replaces `import.meta.env.*` at build time. TypeScript doesn't know
// what keys exist on `import.meta.env` by default. This file:
//   1. Imports Vite's built-in `ImportMetaEnv` interface (gives us MODE, BASE_URL, PROD, DEV)
//   2. Extends it with our own VITE_* variables
//
// HOW to add a new env variable:
//   1. Add it here with its type
//   2. Add it to your .env.local (never commit secrets)
//   3. In CI/Netlify: add it as an environment variable in the dashboard

/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Base URL of the REST API.
   * Set in .env.local for development: VITE_API_BASE_URL=http://localhost:4000
   * Set in Netlify environment variables for production.
   */
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
