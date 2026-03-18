// src/pages/favorites-page/index.tsx
// Scaffold page — hardcoded mock favorites until Redux store is wired up.
// TODO: Replace static cards with useAppSelector(selectFavoriteOffers)
// TODO: Replace header user data with useAppSelector(selectUserData)
// TODO: Group favorites by city dynamically from the store
//
// WHY `ReactNode` instead of `JSX.Element`:
// `JSX.Element` is a legacy type alias for `React.ReactElement<any, any>`.
// React 18 components can return null, strings, arrays, or Fragments —
// none of which satisfy `JSX.Element`. `ReactNode` is the correct union type.
//
// WHY `href` instead of `xlinkHref` on <use>:
// `xlinkHref` was part of the SVG 1.1 / XLink namespace and was deprecated
// in SVG 2.0. React 18 removed support entirely and emits a console warning.
// The plain `href` attribute is the correct modern syntax.

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@/app/routes';

function FavoritesPage(): ReactNode {
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="City stays booking"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={AppRoute.Main}>
                      <span>Amsterdam</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  <article className="favorites__card place-card">
                    <div className="place-card__mark">
                      <span>Premium</span>
                    </div>
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <Link to={AppRoute.Offer}>
                        <img
                          className="place-card__image"
                          src="img/apartment-small-03.jpg"
                          width="150"
                          height="110"
                          alt="Nice cozy apartment"
                        />
                      </Link>
                    </div>
                    <div className="favorites__card-info place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;180</b>
                          <span className="place-card__price-text">
                            &#47;&nbsp;night
                          </span>
                        </div>
                        <button
                          className="place-card__bookmark-button place-card__bookmark-button--active button"
                          type="button"
                          aria-label="Remove from bookmarks"
                        >
                          <svg
                            className="place-card__bookmark-icon"
                            width="18"
                            height="19"
                          >
                            {/* `href` replaces deprecated `xlinkHref` — SVG 2.0 + React 18 */}
                            <use href="#icon-bookmark" />
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{ width: '100%' }} />
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <Link to={AppRoute.Offer}>
                          Nice, cozy, warm big bed apartment
                        </Link>
                      </h2>
                      <p className="place-card__type">Apartment</p>
                    </div>
                  </article>

                  <article className="favorites__card place-card">
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <Link to={AppRoute.Offer}>
                        <img
                          className="place-card__image"
                          src="img/room-small.jpg"
                          width="150"
                          height="110"
                          alt="Wood and stone room"
                        />
                      </Link>
                    </div>
                    <div className="favorites__card-info place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;80</b>
                          <span className="place-card__price-text">
                            &#47;&nbsp;night
                          </span>
                        </div>
                        <button
                          className="place-card__bookmark-button place-card__bookmark-button--active button"
                          type="button"
                          aria-label="Remove from bookmarks"
                        >
                          <svg
                            className="place-card__bookmark-icon"
                            width="18"
                            height="19"
                          >
                            <use href="#icon-bookmark" />
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{ width: '80%' }} />
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <Link to={AppRoute.Offer}>Wood and stone place</Link>
                      </h2>
                      <p className="place-card__type">Private room</p>
                    </div>
                  </article>
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={AppRoute.Main}>
                      <span>Cologne</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  <article className="favorites__card place-card">
                    <div className="favorites__image-wrapper place-card__image-wrapper">
                      <Link to={AppRoute.Offer}>
                        <img
                          className="place-card__image"
                          src="img/apartment-small-04.jpg"
                          width="150"
                          height="110"
                          alt="White castle apartment"
                        />
                      </Link>
                    </div>
                    <div className="favorites__card-info place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;180</b>
                          <span className="place-card__price-text">
                            &#47;&nbsp;night
                          </span>
                        </div>
                        <button
                          className="place-card__bookmark-button place-card__bookmark-button--active button"
                          type="button"
                          aria-label="Remove from bookmarks"
                        >
                          <svg
                            className="place-card__bookmark-icon"
                            width="18"
                            height="19"
                          >
                            <use href="#icon-bookmark" />
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{ width: '100%' }} />
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <Link to={AppRoute.Offer}>White castle</Link>
                      </h2>
                      <p className="place-card__type">Apartment</p>
                    </div>
                  </article>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="City stays booking"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
