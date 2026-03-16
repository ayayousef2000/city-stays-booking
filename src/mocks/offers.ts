// src/mocks/offers.ts
// Static mock data for 4 rental offers used across pages until the API is integrated.

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
  },
];
