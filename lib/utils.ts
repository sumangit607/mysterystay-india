import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number into Indian Rupee Currency string (e.g. ₹7,499)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculates discount percentage
 */
export function calculateDiscount(originalPrice: number, mysteryPrice: number): number {
  if (originalPrice <= 0 || mysteryPrice <= 0) return 0;
  return Math.round(((originalPrice - mysteryPrice) / originalPrice) * 100);
}

/**
 * Generates an alphanumeric Indian TravelTech booking reference (e.g. SSTAY-2026-X84K)
 */
export function generateBookingRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SSTAY-${new Date().getFullYear()}-${random}`;
}
