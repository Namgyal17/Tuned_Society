import { useState, useEffect } from 'react';

// Types (should ideally be shared or generated from Prisma)
export interface VehicleType {
    id: string;
    name: string;
    regions: Region[];
}
export interface Region { id: string; name: string; slug: string; brands: Brand[]; }
export interface Brand { id: string; name: string; slug: string; models: Model[]; }
export interface Model { id: string; name: string; }

export interface BuildGoalCategory {
    id: string;
    name: string;
    slug: string;
    warning?: string;
    options: BuildOption[];
}
export interface BuildOption { id: string; name: string; slug: string; description: string; tags: string[]; warning: boolean; }

export interface Garage {
    id: string;
    name: string;
    location: string;
    slug: string;
    rating: number;
    description: string;
    specialties: string[];
    phone?: string;
    email?: string;
    address?: string;
    timing?: string;
    // Computed or placeholder on frontend for now
    imageUrl?: string;
}

export function useConsultationData() {
    const [vehicles, setVehicles] = useState<VehicleType[]>([]);
    const [buildGoals, setBuildGoals] = useState<BuildGoalCategory[]>([]);
    const [garages, setGarages] = useState<Garage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [vehiclesRes, goalsRes, garagesRes] = await Promise.all([
                    fetch('http://localhost:3000/api/vehicles'),
                    fetch('http://localhost:3000/api/build-goals'),
                    fetch('http://localhost:3000/api/garages')
                ]);

                if (!vehiclesRes.ok || !goalsRes.ok || !garagesRes.ok) throw new Error('Failed to fetch data');

                setVehicles(await vehiclesRes.json());
                setBuildGoals(await goalsRes.json());

                const fetchedGarages = await garagesRes.json();

                // Mocking specific garages as requested
                const customGarages: Garage[] = [];

                // 1. Wheelerz Hub (Try to find from DB or create mock)
                const wheelerzHub = fetchedGarages.find((g: any) => g.name.toLowerCase().replace(/\s/g, '').includes('wheelerzhub')) || {
                    id: 'wh-mock-1',
                    name: 'Wheelerz Hub',
                    slug: 'wheelerz-hub',
                    location: 'Gangtok, Sikkim',
                    rating: 4.9,
                    description: 'Wheelerz Hub is an enthusiast-driven automotive garage known for clean workmanship. A trusted Verified Garage Partner of Tuned Society.',
                    specialties: ['Motorcycle Accessories', 'Performance Mods', 'Cosmetic Enhancements', 'Bike Customization'],
                    address: 'Near Maskey Petrol Pump, M.P Golai, Tadong, Gangtok, Sikkim 737102',
                    timing: '10:00 AM - 7:30 PM',
                    phone: '+91-8250058722'
                };
                customGarages.push({ ...wheelerzHub, imageUrl: '/images/garages/wheelerz-hub.png' });

                // 2. Carbonize (New Addition)
                customGarages.push({
                    id: 'carbonize-mock-1',
                    name: 'CARBONIZE',
                    slug: 'carbonize',
                    location: 'Siliguri, West Bengal',
                    rating: 4.7,
                    description: 'Premium carbon fibre specialists dealing in body panels, interior trims, and custom 1-of-1 parts.',
                    specialties: [
                        'Carbon Fibre Body Panels',
                        'Interior Carbon Fibre Trims',
                        'Custom Carbon Parts (1-of-1)',
                        'Forged Carbon Components',
                        'Carbon Wrapping & Skinning',
                        'Repair & Restoration'
                    ],
                    address: 'Punjabipara near Bright Academy, Siliguri',
                    timing: '10:00 AM - 8:00 PM', // Assumed timing
                    phone: '+91 8967041414',
                    imageUrl: '/images/garages/carbonize.png'
                });

                // 3. Boost Nation (New Addition)
                customGarages.push({
                    id: 'boost-nation',
                    name: 'Boost Nation',
                    slug: 'boost-nation',
                    location: 'Kolkata, West Bengal',
                    rating: 4.4,
                    description: 'Boost Nation is a community-driven automotive brand for enthusiasts, focused on modern tuning culture, performance, and innovation. We push limits through upgrades, builds, and content.',
                    specialties: ['Performance Tuning', 'Custom Builds', 'Automotive Content', 'Modern Tuning Culture'],
                    address: 'Kolkata, West Bengal', // Precise address not provided, using city
                    timing: '10:00 AM - 8:00 PM', // Assumed timing
                    phone: '+91 9810858224',
                    imageUrl: '/images/garages/boost-nation.png'
                });



                // Combine custom garages with any other garages fetched from DB
                // Filter out duplicates based on slug if necessary
                // Only show the specific allowed garages as requested
                setGarages(customGarages);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { vehicles, buildGoals, garages, loading, error };
}
