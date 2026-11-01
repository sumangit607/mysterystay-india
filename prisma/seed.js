const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting SecretStay India database seed...');

  // Clean existing records if any
  try {
    await prisma.review.deleteMany();
    await prisma.bookingItem.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.wishlist.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.mysteryDeal.deleteMany();
    await prisma.room.deleteMany();
    await prisma.hotel.deleteMany();
    await prisma.user.deleteMany();
    await prisma.coupon.deleteMany();
  } catch (err) {
    console.log('Tables already empty or not yet created.');
  }

  // 1. Seed Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@secretstay.in',
      passwordHash: 'AdminStay@2026', // In prod: bcrypt hash
      name: 'Aditya Vikram Singhania',
      phone: '+91 98201 12345',
      role: 'ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      isVerified: true,
    },
  });

  const partner1 = await prisma.user.create({
    data: {
      email: 'partner.goa@tajhotels.example.com',
      passwordHash: 'PartnerStay@2026',
      name: 'Capt. Rajesh Nair',
      phone: '+91 98230 55443',
      role: 'PARTNER',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      isVerified: true,
    },
  });

  const partner2 = await prisma.user.create({
    data: {
      email: 'gm@oberoigroup.example.com',
      passwordHash: 'PartnerStay@2026',
      name: 'Maharani Gayatri Oberoi',
      phone: '+91 98290 88776',
      role: 'PARTNER',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
      isVerified: true,
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'rohan.sharma@example.com',
      passwordHash: 'SecretStay@2026',
      name: 'Rohan Sharma',
      phone: '+91 99887 66554',
      role: 'CUSTOMER',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      isVerified: true,
    },
  });

  // 2. Seed Hotels & Mystery Deals
  const hotelsData = [
    {
      ownerId: partner1.id,
      name: 'Taj Fort Aguada Resort & Spa',
      legalEntityName: 'Indian Hotels Company Limited (IHCL)',
      description: 'Perched on the cliffside of Sinquerim, overlooking the majestic Arabian Sea and historic 16th-century Portuguese fortress.',
      city: 'Goa',
      microMarket: 'Candolim & Sinquerim Beach Belt, North Goa',
      fullAddress: 'Sinquerim, Candolim, Bardez, Goa 403515, India',
      pincode: '403515',
      latitude: 15.4989,
      longitude: 73.7667,
      starRating: 5,
      publicImages: JSON.stringify([
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
      ]),
      brandImages: JSON.stringify([
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
      ]),
      amenities: JSON.stringify(['Swimming Pool', 'Private Beach Access', 'Free Wi-Fi', 'Complimentary Breakfast', 'Luxury Spa', 'Fitness Center', 'Sunset Bar']),
      checkInTime: '14:00',
      checkOutTime: '12:00',
      isVerified: true,
      deal: {
        headline: '5-Star Cliffside Beachfront Sanctuary with Infinity Pool & Private Beach Access',
        teaserDescription: 'Experience unadulterated luxury overlooking golden sand beaches and panoramic sunset views. Includes award-winning spa discounts and daily gourmet breakfast.',
        guaranteedRating: 4.8,
        originalPriceINR: 18500,
        mysteryPriceINR: 7499,
        discountPercentage: 59,
        roomType: 'Superior Sea View Haven with Private Balcony',
        basePriceINR: 18500,
      },
    },
    {
      ownerId: partner1.id,
      name: 'The Leela Goa Resort',
      legalEntityName: 'Leela Palaces Hotels and Resorts',
      description: '75 acres of lush landscaped gardens, tranquil lagoons, and pristine Mobor Beach access in idyllic South Goa.',
      city: 'Goa',
      microMarket: 'Cavelossim & Mobor Beach, South Goa',
      fullAddress: 'Mobor Beach, Cavelossim, Salcete, Goa 403731, India',
      pincode: '403731',
      latitude: 15.1558,
      longitude: 73.9482,
      starRating: 5,
      publicImages: JSON.stringify([
        'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=1200&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
      ]),
      brandImages: JSON.stringify([
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      ]),
      amenities: JSON.stringify(['Swimming Pool', 'Private Beach Access', 'Free Wi-Fi', 'Breakfast', 'Spa', 'Golf Course', 'Multi-Cuisine Dining']),
      checkInTime: '15:00',
      checkOutTime: '11:00',
      isVerified: true,
      deal: {
        headline: '5-Star Palatial South Goa Lagoon Sanctuary with 12-Hole Golf & Beachside Dining',
        teaserDescription: 'Surrounded by sprawling lotus ponds and Arabian Sea shores, indulge in world-class coastal seclusion at half the rack rate.',
        guaranteedRating: 4.9,
        originalPriceINR: 22000,
        mysteryPriceINR: 8999,
        discountPercentage: 59,
        roomType: 'Lagoon Terrace Suite',
        basePriceINR: 22000,
      },
    },
    {
      ownerId: partner2.id,
      name: 'The Ritz-Carlton, Bangalore',
      legalEntityName: 'Marriott Luxury India Pvt Ltd',
      description: 'Sophisticated sanctuary in the heart of Bengaluru with iconic lantern architectural facade, rooftop bar Bang, and premier spa.',
      city: 'Bengaluru',
      microMarket: 'Residency Road / UB City Quarter',
      fullAddress: '99 Residency Road, Shanthala Nagar, Ashok Nagar, Bengaluru 560025, India',
      pincode: '560025',
      latitude: 12.9698,
      longitude: 77.6033,
      starRating: 5,
      publicImages: JSON.stringify([
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
        'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=1200&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
      ]),
      brandImages: JSON.stringify([
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
      ]),
      amenities: JSON.stringify(['Swimming Pool', 'Free Wi-Fi', 'Breakfast', 'Rooftop Bar', 'Spa', 'Gym', 'Valet Parking']),
      checkInTime: '14:00',
      checkOutTime: '12:00',
      isVerified: true,
      deal: {
        headline: '5-Star Ultra-Luxury Landmark in Central Bengaluru with Heated Outdoor Pool & Rooftop Lounge',
        teaserDescription: 'Impeccable service, Jaali-inspired architectural grandeur, and signature fine dining situated steps away from MG Road and Cubbon Park.',
        guaranteedRating: 4.8,
        originalPriceINR: 16500,
        mysteryPriceINR: 6999,
        discountPercentage: 58,
        roomType: 'Executive Deluxe King Suite',
        basePriceINR: 16500,
      },
    },
    {
      ownerId: partner2.id,
      name: 'The Oberoi Udaivilas, Udaipur',
      legalEntityName: 'EIH Limited (Oberoi Group)',
      description: 'Voted consistently among the world’s best hotels, featuring majestic domes, hand-painted murals, semi-private pools, and views of Lake Pichola.',
      city: 'Udaipur',
      microMarket: 'Lake Pichola Western Banks',
      fullAddress: 'Badi-Gorela-Mulla Talai Rd, Haridas Ji Ki Magri, Udaipur, Rajasthan 313001, India',
      pincode: '313001',
      latitude: 24.5772,
      longitude: 73.6705,
      starRating: 5,
      publicImages: JSON.stringify([
        'https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?w=1200&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      ]),
      brandImages: JSON.stringify([
        'https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?w=1200&q=80',
      ]),
      amenities: JSON.stringify(['Swimming Pool', 'Breakfast', 'Lake View', 'Spa', 'Free Wi-Fi', 'Private Boat Transfers', 'Heritage Walk']),
      checkInTime: '14:00',
      checkOutTime: '12:00',
      isVerified: true,
      deal: {
        headline: 'Legendary 5-Star Royal Palace on Lake Pichola with Semi-Private Pool Access',
        teaserDescription: 'Walk under grand cupolas, along decorative fountains, and experience imperial Rajasthani royalty at an unrepeatable mystery price.',
        guaranteedRating: 4.95,
        originalPriceINR: 38000,
        mysteryPriceINR: 14999,
        discountPercentage: 61,
        roomType: 'Premier Heritage Room with Semi-Private Pool',
        basePriceINR: 38000,
      },
    },
    {
      ownerId: partner1.id,
      name: 'Taj Lands End, Mumbai',
      legalEntityName: 'Indian Hotels Company Limited (IHCL)',
      description: 'Iconic sea-facing luxury hotel in Bandra West, overlooking the Arabian Sea and the Bandra-Worli Sea Link.',
      city: 'Mumbai',
      microMarket: 'Bandstand & Bandra West Promenade',
      fullAddress: 'BJ Road, Bandstand, Bandra West, Mumbai, Maharashtra 400050, India',
      pincode: '400050',
      latitude: 19.0435,
      longitude: 72.8193,
      starRating: 5,
      publicImages: JSON.stringify([
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80',
      ]),
      brandImages: JSON.stringify([
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      ]),
      amenities: JSON.stringify(['Swimming Pool', 'Sea View', 'Free Wi-Fi', 'Breakfast', 'Spa', 'Gym', 'Fine Dining']),
      checkInTime: '14:00',
      checkOutTime: '12:00',
      isVerified: true,
      deal: {
        headline: '5-Star Arabian Seafront Luxury Haven in Bandra with Sea Link Horizon Views',
        teaserDescription: 'Soak in sunset ocean vistas from high above Bandstand promenade. Minutes from BKC, Mumbai nightlife, and designer boutiques.',
        guaranteedRating: 4.8,
        originalPriceINR: 19000,
        mysteryPriceINR: 8200,
        discountPercentage: 57,
        roomType: 'Deluxe Sea-Facing Vista Room',
        basePriceINR: 19000,
      },
    },
    {
      ownerId: partner2.id,
      name: 'The Himalayan, Manali',
      legalEntityName: 'Himalayan Luxury Stays LLP',
      description: 'Victorian Gothic castle set amidst apple and cherry orchards with panoramic views of snow-dusted Himalayan peaks.',
      city: 'Manali',
      microMarket: 'Old Manali & Hadimba Forest Enclave',
      fullAddress: 'Hadimba Road, Kullu Valley, Manali, Himachal Pradesh 175131, India',
      pincode: '175131',
      latitude: 32.2475,
      longitude: 77.1772,
      starRating: 4,
      publicImages: JSON.stringify([
        'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=1200&q=80',
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80',
      ]),
      brandImages: JSON.stringify([
        'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=1200&q=80',
      ]),
      amenities: JSON.stringify(['Swimming Pool', 'Mountain View', 'Fireplace', 'Free Wi-Fi', 'Breakfast', 'Spa', 'Bonfire Lounge']),
      checkInTime: '13:00',
      checkOutTime: '11:00',
      isVerified: true,
      deal: {
        headline: '4-Star Victorian Mountain Castle & Cottage with Open-Air Pool & Snow Peak Views',
        teaserDescription: 'Cozy up beside an authentic fireplace amid pine fragrances and majestic mountain views. Guaranteed 4-star boutique indulgence.',
        guaranteedRating: 4.7,
        originalPriceINR: 13000,
        mysteryPriceINR: 5499,
        discountPercentage: 58,
        roomType: 'Castle Chamber with Fireplace',
        basePriceINR: 13000,
      },
    },
    {
      ownerId: partner1.id,
      name: 'ITC Rajputana, Jaipur',
      legalEntityName: 'ITC Limited - Hotels Division',
      description: 'Inspired by the traditional Havelis and forts of Rajasthan, featuring red brick facades, step-well courtyards, and royal Mewari feasts.',
      city: 'Jaipur',
      microMarket: 'Civil Lines / Palace District',
      fullAddress: 'Palace Road, Gopalbari, Jaipur, Rajasthan 302006, India',
      pincode: '302006',
      latitude: 26.9196,
      longitude: 75.7958,
      starRating: 5,
      publicImages: JSON.stringify([
        'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1200&q=80',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      ]),
      brandImages: JSON.stringify([
        'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1200&q=80',
      ]),
      amenities: JSON.stringify(['Swimming Pool', 'Free Wi-Fi', 'Breakfast', 'Kaya Kalp Spa', 'Gym', 'Royal Courtyard Dining']),
      checkInTime: '14:00',
      checkOutTime: '12:00',
      isVerified: true,
      deal: {
        headline: '5-Star Fort-Inspired Royal Palace in Jaipur with Stepwell Courtyard & Ayurvedic Spa',
        teaserDescription: 'Live like royalty in the Pink City with regal corridors, evening folk dances by the pool, and opulent Rajasthani hospitality.',
        guaranteedRating: 4.85,
        originalPriceINR: 14500,
        mysteryPriceINR: 5999,
        discountPercentage: 59,
        roomType: 'Rajputana Royal Chamber',
        basePriceINR: 14500,
      },
    },
  ];

  for (const h of hotelsData) {
    const hotel = await prisma.hotel.create({
      data: {
        ownerId: h.ownerId,
        name: h.name,
        legalEntityName: h.legalEntityName,
        description: h.description,
        city: h.city,
        microMarket: h.microMarket,
        fullAddress: h.fullAddress,
        pincode: h.pincode,
        latitude: h.latitude,
        longitude: h.longitude,
        starRating: h.starRating,
        publicImages: h.publicImages,
        brandImages: h.brandImages,
        amenities: h.amenities,
        checkInTime: h.checkInTime,
        checkOutTime: h.checkOutTime,
        isVerified: h.isVerified,
      },
    });

    const room = await prisma.room.create({
      data: {
        hotelId: hotel.id,
        roomType: h.deal.roomType,
        basePriceINR: h.deal.basePriceINR,
        totalUnits: 12,
        bedConfiguration: '1 King Bed or 2 Twin Beds',
        roomSizeSqFt: 440,
        inclusions: JSON.stringify(['Complimentary Buffet Breakfast', 'High-Speed Wi-Fi', 'Welcome Royal Drink', 'Pool & Gym Access']),
      },
    });

    const deal = await prisma.mysteryDeal.create({
      data: {
        hotelId: hotel.id,
        roomId: room.id,
        headline: h.deal.headline,
        teaserDescription: h.deal.teaserDescription,
        guaranteedRating: h.deal.guaranteedRating,
        originalPriceINR: h.deal.originalPriceINR,
        mysteryPriceINR: h.deal.mysteryPriceINR,
        discountPercentage: h.deal.discountPercentage,
        validFrom: new Date('2026-01-01'),
        validTo: new Date('2026-12-31'),
        status: 'ACTIVE',
        priorityScore: 100,
      },
    });

    // Create 30 days of inventory
    const today = new Date();
    for (let d = 0; d < 30; d++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + d);
      targetDate.setHours(0, 0, 0, 0);

      await prisma.inventory.create({
        data: {
          roomId: room.id,
          date: targetDate,
          allocatedUnits: 8,
          bookedUnits: d % 3 === 0 ? 2 : 1,
          lockedUnits: 0,
          priceINR: h.deal.mysteryPriceINR,
        },
      });
    }

    console.log(`✅ Seeded Hotel & Deal: ${h.name} (${h.city})`);
  }

  // 3. Seed Promotional Coupons
  await prisma.coupon.create({
    data: {
      code: 'MYSTERY500',
      discountAmount: 500,
      minSpend: 4000,
      expiresAt: new Date('2026-12-31'),
      isActive: true,
    },
  });

  await prisma.coupon.create({
    data: {
      code: 'FIRSTLUXE',
      discountAmount: 750,
      minSpend: 6000,
      expiresAt: new Date('2026-12-31'),
      isActive: true,
    },
  });

  console.log('🎉 SecretStay India database successfully seeded!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
