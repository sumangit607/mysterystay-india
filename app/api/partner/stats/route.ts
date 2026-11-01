import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const partner = await prisma.user.findFirst({
      where: { role: 'PARTNER' },
      include: {
        hotels: {
          include: {
            rooms: true,
            mysteryDeals: true,
          },
        },
      },
    });

    if (!partner) {
      return NextResponse.json(
        { success: false, error: 'Partner profile not found' },
        { status: 404 }
      );
    }

    // Get bookings associated with partner's hotels
    const hotelIds = partner.hotels.map((h) => h.id);
    const bookings = await prisma.booking.findMany({
      where: {
        hotelId: { in: hotelIds },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const totalRevenue = bookings.reduce((sum, b) => sum + b.finalPriceINR, 0);
    const totalRoomNightsSold = bookings.length * 2;
    const estimatedRevPARGain = Math.round(totalRevenue / Math.max(1, partner.hotels.length * 30));

    return NextResponse.json({
      success: true,
      partner: {
        name: partner.name,
        email: partner.email,
        phone: partner.phone,
      },
      metrics: {
        totalProperties: partner.hotels.length,
        totalBookings: bookings.length,
        totalRevenueINR: totalRevenue,
        estimatedRevPARGainINR: estimatedRevPARGain,
        occupancyUpliftPercent: 18.4,
        averageDistressDiscount: 58,
      },
      hotels: partner.hotels.map((h) => ({
        id: h.id,
        name: h.name,
        city: h.city,
        microMarket: h.microMarket,
        starRating: h.starRating,
        isVerified: h.isVerified,
        roomsCount: h.rooms.length,
        activeDealsCount: h.mysteryDeals.length,
        currentDeal: h.mysteryDeals[0] ? {
          id: h.mysteryDeals[0].id,
          headline: h.mysteryDeals[0].headline,
          rackRateINR: h.mysteryDeals[0].originalPriceINR,
          mysteryPriceINR: h.mysteryDeals[0].mysteryPriceINR,
          discountPercentage: h.mysteryDeals[0].discountPercentage,
          status: h.mysteryDeals[0].status,
        } : null,
      })),
      recentBookings: bookings.map((b) => ({
        id: b.id,
        bookingReference: b.bookingReference,
        guestName: b.guestName,
        guestPhone: b.guestPhone,
        status: b.status,
        amountINR: b.finalPriceINR,
        checkInDate: b.checkInDate.toLocaleDateString('en-IN'),
        checkOutDate: b.checkOutDate.toLocaleDateString('en-IN'),
      })),
    });
  } catch (error: any) {
    console.error('API /partner/stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve partner analytics' },
      { status: 500 }
    );
  }
}

// Allows updating or tweaking mystery deal discounts
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dealId, newMysteryPriceINR, status } = body;

    if (!dealId) {
      return NextResponse.json(
        { success: false, error: 'Deal ID required' },
        { status: 400 }
      );
    }

    const existing = await prisma.mysteryDeal.findUnique({
      where: { id: dealId },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Deal not found' },
        { status: 404 }
      );
    }

    const updatedPrice = newMysteryPriceINR || existing.mysteryPriceINR;
    const updatedDiscount = Math.round(
      ((existing.originalPriceINR - updatedPrice) / existing.originalPriceINR) * 100
    );

    const updated = await prisma.mysteryDeal.update({
      where: { id: dealId },
      data: {
        mysteryPriceINR: updatedPrice,
        discountPercentage: updatedDiscount,
        ...(status ? { status } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Deal pricing updated successfully',
      deal: updated,
    });
  } catch (error: any) {
    console.error('API /partner/stats POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update deal' },
      { status: 500 }
    );
  }
}
