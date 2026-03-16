// src/components/offer-card/index.test.tsx
// Unit tests for the OfferCard component.
//
// Testing philosophy:
// - Test BEHAVIOUR, not implementation. We verify what the user sees and
//   what happens when they interact — not internal state or method calls.
// - Use accessible queries (getByRole, getByAltText) over test-ids.
//   This ensures the component is actually accessible, not just queryable.

import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { renderWithRouter } from '@/test-utils/render-with-router';

import OfferCard from './index';

import type { OfferCardProps } from './index';

// ── Test Fixtures ─────────────────────────────────────────────────────────────

const defaultProps: OfferCardProps = {
  id: 'test-offer-1',
  imageUrl: '/img/apartment-01.jpg',
  title: 'Beautiful & luxurious apartment at great location',
  price: 120,
  rating: 4,
  type: 'Apartment',
  isPremium: true,
  isBookmarked: false,
};

function renderOfferCard(props: Partial<OfferCardProps> = {}): void {
  renderWithRouter(<OfferCard {...defaultProps} {...props} />);
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('OfferCard', () => {
  describe('Rendering', () => {
    it('renders the offer title', () => {
      renderOfferCard();
      expect(
        screen.getByText('Beautiful & luxurious apartment at great location'),
      ).toBeInTheDocument();
    });

    it('renders the nightly price', () => {
      renderOfferCard({ price: 250 });
      expect(screen.getByText('€250')).toBeInTheDocument();
    });

    it('renders the property type', () => {
      renderOfferCard({ type: 'Room' });
      expect(screen.getByText('Room')).toBeInTheDocument();
    });

    it('renders the property image with correct alt text', () => {
      renderOfferCard();
      const image = screen.getByAltText(defaultProps.title);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', defaultProps.imageUrl);
    });

    it('renders the Premium badge when isPremium is true', () => {
      renderOfferCard({ isPremium: true });
      expect(screen.getByText('Premium')).toBeInTheDocument();
    });

    it('does not render the Premium badge when isPremium is false', () => {
      renderOfferCard({ isPremium: false });
      expect(screen.queryByText('Premium')).not.toBeInTheDocument();
    });

    it('renders offer link pointing to the correct route', () => {
      renderOfferCard({ id: 'abc-123' });
      const links = screen.getAllByRole('link');
      // Both image and title link to the same route.
      links.forEach((link) => {
        expect(link).toHaveAttribute('href', '/offer/abc-123');
      });
    });
  });

  describe('Bookmark button', () => {
    it('has the correct accessible label when not bookmarked', () => {
      renderOfferCard({ isBookmarked: false });
      const button = screen.getByRole('button', { name: /add to bookmarks/i });
      expect(button).toBeInTheDocument();
    });

    it('has the correct accessible label when bookmarked', () => {
      renderOfferCard({ isBookmarked: true });
      const button = screen.getByRole('button', {
        name: /remove from bookmarks/i,
      });
      expect(button).toBeInTheDocument();
    });

    it('calls onBookmarkToggle with the offer id when clicked', async () => {
      const user = userEvent.setup();
      const onBookmarkToggle = vi.fn();

      renderOfferCard({ onBookmarkToggle });

      await user.click(
        screen.getByRole('button', { name: /add to bookmarks/i }),
      );

      expect(onBookmarkToggle).toHaveBeenCalledOnce();
      expect(onBookmarkToggle).toHaveBeenCalledWith(defaultProps.id);
    });
  });

  describe('Map interaction callbacks', () => {
    it('calls onMouseEnter with the offer id when hovered', async () => {
      const user = userEvent.setup();
      const onMouseEnter = vi.fn();

      renderOfferCard({ onMouseEnter });

      await user.hover(screen.getByRole('article'));

      expect(onMouseEnter).toHaveBeenCalledOnce();
      expect(onMouseEnter).toHaveBeenCalledWith(defaultProps.id);
    });

    it('calls onMouseLeave when hover ends', () => {
      const onMouseLeave = vi.fn();

      renderOfferCard({ onMouseLeave });

      // userEvent.unhover does not reliably fire mouseleave in jsdom.
      // fireEvent.mouseLeave triggers the synthetic React event directly,
      // which is the correct approach for testing onMouseLeave handlers.
      fireEvent.mouseLeave(screen.getByRole('article'));

      expect(onMouseLeave).toHaveBeenCalledOnce();
    });
  });
});
