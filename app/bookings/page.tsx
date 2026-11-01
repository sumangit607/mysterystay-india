'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Luggage, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Download, 
  XCircle, 
  Phone, 
  Star, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    const confirm = window.confirm('Are you sure you want to cancel this reservation? Full refund will be initiated to your original payment method via Razorpay.');
    if (!confirm) return;

    try {
      setCancellingId(bookingId);
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Booking cancelled successfully. Refund initiated.');
        fetchBookings();
      }
    } catch (err) {
      alert('Cancellation failed. Please contact concierge support.');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-500">
            <Luggage className="w-4 h-4" />
            <span>Customer Portal</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">
            My Revealed Luxury Stays
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            View your unmasked hotel credentials, VIP check-in vouchers, and manage upcoming reservations.
          </p>
        </div>

        <Link
          href="/"
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs transition-colors flex items-center space-x-1.5"
        >
          <span>Find Another Mystery Stay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-slate-900 animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all shadow-xl space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="font-mono text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                    Ref: {booking.bookingReference}
                  </span>
                  <span className="text-xs text-gray-400 ml-3">Booked on {booking.createdAt}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'CONFIRMED'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    ● {booking.status}
                  </span>
                </div>
              </div>

              {/* Main Content Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                
                {/* Hotel Image */}
                <div className="relative h-40 md:h-36 rounded-2xl overflow-hidden border border-slate-800">
                  <Image
                    src={booking.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80'}
                    alt={booking.hotelName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-amber-400 flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{booking.starRating}★ Revealed</span>
                  </div>
                </div>

                {/* Hotel & Location Details */}
                <div className="md:col-span-2 space-y-2">
                  <h3 className="font-serif text-xl font-bold text-white">
                    {booking.hotelName}
                  </h3>
                  
                  <div className="text-xs text-gray-300 flex items-start space-x-1.5">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{booking.fullAddress}</span>
                  </div>

                  <div className="text-xs text-gray-400 flex items-center space-x-2 pt-1">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span className="text-white font-medium">
                      Check-in: {booking.checkInDate} — Check-out: {booking.checkOutDate}
                    </span>
                  </div>

                  <div className="text-xs text-gray-400 pt-0.5">
                    Guest: <strong className="text-white">{booking.guestName}</strong> ({booking.guestPhone})
                  </div>
                </div>

                {/* Price & Savings */}
                <div className="text-left md:text-right space-y-1">
                  <span className="text-xs text-gray-400 block">Total Paid via {booking.paymentMethod}</span>
                  <div className="text-2xl font-serif font-bold text-white">
                    {formatINR(booking.totalAmountINR)}
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 block">
                    You saved {formatINR(booking.savingsINR)}
                  </span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>VIP Concierge Checked In</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors flex items-center space-x-1.5 border border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Voucher</span>
                  </button>

                  {booking.status === 'CONFIRMED' && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={cancellingId === booking.id}
                      className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold transition-colors border border-rose-500/20 flex items-center space-x-1.5 disabled:opacity-50"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>{cancellingId === booking.id ? 'Processing...' : 'Cancel Stay'}</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/60 rounded-3xl border border-slate-800 p-8 space-y-4">
          <Luggage className="w-12 h-12 text-amber-500 mx-auto opacity-70" />
          <h3 className="text-lg font-bold text-white">No Bookings Yet</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Ready to treat yourself to verified luxury? Explore our secret drops across India today.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-amber-500 text-black text-xs font-semibold rounded-xl hover:bg-amber-600 transition-colors"
          >
            Explore Mystery Stays
          </Link>
        </div>
      )}

    </div>
  );
}
