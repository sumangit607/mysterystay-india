'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchHero from '@/components/SearchHero';
import MysteryDealCard from '@/components/MysteryDealCard';
import PaymentModal from '@/components/PaymentModal';
import MysteryRevealModal from '@/components/MysteryRevealModal';
import { 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Flame, 
  MapPin, 
  Star, 
  Compass, 
  CreditCard, 
  KeyRound,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Quote
} from 'lucide-react';
import type { SanitizedMysteryDeal } from '@/lib/mysteryEngine';

export default function HomePage() {
  const [deals, setDeals] = useState<SanitizedMysteryDeal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<SanitizedMysteryDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCity, setActiveCity] = useState('');
  const [activeStar, setActiveStar] = useState(0);

  // Modal states
  const [selectedDealForPayment, setSelectedDealForPayment] = useState<SanitizedMysteryDeal | null>(null);
  const [revealedBookingData, setRevealedBookingData] = useState<any | null>(null);
  const [revealModalOpen, setRevealModalOpen] = useState(false);

  // Fetch initial deals
  useEffect(() => {
    async function loadDeals() {
      try {
        setLoading(true);
        const res = await fetch('/api/deals');
        const data = await res.json();
        if (data.success) {
          setDeals(data.deals);
          setFilteredDeals(data.deals);
        }
      } catch (err) {
        console.error('Failed to load deals:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDeals();
  }, []);

  // Filter deals based on search inputs
  const handleSearch = (filters: {
    city: string;
    starRating: number;
    amenities: string[];
    minDiscount: number;
  }) => {
    setActiveCity(filters.city);
    setActiveStar(filters.starRating);

    let result = [...deals];

    if (filters.city) {
      result = result.filter((d) =>
        d.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.starRating > 0) {
      result = result.filter((d) => d.starRating === filters.starRating);
    }

    if (filters.amenities.length > 0) {
      result = result.filter((d) =>
        filters.amenities.every((req) =>
          d.amenities.some((a) => a.toLowerCase().includes(req.toLowerCase()))
        )
      );
    }

    setFilteredDeals(result);
  };

  const handleBookNow = (deal: SanitizedMysteryDeal) => {
    setSelectedDealForPayment(deal);
  };

  const handlePaymentSuccess = (revealedData: any) => {
    setRevealedBookingData(revealedData);
    setRevealModalOpen(true);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero with Interactive Search */}
      <SearchHero
        onSearch={handleSearch}
        selectedCity={activeCity}
        selectedStar={activeStar}
      />

      {/* 2. Today's Mystery Drops Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-500 font-bold text-xs uppercase tracking-widest">
              <Flame className="w-4 h-4 fill-current" />
              <span>Verified Distress Drops</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-1">
              Today&apos;s Secret Deals
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Authentic 4-star & 5-star properties with empty rooms for this week.
            </p>
          </div>

          <div className="text-xs text-gray-400 font-medium bg-gray-100 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-slate-700">
            Showing <strong className="text-amber-500">{filteredDeals.length}</strong> Secret Stays Available
          </div>
        </div>

        {/* Deals Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-slate-800/50 animate-pulse border border-slate-700/50" />
            ))}
          </div>
        ) : filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pt-4">
            {filteredDeals.map((deal) => (
              <MysteryDealCard
                key={deal.id}
                deal={deal}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900/60 rounded-3xl border border-gray-200 dark:border-slate-800 p-8 space-y-4">
            <Compass className="w-12 h-12 text-amber-500 mx-auto opacity-70" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No secret deals match your exact filter</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Hotels in this category are fully occupied. Try selecting &quot;All Destinations&quot; or clearing amenity filters.
            </p>
            <button
              onClick={() => handleSearch({ city: '', starRating: 0, amenities: [], minDiscount: 0 })}
              className="px-4 py-2 bg-amber-500 text-black text-xs font-semibold rounded-xl hover:bg-amber-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 3. Popular Indian Destinations Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            Destinations Across India
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Where Will You Mystery Stay Next?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            From Goan coastlines to royal Udaipur palaces and Himalayan mountain chalets.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { city: 'Goa', tag: 'From ₹7,499', img: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=500&q=80', desc: 'Beach Resorts' },
            { city: 'Bengaluru', tag: 'From ₹6,800', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&q=80', desc: 'Central Urban Stays' },
            { city: 'Udaipur', tag: 'From ₹14,999', img: 'https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?w=500&q=80', desc: 'Lake Palaces' },
            { city: 'Mumbai', tag: 'From ₹8,200', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80', desc: 'Seafront Luxury' },
            { city: 'Manali', tag: 'From ₹5,499', img: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=500&q=80', desc: 'Mountain Chalets' },
            { city: 'Jaipur', tag: 'From ₹5,999', img: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=500&q=80', desc: 'Royal Havelis' },
          ].map((dest) => (
            <button
              key={dest.city}
              onClick={() => handleSearch({ city: dest.city, starRating: 0, amenities: [], minDiscount: 0 })}
              className="group relative h-48 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 text-left transition-all duration-300 hover:scale-[1.03] hover:border-amber-500/60 shadow-md"
            >
              <Image
                src={dest.img}
                alt={dest.city}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-semibold text-amber-400 block">{dest.desc}</span>
                <h4 className="font-serif text-base font-bold">{dest.city}</h4>
                <span className="text-[11px] text-gray-300 font-medium">{dest.tag}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. How Mystery Booking Works (Interactive 3-Step Walkthrough) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 rounded-3xl border border-amber-500/30 p-8 sm:p-12 space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Transparent Mystery Model
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              How SecretStay Works
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              No guesswork on quality. Every single stay is guaranteed 4-star or 5-star with full amenities disclosed up front.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-xl">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Select City & Inclusions</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Choose your destination (e.g., Goa or Udaipur), star category (strictly 4★ or 5★), and preferences like infinity pool, breakfast, and spa.
              </p>
              <div className="pt-2 text-[11px] text-amber-400 font-medium">
                ✓ Guaranteed verified micro-market zone
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-xl">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Lock Unprecedented Rate</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Hotels release perishable vacant rooms at 40%–65% off public rack rates. Your price is held for 10 minutes during checkout.
              </p>
              <div className="pt-2 text-[11px] text-amber-400 font-medium">
                ✓ Full price transparency with GST itemization
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-xl">
                3
              </div>
              <h3 className="text-lg font-bold text-white">The Grand Identity Reveal</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                The exact hotel name, street address, and direct concierge contact are unveiled the moment your payment completes.
              </p>
              <div className="pt-2 text-[11px] text-amber-400 font-medium">
                ✓ VIP Voucher sent to WhatsApp & SMS
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Why Luxury Hotels Partner With Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              The Hospitality Partner Advantage
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Why 5-Star Hotel Chains Partner With SecretStay India
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              In Indian hospitality, an unsold room at midnight yields ₹0 forever. However, publicly cutting rates damages luxury brand prestige and violates strict OTA rate-parity contracts.
            </p>

            <div className="space-y-3.5">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Zero Brand Dilution</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Public rates on Taj or Oberoi remain ₹18,000+ while distressed inventory is liquidated privately.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">100% Rate Parity Compliance</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Because brand identity is unmasked only post-payment, existing OTA agreements remain completely unbreached.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Direct F&B & Spa Upsells</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Guests spending less on room tariffs spend generously at hotel restaurants, poolside bars, and wellness spas.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/partner"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs shadow-lg shadow-amber-500/20 transition-all"
              >
                <span>Explore Hotel Partner Extranet</span>
              </Link>
            </div>
          </div>

          <div className="relative h-96 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"
              alt="Luxury Hotel Partner Lobby"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 text-white">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 pb-1 border-b border-white/10">
                <span>OCCUPANCY RECOVERY ALGORITHM</span>
                <span>REVPAR +18.4%</span>
              </div>
              <p className="text-xs text-gray-300 mt-2">
                &ldquo;SecretStay enabled our Candolim property to achieve 89% weekday occupancy during monsoon without touching our public rack rate.&rdquo;
              </p>
              <span className="text-[11px] font-bold text-white mt-1 block">
                — General Manager, 5-Star Beach Resort, Goa
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Customer Testimonials & Verified Guest Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            Real Experiences
          </span>
          <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
            Loved by Spontaneous Indian Travellers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Ananya Sen',
              city: 'Mumbai',
              stay: '5-Star Resort in South Goa',
              review: 'I was hesitant about booking without knowing the exact name, but the 5-star guarantee was 100% genuine. The reveal gave us The Leela Goa at ₹8,999 when MMT was showing ₹22,000! Unbelievable weekend.',
              rating: 5,
              saved: '₹13,001',
            },
            {
              name: 'Siddharth Mehra',
              city: 'Bengaluru',
              stay: '5-Star Landmark in Central Bengaluru',
              review: 'Booked a luxury staycation for our anniversary. The reveal unlocked The Ritz-Carlton on Residency Road. Breakfast was included, room was top tier. The 10-minute price lock gave complete peace of mind.',
              rating: 5,
              saved: '₹9,700',
            },
            {
              name: 'Tanvi & Prateek',
              city: 'Delhi NCR',
              stay: 'Palatial Haven in Udaipur',
              review: 'SecretStay is the best thing to happen to Indian TravelTech. Got a royal lakefront heritage property in Udaipur for half the rack rate. Clean voucher on WhatsApp within 10 seconds.',
              rating: 5,
              saved: '₹23,000',
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 space-y-4 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Saved {t.saved}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                  <span className="text-gray-500">{t.city} • {t.stay}</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Frequently Asked Questions (Disclosure & Material Rules) */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            Transparency First
          </span>
          <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Clear disclosures of cancellation policies, location radius, and star ratings.
          </p>
        </div>

        <div className="space-y-3.5 text-xs">
          {[
            {
              q: 'How do you guarantee hotel quality if the name is secret?',
              a: 'Every property on SecretStay India is contractually audited and verified. When you choose a 5-star or 4-star category, you are legally guaranteed a property officially classified in that tier with verified guest satisfaction scores above 4.5/5. We never list unverified homestays or sub-standard budget hotels.',
            },
            {
              q: 'How close will the hotel be to my desired location?',
              a: 'We show tight, well-defined micro-markets (e.g. "Candolim & Sinquerim Beach Strip" or "Lake Pichola Western Banks"). Your hotel is guaranteed to be within that specific 3 to 5 km radius, ensuring you will never be placed in a distant, inconvenient suburb.',
            },
            {
              q: 'What is your cancellation and refund policy?',
              a: 'Due to the steep distress discounts (up to 60% off), mystery deals feature transparent cancellation windows: Full refund if cancelled up to 48 hours before check-in. Inside 48 hours, reservations become non-refundable as the room cannot be re-liquidated.',
            },
            {
              q: 'Are taxes and GST included?',
              a: 'Yes, full tax transparency is maintained before you make payment. We explicitly itemize the 18% hospitality GST and platform convenience fee before you confirm your Razorpay payment.',
            },
            {
              q: 'How soon after payment do I know the hotel name?',
              a: 'Instantly. The moment Razorpay confirms the transaction, our unmasking engine reveals the full hotel name, exact address, reception phone number, and generates a downloadable PDF voucher and WhatsApp pass.',
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 space-y-1.5"
            >
              <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Checkout Modal */}
      <PaymentModal
        isOpen={!!selectedDealForPayment}
        onClose={() => setSelectedDealForPayment(null)}
        deal={selectedDealForPayment}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* The Mystery Reveal Animation Modal */}
      <MysteryRevealModal
        isOpen={revealModalOpen}
        onClose={() => setRevealModalOpen(false)}
        bookingData={revealedBookingData}
      />

    </div>
  );
}
