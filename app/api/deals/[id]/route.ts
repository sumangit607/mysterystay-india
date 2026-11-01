import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeHotelForOpaqueListing } from '@/lib/mysteryEngine';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const deal = await prisma.mysteryDeal.findUnique({
      where: { id },
      include: {
        hotel: true,
        room: true,
      },
    });

    if (!deal) {
      return NextResponse.json(
        { success: false, error: 'Mystery deal not found or expired' },
        { status: 404 }
      );
    }

    const sanitized = sanitizeHotelForOpaqueListing(deal.hotel, deal, deal.room);

    return NextResponse.json({
      success: true,
      deal: sanitized,
    });
  } catch (error: any) {
    console.error('API /deals/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch mystery deal' },
      { status: 500 }
    );
  }
}
