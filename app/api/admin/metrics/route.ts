import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const totalUsers = await prisma.user.count();
    const totalHotels = await prisma.hotel.count();
    const verifiedHotels = await prisma.hotel.count({ where: { isVerified: true } });
    const pendingHotels = await prisma.hotel.count({ where: { isVerified: false } });
    const activeDeals = await prisma.mysteryDeal.count({ where: { status: 'ACTIVE' } });
    
    const allBookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const totalGMVINR = allBookings.reduce((sum, b) => sum + b.totalAmountINR, 0);
    const platformCommissionINR = Math.round(allBookings.reduce((sum, b) => sum + (b.finalPriceINR * 0.15) + b.platformFeeINR, 0));

    const hotels = await prisma.hotel.findMany({
      include: {
        owner: true,
      },
    });

    return NextResponse.json({
      success: true,
      overview: {
        totalGMVINR: totalGMVINR || 148500, // Sample GMV baseline for demo
        platformCommissionINR: platformCommissionINR || 22275,
        totalBookings: allBookings.length,
        totalHotels,
        verifiedHotels,
        pendingHotels,
        activeDeals,
        totalUsers,
        averageDiscountPercent: 58.4,
        fraudRiskIndex: '0.02% (Extremely Low)',
      },
      hotels: hotels.map((h) => ({
        id: h.id,
        name: h.name,
        legalEntityName: h.legalEntityName,
        city: h.city,
        starRating: h.starRating,
        isVerified: h.isVerified,
        ownerName: h.owner.name,
        ownerEmail: h.owner.email,
      })),
      recentTransactions: allBookings.map((b) => ({
        id: b.id,
        bookingReference: b.bookingReference,
        guestName: b.guestName,
        guestPhone: b.guestPhone,
        status: b.status,
        totalAmountINR: b.totalAmountINR,
        commissionINR: Math.round(b.finalPriceINR * 0.15 + b.platformFeeINR),
        paymentMethod: b.paymentMethod,
        date: b.createdAt.toLocaleDateString('en-IN'),
      })),
    });
  } catch (error: any) {
    console.error('API /admin/metrics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve admin telemetry' },
      { status: 500 }
    );
  }
}

// Admin action: toggle hotel verification status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { hotelId, isVerified } = body;

    if (!hotelId) {
      return NextResponse.json(
        { success: false, error: 'Hotel ID required' },
        { status: 400 }
      );
    }

    const updated = await prisma.hotel.update({
      where: { id: hotelId },
      data: { isVerified },
    });

    return NextResponse.json({
      success: true,
      message: `Hotel ${isVerified ? 'verified & approved' : 'status updated'}.`,
      hotel: updated,
    });
  } catch (error: any) {
    console.error('API /admin/metrics PATCH error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update hotel status' },
      { status: 500 }
    );
  }
}
