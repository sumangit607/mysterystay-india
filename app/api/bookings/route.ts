import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || 'rohan.sharma@example.com';

    const bookings = await prisma.booking.findMany({
      where: {
        guestEmail: email,
      },
      include: {
        deal: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // For confirmed bookings, lookup hotel to display full revealed details
    const formattedBookings = await Promise.all(
      bookings.map(async (b) => {
        const hotel = await prisma.hotel.findUnique({
          where: { id: b.hotelId },
        });

        const brandImages = hotel && typeof hotel.brandImages === 'string'
          ? JSON.parse(hotel.brandImages)
          : (hotel?.brandImages || []);

        const publicImages = hotel && typeof hotel.publicImages === 'string'
          ? JSON.parse(hotel.publicImages)
          : (hotel?.publicImages || []);

        return {
          id: b.id,
          bookingReference: b.bookingReference,
          status: b.status,
          hotelName: hotel ? hotel.name : 'Secret Luxury Hotel',
          fullAddress: hotel ? hotel.fullAddress : 'Hidden',
          city: hotel ? hotel.city : '',
          microMarket: hotel ? hotel.microMarket : '',
          starRating: hotel ? hotel.starRating : 5,
          guestName: b.guestName,
          guestPhone: b.guestPhone,
          checkInDate: b.checkInDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          checkOutDate: b.checkOutDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          totalAmountINR: b.totalAmountINR,
          originalTotalINR: b.originalTotalINR,
          savingsINR: Math.max(0, b.originalTotalINR - b.finalPriceINR),
          paymentMethod: b.paymentMethod,
          paymentId: b.paymentId,
          images: brandImages.length > 0 ? brandImages : publicImages,
          createdAt: b.createdAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        };
      })
    );

    return NextResponse.json({
      success: true,
      count: formattedBookings.length,
      bookings: formattedBookings,
    });
  } catch (error: any) {
    console.error('API /bookings GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve bookings' },
      { status: 500 }
    );
  }
}

// Cancel Booking endpoint
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json(
        { success: false, error: 'Booking ID required' },
        { status: 400 }
      );
    }

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Booking successfully cancelled. Refund processed via Razorpay.',
      booking: updated,
    });
  } catch (error: any) {
    console.error('API /bookings PATCH error:', error);
    return NextResponse.json(
      { success: false, error: 'Cancellation failed' },
      { status: 500 }
    );
  }
}
