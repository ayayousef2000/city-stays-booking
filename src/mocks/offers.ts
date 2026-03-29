// src/mocks/offers.ts
// ─────────────────────────────────────────────────────────────────────────────
// Static mock data for local development and unit testing.
//
// Design decisions (2026 standards):
// • GPS coordinates are co-located with each Offer record — the map component
//   consumes offers directly and derives markers via a selector/filter, rather
//   than maintaining a separate parallel data structure. Single source of truth.
// • Non-Amsterdam cities intentionally omit `location` — this exercises the
//   optional field and keeps mocks realistic (API may return partial data).
// • Coordinates sourced from the product spec; using named constants would
//   obscure the data; inline values are clearer here given the small dataset.
// ─────────────────────────────────────────────────────────────────────────────

import type { Offer } from '@/types/offer';

export const MOCK_OFFERS: Offer[] = [
  {
    id: '1',
    imageUrl: 'img/apartment-01.jpg',
    title: 'Beautiful & luxurious apartment at great location',
    price: 120,
    rating: 4,
    type: 'Apartment',
    isPremium: true,
    isBookmarked: false,
    city: 'Amsterdam',
    location: { lat: 52.3909553943508, lng: 4.85309666406198 },
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
    city: 'Amsterdam',
    location: { lat: 52.3609553943508, lng: 4.85309666406198 },
  },
  {
    id: '3',
    imageUrl: 'img/apartment-02.jpg',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    price: 132,
    rating: 4,
    type: 'Apartment',
    isPremium: false,
    isBookmarked: true,
    city: 'Cologne',
    // No location — Cologne city map not yet implemented
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
    city: 'Amsterdam',
    location: { lat: 52.3909553943508, lng: 4.929309666406198 },
  },
  {
    id: '5',
    imageUrl: 'img/apartment-01.jpg',
    title: 'Canal View Studio',
    price: 145,
    rating: 4,
    type: 'Studio',
    isPremium: true,
    isBookmarked: false,
    city: 'Amsterdam',
    location: { lat: 52.3809553943508, lng: 4.939309666406198 },
  },
];
