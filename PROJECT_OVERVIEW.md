# Tuned Society - Project Overview & System Design

## 1. High-Level Overview
**"Tuned Society"** is a full-stack web application designed to connect automotive enthusiasts in India with specialized tuning garages. 

- **Core Function:** A "Consultation" wizard that guides users through selecting their vehicle, defining build goals (e.g., Street Performance, Track), setting a budget, and choosing a partner garage.
- **Goal:** To streamline the process of modifying cars by providing a structured path from "idea" to "execution" and connecting users directly with experts.
- **Outcome:** The system compiles the user's requirements into a structured format, stores it (potentially), sends a detailed email to the administrators, and generates a pre-filled WhatsApp message for the user to contact the selected garage.

---

## 2. System Architecture
The project follows a modern **Client-Server Architecture**. It is a **Single Page Application (SPA)** that communicates with a **RESTful API**.

```mermaid
graph TD
    User[User's Browser (Client)]
    subgraph Frontend
        React[React + Vite SPA]
        Tailwind[Tailwind CSS Styling]
    end
    
    subgraph Backend
        Express[Node.js + Express Server]
        Auth[Validation (Zod)]
        Email[Resend API]
    end
    
    subgraph Database
        Postgres[PostgreSQL DB]
        Prisma[Prisma ORM]
    end

    User <-->|HTTPS / Interaction| React
    React <-->|REST API (JSON)| Express
    Express <-->|Query/Mutation| Postgres
    Express -->|Send Mail| Email
```

### Key Layers
1.  **Frontend (Client):** Handles user interaction, animations, and the consultation wizard state.
2.  **Backend (Server):** Handles business logic, data retrieval, input validation, and email dispatch.
3.  **Database:** Stores relational data about vehicles, garages, and build categories.

---

## 3. Component Breakdown

### A. Frontend (`/client`)
Built with **React 18**, **Vite**, **TypeScript**, and **Tailwind CSS**.

*   **`src/App.tsx` (Router & Layout)**
    *   **Role:** The entry point that defines the application structure.
    *   **Function:** It manages routing (using `react-router-dom`) to switch between the Landing Page and informational pages (e.g., `/performance-tuning`, `/wheels-tires`).
    *   **Global Events:** Listens for a custom event `open-consultation` to trigger the modal from anywhere in the app.

*   **`src/components/ConsultationModal.tsx` (The Core Wizard)**
    *   **Role:** The heart of the application. A complex, multi-step form modal.
    *   **Function:**
        *   **State Management:** Tracks the user's progress through 8+ steps.
        *   **Dynamic Data:** Fetches vehicle lists, goals, and garages from the backend upon mounting.
        *   **Geolocation:** Uses browser APIs to auto-detect and fill the user's city.
        *   **Form Submission:** POSTs the collected data to the backend.
        *   **WhatsApp Integration:** Generates a dynamic `wa.me` link with a pre-filled message for the final handoff to the garage.

*   **`src/hooks/useConsultationData.ts`**
    *   **Role:** Custom Hook for data fetching.
    *   **Function:** Abstracts the API calls to endpoints like `/api/vehicles`, ensuring the UI component remains clean. It handles loading and error states for these network requests.

### B. Backend (`/server`)
Built with **Node.js**, **Express**, **TypeScript**, and **Prisma**.

*   **`index.ts` (API Gateway)**
    *   **Role:** The main server file.
    *   **Function:**
        *   Configures CORS to allow requests from the frontend.
        *   **Routes:**
            *   `GET /api/vehicles`: Returns a nested JSON structure (Region -> Brand -> Model).
            *   `GET /api/garages`: Returns a list of partner garages with details.
            *   `POST /api/consultation`: Receives form data, validates it using **Zod**, looks up garage contact info, and sends an email via **Resend**.

*   **`prisma/schema.prisma` (Data Model)**
    *   **Role:** Defines the database schema using **Prisma ORM**.
    *   **Function:** Maps code objects to database tables.
    *   **Key Models:**
        *   `VehicleType`, `Region`, `Brand`, `Model`: Hierarchical data for the car selector.
        *   `Garage`: Stores detailed profiles for tuning shops (location, rating, images, phone).
        *   `BuildGoalCategory`: Defines the types of builds (Street, Track, etc.).

*   **`seed-real-garages.ts`**
    *   **Role:** Database seeding script.
    *   **Function:** Populates the database with initial real-world data (actual garages, car brands, etc.) so the app doesn't start empty.

---

## 4. Data Flow (The User Journey)

1.  **Initialization:**
    *   User opens the website.
    *   `ConsultationModal` mounts and immediately calls the backend APIs (`/api/vehicles`, `/api/garages`) to load necessary data into the dropdowns.

2.  **Selection:**
    *   User moves through the wizard steps:
        *   *Step 1-3:* Selects Vehicle (Data driven by `VehicleType` -> `Brand` -> `Model` tables).
        *   *Step 4:* Selects Build Goal (Data driven by `BuildGoalCategory`).
        *   *Step 5-6:* Inputs Budget, Usage, and Location.
        *   *Step 7:* Selects a Garage from the list (Data driven by `Garage` table).

3.  **Submission:**
    *   User clicks "Submit".
    *   Frontend sends a **JSON Payload** to `POST /api/consultation`.
    *   **Backend Validation:** The server uses `Zod` (lines 80-102 in `index.ts`) to ensure all required fields are present and valid.
    *   **Garage Lookup:** The server queries the database for the selected garage's phone number.
    *   **Email Notification:** The backend constructs an HTML email and sends it to `tunedsociety7@gmail.com` using the **Resend API**.

4.  **Completion:**
    *   Server responds with `200 OK` and the garage's phone number.
    *   Frontend displays the "Final Step" screen.
    *   User clicks the WhatsApp button, which opens a chat with the specific garage, pre-filled with their build details.

---

## 5. Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React (Vite)** | Fast, modern UI development. |
| **Language** | **TypeScript** | Ensures type safety across the full stack. |
| **Styling** | **Tailwind CSS** | Utility-first CSS for rapid, responsive design. |
| **Backend Server** | **Express.js** | Lightweight web server for Node.js. |
| **Database** | **PostgreSQL** | Robust relational database. |
| **ORM** | **Prisma** | Tool to interact with the database using TypeScript code instead of SQL. |
| **Validation** | **Zod** | Schema declaration and validation library. |
| **Email Service** | **Resend** | Developer-friendly email API. |
