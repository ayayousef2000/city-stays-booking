// src/App.tsx
// Root application component.
// Single responsibility: composes the application shell.
// Routing lives in src/app/app-router.tsx.
// Route paths live in src/app/routes.ts.

import type { ReactNode } from 'react';

import AppRouter from '@/app/app-router';
import { type AuthorizationStatus } from '@/types/auth';

// ── Types ─────────────────────────────────────────────────────────────────────

interface AppProps {
  /**
   * Drives PrivateRoute redirect logic.
   * TODO: Remove once Redux auth slice is implemented.
   * Replace with: const authorizationStatus = useAppSelector(selectAuthorizationStatus);
   */
  authorizationStatus: AuthorizationStatus;
}

// ── Component ─────────────────────────────────────────────────────────────────

function App({ authorizationStatus }: AppProps): ReactNode {
  return <AppRouter authorizationStatus={authorizationStatus} />;
}

export default App;
