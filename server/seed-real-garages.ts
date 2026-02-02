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
            timing: '10:00 AM - 7:30 PM'
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
            timing: '10:00 AM - 8:00 PM'
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
            timing: '10:00 AM - 8:00 PM'
        }
    ];

    for (const g of garages) {
        const garage = await prisma.garage.upsert({
            where: { slug: g.slug },
            update: { phone: g.phone, location: g.location }, // Ensure phone is up to date
            create: g,
        });
        console.log(`Upserted garage: ${garage.name}`);
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
