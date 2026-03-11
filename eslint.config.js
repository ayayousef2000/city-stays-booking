// eslint.config.js
// ESLint v9 flat config for City Stays Booking
// Uses typed linting via @typescript-eslint/recommended-type-checked
// for maximum type-safety coverage at the lint layer.

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // ── Global ignores ──────────────────────────────────────────────────────────
  // These paths are never linted. vite.config.ts is excluded here because it
  // runs in Node/Vite context and uses different TS settings (tsconfig.node.json).
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'node_modules/**',
      'vite.config.ts',
      'commitlint.config.cjs',
      '*.config.cjs',
    ],
  },

  // ── Base config for all TypeScript / TSX source files ───────────────────────
  {
    files: ['src/**/*.{ts,tsx}'],

    extends: [
      // ESLint core recommended rules (no-unused-vars, no-undef, etc.)
      js.configs.recommended,

      // TypeScript-ESLint type-checked rules.
      // WHY recommended-type-checked over plain recommended:
      // It uses the TypeScript compiler API to catch bugs that are invisible
      // to plain AST linting — e.g. floating promises, unsafe assignments,
      // unsafe member access on `any`, unbound method references.
      ...tseslint.configs.recommendedTypeChecked,

      // Stylistic rules — enforce consistent TS idioms (type assertions,
      // array types, consistent interface vs type, etc.)
      ...tseslint.configs.stylisticTypeChecked,

      // Disables ESLint formatting rules that conflict with Prettier.
      // MUST be last in extends so it can override everything above.
      prettier,
    ],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        // Array form lets you cover multiple tsconfig files if needed.
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },

    settings: {
      // Auto-detect React version so react/jsx-runtime rules work correctly.
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          // Reads path aliases from tsconfig.json so import/no-unresolved
          // understands @/ absolute imports.
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },

    rules: {
      // ── React ──────────────────────────────────────────────────────────────

      // Spread recommended rules from the plugin object (flat-config compatible).
      ...reactPlugin.configs.recommended.rules,

      // React 17+ new JSX transform — no need to import React in every file.
      ...reactPlugin.configs['jsx-runtime'].rules,

      // Spread recommended hooks rules.
      ...reactHooks.configs.recommended.rules,

      // Warn (not error) when non-component things are exported from a module,
      // which would break React Fast Refresh HMR in development.
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Turned off: TypeScript's own type system makes prop-types redundant.
      'react/prop-types': 'off',

      // Enforce self-closing tags for components without children.
      'react/self-closing-comp': ['error', { component: true, html: true }],

      // Disallow dangerous use of innerHTML / dangerouslySetInnerHTML
      // unless explicitly acknowledged.
      'react/no-danger': 'warn',

      // Catch accidental direct state mutation.
      'react/no-direct-mutation-state': 'error',

      // ── JSX Accessibility ──────────────────────────────────────────────────

      ...jsxA11y.configs.recommended.rules,

      // ── TypeScript ─────────────────────────────────────────────────────────

      // Require explicit return types on exported functions and class methods.
      // WHY: Prevents accidental widening of return types (e.g. returning `any`
      // from an API call handler) from propagating silently.
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      // Ban `any` on function parameters — use `unknown` and narrow instead.
      '@typescript-eslint/no-explicit-any': 'error',

      // Treat floating Promises (fire-and-forget async calls with no
      // catch/await) as errors. These silently swallow exceptions in prod.
      '@typescript-eslint/no-floating-promises': 'error',

      // Disallow awaiting non-Promise values — catches copy-paste bugs.
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],

      // Consistent array type syntax: prefer `T[]` over `Array<T>`.
      '@typescript-eslint/array-type': ['error', { default: 'array' }],

      // Prefer `interface` for object shapes, `type` for unions/intersections.
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // Enforce `import type` for type-only imports — improves tree-shaking
      // and eliminates circular dependency edge cases at build time.
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      // Warn on non-null assertions (!) — use optional chaining or guards.
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // ── General Code Quality ───────────────────────────────────────────────

      // Only allow console.warn and console.error in production code.
      // console.log is a development artifact that should never reach main.
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // Require === and !== everywhere. The only sane default.
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      // Disallow `var` — use `const` / `let`.
      'no-var': 'error',

      // Prefer `const` where a variable is never reassigned.
      'prefer-const': 'error',

      // ── Import Ordering ────────────────────────────────────────────────────
      // WHY: Consistent import order improves readability and prevents circular
      // dependency issues from being masked by random ordering.

      'import/order': [
        'error',
        {
          groups: [
            'builtin',    // Node built-ins (path, fs)
            'external',   // npm packages
            'internal',   // @/ path aliases
            'parent',     // ../
            'sibling',    // ./
            'index',      // ./index
            'type',       // import type ...
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            {
              // Treat React and React ecosystem packages as the very first group.
              pattern: 'react{,-*}',
              group: 'external',
              position: 'before',
            },
            {
              // @/ aliases are internal.
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],

      // Disallow duplicate imports of the same module.
      'import/no-duplicates': 'error',
    },
  },

  // ── Test file overrides ──────────────────────────────────────────────────────
  // Test files have legitimate reasons to use patterns disallowed in prod code.
  {
    files: ['src/**/*.{test,spec}.{ts,tsx}', 'src/**/__tests__/**/*.{ts,tsx}'],
    rules: {
      // Unbound methods (e.g. expect(fn).toHaveBeenCalledWith) are fine in tests.
      '@typescript-eslint/unbound-method': 'off',

      // Test factories and mocks often require `any` for flexibility.
      '@typescript-eslint/no-explicit-any': 'off',

      // Test helpers (describe, it, beforeEach) don't need explicit return types.
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // console.log is acceptable in test debug output.
      'no-console': 'off',
    },
  },
);
