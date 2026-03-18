// src/components/offer-list/index.tsx
// Renders a list of OfferCard components and tracks the active (hovered) card.

import { useState } from 'react';
import type { ReactNode } from 'react';

import OfferCard from '@/components/offer-card';
import type { Offer } from '@/types/offer';

// ── Types ─────────────────────────────────────────────────────────────────────

type CardType = 'cities' | 'near-places' | 'favorites';

interface OfferListProps {
  offers: Offer[];
  cardType?: CardType;
  className?: string;
  onActiveOfferChange?: (id: string | null) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

function OfferList({
  offers,
  cardType = 'cities',
  className,
  onActiveOfferChange,
}: OfferListProps): ReactNode {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleMouseEnter = (id: string): void => {
    setActiveOfferId(id);
    onActiveOfferChange?.(id);
  };

  const handleMouseLeave = (): void => {
    setActiveOfferId(null);
    onActiveOfferChange?.(null);
  };

  return (
    <div className={className}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          id={offer.id}
          imageUrl={offer.imageUrl}
          title={offer.title}
          price={offer.price}
          rating={offer.rating}
          type={offer.type}
          isPremium={offer.isPremium}
          isBookmarked={offer.isBookmarked}
          cardType={cardType}
          isActive={activeOfferId === offer.id}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default OfferList;
export type { OfferListProps };
