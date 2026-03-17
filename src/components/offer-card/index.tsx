// src/components/offer-card/index.tsx
// Reusable property card used on the main listing, favorites, and near-places sections.

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export interface OfferCardProps {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  rating: number;
  type: string;
  isPremium: boolean;
  isBookmarked: boolean;
  /** Controlled externally by OfferList to coordinate map marker highlighting. */
  isActive?: boolean;
  cardType?: 'cities' | 'near-places' | 'favorites';
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  onBookmarkToggle?: (id: string) => void;
}

const MAX_RATING = 5;
const PERCENT_PER_STAR = 100 / MAX_RATING;

function getRatingWidth(rating: number): string {
  return `${Math.round(rating) * PERCENT_PER_STAR}%`;
}

function OfferCard({
  id,
  imageUrl,
  title,
  price,
  rating,
  type,
  isPremium,
  isBookmarked,
  isActive = false,
  cardType = 'cities',
  onMouseEnter,
  onMouseLeave,
  onBookmarkToggle,
}: OfferCardProps): ReactNode {
  const articleClass = [
    `${cardType}__card`,
    'place-card',
    isActive && `${cardType}__card--active`,
  ]
    .filter(Boolean)
    .join(' ');

  const imageWrapperClass = `${cardType}__image-wrapper place-card__image-wrapper`;

  const bookmarkButtonClass = [
    'place-card__bookmark-button',
    'button',
    isBookmarked && 'place-card__bookmark-button--active',
  ]
    .filter(Boolean)
    .join(' ');

  const handleMouseEnter = (): void => {
    onMouseEnter?.(id);
  };

  const handleBookmarkClick = (): void => {
    onBookmarkToggle?.(id);
  };

  return (
    <article
      className={articleClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={imageWrapperClass}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={imageUrl}
            width="260"
            height="200"
            alt={title}
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button
            className={bookmarkButtonClass}
            type="button"
            aria-label={
              isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'
            }
            onClick={handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              {/* href replaces deprecated xlinkHref — SVG 2.0 + React 18 */}
              <use href="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {isBookmarked ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRatingWidth(rating) }} />
            <span className="visually-hidden">Rating: {rating} out of 5</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>

        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
