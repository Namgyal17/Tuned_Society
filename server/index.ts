import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Tuned Society API is running!');
});
app.use(express.json());

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
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
        // Frontend might send region, or might not depending on vehicle type logic.
        // We'll accept it if present.
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

        const mailOptions = {
            from: process.env.EMAIL_USER,
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
        };

        // Fetch selected garage details to get phone number
        let garagePhone = null;
        if (data.selectedGarage) {
            console.log(`Looking up garage with slug: ${data.selectedGarage}`);
            const garage = await prisma.garage.findUnique({
                where: { slug: data.selectedGarage }
            });
            console.log('Garage found:', garage ? 'Yes' : 'No');
            if (garage) {
                console.log('Garage Phone:', garage.phone);
                garagePhone = garage.phone;
            }
        } else {
            console.log('No garage selected in data');
        }

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
            res.json({
                success: true,
                message: 'Consultation received and email sent',
                garagePhone: garagePhone
            });
        } catch (emailError: any) {
            console.error('Error sending email:', emailError);
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
