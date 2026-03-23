// src/components/comment-form/comment-form.tsx
// Controlled comment submission form for the Offer detail page.
//
// WHY a single `CommentDraft` state object instead of two separate useState calls:
// `rating` and `review` are always read together in the `isSubmitEnabled` check.
// A single object makes both fields reset atomically after a successful submit
// and eliminates stale-closure risk when reading one field after the other updates.
//
// WHY `rating` is typed as `string` (not `number`):
// HTML radio `value` attributes are always strings. Storing as string avoids
// a parse on every change event. The conversion to number happens once, at the
// point of submission.
//
// WHY `Fragment` with an explicit `key` instead of the <></> shorthand:
// The CSS layout relies on each <input> immediately preceding its <label> as
// DOM siblings (the ~ sibling selector drives the star-fill visual). A wrapping
// <div> would break that selector. <Fragment key={value}> keeps siblings flat
// while giving React a stable identity for the pair — shorthand <> does not
// accept the `key` prop.

import { Fragment, type ChangeEvent, type ReactNode, useState } from 'react';

// ── Constants ─────────────────────────────────────────────────────────────────

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

const RATING_OPTIONS = [
  { value: '5', title: 'perfect' },
  { value: '4', title: 'good' },
  { value: '3', title: 'not bad' },
  { value: '2', title: 'badly' },
  { value: '1', title: 'terribly' },
] as const;

// ── Types ─────────────────────────────────────────────────────────────────────

/**
 * The in-progress comment draft held in local component state.
 * Both fields must pass validation before the form can be submitted.
 */
export interface CommentDraft {
  /** Selected star rating as a string ('1'–'5'), or empty string if unset. */
  rating: string;
  /** Free-text review body. */
  review: string;
}

const EMPTY_DRAFT: CommentDraft = { rating: '', review: '' };

// ── Component ─────────────────────────────────────────────────────────────────

function CommentForm(): ReactNode {
  const [draft, setDraft] = useState<CommentDraft>(EMPTY_DRAFT);

  const isSubmitEnabled =
    draft.rating !== '' &&
    draft.review.length >= MIN_REVIEW_LENGTH &&
    draft.review.length <= MAX_REVIEW_LENGTH;

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setDraft((prev) => ({ ...prev, rating: evt.target.value }));
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    setDraft((prev) => ({ ...prev, review: evt.target.value }));
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {RATING_OPTIONS.map(({ value, title }) => {
          const inputId = `${value}-${value === '1' ? 'star' : 'stars'}`;
          return (
            <Fragment key={value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={inputId}
                type="radio"
                checked={draft.rating === value}
                onChange={handleRatingChange}
              />
              <label
                htmlFor={inputId}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width="37" height="33">
                  {/* href replaces deprecated xlinkHref — SVG 2.0 + React 18 */}
                  <use href="#icon-star" />
                </svg>
                <span className="visually-hidden">{title}</span>
              </label>
            </Fragment>
          );
        })}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={draft.review}
        onChange={handleReviewChange}
        minLength={MIN_REVIEW_LENGTH}
        maxLength={MAX_REVIEW_LENGTH}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isSubmitEnabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
