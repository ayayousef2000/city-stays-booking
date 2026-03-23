// src/app/app.tsx
// Root application component.
// Single responsibility: composes the application shell.
// Routing lives in src/app/app-router.tsx.
// Route paths live in src/app/routes.ts.

import type { ReactNode } from 'react';

import { type AuthorizationStatus } from '@/types/auth';
import type { Offer } from '@/types/offer';

import AppRouter from './app-router';

// ── Types ─────────────────────────────────────────────────────────────────────

interface AppProps {
  /**
   * Drives PrivateRoute redirect logic.
   * @remarks Replaced by `useAppSelector(selectAuthorizationStatus)` once the Redux auth slice is integrated.
   */
  authorizationStatus: AuthorizationStatus;
  /**
   * Full rental offer catalogue forwarded to the routing layer.
   * @remarks Replaced by store-connected selectors inside each page once the Redux offer slice is integrated.
   */
  offers: Offer[];
}

// ── Component ─────────────────────────────────────────────────────────────────

function App({ authorizationStatus, offers }: AppProps): ReactNode {
  return (
    <AppRouter authorizationStatus={authorizationStatus} offers={offers} />
  );
}

export default App;
