'use client';

import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  CreditCard, 
  QrCode, 
  Building, 
  Tag, 
  X,
  AlertCircle
} from 'lucide-react';
import { formatINR } from '@/lib/utils';
import type { SanitizedMysteryDeal } from '@/lib/mysteryEngine';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: SanitizedMysteryDeal | null;
  onPaymentSuccess: (revealedData: any) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  deal,
  onPaymentSuccess,
}: PaymentModalProps) {
  // 10-Minute Countdown Lock Timer
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes
  const [guestName, setGuestName] = useState('Rohan Sharma');
  const [guestEmail, setGuestEmail] = useState('rohan.sharma@example.com');
  const [guestPhone, setGuestPhone] = useState('+91 99887 66554');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [upiId, setUpiId] = useState('rohansharma@okhdfcbank');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Timer countdown
  useEffect(() => {
    if (!isOpen) return;
    setSecondsRemaining(600);
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !deal) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Calculation for a standard 2-night getaway
  const nights = 2;
  const baseTariff = deal.mysteryPriceINR * nights;
  const platformFee = 299;
  const gstRate = 0.18; // 18% GST standard in Indian luxury hotels
  const subtotal = baseTariff - appliedDiscount;
  const gstAmount = Math.round(subtotal * gstRate);
  const grandTotal = subtotal + platformFee + gstAmount;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'MYSTERY500') {
      setAppliedDiscount(500);
      setCouponMessage('🎉 Coupon MYSTERY500 applied! Flat ₹500 off.');
    } else if (code === 'FIRSTLUXE') {
      setAppliedDiscount(750);
      setCouponMessage('✨ First stay privilege! ₹750 discount applied.');
    } else {
      setCouponMessage('Invalid coupon code. Try MYSTERY500');
      setAppliedDiscount(0);
    }
  };

  const handleExecutePayment = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // Send booking verification request to Next.js API
      const res = await fetch('/api/bookings/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dealId: deal.id,
          guestName,
          guestEmail,
          guestPhone,
          nights,
          paymentMethod,
          grandTotal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete transaction.');
      }

      // Success! Pass data to reveal modal
      onPaymentSuccess(data.revealedBooking);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment simulation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-amber-900/50 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header Strip with 10-min Mutex Countdown */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/80 to-slate-900 p-4 border-b border-amber-500/30 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-sm">Secure Mystery Checkout</span>
          </div>

          <div className="flex items-center space-x-1.5 bg-black/60 px-3 py-1 rounded-full text-xs border border-amber-500/30 font-mono text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Price Locked: {timerDisplay}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* Deal Summary Box */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {deal.starRating}★ Verified Mystery Stay • {deal.microMarket}
              </div>
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white mt-0.5 line-clamp-1">
                {deal.headline}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {deal.roomType} • 2 Nights (2 Guests)
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-emerald-500 block">
                {deal.discountPercentage}% SAVED
              </span>
              <span className="text-xs line-through text-gray-400">
                {formatINR(deal.originalPriceINR * nights)}
              </span>
            </div>
          </div>

          {/* Guest Contact Information */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Guest Contact for WhatsApp Voucher & Pass
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-gray-500">Full Name</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="e.g. Rohan Sharma"
                />
              </div>

              <div>
                <label className="text-[11px] text-gray-500">WhatsApp Mobile (+91)</label>
                <input
                  type="text"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="+91 99887 66554"
                />
              </div>
            </div>
          </div>

          {/* Promo Coupon Strip */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center space-x-1">
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              <span>Secret Coupon Code</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Try MYSTERY500 or FIRSTLUXE"
                className="flex-1 px-3 py-2 text-xs uppercase font-mono rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-xl text-xs font-semibold text-gray-800 dark:text-white transition-colors"
              >
                Apply
              </button>
            </div>
            {couponMessage && (
              <p className={`text-xs ${appliedDiscount > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {couponMessage}
              </p>
            )}
          </div>

          {/* Payment Method Selector (Razorpay Gateway Simulation) */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Pay via Razorpay Secure Gateway
            </h5>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center justify-center space-y-1 transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold'
                    : 'border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>Instant UPI</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CARD')}
                className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center justify-center space-y-1 transition-all ${
                  paymentMethod === 'CARD'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold'
                    : 'border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit / Debit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('NETBANKING')}
                className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center justify-center space-y-1 transition-all ${
                  paymentMethod === 'NETBANKING'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold'
                    : 'border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>NetBanking</span>
              </button>
            </div>

            {paymentMethod === 'UPI' && (
              <div className="p-3 bg-gray-50 dark:bg-slate-800/80 rounded-xl border border-gray-200 dark:border-slate-700/80 text-xs space-y-1.5">
                <span className="text-gray-500">Virtual Payment Address (VPA)</span>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white font-mono"
                  placeholder="username@okhdfcbank"
                />
                <span className="text-[10px] text-gray-400 block">Supports Google Pay, PhonePe, Paytm & BHIM UPI</span>
              </div>
            )}
          </div>

          {/* Itemized Price Calculation */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-800 text-xs space-y-2">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Secret Tariff (₹{deal.mysteryPriceINR} × {nights} nights)</span>
              <span className="font-medium text-gray-900 dark:text-white">{formatINR(baseTariff)}</span>
            </div>

            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-500 font-medium">
                <span>Promotional Voucher Discount</span>
                <span>-{formatINR(appliedDiscount)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Platform VIP Concierge Fee</span>
              <span className="font-medium text-gray-900 dark:text-white">{formatINR(platformFee)}</span>
            </div>

            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Government Taxes (18% Luxury GST)</span>
              <span className="font-medium text-gray-900 dark:text-white">{formatINR(gstAmount)}</span>
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-slate-700 flex justify-between items-baseline font-bold text-sm">
              <span className="text-gray-900 dark:text-white">Total Amount Payable</span>
              <span className="text-xl font-serif gold-gradient-text">{formatINR(grandTotal)}</span>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-500 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Razorpay Final Pay Button */}
          <button
            onClick={handleExecutePayment}
            disabled={isProcessing || secondsRemaining === 0}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-amber-500 text-black font-bold text-sm shadow-xl shadow-amber-500/30 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Processing Razorpay Verification...</span>
              </div>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Pay {formatINR(grandTotal)} & Reveal Hotel</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-gray-400 flex items-center justify-center space-x-1">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>256-bit Bank Grade Encryption • Instant Confirmation & Reveal</span>
          </p>

        </div>
      </div>
    </div>
  );
}
