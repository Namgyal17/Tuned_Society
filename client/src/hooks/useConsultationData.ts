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
                // Use environment variable or fallback to localhost
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                console.log("Connecting to Backend at:", API_URL);

                const [vehiclesRes, goalsRes, garagesRes] = await Promise.all([
                    fetch(`${API_URL}/api/vehicles`),
                    fetch(`${API_URL}/api/build-goals`),
                    fetch(`${API_URL}/api/garages`)
                ]);

                if (!vehiclesRes.ok || !goalsRes.ok || !garagesRes.ok) {
                    console.error("API Error - Status:", {
                        vehicles: vehiclesRes.status,
                        goals: goalsRes.status,
                        garages: garagesRes.status
                    });
                    throw new Error('Failed to fetch data');
                }

                const vehiclesData = await vehiclesRes.json();
                console.log("Vehicles Fetched:", vehiclesData);
                setVehicles(vehiclesData);
                setBuildGoals(await goalsRes.json());

                const fetchedGarages = await garagesRes.json();

                setGarages(fetchedGarages);
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
