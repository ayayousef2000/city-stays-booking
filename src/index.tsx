// src/index.tsx
// Application entry point.
//
// Provider hierarchy (outermost → innermost):
//   HelmetProvider  — manages <head> tags (title, meta, og) per-page
//   BrowserRouter   — provides routing context to all React Router hooks
//   App             — root component tree
//
// TODO — Redux integration (next architectural step):
// When @reduxjs/toolkit store is created, wrap with <Provider store={store}>
// between HelmetProvider and BrowserRouter. The RENTAL_OFFERS_COUNT constant
// below should move to the store's initial state and be read via a selector.
//
// VITE ENV NOTE:
// This project uses Vite. Environment variables are accessed via
// `import.meta.env.VITE_*`, NOT `process.env.REACT_APP_*`.

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

import App from '@/App';

// Temporary scaffold constant.
// TODO: Move to Redux initial state once store is wired up.
const RENTAL_OFFERS_COUNT = 315;

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
          // Opt in to React Router v7 behaviour early.
          // Silences the two future flag warnings in the console.
          // Safe to enable now — no breaking changes for our current usage.
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App offersCount={RENTAL_OFFERS_COUNT} />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
