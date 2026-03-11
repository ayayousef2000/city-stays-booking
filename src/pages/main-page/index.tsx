// src/pages/main-page/index.tsx
// Scaffold page — hardcoded mock data until Redux store is wired up.
// TODO: Replace MOCK_OFFERS with useAppSelector(selectFilteredOffers)
// TODO: Replace hardcoded city tabs with useAppSelector(selectCities)
// TODO: Replace header user data with useAppSelector(selectUserData)

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import OfferCard from '@/components/offer-card';
import type { OfferCardProps } from '@/components/offer-card';

// ── Types ─────────────────────────────────────────────────────────────────────

interface MainPageProps {
  offersCount: number;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────
// Temporary scaffold — will be replaced by Redux store data.

const MOCK_OFFERS: OfferCardProps[] = [
  {
    id: '1',
    imageUrl: 'img/apartment-01.jpg',
    title: 'Beautiful & luxurious apartment at great location',
    price: 120,
    rating: 4,
    type: 'Apartment',
    isPremium: true,
    isBookmarked: false,
  },
  {
    id: '2',
    imageUrl: 'img/room.jpg',
    title: 'Nice, cozy, warm big bed apartment',
    price: 80,
    rating: 4,
    type: 'Private room',
    isPremium: false,
    isBookmarked: true,
  },
  {
    id: '3',
    imageUrl: 'img/apartment-02.jpg',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    price: 132,
    rating: 4,
    type: 'Apartment',
    isPremium: false,
    isBookmarked: false,
  },
  {
    id: '4',
    imageUrl: 'img/apartment-03.jpg',
    title: 'Tile House',
    price: 169,
    rating: 5,
    type: 'House',
    isPremium: false,
    isBookmarked: false,
  },
  {
    id: '5',
    imageUrl: 'img/studio-01.jpg',
    title: 'The house in forest',
    price: 149,
    rating: 4,
    type: 'House',
    isPremium: false,
    isBookmarked: false,
  },
];

const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];
const ACTIVE_CITY = 'Amsterdam';

// ── Component ─────────────────────────────────────────────────────────────────

function MainPage({ offersCount }: MainPageProps): ReactNode {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className="header__logo-link header__logo-link--active"
                to="/"
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
                    to="/favorites"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/login">
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
                    <Link className="locations__item-link tabs__item" to="/">
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
                {offersCount} places to stay in {ACTIVE_CITY}
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
                    {/* href replaces deprecated xlinkHref — SVG 2.0 */}
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

              <div className="cities__places-list places__list tabs__content">
                {MOCK_OFFERS.map((offer) => (
                  <OfferCard key={offer.id} {...offer} />
                ))}
              </div>
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
