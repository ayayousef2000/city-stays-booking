// src/index.tsx
// Application entry point.
//
// Provider hierarchy (outermost → innermost):
//   HelmetProvider  — manages <head> tags (title, meta, og) per-page
//   BrowserRouter   — provides routing context to all React Router hooks
//   App             — root component tree + Routes
//
// TODO — Redux integration (next architectural step):
// When @reduxjs/toolkit store is created, wrap with <Provider store={store}>
// between HelmetProvider and BrowserRouter. Then:
//   1. Remove the `authorizationStatus` prop from App.
//   2. In App.tsx, read: const authorizationStatus = useAppSelector(selectAuthorizationStatus)
//   3. In the auth slice, set initialState.status = AuthorizationStatus.Unknown
//      and dispatch checkAuthAction() from App's useEffect on mount.

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

import App from '@/App';
import { AuthorizationStatus } from '@/types/auth';

// Temporary scaffold constant.
// Per task requirement: "the user is always unauthorized" until the real
// server and Redux auth slice are implemented.
// TODO: Remove once Redux auth slice dispatches checkAuthAction() on boot.
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
        <App authorizationStatus={AUTHORIZATION_STATUS} />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
