// src/index.tsx
// Application entry point.
//
// Provider hierarchy (outermost → innermost):
//   HelmetProvider  — manages <head> tags (title, meta, og) per-page
//   BrowserRouter   — provides routing context to all React Router hooks
//   App             — root component tree + Routes

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

import App from '@/app/app';
import { MOCK_OFFERS } from '@/mocks/offers';
import { AuthorizationStatus } from '@/types/auth';

// WHY NoAuth as the initial status:
// The server and Redux auth slice are not yet integrated. The task requires
// that unauthenticated state is the starting condition for all scaffold pages.
const AUTHORIZATION_STATUS = AuthorizationStatus.NoAuth;

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    '[City Stays] Root element #root not found in index.html. ' +
      'Check that public/index.html contains <div id="root"></div>.',
  );
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter
        future={{
          // Opt in to React Router v7 behaviour early — no breaking changes.
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App authorizationStatus={AUTHORIZATION_STATUS} offers={MOCK_OFFERS} />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
