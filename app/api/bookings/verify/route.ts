import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateBookingRef } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      dealId,
      guestName,
      guestEmail,
      guestPhone,
      nights = 2,
      paymentMethod = 'Razorpay UPI',
      grandTotal,
    } = body;

    if (!dealId || !guestName || !guestEmail || !guestPhone) {
      return NextResponse.json(
        { success: false, error: 'Missing required booking information' },
        { status: 400 }
      );
    }

    const deal = await prisma.mysteryDeal.findUnique({
      where: { id: dealId },
      include: {
        hotel: true,
        room: true,
      },
    });

    if (!deal) {
      return NextResponse.json(
        { success: false, error: 'Deal no longer available' },
        { status: 404 }
      );
    }

    // Find or create customer
    let user = await prisma.user.findFirst({
      where: { email: guestEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: guestEmail,
          passwordHash: 'DemoStay@2026',
          name: guestName,
          phone: guestPhone,
          role: 'CUSTOMER',
        },
      });
    }

    const bookingRef = generateBookingRef();
    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(today.getDate() + 3);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkIn.getDate() + nights);

    const baseTariff = deal.mysteryPriceINR * nights;
    const gstAmount = Math.round(baseTariff * 0.18);
    const platformFee = 299;
    const totalAmount = grandTotal || (baseTariff + gstAmount + platformFee);

    // Create confirmed booking
    const booking = await prisma.booking.create({
      data: {
        bookingReference: bookingRef,
        userId: user.id,
        dealId: deal.id,
        hotelId: deal.hotel.id,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        guestCount: 2,
        roomCount: 1,
        guestName,
        guestEmail,
        guestPhone,
        originalTotalINR: deal.originalPriceINR * nights,
        finalPriceINR: baseTariff,
        platformFeeINR: platformFee,
        taxGSTINR: gstAmount,
        totalAmountINR: totalAmount,
        status: 'CONFIRMED',
        paymentMethod,
        paymentId: `pay_rzp_${Math.random().toString(36).substring(2, 11)}`,
        razorpayOrderId: `order_rzp_${Math.random().toString(36).substring(2, 10)}`,
        revealedAt: new Date(),
      },
    });

    // Unmask brand images
    const brandImages = typeof deal.hotel.brandImages === 'string'
      ? JSON.parse(deal.hotel.brandImages)
      : (deal.hotel.brandImages || []);

    const publicImages = typeof deal.hotel.publicImages === 'string'
      ? JSON.parse(deal.hotel.publicImages)
      : (deal.hotel.publicImages || []);

    const revealedBooking = {
      bookingId: booking.id,
      bookingReference: booking.bookingReference,
      hotelName: deal.hotel.name, // The SECRET name is now UNVEILED!
      starRating: deal.hotel.starRating,
      fullAddress: deal.hotel.fullAddress, // The secret address is now unveiled!
      city: deal.hotel.city,
      microMarket: deal.hotel.microMarket,
      roomType: deal.room.roomType,
      checkInDate: checkIn.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      checkOutDate: checkOut.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      totalAmountINR: totalAmount,
      brandImages: brandImages.length > 0 ? brandImages : publicImages,
      guestName,
      guestPhone,
      status: 'CONFIRMED',
    };

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully. Hotel identity unveiled.',
      revealedBooking,
    });
  } catch (error: any) {
    console.error('API /bookings/verify error:', error);
    return NextResponse.json(
      { success: false, error: 'Transaction failed. Please try again.' },
      { status: 500 }
    );
  }
}
