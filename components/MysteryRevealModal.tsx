'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  KeyRound, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Phone, 
  Download, 
  ExternalLink,
  ShieldCheck,
  Star,
  Luggage,
  X
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

interface RevealedHotelData {
  bookingReference: string;
  hotelName: string;
  starRating: number;
  fullAddress: string;
  city: string;
  microMarket: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmountINR: number;
  brandImages: string[];
  guestName: string;
  guestPhone: string;
}

interface MysteryRevealModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: RevealedHotelData | null;
}

export default function MysteryRevealModal({ isOpen, onClose, bookingData }: MysteryRevealModalProps) {
  const [animationStage, setAnimationStage] = useState<'LOCK_BREAKING' | 'REVEALED'>('LOCK_BREAKING');
  const [decryptProgress, setDecryptProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setAnimationStage('LOCK_BREAKING');
      setDecryptProgress(0);

      // Simulation of suspenseful vault unmasking
      const interval = setInterval(() => {
        setDecryptProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setAnimationStage('REVEALED'), 400);
            return 100;
          }
          return prev + 25;
        });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen || !bookingData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      
      {/* Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-gray-300 hover:text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {animationStage === 'LOCK_BREAKING' ? (
          /* SUSPENSE STAGE */
          <div className="p-12 text-center space-y-8 my-auto">
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/40 animate-pulse">
                <KeyRound className="w-10 h-10 text-black" />
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-500 animate-pulse">
                Booking Confirmed • Decrypting Mystery Stay
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
                Unlocking Your Secret Luxury Hotel...
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Bypassing public rate parity. Generating your private VIP voucher and direct check-in credentials.
              </p>
            </div>

            {/* Decryption Progress Bar */}
            <div className="max-w-xs mx-auto space-y-2">
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${decryptProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-gray-400 font-mono">
                <span>SECRETPAY_VERIFIED</span>
                <span>{decryptProgress}%</span>
              </div>
            </div>
          </div>
        ) : (
          /* THE GRAND REVEAL STAGE */
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Celebration Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Secret Identity Officially Revealed!</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Welcome to {bookingData.hotelName}
              </h2>
              <div className="flex items-center justify-center space-x-1">
                {Array.from({ length: bookingData.starRating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-medium text-amber-400 ml-1">
                  5-Star Luxury Certified
                </span>
              </div>
            </div>

            {/* Revealed Hotel Photo Showcase */}
            <div className="relative h-56 rounded-2xl overflow-hidden border border-amber-500/30 shadow-lg">
              <Image
                src={bookingData.brandImages[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80'}
                alt={bookingData.hotelName}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="bg-amber-500 text-black px-2.5 py-1 rounded-md font-bold">
                  {bookingData.roomType}
                </span>
                <span className="font-mono bg-black/60 px-2 py-1 rounded border border-white/20">
                  Ref: {bookingData.bookingReference}
                </span>
              </div>
            </div>

            {/* Key Reservation Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/80 space-y-1">
                <span className="text-gray-500 dark:text-gray-400 font-medium flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>Exact Property Address</span>
                </span>
                <p className="text-gray-900 dark:text-white font-semibold leading-relaxed">
                  {bookingData.fullAddress}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/80 space-y-1">
                <span className="text-gray-500 dark:text-gray-400 font-medium flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>Stay Dates</span>
                </span>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {bookingData.checkInDate} to {bookingData.checkOutDate}
                </p>
              </div>
            </div>

            {/* Instant Notification Confirmation Dispatch */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Confirmation dispatched via WhatsApp & SMS to <strong>{bookingData.guestPhone}</strong></span>
              </div>
              <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded font-mono">DELIVERED</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                href="/bookings"
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold text-center text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2 transition-all"
              >
                <Luggage className="w-4 h-4 text-black" />
                <span>View in My Stays</span>
              </Link>

              <button
                onClick={() => window.print()}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 font-semibold text-sm border border-gray-200 dark:border-slate-700 flex items-center justify-center space-x-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Print VIP Pass</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
