// src/components/private-route/private-route.tsx
// Guards routes that require authentication.
//
// USAGE:
//   <Route
//     path="/favorites"
//     element={
//       <PrivateRoute authorizationStatus={authorizationStatus}>
//         <FavoritesPage />
//       </PrivateRoute>
//     }
//   />
//
// WHY the `Unknown` state renders `null`:
// Renders a blank screen to avoid a flash of the login redirect while the
// auth check is in flight. Replace with <LoadingSpinner /> once the Redux
// auth slice is implemented.

import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '@/app/routes';
import { AuthorizationStatus } from '@/types/auth';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PrivateRouteProps {
  /** Current authorization state — drives redirect logic. */
  authorizationStatus: AuthorizationStatus;
  /** The protected page component to render when authorized. */
  children: ReactNode;
}

// ── Component ─────────────────────────────────────────────────────────────────

function PrivateRoute({
  authorizationStatus,
  children,
}: PrivateRouteProps): ReactNode {
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return <Navigate to={AppRoute.Login} replace />;
  }

  return children;
}

export default PrivateRoute;
