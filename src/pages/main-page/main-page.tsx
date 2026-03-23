// src/pages/main-page/main-page.tsx

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@/app/routes';
import OfferList from '@/components/offer-list';
import type { Offer } from '@/types/offer';

// ── Constants ─────────────────────────────────────────────────────────────────

const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];
const ACTIVE_CITY = 'Amsterdam';

// ── Types ─────────────────────────────────────────────────────────────────────

interface MainPageProps {
  /**
   * Full rental offer catalogue rendered as the main listing.
   * @remarks Replaced by `useAppSelector(selectFilteredOffers)` once the Redux offer slice is integrated.
   */
  offers: Offer[];
}

// ── Component ─────────────────────────────────────────────────────────────────

function MainPage({ offers }: MainPageProps): ReactNode {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className="header__logo-link header__logo-link--active"
                to={AppRoute.Main}
              >
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((city) => (
                <li key={city} className="locations__item">
                  {city === ACTIVE_CITY ? (
                    <span className="locations__item-link tabs__item tabs__item--active">
                      <span>{city}</span>
                    </span>
                  ) : (
                    <Link
                      className="locations__item-link tabs__item"
                      to={AppRoute.Main}
                    >
                      <span>{city}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in {ACTIVE_CITY}
              </b>

              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by </span>
                <span
                  className="places__sorting-type"
                  tabIndex={0}
                  role="button"
                >
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use href="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active">
                    Popular
                  </li>
                  <li className="places__option">Price: low to high</li>
                  <li className="places__option">Price: high to low</li>
                  <li className="places__option">Top rated first</li>
                </ul>
              </form>

              <OfferList
                offers={offers}
                cardType="cities"
                className="cities__places-list places__list tabs__content"
              />
            </section>

            <div className="cities__right-section">
              <section className="cities__map map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
