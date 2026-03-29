// src/pages/main-page/main-page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Main (Index) Page — City Stays Booking
//
// Architecture & Design Decisions (2026 standards):
//
// 1. DERIVED DATA (useMemo) — `cityMarkers` is computed from `offers` filtered
//    to the active city. `useMemo` ensures the array reference is stable between
//    renders, preventing Map's marker effect from firing unnecessarily on
//    unrelated parent re-renders (e.g., hover state changes).
//
// 2. ACTIVE MARKER STATE — `activeOfferId` is lifted to MainPage (the lowest
//    common ancestor of OfferList and Map). OfferList raises the ID via
//    `onActiveOfferChange`; Map consumes it as `activeMarkerId`. This is the
//    classic React "lifting state up" pattern — no context, no Redux needed for
//    transient UI-only state.
//
// 3. MAP CENTRE — Derived from the first geo-tagged offer in the active city,
//    falling back to a hardcoded Amsterdam centre. In a Redux-powered future,
//    this will come from a `cities` slice keyed by city name.
//
// 4. OPEN/CLOSED PRINCIPLE — Adding a new city requires zero changes here.
//    The `ACTIVE_CITY` constant (future: Redux selector) drives both the tab
//    highlight and the `cityOffers` filter automatically.
//
// 5. MARKER TITLES — Each marker includes the offer title as a Leaflet tooltip,
//    providing accessible context without additional UI components.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@/app/routes';
import Map from '@/components/map';
import type { MapMarker } from '@/components/map';
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
] as const;

/** Currently selected city. Future: driven by Redux `citiesSlice`. */
const ACTIVE_CITY = 'Amsterdam';

/**
 * Fallback map centre when no offers carry GPS data.
 * Amsterdam city centre coordinates.
 */
const AMSTERDAM_FALLBACK_CENTRE: [number, number] = [52.38333, 4.9];

const MAP_ZOOM = 11;

// ── Props ─────────────────────────────────────────────────────────────────────

interface MainPageProps {
  offers: Offer[];
}

// ── Component ─────────────────────────────────────────────────────────────────

function MainPage({ offers }: MainPageProps): ReactNode {
  // Tracks the ID of the card currently being hovered, or null.
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  // ── Derived data ──────────────────────────────────────────────────────────

  /** Offers belonging to the active city tab. */
  const cityOffers = useMemo<Offer[]>(
    () => offers.filter((offer) => offer.city === ACTIVE_CITY),
    [offers],
  );

  /**
   * Convert city offers to MapMarker objects.
   * Offers without a `location` are excluded — they cannot be pinned.
   */
  const cityMarkers = useMemo<MapMarker[]>(
    () =>
      cityOffers.reduce<MapMarker[]>((acc, offer) => {
        if (offer.location) {
          acc.push({
            id: offer.id,
            lat: offer.location.lat,
            lng: offer.location.lng,
          });
        }
        return acc;
      }, []),
    [cityOffers],
  );

  /**
   * Map centre: derived from the first geo-tagged offer, else fallback.
   * Recalculates only when `cityMarkers` changes (stable reference via useMemo).
   */
  const mapCentre = useMemo<[number, number]>(
    () =>
      cityMarkers.length > 0
        ? [cityMarkers[0].lat, cityMarkers[0].lng]
        : AMSTERDAM_FALLBACK_CENTRE,
    [cityMarkers],
  );

  // ── Event handlers ────────────────────────────────────────────────────────

  const handleActiveOfferChange = (id: string | null): void => {
    setActiveOfferId(id);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="page page--gray page--main">
      {/* ── Header ─────────────────────────────────────────────────────── */}
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

      {/* ── Main ───────────────────────────────────────────────────────── */}
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        {/* City tabs */}
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

        {/* Offer list + Map split layout */}
        <div className="cities">
          <div className="cities__places-container container">
            {/* ── Left: Offer list ───────────────────────────────────── */}
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {cityOffers.length} places to stay in {ACTIVE_CITY}
              </b>

              {/* Sorting — static for now; future: sortSlice */}
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

              {/*
               * OfferList raises hover events via onActiveOfferChange.
               * We pass cityOffers (already filtered) rather than all offers
               * to keep the list and map in sync automatically.
               */}
              <OfferList
                offers={cityOffers}
                cardType="cities"
                className="cities__places-list places__list tabs__content"
                onActiveOfferChange={handleActiveOfferChange}
              />
            </section>

            {/* ── Right: Interactive map ─────────────────────────────── */}
            <div className="cities__right-section">
              {/*
               * Map is the pure Leaflet bridge.
               * - `center` and `markers` are memoised above — stable references.
               * - `activeMarkerId` triggers only an icon swap inside the effect,
               *   never a full marker rebuild.
               */}
              <Map
                center={mapCentre}
                zoom={MAP_ZOOM}
                markers={cityMarkers}
                activeMarkerId={activeOfferId}
                className="cities__map"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
