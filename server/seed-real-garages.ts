import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const garages = [
        {
            slug: 'wheelerz-hub',
            name: 'Wheelerz Hub',
            location: 'Gangtok, Sikkim',
            area: 'Tadong',
            specialties: ['Motorcycle Accessories', 'Performance Mods'],
            services: ['Customization', 'Repair'],
            rating: 4.9,
            experience: 'Established',
            expertise: 'Bikes & Cars',
            description: 'Enthusiast-driven automotive garage.',
            phone: '8250058722', // No +91 stored in DB usually, or normalized. Frontend handles +91 prefix.
            instagram: '@wheelerzhub',
            email: 'wheelerzhub@gmail.com',
            address: 'Near Maskey Petrol Pump, Tadong',
            timing: '10:00 AM - 7:30 PM',
            imageUrl: '/images/garages/wheelerz-hub.png'
        },
        {
            slug: 'carbonize',
            name: 'CARBONIZE',
            location: 'Siliguri, West Bengal',
            area: 'Punjabipara',
            specialties: ['Carbon Fibre', 'Body Panels'],
            services: ['Carbon Parts', 'Wraps'],
            rating: 4.7,
            experience: 'Specialist',
            expertise: 'Carbon Fiber',
            description: 'Premium carbon fibre specialists.',
            phone: '8967041414',
            instagram: '@carbonize_india',
            email: 'contact@carbonize.in',
            address: 'Punjabipara near Bright Academy, Siliguri',
            timing: '10:00 AM - 8:00 PM',
            imageUrl: '/images/garages/carbonize.png'
        },
        {
            slug: 'boost-nation',
            name: 'Boost Nation',
            location: 'Kolkata, West Bengal',
            area: 'Kolkata',
            specialties: ['Performance Tuning', 'Custom Builds'],
            services: ['Tuning', 'Upgrades'],
            rating: 4.4,
            experience: 'Pro',
            expertise: 'Performance',
            description: 'Community-driven automotive brand.',
            phone: '9810858224',
            instagram: '@boostnation',
            email: 'info@boostnation.in',
            address: 'Kolkata, West Bengal',
            timing: '10:00 AM - 8:00 PM',
            imageUrl: '/images/garages/boost-nation.png'
        },
        {
            slug: 'zerospot',
            name: 'Zerospot',
            location: 'Siliguri, West Bengal',
            area: '2.5 mile',
            specialties: [
                'Premium Car & Bike Detailing',
                'Paint Correction & Surface Refinement',
                'Ceramic & Graphene Coating',
                'Paint Protection Film (PPF) & Wraps',
                'Luxury Interior Detailing & Restoration',
                'Bodyshop Repairs, Denting & Painting',
                'Insurance & Non-Insurance Claims',
                'Mechanical Diagnostics & Maintenance',
                'Underbody Protection & Anti-Rust Coating'
            ],
            services: ['Detailing', 'Bodyshop', 'Maintenance'],
            rating: 4.6,
            experience: 'Premium',
            expertise: 'Detailing & Bodyshop',
            description: 'A one-stop premium automotive destination offering detailing, bodyshop, and mechanical services under one roof.',
            phone: '7908173067',
            instagram: '@zerospot_siliguri',
            email: 'contact@zerospot.in',
            address: 'Opposite Nayan residency behind osl tata motors Opposite Vega Circle mall 2.5 mile, Siliguri, West Bengal 734008',
            timing: '10:00 AM – 7:00 PM',
            imageUrl: '/images/garages/zerospot.png'
        },
        {
            slug: 'h20-car-wash',
            name: 'H20 CAR WASH AND DETAILING STUDIO',
            location: 'Gangtok, Sikkim',
            area: 'Lower Bhojoghari',
            specialties: ['Car Wash', 'Detailing', 'Automobile Accessories'],
            services: ['Exterior Cleaning', 'Interior Cleaning', 'Accessories'],
            rating: 5.0,
            experience: 'Professional',
            expertise: 'Cleaning & Detailing',
            description: 'Professional exterior and interior cleaning with safe, quality care. Quality accessories to enhance comfort, safety, and style.',
            phone: '6297851372',
            instagram: '',
            email: '',
            address: 'Lower Bhojoghari, below Shiv Mandir, Gangtok, Sikkim 737103',
            timing: '9:00 AM - 8:00 PM',
            imageUrl: '/images/garages/h20-car-wash.png'
        }
    ];

    // Delete any garages NOT in this list
    const allowedSlugs = garages.map(g => g.slug);
    const deleteResult = await prisma.garage.deleteMany({
        where: {
            slug: {
                notIn: allowedSlugs
            }
        }
    });
    console.log(`Deleted ${deleteResult.count} garages that were not in the allowed list.`);

    for (const g of garages) {
        const garage = await prisma.garage.upsert({
            where: { slug: g.slug },
            update: {
                phone: g.phone,
                location: g.location,
                imageUrl: g.imageUrl
            }, // Ensure crucial fields are up to date
            create: g,
        });
        console.log(`Upserted garage: ${garage.name}`);
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
