// src/test-utils/render-with-router.tsx
// Shared rendering utility for components that require a Router context.
//
// WHY a shared utility instead of inline MemoryRouter in every test:
// - Single place to set React Router v7 future flags — no repetition.
// - When upgrading to v7, remove the `future` prop here and every test
//   is updated in one diff.
// - Keeps test files focused on behaviour, not boilerplate setup.
//
// USAGE:
//   import { renderWithRouter } from '@/test-utils/render-with-router';
//
//   renderWithRouter(<MyComponent />, { initialEntries: ['/offer/123'] });

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import type { RenderResult } from '@testing-library/react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface RenderWithRouterOptions {
  /**
   * The initial URL(s) to populate the history stack with.
   * Defaults to ['/'] — the root route.
   *
   * Pass multiple entries to simulate navigation history:
   *   initialEntries: ['/login', '/favorites']
   *
   * The last entry in the array is the current location.
   */
  initialEntries?: string[];

  /**
   * The index of the active entry in `initialEntries`.
   * Defaults to the last entry.
   */
  initialIndex?: number;
}

// ── Utility ───────────────────────────────────────────────────────────────────

/**
 * Renders a React component wrapped in a MemoryRouter.
 *
 * Use this for any component that uses React Router hooks or components
 * (<Link>, <NavLink>, useNavigate, useParams, etc.).
 *
 * MemoryRouter is the correct router for unit tests — it keeps history
 * entirely in memory and never touches the browser's URL bar, making
 * tests fast, isolated, and deterministic.
 */
function renderWithRouter(
  ui: React.ReactNode,
  { initialEntries = ['/'], initialIndex }: RenderWithRouterOptions = {},
): RenderResult {
  return render(
    <MemoryRouter
      initialEntries={initialEntries}
      initialIndex={initialIndex}
      future={{
        // Opt in to React Router v7 behaviour early.
        // Mirrors the flags set on <BrowserRouter> in src/index.tsx.
        // Set once here — all tests using this utility stay in sync.
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {ui}
    </MemoryRouter>,
  );
}

export { renderWithRouter };
export type { RenderWithRouterOptions };
