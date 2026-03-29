// src/types/offer.ts
// ─────────────────────────────────────────────────────────────────────────────
// Domain types for the Offer entity.
//
// Design decisions (2026 standards):
// • `Location` is extracted as a standalone interface — Separation of Concerns.
//   GPS data is geographic domain knowledge, independent of booking details.
// • All fields remain `readonly` — Offers are value objects; mutations go
//   through Redux actions, never direct field assignment.
// • `location` is optional (`?`) so existing non-geo offers and API responses
//   that omit coordinates remain valid without casting.
// ─────────────────────────────────────────────────────────────────────────────

export type OfferType =
  | 'Apartment'
  | 'Private room'
  | 'House'
  | 'Hotel'
  | 'Studio';

/** GPS coordinate pair, matching the Leaflet `LatLngTuple` convention [lat, lng]. */
export interface Location {
  readonly lat: number;
  readonly lng: number;
}

export interface Offer {
  readonly id: string;
  readonly imageUrl: string;
  readonly title: string;
  readonly price: number;
  readonly rating: number;
  readonly type: OfferType;
  readonly isPremium: boolean;
  readonly isBookmarked: boolean;
  readonly city: string;
  /** Optional GPS coordinates. Present for all map-eligible offers. */
  readonly location?: Location;
}
