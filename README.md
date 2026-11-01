# 🗝️ SecretStay India — Mystery Hotel Booking Platform

> **"Luxury Stays. Unexpected Prices."**  
> An innovative Indian TravelTech marketplace connecting discerning travellers with distressed premium 4-star and 5-star room inventory at 40%–65% off, without violating OTA rate parity or diluting hotel brand equity.

---

## 🌟 Key Innovations

1. **Anti-Cannibalization Opaque Deal Engine:**
   - Hotel identity, brand trademarks, and exact street address are securely masked before booking.
   - Customers choose by destination, verified star category (4★/5★), certified micro-market radius (e.g. *Candolim Beach Strip, North Goa*), and full transparent amenities (Pool, Spa, Beach Access, Complimentary Breakfast).
   - Rate parity agreements with major OTAs (MakeMyTrip, Booking.com, Agoda) remain completely unbreached.

2. **The Grand Identity Reveal:**
   - Upon successful payment verification through Razorpay, a suspenseful unmasking animation reveals the hotel's exact identity, full street address, reception desk contact, and issues a VIP check-in voucher with SMS/WhatsApp dispatch.

3. **10-Minute Inventory Hold Mutex:**
   - When a guest starts checkout, inventory is atomically locked for 10 minutes to prevent double-booking.

4. **Multi-Sided Platform:**
   - **Customer Portal:** Search, filters, price comparison, transparent GST itemization, instant booking, and revealed stay vouchers.
   - **Hotel Partner Extranet:** Property KYC, distress room inventory allocator, dynamic discount calibrator (40%–65%), and occupancy reports.
   - **Super Admin Operations Hub:** Platform GMV, 15% net commission ledger, hotel verification queue, and anti-fraud monitoring.

---

## 🏗️ Technology Stack

- **Framework:** Next.js 14+ (App Router, Server Components & Route Handlers)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Dark/Light mode support, luxury glassmorphism, champagne gold accents)
- **Database & ORM:** SQLite / PostgreSQL with Prisma ORM
- **Icons & UI:** Lucide React & Framer Motion
- **Payments:** Razorpay integration architecture (UPI, NetBanking, Cards)

---

## 📂 Project Structure

```
secretstay-india/
├── app/
│   ├── layout.tsx              # Root layout with Navbar, Footer & Dark theme
│   ├── page.tsx                # Customer Discovery Landing & Deals Grid
│   ├── globals.css             # Tailwind luxury styling & gold gradients
│   ├── deal/[id]/page.tsx      # Mystery deal details & sticky booking widget
│   ├── bookings/page.tsx       # Customer Portal: Revealed stays & VIP vouchers
│   ├── partner/page.tsx        # Hotel Partner Extranet: Yield & distress manager
│   ├── admin/page.tsx          # Super Admin Control Center & verification
│   └── api/
│       ├── deals/route.ts      # Sanitized opaque deals search
│       ├── deals/[id]/route.ts # Single deal details
│       ├── bookings/verify/    # Razorpay verification & identity unmasking
│       ├── bookings/route.ts   # Manage reservations & cancellations
│       ├── partner/stats/      # Extranet analytics & price adjustments
│       └── admin/metrics/      # Platform KPIs & hotel KYC queue
├── components/
│   ├── Navbar.tsx              # Top navigation with role switcher & theme toggle
│   ├── Footer.tsx              # Trust badges, Indian GST compliance & links
│   ├── SearchHero.tsx          # Destination picker, date & amenity filters
│   ├── MysteryDealCard.tsx     # Opaque deal card with savings & unmasking CTA
│   ├── PaymentModal.tsx        # 10-minute lock timer, Razorpay gateway & coupons
│   └── MysteryRevealModal.tsx  # The dramatic post-payment unmasking experience
├── lib/
│   ├── prisma.ts               # Prisma singleton client
│   ├── utils.ts                # INR formatting, discounts & reference generator
│   └── mysteryEngine.ts        # Dynamic pricing algorithms & data sanitizer
├── prisma/
│   ├── schema.prisma           # Relational schema (User, Hotel, Room, Booking...)
│   └── seed.js                 # Seed script with real luxury Indian hotels
└── test-pipeline.js            # Automated verification test suite
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js 18+ or 20+ installed.

### 2. Installation & Database Setup
```bash
cd secretstay-india

# Dependencies are already installed! If needed:
npm install

# Push schema to SQLite database (dev.db)
npx prisma db push

# Seed luxury hotels across Goa, Bengaluru, Udaipur, Mumbai, Manali, Jaipur
node prisma/seed.js
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 👥 Demo Personas & Test Credentials

Use the **Guest View / Hotelier / Admin** quick switcher in the top navigation bar to seamlessly explore all three sides of the marketplace:

| Persona | Role | Sample Credentials | Access Portal |
| :--- | :--- | :--- | :--- |
| **Rohan Sharma** | Customer | `rohan.sharma@example.com` / `SecretStay@2026` | `/` and `/bookings` |
| **Capt. Rajesh Nair** | Hotel Partner (Taj / Leela) | `partner.goa@tajhotels.example.com` / `PartnerStay@2026` | `/partner` |
| **Aditya Singhania** | Super Admin | `admin@secretstay.in` / `AdminStay@2026` | `/admin` |

### 🎟️ Promotional Coupons for Checkout:
- `MYSTERY500` — Flat ₹500 discount
- `FIRSTLUXE` — Flat ₹750 discount
