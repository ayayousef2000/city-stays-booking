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
import type { Offer } from '@/types/offer';

import { AppRoute } from './routes';

// ── Types ─────────────────────────────────────────────────────────────────────

interface AppRouterProps {
  /**
   * Drives PrivateRoute redirect logic.
   * @remarks Replaced by `useAppSelector(selectAuthorizationStatus)` once the Redux auth slice is integrated.
   */
  authorizationStatus: AuthorizationStatus;
  /**
   * Full rental offer catalogue distributed to pages that render offer lists.
   * @remarks Replaced by store-connected selectors inside each page once the Redux offer slice is integrated.
   */
  offers: Offer[];
}

// ── Component ─────────────────────────────────────────────────────────────────

function AppRouter({ authorizationStatus, offers }: AppRouterProps): ReactNode {
  return (
    <Routes>
      {/* ── Public routes ─────────────────────────────────────────────── */}

      <Route path={AppRoute.Main} element={<MainPage offers={offers} />} />

      <Route path={AppRoute.Login} element={<LoginPage />} />

      <Route path={AppRoute.Offer} element={<OfferPage offers={offers} />} />

      {/* ── Private routes ────────────────────────────────────────────── */}

      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FavoritesPage offers={offers} />
          </PrivateRoute>
        }
      />

      {/* ── 404 fallback ──────────────────────────────────────────────── */}

      <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
