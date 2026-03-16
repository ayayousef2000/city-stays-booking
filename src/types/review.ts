// src/types/review.ts
// Domain model for a user review as returned by the REST API.

export interface Review {
  id: string;
  offerId: string;
  userName: string;
  avatarUrl: string;
  rating: number;
  text: string;
  date: string;
}
