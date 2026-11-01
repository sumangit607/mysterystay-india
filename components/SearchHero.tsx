'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  Search, 
  Star, 
  SlidersHorizontal,
  Flame,
  Check
} from 'lucide-react';

interface SearchHeroProps {
  onSearch: (filters: {
    city: string;
    starRating: number;
    amenities: string[];
    minDiscount: number;
  }) => void;
  selectedCity: string;
  selectedStar: number;
}

const CITIES = [
  { name: 'All Destinations', value: '' },
  { name: 'Goa', value: 'Goa', tag: 'Beach & Resorts' },
  { name: 'Bengaluru', value: 'Bengaluru', tag: 'Tech & Luxury' },
  { name: 'Udaipur', value: 'Udaipur', tag: 'Royal Heritage' },
  { name: 'Mumbai', value: 'Mumbai', tag: 'Coastal Metros' },
  { name: 'Manali', value: 'Manali', tag: 'Himalayan Retreat' },
  { name: 'Jaipur', value: 'Jaipur', tag: 'Palaces & Forts' },
];

const POPULAR_AMENITIES = [
  'Swimming Pool',
  'Private Beach Access',
  'Free Wi-Fi',
  'Breakfast',
  'Spa',
  'Gym',
];

export default function SearchHero({ onSearch, selectedCity, selectedStar }: SearchHeroProps) {
  const [city, setCity] = useState(selectedCity || '');
  const [starRating, setStarRating] = useState<number>(selectedStar || 0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [checkIn, setCheckIn] = useState('2026-11-05');
  const [checkOut, setCheckOut] = useState('2026-11-07');
  const [guests, setGuests] = useState('2 Guests, 1 Room');

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleApplySearch = () => {
    onSearch({
      city,
      starRating,
      amenities: selectedAmenities,
      minDiscount,
    });
  };

  return (
    <div className="relative pt-8 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-amber-500/10 via-slate-900/40 to-slate-950">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
        
        {/* Urgent Value Proposition Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-medium shadow-sm animate-pulse">
          <Flame className="w-4 h-4 text-amber-500" />
          <span>Exclusive Opaque Inventory — Save 40% to 65% on 5-Star & 4-Star Stays</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight">
          Luxury Stays. <span className="gold-gradient-text">Unexpected Prices.</span>
        </h1>

        <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Book verified luxury and heritage hotels across India at secret insider rates. The hotel name is revealed the second your reservation is secured.
        </p>

        {/* Search & Filter Master Card */}
        <div className="mt-8 bg-white dark:bg-slate-900/90 rounded-2xl shadow-2xl border border-gray-200 dark:border-amber-900/40 p-4 sm:p-6 text-left backdrop-blur-xl">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* 1. Destination Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Destination</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {CITIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.name} {c.tag ? `(${c.tag})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Check-in & Check-out */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Check-in — Check-out</span>
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-1/2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-2.5 py-2.5 text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-1/2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-2.5 py-2.5 text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* 3. Guests & Rooms */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                <span>Travellers</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="1 Guest, 1 Room">1 Guest, 1 Room (Solo Luxe)</option>
                <option value="2 Guests, 1 Room">2 Guests, 1 Room (Couples / Duo)</option>
                <option value="3 Guests, 1 Room">3 Guests, 1 Room</option>
                <option value="4 Guests, 2 Rooms">4 Guests, 2 Rooms (Family)</option>
              </select>
            </div>

            {/* 4. Action Button */}
            <div className="flex items-end">
              <button
                onClick={handleApplySearch}
                className="w-full py-2.5 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold rounded-xl text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
              >
                <Search className="w-4 h-4" />
                <span>Unlock Mystery Deals</span>
              </button>
            </div>

          </div>

          {/* Secondary Filter Bar: Verified Star Rating & Inclusions */}
          <div className="mt-5 pt-5 border-t border-gray-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            
            {/* Star Rating Selectors */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Category:</span>
              <button
                onClick={() => setStarRating(0)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  starRating === 0
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                All Luxury
              </button>
              <button
                onClick={() => setStarRating(5)}
                className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 transition-all ${
                  starRating === 5
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                <span>5★ Grand Luxury</span>
              </button>
              <button
                onClick={() => setStarRating(4)}
                className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 transition-all ${
                  starRating === 4
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                <span>4★ Premium</span>
              </button>
            </div>

            {/* Quick Amenity Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:inline">Preferences:</span>
              {POPULAR_AMENITIES.map((amenity) => {
                const active = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 ${
                      active
                        ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-transparent hover:border-gray-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {active && <Check className="w-3 h-3 text-amber-500" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
