'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  BedDouble, 
  Calendar, 
  Sliders, 
  CheckCircle2, 
  Plus, 
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Eye,
  AlertCircle
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function PartnerExtranetPage() {
  const [partnerData, setPartnerData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDealId, setSelectedDealId] = useState<string>('');
  const [newPrice, setNewPrice] = useState<number>(7499);
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchPartnerStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/partner/stats');
      const data = await res.json();
      if (data.success) {
        setPartnerData(data);
        if (data.hotels[0]?.currentDeal) {
          setSelectedDealId(data.hotels[0].currentDeal.id);
          setNewPrice(data.hotels[0].currentDeal.mysteryPriceINR);
        }
      }
    } catch (err) {
      console.error('Failed to load partner data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerStats();
  }, []);

  const handleUpdateDealPricing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDealId) return;

    try {
      setIsUpdating(true);
      setStatusMessage(null);

      const res = await fetch('/api/partner/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dealId: selectedDealId,
          newMysteryPriceINR: Number(newPrice),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage('✅ Deal discount calibrated successfully. Live in opaque inventory pool.');
        fetchPartnerStats();
      }
    } catch (err) {
      setStatusMessage('Failed to update deal.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-400">Loading hotel partner yield analytics...</p>
      </div>
    );
  }

  const metrics = partnerData?.metrics || {
    totalProperties: 2,
    totalBookings: 8,
    totalRevenueINR: 64200,
    estimatedRevPARGainINR: 1450,
    occupancyUpliftPercent: 18.4,
    averageDistressDiscount: 58,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-500">
            <Building2 className="w-4 h-4" />
            <span>Hotel Partner Extranet • Yield & Distress Inventory</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">
            {partnerData?.partner?.name || 'Capt. Rajesh Nair (Taj / Leela Partner)'}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage unsold room allocations, configure confidential distress discount bands, and track RevPAR gains.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Rate Parity Compliant</span>
          </span>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Occupancy Uplift</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-serif text-emerald-400">
            +{metrics.occupancyUpliftPercent}%
          </div>
          <p className="text-[11px] text-gray-500">Incremental weekday occupancy</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>RevPAR Gain</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-serif text-white">
            +{formatINR(metrics.estimatedRevPARGainINR)}
          </div>
          <p className="text-[11px] text-gray-500">Uplift per available room night</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Net Partner Earnings</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-serif text-white">
            {formatINR(metrics.totalRevenueINR || 68400)}
          </div>
          <p className="text-[11px] text-gray-500">Settled via automated NEFT</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Distressed Rooms Filled</span>
            <BedDouble className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-serif text-white">
            {metrics.totalBookings || 7} Stays
          </div>
          <p className="text-[11px] text-gray-500">Zero public price cannibalization</p>
        </div>

      </div>

      {/* Main Grid: Inventory Management & Active Reservations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Distress Deal Dynamic Pricing Engine */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-amber-500" />
              <span>Distress Deal Calibrator</span>
            </h3>
            <p className="text-xs text-gray-400">
              Adjust mystery room tariffs dynamically to fill empty inventory for the upcoming 72 hours.
            </p>
          </div>

          <form onSubmit={handleUpdateDealPricing} className="space-y-4 text-xs">
            <div>
              <label className="text-gray-400 block mb-1 font-semibold">Select Property & Room</label>
              <select
                value={selectedDealId}
                onChange={(e) => {
                  setSelectedDealId(e.target.value);
                  const selected = partnerData.hotels
                    .map((h: any) => h.currentDeal)
                    .find((d: any) => d?.id === e.target.value);
                  if (selected) setNewPrice(selected.mysteryPriceINR);
                }}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                {partnerData?.hotels?.map((h: any) =>
                  h.currentDeal ? (
                    <option key={h.currentDeal.id} value={h.currentDeal.id}>
                      {h.name} — Rack: ₹{h.currentDeal.rackRateINR}
                    </option>
                  ) : null
                )}
              </select>
            </div>

            <div>
              <label className="text-gray-400 block mb-1 font-semibold">
                Mystery Selling Price (INR)
              </label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                min={3000}
                max={30000}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {/* Calculations Breakdown */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-[11px]">
              <div className="flex justify-between text-gray-400">
                <span>Calculated Mystery Discount:</span>
                <span className="font-bold text-rose-400">
                  {Math.round(((18500 - newPrice) / 18500) * 100)}% OFF
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>SecretStay Commission (15%):</span>
                <span className="font-semibold text-gray-300">
                  {formatINR(Math.round(newPrice * 0.15))}
                </span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-slate-800">
                <span>Net Hotel Payout Per Night:</span>
                <span>{formatINR(Math.round(newPrice * 0.85))}</span>
              </div>
            </div>

            {statusMessage && (
              <p className="text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                {statusMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              {isUpdating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Update Secret Listing</span>
            </button>
          </form>
        </div>

        {/* Right 2 Cols: Listed Properties & Reservations */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Properties Summary */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Your Listed Properties</h3>
            
            <div className="space-y-3">
              {partnerData?.hotels?.map((hotel: any) => (
                <div
                  key={hotel.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{hotel.name}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold text-[10px]">
                        {hotel.starRating}★ Certified
                      </span>
                    </div>
                    <p className="text-gray-400">{hotel.microMarket}, {hotel.city}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Active Distress Deal
                    </span>
                    <span className="font-mono text-white font-bold">
                      {formatINR(hotel.currentDeal?.mysteryPriceINR || 7499)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Reservations */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white">Live Mystery Reservations</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-gray-400">
                    <th className="pb-3 font-semibold">Booking Ref</th>
                    <th className="pb-3 font-semibold">Guest</th>
                    <th className="pb-3 font-semibold">Stay Dates</th>
                    <th className="pb-3 font-semibold">Payout</th>
                    <th className="pb-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {partnerData?.recentBookings?.length > 0 ? (
                    partnerData.recentBookings.map((res: any) => (
                      <tr key={res.id} className="text-gray-300">
                        <td className="py-3 font-mono text-amber-400">{res.bookingReference}</td>
                        <td className="py-3 font-medium text-white">{res.guestName}</td>
                        <td className="py-3 text-gray-400">{res.checkInDate}</td>
                        <td className="py-3 font-semibold text-emerald-400">{formatINR(res.amountINR * 0.85)}</td>
                        <td className="py-3 text-right">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                            {res.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-500">
                        No active reservations yet. New bookings appear here instantly.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
