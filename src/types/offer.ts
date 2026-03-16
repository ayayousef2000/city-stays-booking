// src/types/offer.ts
// Domain model for a rental offer as returned by the REST API.

export interface Offer {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  rating: number;
  type: string;
  isPremium: boolean;
  isBookmarked: boolean;
  city: string;
}
