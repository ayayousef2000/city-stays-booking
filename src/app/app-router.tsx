// src/app/app-router.tsx
// Routing tree — maps URL paths to page components.
// Single responsibility: owns Routes and nothing else.

import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from '@/components/private-route';
import FavoritesPage from '@/pages/favorites-page';
import LoginPage from '@/pages/login-page';
import MainPage from '@/pages/main-page';
import NotFoundPage from '@/pages/not-found-page';
import OfferPage from '@/pages/offer-page';
import { type AuthorizationStatus } from '@/types/auth';

import { AppRoute } from './routes';

// ── Types ─────────────────────────────────────────────────────────────────────

interface AppRouterProps {
  /**
   * Drives PrivateRoute redirect logic.
   * TODO: Remove once Redux auth slice is implemented.
   * Replace with: const authorizationStatus = useAppSelector(selectAuthorizationStatus);
   */
  authorizationStatus: AuthorizationStatus;
}

// ── Component ─────────────────────────────────────────────────────────────────

function AppRouter({ authorizationStatus }: AppRouterProps): ReactNode {
  return (
    <Routes>
      {/* ── Public routes ─────────────────────────────────────────────── */}

      <Route path={AppRoute.Main} element={<MainPage />} />

      <Route path={AppRoute.Login} element={<LoginPage />} />

      {/* TODO: OfferPage — read :id via useParams(), fetch via fetchOfferAction once Redux is wired. */}
      <Route path={AppRoute.Offer} element={<OfferPage />} />

      {/* ── Private routes ────────────────────────────────────────────── */}

      {/* TODO: Remove authorizationStatus prop once Redux auth slice is implemented. */}
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FavoritesPage />
          </PrivateRoute>
        }
      />

      {/* ── 404 fallback ──────────────────────────────────────────────── */}

      <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
