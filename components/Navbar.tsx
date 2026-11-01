'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  KeyRound, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Briefcase, 
  Moon, 
  Sun, 
  Luggage,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [currentRole, setCurrentRole] = useState<'CUSTOMER' | 'PARTNER' | 'ADMIN'>('CUSTOMER');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initial theme setup (default dark luxury)
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-50 w-full luxury-glass border-b border-gray-200 dark:border-amber-900/30 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <KeyRound className="w-6 h-6 text-black" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Secret<span className="gold-gradient-text">Stay</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30">
                  India
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                Luxury Stays. Unexpected Prices.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/' 
                  ? 'text-amber-500 font-semibold' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-amber-500'
              }`}
            >
              Secret Drops
            </Link>

            <Link 
              href="/#how-it-works" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-amber-500 transition-colors"
            >
              How It Works
            </Link>

            <Link 
              href="/bookings" 
              className={`text-sm font-medium flex items-center space-x-1.5 transition-colors ${
                pathname === '/bookings' 
                  ? 'text-amber-500 font-semibold' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-amber-500'
              }`}
            >
              <Luggage className="w-4 h-4" />
              <span>My Stays</span>
            </Link>

            <Link 
              href="/partner" 
              className={`text-sm font-medium flex items-center space-x-1.5 transition-colors ${
                pathname === '/partner' 
                  ? 'text-amber-500 font-semibold' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-amber-500'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-500" />
              <span>Hotel Extranet</span>
            </Link>

            <Link 
              href="/admin" 
              className={`text-sm font-medium flex items-center space-x-1.5 transition-colors ${
                pathname === '/admin' 
                  ? 'text-amber-500 font-semibold' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-amber-500'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Admin Hub</span>
            </Link>
          </nav>

          {/* Right Controls: Role Preview Pill + Theme Switcher */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Quick Demo Switcher */}
            <div className="flex items-center text-xs bg-gray-100 dark:bg-slate-800/80 p-1 rounded-xl border border-gray-200 dark:border-slate-700">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  pathname === '/' || pathname.startsWith('/deal')
                    ? 'bg-amber-500 text-black font-semibold shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-white'
                }`}
              >
                Guest View
              </Link>
              <Link
                href="/partner"
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  pathname === '/partner'
                    ? 'bg-amber-500 text-black font-semibold shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-white'
                }`}
              >
                Hotelier
              </Link>
              <Link
                href="/admin"
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  pathname === '/admin'
                    ? 'bg-amber-500 text-black font-semibold shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-white'
                }`}
              >
                Admin
              </Link>
            </div>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-6 space-y-3 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-xl">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            Secret Drops
          </Link>
          <Link
            href="/bookings"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            My Stays (Revealed)
          </Link>
          <Link
            href="/partner"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            Hotel Partner Portal
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            Admin Panel
          </Link>
        </div>
      )}
    </header>
  );
}
