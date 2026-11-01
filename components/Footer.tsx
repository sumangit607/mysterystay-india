import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Sparkles, CheckCircle2, Phone, Mail, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-gray-400 text-sm">
      {/* Trust & Guarantee Strip */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Guaranteed Star Rating</h4>
                <p className="text-xs text-gray-400">Strictly 4-star & 5-star accredited hotels.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Rate Parity Shield</h4>
                <p className="text-xs text-gray-400">Discounts up to 60% with full brand secrecy.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Zero Fake Pricing</h4>
                <p className="text-xs text-gray-400">Verified rack rates & authentic GST invoices.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Instant Identity Reveal</h4>
                <p className="text-xs text-gray-400">Hotel revealed instantly upon booking.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Secret<span className="gold-gradient-text">Stay</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                India
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              India&apos;s pioneering opaque hospitality platform. Connecting discerning travellers with distressed premium room inventory at unprecedented prices while safeguarding hotel brand equity.
            </p>
            <div className="pt-2 text-xs text-gray-500 space-y-1">
              <p>📍 Headquartered in Bengaluru, Karnataka, India</p>
              <p>💳 Secured by Razorpay & 256-bit SSL encryption</p>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Top Destinations</h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/?city=Goa" className="hover:text-amber-400 transition-colors">Goa Beach Resorts</Link></li>
              <li><Link href="/?city=Bengaluru" className="hover:text-amber-400 transition-colors">Bengaluru Tech Stays</Link></li>
              <li><Link href="/?city=Udaipur" className="hover:text-amber-400 transition-colors">Udaipur Lake Haveli</Link></li>
              <li><Link href="/?city=Mumbai" className="hover:text-amber-400 transition-colors">Mumbai Seafront</Link></li>
              <li><Link href="/?city=Manali" className="hover:text-amber-400 transition-colors">Manali Mountain Chalets</Link></li>
              <li><Link href="/?city=Jaipur" className="hover:text-amber-400 transition-colors">Jaipur Royal Palaces</Link></li>
            </ul>
          </div>

          {/* For Hoteliers */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Hotel Partners</h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/partner" className="hover:text-amber-400 transition-colors">Partner Extranet Login</Link></li>
              <li><Link href="/partner" className="hover:text-amber-400 transition-colors">Yield & Distress Inventory</Link></li>
              <li><Link href="/partner" className="hover:text-amber-400 transition-colors">Brand Protection Charter</Link></li>
              <li><Link href="/partner" className="hover:text-amber-400 transition-colors">Commission & Payouts</Link></li>
              <li><Link href="/partner" className="hover:text-amber-400 transition-colors">List Your 4★/5★ Hotel</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Support & Trust</h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/#faq" className="hover:text-amber-400 transition-colors">FAQs & Guarantees</Link></li>
              <li><Link href="/bookings" className="hover:text-amber-400 transition-colors">Manage Reservations</Link></li>
              <li><Link href="/admin" className="hover:text-amber-400 transition-colors">Super Admin Portal</Link></li>
              <li><span className="text-gray-400">24x7 WhatsApp Concierge</span></li>
              <li><span className="text-gray-400">support@secretstay.in</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom strip */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 SecretStay Hospitality Technologies India Pvt. Ltd. All rights reserved.</p>
          <div className="flex space-x-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cancellation Policy</span>
            <span>GST Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
