'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  Flame, 
  Wifi, 
  Coffee, 
  Waves, 
  Sparkles,
  ArrowRight,
  EyeOff
} from 'lucide-react';
import { formatINR } from '@/lib/utils';
import type { SanitizedMysteryDeal } from '@/lib/mysteryEngine';

interface MysteryDealCardProps {
  deal: SanitizedMysteryDeal;
  onBookNow: (deal: SanitizedMysteryDeal) => void;
}

export default function MysteryDealCard({ deal, onBookNow }: MysteryDealCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getAmenityIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('pool')) return <Waves className="w-3.5 h-3.5 text-sky-400" />;
    if (lower.includes('breakfast') || lower.includes('dining')) return <Coffee className="w-3.5 h-3.5 text-amber-400" />;
    if (lower.includes('wi-fi') || lower.includes('wifi')) return <Wifi className="w-3.5 h-3.5 text-emerald-400" />;
    return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
  };

  return (
    <div className="group bg-white dark:bg-slate-900/90 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-500/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image Showcase */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-950">
        <Image
          src={deal.publicImages[currentImageIndex] || deal.publicImages[0]}
          alt={deal.headline}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Discount & Secret Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 items-center">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-rose-600 text-white shadow-lg flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>{deal.discountPercentage}% OFF</span>
          </span>

          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/70 text-amber-300 backdrop-blur-md border border-amber-400/30 flex items-center space-x-1">
            <EyeOff className="w-3 h-3 text-amber-400" />
            <span>Secret Hotel</span>
          </span>
        </div>

        {/* Star Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/30 text-xs font-bold text-amber-400">
          <div className="flex">
            {Array.from({ length: deal.starRating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="ml-1 text-white font-medium">{deal.starRating}★ Verified</span>
        </div>

        {/* Micro-Market Tag on Image Base */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <div className="flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium truncate max-w-[200px]">{deal.microMarket}</span>
          </div>

          <div className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold text-[11px]">
            ★ {deal.guaranteedRating} Guest Score
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2.5">
          {/* Identity Obfuscation Banner */}
          <div className="flex items-center space-x-2 py-1 px-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-600 dark:text-amber-300 font-medium">
            <Lock className="w-3 h-3 text-amber-500 shrink-0" />
            <span className="truncate">Name & Exact Address Unveiled Instantly Upon Booking</span>
          </div>

          {/* Deal Headline */}
          <Link href={`/deal/${deal.id}`} className="block">
            <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
              {deal.headline}
            </h3>
          </Link>

          {/* Teaser Description */}
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {deal.teaserDescription}
          </p>

          {/* Room Specs */}
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-2 pt-1">
            <span className="font-semibold text-gray-700 dark:text-gray-300">{deal.roomType}</span>
            <span>•</span>
            <span>{deal.roomSizeSqFt} sq.ft</span>
          </div>

          {/* Amenities Strip */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {deal.amenities.slice(0, 4).map((amenity, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-[11px] text-gray-700 dark:text-gray-300 font-medium"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </span>
            ))}
            {deal.amenities.length > 4 && (
              <span className="text-[10px] text-gray-500 self-center">
                +{deal.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-800/80 flex items-end justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-400 line-through">
                {formatINR(deal.originalPriceINR)}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Save {formatINR(deal.savingsINR)}
              </span>
            </div>
            
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-2xl font-bold font-serif text-gray-900 dark:text-white">
                {formatINR(deal.mysteryPriceINR)}
              </span>
              <span className="text-[11px] text-gray-500 font-normal">/ night + taxes</span>
            </div>
          </div>

          {/* Instant Reserve Button */}
          <div className="flex items-center space-x-2">
            <Link
              href={`/deal/${deal.id}`}
              className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors"
              title="View Stay Details"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => onBookNow(deal)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center space-x-1"
            >
              <Lock className="w-3.5 h-3.5 text-black" />
              <span>Unlock Stay</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
