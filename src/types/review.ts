// src/types/review.ts
// Domain model for a user review as returned by the REST API.
//
// WHY readonly:
// Review objects arrive from the API and are stored in Redux.
// Mutations must go through Redux actions — never by direct property
// assignment. readonly enforces this at the type level.

export interface Review {
  readonly id: string;
  readonly offerId: string;
  readonly userName: string;
  readonly avatarUrl: string;
  readonly rating: number;
  readonly text: string;
  readonly date: string;
}
