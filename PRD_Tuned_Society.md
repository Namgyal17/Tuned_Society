# Comprehensive Product Requirements Document (PRD): Tuned Society

## 1. Executive Summary & Vision
**Product Name**: Tuned Society
**Slogan**: The Ultimate Platform for Automotive & Motorcycle Enthusiasts.
**Vision**: To bridge the gap between automotive enthusiasts, part suppliers, and professional tuning/mechanic garages. Tuned Society aims to be the singular digital hub where a user can enter their vehicle's exact model, receive customized build paths, discover necessary parts, and connect with locally vetted garages to execute the work safely and professionally.

---

## 2. Problem Statement & Value Proposition
### 2.1 The Problem
- **Information Overload/Fragmentation**: Car and bike owners struggle to find accurate, vehicle-specific modification information. Forums are outdated, and general searches yield generic results.
- **Lack of Guidance & Safety**: Beginners often purchase the wrong parts or attempt unsafe modifications without understanding the prerequisites (e.g., upgrading a turbo without upgrading the braking system).
- **Finding Reliable Garages**: Finding specialized, trustworthy mechanics for non-standard repairs or performance tuning is largely dependent on word-of-mouth.

### 2.2 The Solution (Value Proposition)
- **Structured Knowledge Base**: An intelligent catalog system that maps builds and parts strictly to the user's specific Vehicle Type -> Region -> Brand -> Model.
- **Guided Modification Paths**: Level-scaled build options that include required upgrades and critical safety warnings.
- **Trusted Ecosystem**: A curated directory of garages detailing their exact capabilities, experience, and community ratings.
- **Direct Consultations**: Users can request direct expert advice through the platform, bridging the gap between uncertainty and action.

---

## 3. User Personas
### 3.1 The Beginner Enthusiast (User)
- **Goal**: Wants to make their first modification (e.g., better exhaust note, daily-comfort suspension) but doesn't know where to start.
- **Pain Point**: Afraid of ruining the vehicle or getting scammed by a mechanic. Needs structured, safe guidance.
### 3.2 The Veteran Tuner (User)
- **Goal**: Looking for niche parts and specific fabricators or dyno-tuning specialists.
- **Pain Point**: Needs a quick directory to filter garages by "Specialties" and "Services".
### 3.3 The Garage Owner / Mechanic (Service Provider)
- **Goal**: Wants to showcase their custom builds, list their specific expertise (e.g., ECU Remapping, Custom Fabrication), and acquire new clients.
- **Pain Point**: Traditional marketing doesn't reach the hardcore enthusiast niche effectively.

---

## 4. In-Depth Feature Specifications

### 4.1 System Catalog: Vehicle Hierarchy
**Description**: The foundational data structure ensuring users only see relevant data.
- **Requirements**:
  - The UI must dynamically cascade: First selecting `Vehicle Type` (Car vs Bike) unlocks `Regions` (JDM, Euro, Indian). Selecting a Region unlocks `Brands` (Toyota, Royal Enfield). Selecting a Brand unlocks specific `Models` (Supra, Interceptor 650).
  - Search must support fuzzy matching and slug-based routing for SEO friendly URLs (`/vehicles/cars/jdm/toyota/supra`).

### 4.2 Modification & Build Planner (The "Tuner's Guide")
**Description**: Educational and structural pathways for modifying a vehicle.
- **Build Goal Categories**: Grouped visually (Performance, Aesthetics, Handling, Touring).
- **Build Options**: Inside a Category (e.g., inside 'Performance', options might be 'Street Tune', 'Track Day').
- **Crucial Meta-Data**:
  - `Level`: Indicates difficulty/cost (e.g., "Beginner", "Advanced").
  - `Warnings`: Red-flag callouts (e.g., "WARNING: Upgrading engine output requires a mandatory brake system upgrade").
  - `Tags`: For quick filtering (e.g., ["daily-drivable", "warranty-void"]).

### 4.3 Interactive Garage Directory & Discovery
**Description**: A marketplace for service providers.
- **Garage Profile Pages**: Must feature high-quality imagery (`imageUrl`), comprehensive descriptions, Years of Experience, and exact Location/Area tags.
- **Capabilities Matrix**: Garages must list `Services` (Standard maintenance, Oil changes) and `Specialties` (Dyno Tuning, Engine Swaps, Custom Paint).
- **Search & Filter**: Users must be able to filter garages by location, rating, and specific specialty.

### 4.4 Parts & Upgrades Explorer
**Description**: A dictionary of physical modifications.
- **Structure**: `UpgradeCategory` (e.g., "Suspension") -> `UpgradeSubCategory` (e.g., "Coilovers", "Lowering Springs").
- Future-proofing for E-commerce: These categories should eventually map output products available for purchase.

### 4.5 The Accessories Module
**Description**: Direct E-commerce display for motorcycle/car lifestyle gear.
- Focus Areas: Helmets, Riding Gear, Protection, Electrical (Lighting), Maintenance.

### 4.6 Consultation & Lead Generation Module
**Description**: Direct bridging between users and experts.
- **Consultation Modal**: A persistent UI element allowing users to ask for help.
- **Data Capture**: Collects User Name, Contact, Vehicle Model, and specifics of their query.
- **Backend Flow**: Uses Node.js + Nodemailer/Resend to instantly email the site administrators or partner experts with the lead information.

---

## 5. Technical Architecture & Constraints

### 5.1 Technology Stack
- **Frontend App**: React 19, TypeScript, Vite, Tailwind CSS 4, React Router DOM v7.
- **Backend API**: Node.js, Express.js (v5), TypeScript.
- **Data Layer**: PostgreSQL, Prisma ORM.
- **Validation**: Zod (for strong runtime validation of API requests).
- **Communication**: Resend / Nodemailer.

### 5.2 API Interaction Patterns (RESTful Design)
- `GET /api/vehicles/hierarchy`: Returns the nested tree of Type->Region->Brand->Model for UI cascading dropdowns.
- `GET /api/builds/goals`: Returns localized build paths with warnings.
- `GET /api/garages`: Returns the paginated directory. Supports queries `?specialty=dyno&location=mumbai`.
- `POST /api/consultation`: Accepts the Consultation form data, validates via Zod, and triggers the email pipeline via Resend.

### 5.3 Non-Functional Requirements (NFRs)
- **Performance**: Frontend bundle must be minimized. Vite optimizations should yield a First Contentful Paint (FCP) under 1.5s.
- **Responsive Design**: Mobile-first UI is mandatory. Enthusiasts frequently browse from mobile devices while in the garage or at meets.
- **SEO Optimization**: Use descriptive, slug-based routing so that a search for "JDM tuning garages near me" naturally ranks the React Router endpoints.
- **Type Safety**: End-to-end type safety. The Prisma models must dictate the TypeScript interfaces used on the Frontend preventing undefined runtime errors.

---

## 6. Roadmap & Phased Implementation

### Phase 1: MVP (Current State)
- Static but dynamic-looking catalog of Vehicles, Builds, Upgrades, and Garages.
- Working Consultation Form (Lead Generation).
- Backend Seed script functioning perfectly via Prisma.

### Phase 2: User Accounts & "Virtual Garage" (Near Future)
- Implement Auth (JWT or NextAuth/Clerk).
- Allow users to "Claim" a vehicle and save it to their profile.
- Allow users to Favorite garages or save a Build Path.

### Phase 3: Marketplace & E-Commerce
- Onboard Garages to have their own admin dash to update their profiles.
- Integrate Payment Gateway (Stripe/Razorpay) to allow purchasing of Accessories or booking a Garage slot directly through Tuned Society.
- Feature user-reviews and photo uploads of modifications.
