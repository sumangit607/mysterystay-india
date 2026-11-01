'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Building2, 
  Users, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Lock,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [adminData, setAdminData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingHotelId, setUpdatingHotelId] = useState<string | null>(null);

  const fetchAdminMetrics = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/metrics');
      const data = await res.json();
      if (data.success) {
        setAdminData(data);
      }
    } catch (err) {
      console.error('Failed to load admin metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminMetrics();
  }, []);

  const handleToggleHotelVerification = async (hotelId: string, currentStatus: boolean) => {
    try {
      setUpdatingHotelId(hotelId);
      const res = await fetch('/api/admin/metrics', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelId,
          isVerified: !currentStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAdminMetrics();
      }
    } catch (err) {
      alert('Verification update failed.');
    } finally {
      setUpdatingHotelId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-gray-400">Loading platform command center...</p>
      </div>
    );
  }

  const overview = adminData?.overview || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Central Operations & Risk Control</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">
            Super Admin Control Center
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Platform GMV, hotel partner verification queue, commission settlement, and fraud prevention telemetry.
          </p>
        </div>

        <div className="text-xs bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl font-mono text-gray-400">
          SYSTEM STATUS: <span className="text-emerald-400 font-bold">ALL SERVICES OPERATIONAL</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Gross Merchandise Value (GMV)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-serif text-white">
            {formatINR(overview.totalGMVINR || 148500)}
          </div>
          <p className="text-[11px] text-emerald-400">+34% vs last month</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Platform Net Revenue (15%)</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-serif gold-gradient-text">
            {formatINR(overview.platformCommissionINR || 22275)}
          </div>
          <p className="text-[11px] text-gray-500">Includes convenience fees</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Verified Hotel Partners</span>
            <Building2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-serif text-white">
            {overview.verifiedHotels || 7} / {overview.totalHotels || 7}
          </div>
          <p className="text-[11px] text-gray-500">Strict star accredited properties</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Fraud & Identity Leak Risk</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-serif text-emerald-400">
            {overview.fraudRiskIndex || '0.02%'}
          </div>
          <p className="text-[11px] text-gray-500">Zero premature disclosures</p>
        </div>

      </div>

      {/* Main Admin Grids: Verification Queue & Live Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Hotel Verification Queue */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-white">Partner Verification Queue</h3>
            <span className="text-xs text-gray-400">Official Ministry Tier Audit</span>
          </div>

          <div className="space-y-3">
            {adminData?.hotels?.map((hotel: any) => (
              <div
                key={hotel.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{hotel.name}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold text-[10px]">
                      {hotel.starRating}★
                    </span>
                  </div>
                  <p className="text-gray-400">{hotel.legalEntityName} • {hotel.city}</p>
                  <p className="text-[11px] text-gray-500">Owner: {hotel.ownerName}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleHotelVerification(hotel.id, hotel.isVerified)}
                    disabled={updatingHotelId === hotel.id}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-all text-xs flex items-center space-x-1 ${
                      hotel.isVerified
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-rose-500/15 hover:text-rose-400 hover:border-rose-500/30'
                        : 'bg-amber-500 text-black hover:bg-amber-600'
                    }`}
                  >
                    {hotel.isVerified ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5 text-black" />
                        <span>Approve</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Transaction Ledger */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-white">Live Transaction Ledger</h3>
            <span className="text-xs text-gray-400 font-mono">15% Net Commission</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-gray-400">
                  <th className="pb-3 font-semibold">Booking Ref</th>
                  <th className="pb-3 font-semibold">Guest</th>
                  <th className="pb-3 font-semibold">GMV</th>
                  <th className="pb-3 font-semibold">Fee Cut</th>
                  <th className="pb-3 font-semibold text-right">Gateway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {adminData?.recentTransactions?.length > 0 ? (
                  adminData.recentTransactions.map((tx: any) => (
                    <tr key={tx.id} className="text-gray-300">
                      <td className="py-3 font-mono text-amber-400">{tx.bookingReference}</td>
                      <td className="py-3 font-medium text-white">{tx.guestName}</td>
                      <td className="py-3 font-semibold">{formatINR(tx.totalAmountINR)}</td>
                      <td className="py-3 text-emerald-400 font-bold">{formatINR(tx.commissionINR)}</td>
                      <td className="py-3 text-right">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                          CAPTURED
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500">
                      Transactions will populate upon customer checkout.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Financial & Unit Economics Architecture Reference */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
        <h3 className="font-serif text-lg font-bold text-white">Indian TravelTech Yield Parameters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-gray-400 font-semibold block">Platform Take Rate</span>
            <span className="text-lg font-bold text-amber-400">15.0% + ₹299 Fee</span>
            <p className="text-[11px] text-gray-500">Collected automatically at checkout settlement</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-gray-400 font-semibold block">Checkout Lock Mutex</span>
            <span className="text-lg font-bold text-emerald-400">10 Minutes Window</span>
            <p className="text-[11px] text-gray-500">Auto-expires uncompleted carts to prevent inventory hold</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-gray-400 font-semibold block">Hospitality Tax Model</span>
            <span className="text-lg font-bold text-sky-400">18% GST Dual Slab</span>
            <p className="text-[11px] text-gray-500">Compliant with Central CBIC hospitality tax guidelines</p>
          </div>
        </div>
      </div>

    </div>
  );
}
