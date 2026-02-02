import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Initialize Resend with API Key
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Tuned Society API is running!');
});

// --- ROUTES ---

// Get all vehicle data structured for the frontend selector
app.get('/api/vehicles', async (req, res) => {
    try {
        const types = await prisma.vehicleType.findMany({
            include: {
                regions: {
                    include: {
                        brands: {
                            include: {
                                models: true
                            }
                        }
                    }
                }
            }
        });
        res.json(types);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
});

// Get build goals
app.get('/api/build-goals', async (req, res) => {
    try {
        const goals = await prisma.buildGoalCategory.findMany({
            include: {
                options: true
            }
        });
        res.json(goals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch build goals' });
    }
});

// Get garages
app.get('/api/garages', async (req, res) => {
    try {
        const garages = await prisma.garage.findMany();
        res.json(garages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch garages' });
    }
});

// Submit consultation
const ConsultationSchema = z.object({
    vehicle: z.object({
        type: z.string(),
        region: z.string().optional(),
        brand: z.string(),
        model: z.string()
    }),
    buildGoal: z.object({
        category: z.string(),
        build: z.string()
    }),
    budget: z.string(),
    usage: z.string(),
    preferences: z.object({
        priorities: z.array(z.string()).optional(),
        timeline: z.string()
    }),
    location: z.string(),
    selectedGarage: z.string().optional(),
    additionalNotes: z.string().optional(),
    userName: z.string(),
    userPhone: z.string()
});

app.post('/api/consultation', async (req, res) => {
    try {
        const data = ConsultationSchema.parse(req.body);
        console.log('Consultation Received:', data);

        // Fetch selected garage details to get phone number
        let garagePhone = null;
        if (data.selectedGarage) {
            const searchSlug = data.selectedGarage.trim();
            console.log(`[DEBUG] Looking up garage with slug: '${searchSlug}'`);

            const garage = await prisma.garage.findUnique({
                where: { slug: searchSlug }
            });

            if (garage) {
                console.log(`[DEBUG] Found garage: ${garage.name}, Phone: ${garage.phone}`);
                garagePhone = garage.phone;
            } else {
                console.log(`[DEBUG] Garage NOT FOUND for slug: '${searchSlug}'`);
                // Fallback: Check if it matches by name loosely? No, keep it strict but logged.
            }
        } else {
            console.log('[DEBUG] No garage selected in data');
        }

        try {
            const { data: emailData, error } = await resend.emails.send({
                from: 'Tuned Society <onboarding@resend.dev>',
                to: 'tunedsociety7@gmail.com',
                subject: `New Build Consultation: ${data.vehicle.brand} ${data.vehicle.model}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #dc2626;">New Build Consultation Request</h2>
                        <p><strong>Client:</strong> ${data.userName} (${data.userPhone})</p>
                        <p><strong>Location:</strong> ${data.location}</p>
                        <p><strong>Timeline:</strong> ${data.preferences.timeline}</p>
                        
                        <hr style="border: 1px solid #eee; margin: 20px 0;">
                        
                        <h3>Vehicle Details</h3>
                        <p><strong>Type:</strong> ${data.vehicle.type}</p>
                        <p><strong>Region:</strong> ${data.vehicle.region || 'N/A'}</p>
                        <p><strong>Brand:</strong> ${data.vehicle.brand}</p>
                        <p><strong>Model:</strong> ${data.vehicle.model}</p>
                        
                        <h3>Build Requirements</h3>
                        <p><strong>Goal:</strong> ${data.buildGoal.category} - ${data.buildGoal.build}</p>
                        <p><strong>Budget:</strong> ${data.budget}</p>
                        <p><strong>Usage:</strong> ${data.usage}</p>
                        
                        <h3>Selected Garage</h3>
                        <p><strong>Garage Slug:</strong> ${data.selectedGarage || 'Not Selected'}</p>
                        
                        <h3>Additional Notes</h3>
                        <p>${data.additionalNotes || 'None'}</p>
                    </div>
                `
            });

            if (error) {
                console.error('Resend API Error:', error);
                // Return 500 so frontend knows it failed
                return res.status(500).json({ success: false, error: 'Resend Error: ' + error.message });
            }

            console.log('Email sent successfully via Resend:', emailData);
            res.json({
                success: true,
                message: 'Consultation received and email sent',
                garagePhone: garagePhone
            });
        } catch (emailError: any) {
            console.error('Unexpected error sending email:', emailError);
            res.status(500).json({ success: false, error: 'Failed to send email: ' + emailError.message });
        }
    } catch (error) {
        console.error("Validation Error:", error);
        res.status(400).json({ error: 'Invalid data provided' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
