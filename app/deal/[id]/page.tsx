'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  Flame, 
  CheckCircle2, 
  Wifi, 
  Coffee, 
  Waves, 
  Sparkles, 
  Clock, 
  ChevronLeft,
  Share2,
  Heart,
  AlertCircle
} from 'lucide-react';
import { formatINR } from '@/lib/utils';
import PaymentModal from '@/components/PaymentModal';
import MysteryRevealModal from '@/components/MysteryRevealModal';
import type { SanitizedMysteryDeal } from '@/lib/mysteryEngine';

export default function DealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [deal, setDeal] = useState<SanitizedMysteryDeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [revealModalOpen, setRevealModalOpen] = useState(false);
  const [revealedData, setRevealedData] = useState<any | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    async function fetchDeal() {
      try {
        setLoading(true);
        const res = await fetch(`/api/deals/${id}`);
        const data = await res.json();
        if (data.success) {
          setDeal(data.deal);
        }
      } catch (err) {
        console.error('Error fetching deal:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDeal();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-400">Loading verified mystery deal...</p>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold">Deal No Longer Available</h2>
        <p className="text-xs text-gray-400">This secret distress inventory has been booked or expired.</p>
        <Link href="/" className="inline-block px-4 py-2 bg-amber-500 text-black text-xs font-semibold rounded-xl">
          Back to Secret Drops
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between text-xs">
        <Link href="/" className="inline-flex items-center space-x-1.5 text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Drops</span>
        </Link>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-2 rounded-xl border transition-colors flex items-center space-x-1 ${
              isWishlisted
                ? 'bg-rose-500/20 text-rose-500 border-rose-500/40'
                : 'border-slate-800 text-gray-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Deal link copied to clipboard!');
              }
            }}
            className="p-2 rounded-xl border border-slate-800 text-gray-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center space-x-1"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Main Title Strip */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-600 text-white flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>{deal.discountPercentage}% OFF Rack Rate</span>
          </span>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Guaranteed {deal.starRating}-Star Luxury</span>
          </span>

          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ★ {deal.guaranteedRating} Verified Guest Score
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          {deal.headline}
        </h1>

        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <MapPin className="w-4 h-4 text-amber-500" />
          <span className="font-medium text-white">{deal.microMarket}</span>
          <span>•</span>
          <span>{deal.city}, India</span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          <Image
            src={deal.publicImages[activeImageIndex] || deal.publicImages[0]}
            alt="Hotel gallery"
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-white flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Property Identity Protected by Rate Parity</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          {deal.publicImages.slice(0, 2).map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative h-40 lg:h-[186px] rounded-2xl overflow-hidden border transition-all ${
                activeImageIndex === idx ? 'border-amber-500 ring-2 ring-amber-500/50' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <Image src={img} alt="Hotel preview" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Content Columns: Details vs Sticky Booking Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Cols: Comprehensive Property Specs */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Opaque Guarantee Box */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-500 font-bold uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>How the Mystery Deal Works For This Property</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              This iconic {deal.starRating}-star resort has released unsold rooms for these dates at a {deal.discountPercentage}% discount. To protect their regular public rates, the hotel name and street address are masked until booking confirmation. We guarantee you will be placed at a property meeting or exceeding every specification listed here.
            </p>
          </div>

          {/* Room Specs */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Room Specifications</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-gray-500 block">Room Category</span>
                <span className="text-white font-semibold">{deal.roomType}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-gray-500 block">Room Size</span>
                <span className="text-white font-semibold">{deal.roomSizeSqFt} sq.ft</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-gray-500 block">Bed Layout</span>
                <span className="text-white font-semibold">{deal.bedConfiguration}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Guaranteed Complimentary Inclusions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {deal.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-center space-x-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full Amenities */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Property Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {deal.amenities.map((a, i) => (
                <div key={i} className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-gray-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Micro-market Location Radius */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-white">Location Guarantee</h3>
              <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                3 km Radius Certified
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your stay will be within the <strong>{deal.microMarket}</strong> zone. We guarantee you will not be allocated to distant outskirts or inconvenient outer ring roads.
            </p>
            {/* Visual simulation of neighborhood radius */}
            <div className="h-44 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center relative overflow-hidden">
              <div className="w-32 h-32 rounded-full border border-amber-500/40 bg-amber-500/5 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-amber-500 bg-amber-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <span className="absolute bottom-2 right-3 text-[10px] font-mono text-gray-500">
                GEOFENCED MICRO-MARKET: {deal.city.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-serif text-lg font-bold text-white">Cancellation Rules</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              {deal.cancellationPolicy}
            </p>
          </div>

        </div>

        {/* Right Col: Sticky Booking Card */}
        <div className="sticky top-28 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-6">
            
            <div className="space-y-1">
              <span className="text-[11px] uppercase font-bold text-emerald-400 tracking-wider">
                Instant Confirmation • Price Locked
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-serif font-bold text-white">
                  {formatINR(deal.mysteryPriceINR)}
                </span>
                <span className="text-xs text-gray-400">/ night</span>
              </div>
              <div className="text-xs flex items-center space-x-2 pt-1">
                <span className="text-gray-500 line-through">{formatINR(deal.originalPriceINR)}</span>
                <span className="text-emerald-400 font-semibold">You Save {formatINR(deal.savingsINR)} (58%)</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Standard Stay</span>
                <span className="text-white font-medium">2 Nights (2 Guests)</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Total Room Tariff</span>
                <span className="text-white font-medium">{formatINR(deal.mysteryPriceINR * 2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Inclusive of Breakfast</span>
                <span className="text-emerald-400 font-semibold">FREE (₹2,400 value)</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Luxury GST (18%)</span>
                <span className="text-white font-medium">{formatINR(Math.round(deal.mysteryPriceINR * 2 * 0.18))}</span>
              </div>
            </div>

            <button
              onClick={() => setPaymentModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-black font-bold text-sm shadow-xl shadow-amber-500/30 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <Lock className="w-4 h-4 text-black" />
              <span>Unlock Mystery Stay Now</span>
            </button>

            <div className="text-center space-y-1.5 pt-2">
              <p className="text-[11px] text-gray-400 flex items-center justify-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Secured with Razorpay & 100% Star Guarantee</span>
              </p>
              <p className="text-[10px] text-amber-500">
                ⚡ Only 3 mystery rooms remaining at this rate
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Payment Checkout Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        deal={deal}
        onPaymentSuccess={(revData) => {
          setRevealedData(revData);
          setRevealModalOpen(true);
        }}
      />

      {/* The Reveal Modal */}
      <MysteryRevealModal
        isOpen={revealModalOpen}
        onClose={() => {
          setRevealModalOpen(false);
          router.push('/bookings');
        }}
        bookingData={revealedData}
      />

    </div>
  );
}
