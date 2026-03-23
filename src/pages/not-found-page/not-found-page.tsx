// src/pages/not-found-page/not-found-page.tsx
// 404 Not Found page.

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@/app/routes';

import styles from './not-found-page.module.css';

// ── Component ─────────────────────────────────────────────────────────────────

function NotFoundPage(): ReactNode {
  return (
    <div className={`page page--gray ${styles.page}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="/img/logo.svg"
                  alt="City stays booking"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className={styles.hero}>
          {/* aria-hidden: the <h1> below already communicates "Page not found" */}
          <p className={styles.errorCode} aria-hidden="true">
            404
          </p>

          {/* Decorative divider */}
          <hr className={styles.divider} aria-hidden="true" />

          <h1 className={styles.heading}>Page not found</h1>

          <p className={styles.body}>
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back to exploring great places to stay.
          </p>

          <div className={styles.ctaWrapper}>
            <Link
              to={AppRoute.Main}
              className={`${styles.cta} ${styles.ctaPrimary}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 3L5 8L10 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to home
            </Link>

            <Link
              to={AppRoute.Login}
              className={`${styles.cta} ${styles.ctaSecondary}`}
            >
              Sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
