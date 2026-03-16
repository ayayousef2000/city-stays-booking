// src/mocks/reviews.ts
// Static mock review data used on the offer detail page until the API is integrated.

import type { Review } from '@/types/review';

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    offerId: '1',
    userName: 'Max',
    avatarUrl: 'img/avatar-max.jpg',
    rating: 4,
    text: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24',
  },
  {
    id: 'r2',
    offerId: '2',
    userName: 'Angelina',
    avatarUrl: 'img/avatar-angelina.jpg',
    rating: 5,
    text: 'Absolutely stunning place. Clean, modern, and perfectly located. Would stay again without hesitation.',
    date: '2023-08-15',
  },
];
