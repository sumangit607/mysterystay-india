import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeHotelForOpaqueListing } from '@/lib/mysteryEngine';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const starRating = searchParams.get('starRating') ? parseInt(searchParams.get('starRating')!) : null;

    const deals = await prisma.mysteryDeal.findMany({
      where: {
        status: 'ACTIVE',
        ...(city ? { hotel: { city: { contains: city } } } : {}),
        ...(starRating ? { hotel: { starRating } } : {}),
      },
      include: {
        hotel: true,
        room: true,
      },
      orderBy: {
        priorityScore: 'desc',
      },
    });

    // Anonymize each deal strictly
    const sanitizedDeals = deals.map((deal) =>
      sanitizeHotelForOpaqueListing(deal.hotel, deal, deal.room)
    );

    return NextResponse.json({
      success: true,
      count: sanitizedDeals.length,
      deals: sanitizedDeals,
    });
  } catch (error: any) {
    console.error('API /deals error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch mystery deals' },
      { status: 500 }
    );
  }
}
