// src/components/offer-card/index.tsx
// Reusable property card component used on the main listing page,
// favorites page, and near-places section of the offer detail page.
//
// Changes from original and WHY:
//
// 1. `JSX.Element` → `ReactNode`
//    See App.tsx comment. ReactNode is the correct return type for components.
//
// 2. `xlinkHref` → `href` on <use>
//    `xlinkHref` was part of the SVG 1.1 / XLink namespace and was deprecated
//    in SVG 2.0. React 18 removed support for it entirely and emits a warning.
//    The plain `href` attribute on <svg><use> is the correct modern syntax.
//
// 3. Added `aria-label` to bookmark button.
//    The button contains only an SVG icon — screen readers have no text to
//    announce. `aria-label` provides the accessible name. Required by
//    jsx-a11y/interactive-supports-focus and wcag 4.1.2.
//
// 4. Props interface replacing the empty component.
//    The card is useless without data. A typed `OfferCardProps` interface
//    documents the contract and enables TypeScript to catch misuse at call sites.
//
// 5. `interface` over `type` for object shapes.
//    Aligns with `@typescript-eslint/consistent-type-definitions` rule.
//    Interfaces are open (extendable); better for component prop contracts.
//
// 6. `import type` for React type imports.
//    Aligns with `@typescript-eslint/consistent-type-imports` rule.
//    Type-only imports are stripped at compile time and don't affect the bundle.
//
// 7. Extracted `ratingWidth` calculation.
//    Keeps JSX clean; makes the business logic unit-testable in isolation.

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

// ── Types ────────────────────────────────────────────────────────────────────

export interface OfferCardProps {
  /** Unique identifier used to build the `/offer/:id` route. */
  id: string;
  /** Primary photo URL. */
  imageUrl: string;
  /** Display title of the property. */
  title: string;
  /** Nightly price in EUR. */
  price: number;
  /** Rating value from 0–5. Converted to a CSS width percentage for the stars. */
  rating: number;
  /** Property category label: Apartment, Room, House, Hotel, etc. */
  type: string;
  /** Whether this offer has been marked as premium by the host. */
  isPremium: boolean;
  /** Whether the current user has bookmarked this offer. */
  isBookmarked: boolean;
  /** CSS class modifier for the wrapping <article> (e.g. 'cities', 'near-places', 'favorites'). */
  cardType?: 'cities' | 'near-places' | 'favorites';
  /** Callback fired when the user hovers over the card — used to highlight the map marker. */
  onMouseEnter?: (id: string) => void;
  /** Callback fired when the user stops hovering — used to clear map marker highlight. */
  onMouseLeave?: () => void;
  /** Callback fired when the bookmark button is toggled. */
  onBookmarkToggle?: (id: string) => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const MAX_RATING = 5;
const PERCENT_PER_STAR = 100 / MAX_RATING;

/**
 * Converts a 0–5 rating to the nearest 10% CSS width string.
 * Used to fill the star rating bar proportionally.
 *
 * Example: 3.7 → rounds to 4 → "80%"
 */
function getRatingWidth(rating: number): string {
  return `${Math.round(rating) * PERCENT_PER_STAR}%`;
}

// ── Component ─────────────────────────────────────────────────────────────────

function OfferCard({
  id,
  imageUrl,
  title,
  price,
  rating,
  type,
  isPremium,
  isBookmarked,
  cardType = 'cities',
  onMouseEnter,
  onMouseLeave,
  onBookmarkToggle,
}: OfferCardProps): ReactNode {
  const articleClass = `${cardType}__card place-card`;
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
              {/* `href` replaces deprecated `xlinkHref` — SVG 2.0 + React 18 */}
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
