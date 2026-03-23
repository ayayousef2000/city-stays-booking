// src/pages/favorites-page/favorites-page.tsx
// Renders the user's bookmarked offers grouped by city.
//
// WHY derive `offersByCity` inline rather than in a memoised selector:
// The grouping is pure computation over at most a handful of mock items.
// Introducing useMemo or createSelector before the Redux store exists would be
// premature optimisation. The helper function is written as a pure function so
// it migrates to a Redux selector without modification.

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@/app/routes';
import OfferCard from '@/components/offer-card';
import type { Offer } from '@/types/offer';

// ── Types ─────────────────────────────────────────────────────────────────────

interface FavoritesPageProps {
  /**
   * Full rental offer catalogue. The page filters to `isBookmarked === true`
   * and groups by city internally.
   * @remarks Replaced by `useAppSelector(selectFavoriteOffers)` once the Redux offer slice is integrated.
   */
  offers: Offer[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Groups an array of offers by their city field.
 * Returns a Map to preserve insertion order for stable rendering.
 */
function groupOffersByCity(offers: Offer[]): Map<string, Offer[]> {
  return offers.reduce<Map<string, Offer[]>>((acc, offer) => {
    const group = acc.get(offer.city) ?? [];
    group.push(offer);
    acc.set(offer.city, group);
    return acc;
  }, new Map());
}

// ── Component ─────────────────────────────────────────────────────────────────

function FavoritesPage({ offers }: FavoritesPageProps): ReactNode {
  const favoriteOffers = offers.filter((offer) => offer.isBookmarked);
  const offersByCity = groupOffersByCity(favoriteOffers);

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
                    <span className="header__favorite-count">
                      {favoriteOffers.length}
                    </span>
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
              {Array.from(offersByCity.entries()).map(([city, cityOffers]) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to={AppRoute.Main}>
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <OfferCard
                        key={offer.id}
                        id={offer.id}
                        imageUrl={offer.imageUrl}
                        title={offer.title}
                        price={offer.price}
                        rating={offer.rating}
                        type={offer.type}
                        isPremium={offer.isPremium}
                        isBookmarked={offer.isBookmarked}
                        cardType="favorites"
                      />
                    ))}
                  </div>
                </li>
              ))}
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
