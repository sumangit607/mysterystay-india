/**
 * SecretStay India - Intelligent Mystery Deal & Pricing Engine
 * 
 * Manages opaque inventory valuation, dynamic distress pricing,
 * anti-cannibalization brand masking, and micro-market clustering.
 */

export interface DealSearchQuery {
  city?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
  starRating?: number; // 3, 4, 5
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
}

export interface SanitizedMysteryDeal {
  id: string;
  headline: string;
  teaserDescription: string;
  starRating: number;
  guaranteedRating: number;
  city: string;
  microMarket: string;
  mysteryPriceINR: number;
  originalPriceINR: number;
  discountPercentage: number;
  savingsINR: number;
  amenities: string[];
  publicImages: string[];
  roomType: string;
  roomSizeSqFt: number;
  bedConfiguration: string;
  inclusions: string[];
  cancellationPolicy: string;
  urgencyTag?: string;
  remainingRooms?: number;
}

/**
 * Strips all proprietary brand names, trademarks, exact coordinates, and street addresses
 * to enforce 100% rate-parity compliance and prevent premature identification.
 */
export function sanitizeHotelForOpaqueListing(hotel: any, deal: any, room: any): SanitizedMysteryDeal {
  const publicImages = typeof hotel.publicImages === 'string' 
    ? JSON.parse(hotel.publicImages) 
    : (hotel.publicImages || []);

  const amenities = typeof hotel.amenities === 'string' 
    ? JSON.parse(hotel.amenities) 
    : (hotel.amenities || []);

  const inclusions = typeof room.inclusions === 'string'
    ? JSON.parse(room.inclusions)
    : (room.inclusions || []);

  const savings = Math.max(0, deal.originalPriceINR - deal.mysteryPriceINR);
  const discountPct = Math.round((savings / deal.originalPriceINR) * 100);

  // Dynamic urgency badge based on discount depth and stock
  let urgencyTag = 'Popular Choice';
  if (discountPct >= 58) {
    urgencyTag = '⚡ Super Distress Drop (Save > 55%)';
  } else if (deal.priorityScore > 90) {
    urgencyTag = '🔥 Top Selling Mystery Stay';
  }

  return {
    id: deal.id,
    headline: deal.headline,
    teaserDescription: deal.teaserDescription,
    starRating: hotel.starRating,
    guaranteedRating: deal.guaranteedRating,
    city: hotel.city,
    microMarket: hotel.microMarket,
    mysteryPriceINR: deal.mysteryPriceINR,
    originalPriceINR: deal.originalPriceINR,
    discountPercentage: discountPct,
    savingsINR: savings,
    amenities,
    publicImages,
    roomType: room.roomType,
    roomSizeSqFt: room.roomSizeSqFt,
    bedConfiguration: room.bedConfiguration,
    inclusions,
    cancellationPolicy: hotel.cancellationPolicy,
    urgencyTag,
    remainingRooms: 3, // Mock live inventory threshold
  };
}

/**
 * Dynamic pricing calculation based on lead days (T minus days) and occupancy rate.
 * Formula:
 * Distressed Inventory Discount = Base Discount + (Days to Check-in <= 3 ? 10% : 0%) + (Unsold Ratio * 15%)
 */
export function calculateDynamicDistressDiscount(
  rackRateINR: number,
  starRating: number,
  daysUntilCheckIn: number,
  occupancyPercent: number
): { recommendedPriceINR: number; discountPercentage: number } {
  let baseDiscount = starRating === 5 ? 0.45 : starRating === 4 ? 0.40 : 0.35;

  // Last minute urgency (distress bonus)
  if (daysUntilCheckIn <= 2) {
    baseDiscount += 0.10;
  } else if (daysUntilCheckIn <= 5) {
    baseDiscount += 0.05;
  }

  // Low occupancy kicker
  if (occupancyPercent < 50) {
    baseDiscount += 0.08;
  }

  // Cap discount between 30% and 65% to avoid brand damage
  const finalDiscountPct = Math.min(0.65, Math.max(0.30, baseDiscount));
  const recommendedPrice = Math.round(rackRateINR * (1 - finalDiscountPct));

  return {
    recommendedPriceINR: recommendedPrice,
    discountPercentage: Math.round(finalDiscountPct * 100),
  };
}
