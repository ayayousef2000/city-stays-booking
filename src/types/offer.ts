// src/types/offer.ts
// Domain model for a rental offer as returned by the REST API.
//
// WHY readonly:
// Offer objects arrive from the API and are stored in Redux.
// Mutations must go through Redux actions — never by direct property
// assignment. readonly enforces this at the type level: the compiler
// rejects `offer.price = 99` anywhere in the codebase.
//
// WHY a string union for `type` instead of `string`:
// `string` accepts any value. A union of known accommodation categories
// makes every switch/conditional over `offer.type` exhaustively checkable
// by TypeScript and self-documents the valid values from the API contract.

export type OfferType =
  | 'Apartment'
  | 'Private room'
  | 'House'
  | 'Hotel'
  | 'Studio';

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
}
