# Comprehensive Database Architecture & Constraints: Tuned Society

This document serves as the absolute blueprint for the Tuned Society database. It outlines not just the models and relations, but the indexing, cascade behaviors, operational logic, and how the data scales. Powered by **PostgreSQL** and governed by **Prisma ORM**.

---

## 🗺️ Visual Entity-Relationship Diagram (ERD)

Here is the exact visual mapping of your entire database engine. You can see clearly which fields are Primary Keys (`PK`), Foreign Keys (`FK`), and Unique Constraints (`UQ`).

```mermaid
erDiagram
    %% Core Vehicle Hierarchy
    VehicleType {
        String id PK "uuid"
        String name UQ
    }
    Region {
        String id PK "uuid"
        String name
        String slug
        String vehicleTypeId FK
    }
    Brand {
        String id PK "uuid"
        String name
        String slug UQ
        String regionId FK
    }
    Model {
        String id PK "uuid"
        String name
        String brandId FK
    }
    
    VehicleType ||--o{ Region : "has many"
    Region ||--o{ Brand : "has many"
    Brand ||--o{ Model : "has many"

    %% Build Goals System
    BuildGoalCategory {
        String id PK "uuid"
        String slug UQ
        String name
        String description
        String level
        String warning
    }
    BuildOption {
        String id PK "uuid"
        String slug UQ
        String name
        String description
        String[] tags
        Boolean warning
        String categoryId FK
    }
    BuildGoalCategory ||--o{ BuildOption : "has many"

    %% Upgrade Path System
    UpgradeCategory {
        String id PK "uuid"
        String slug UQ
        String name
        String description
    }
    UpgradeSubCategory {
        String id PK "uuid"
        String slug UQ
        String name
        String[] items
        String categoryId FK
    }
    UpgradeCategory ||--o{ UpgradeSubCategory : "has many"

    %% Independent Garage Metadata
    Garage {
        String id PK "uuid"
        String slug UQ
        String name
        String location
        String[] specialties
        Float rating
    }
```

---

## 🏗️ 1. The Vehicle Ontology Engine

This four-tier relational structure is designed to strictly categorize vehicles. It uses a top-down One-to-Many dependency chain to prevent orphaned or disconnected vehicle data.

### **1.1 Model: `VehicleType`**
*Dictates whether the asset is a car, motorcycle, truck, etc.*
*   **Primary Key**: `id` (String `@id @default(uuid())`)
*   **Fields**:
    *   `name` (String, `@unique`) - E.g., "car", "bike". Enforced uniqueness prevents duplicate root categories.
*   **Relations / Outbound**:
    *   `regions` ➔ Array of `Region` records.

### **1.2 Model: `Region`**
*Groups vehicles by their geographical tuning culture or market origin.*
*   **Primary Key**: `id` (String `@id @default(uuid())`)
*   **Fields**:
    *   `name` (String) - E.g., "JDM", "Euro", "Indian Brands".
    *   `slug` (String) - A URL-safe string (e.g., "jdm") for API routing and SEO. Should be treated as unique in application logic.
    *   `vehicleTypeId` (String) - **Foreign Key**.
*   **Relations**:
    *   **Inbound**: `vehicleType` ➔ References `VehicleType.id`.
    *   **Outbound**: `brands` ➔ Array of `Brand` records.

### **1.3 Model: `Brand`**
*The manufacturer/marque.*
*   **Primary Key**: `id` (String `@id @default(uuid())`)
*   **Fields**:
    *   `name` (String) - E.g., "Toyota", "Yamaha".
    *   `slug` (String, `@unique`) - URL-safe string (e.g., "toyota"). Uniqueness guarantees we don't have conflicting API endpoints (`/brands/toyota`).
    *   `regionId` (String) - **Foreign Key**.
*   **Relations**:
    *   **Inbound**: `region` ➔ References `Region.id`.
    *   **Outbound**: `models` ➔ Array of `Model` records.

### **1.4 Model: `Model` (Vehicle Model)**
*The lowest tier of the hierarchy; the exact machine.*
*   **Primary Key**: `id` (String `@id @default(uuid())`)
*   **Fields**:
    *   `name` (String) - E.g., "Supra MK4", "MT-15".
    *   `brandId` (String) - **Foreign Key**.
*   **Relations**:
    *   **Inbound**: `brand` ➔ References `Brand.id`.
*   *Future Scale Note*: In the future, this model might need fields for `yearStart`, `yearEnd`, and `engineType` directly on this table to handle generation differences (e.g., Civic EK vs Civic FK8).

---

## 🎯 2. The Build Path & Educational System

This system handles the abstract goals a user wants to achieve. It is highly semantic and text-heavy, designed to educate the user.

### **2.1 Model: `BuildGoalCategory`**
*The broad stroke ambition.*
*   **Primary Key**: `id` (String `@id @default(uuid())`)
*   **Fields**:
    *   `slug` (String, `@unique`) - E.g., "performance", "touring".
    *   `name` (String) - Display name.
    *   `description` (String) - Long-form text explaining what this goal means.
    *   `level` (String, Optional `?`) - E.g., "Beginner", "Expert". Warns users of the difficulty.
    *   `warning` (String, Optional `?`) - Critical safety text. Enables the UI to display red alert boxes.
*   **Relations / Outbound**:
    *   `options` ➔ Array of `BuildOption` records.

### **2.2 Model: `BuildOption`**
*The specific manifestation of the goal.*
*   **Primary Key**: `id` (String `@id @default(uuid())`)
*   **Fields**:
    *   `slug` (String, `@unique`) - E.g., "track-focused", "daily-spirited".
    *   `name` (String)
    *   `description` (String)
    *   `tags` (String[]) - PostgreSQL specific array. Allows quick filtering or matching (e.g., `['warranty-void', 'expensive']`).
    *   `warning` (Boolean, `@default(false)`) - A boolean flag. If `true`, the UI must trigger a confirmation or hard-stop warning before the user proceeds.
    *   `categoryId` (String) - **Foreign Key**.
*   **Relations**:
    *   **Inbound**: `category` ➔ References `BuildGoalCategory.id`.

---

## ⚙️ 3. Physical Upgrades Catalog

This dictates the actual hardware/parts ecosystem.

### **3.1 Model: `UpgradeCategory`**
*Targeting the main chassis/powertrain groups.*
*   **Primary Key**: `id` (String `@id @default(uuid())`)
*   **Fields**:
    *   `slug` (String, `@unique`) - E.g., "forced-induction", "suspension".
    *   `name` (String)
    *   `description` (String)
*   **Relations / Outbound**:
    *   `subCategories` ➔ Array of `UpgradeSubCategory` records.

### **3.2 Model: `UpgradeSubCategory`**
*The localized list of parts.*
*   **Primary Key**: `id` (String `@id @default(uuid())`)
*   **Fields**:
    *   `slug` (String, `@unique`) - E.g., "turbochargers", "coilovers".
    *   `name` (String)
    *   `items` (String[]) - A PostgreSQL string array containing the lowest-level parts (e.g., `["Twin-Scroll Turbo", "Wastegate", "Blow-off Valve"]`). Storing them as an array rather than a completely separate relational table saves join operations and reduces complexity since they don't currently hold discrete metadata.
    *   `categoryId` (String) - **Foreign Key**.
*   **Relations**:
    *   **Inbound**: `category` ➔ References `UpgradeCategory.id`.

---

## 🛠️ 4. The Garage / Service Directory

This acts as calculating engine for matching users with capability.

### **4.1 Model: `Garage`**
*Independent Entity. No strict foreign key dependencies currently.*
*   **Primary Key**: `id` (String `@id @default(uuid())`)
*   **Fields & Strategic Usage**:
    *   `slug` (String, `@unique`) - E.g., "kamikaze-motors". Crucial for clean profile URLs (`/garages/kamikaze-motors`).
    *   `name` (String) - Official business name.
    *   `location` / `area` / `address` (Strings) - Granular geographic data. Future iterations should add `latitude` and `longitude` fields to allow radius-based searching (e.g., "Garages within 10km").
    *   `specialties` (String[]) / `services` (String[]) - Uses PostgreSQL Arrays. This is very powerful. It allows the API to perform array overlap queries (e.g., `SELECT * FROM Garage WHERE 'ECU Remap' = ANY(specialties)`).
    *   `rating` (Float) - Aggregate score out of 5.0. 
    *   `experience` / `expertise` (String) - Plain text to build trust (e.g., "15 Years Racing Data").
    *   `phone`, `email`, `instagram`, `timing`, `imageUrl` (All Optional `?`) - Standard biographical and connectivity data. Instagram assumes high importance in car culture for visual proof of work.

---

## 5. Architectural Considerations & Prisma Best Practices

1. **UUID over Auto-Increment Integers**: 
   - All models use `@default(uuid())`. This is a deliberate security choice to prevent "ID enumeration" attacks (where a malicious user loops through `api/users/1`, `api/users/2`). It also allows for easier database merging and distributed data generation if the system scales massively.
   
2. **Cascade Deletion Protocols (Implied)**:
   - Because `Model` requires `brandId`, if a `Brand` is deleted, Prisma will throw a constraint error unless explicitly configured.
   - *Recommendation*: Update Prisma schema to include `onDelete: Cascade` for parent-child paths (e.g., `VehicleType -> Region`) to ensure deleting a root node safely drops its dependent children during cleanup operations.

3. **Database Seeding Strategy**:
   - Because of Foreign Keys, the database must be seeded in exactly this order to prevent relation errors:
     1. `VehicleType`
     2. `Region`
     3. `Brand`
     4. `Model`
     5. `BuildGoalCategory` & `UpgradeCategory`
     6. `BuildOption` & `UpgradeSubCategory`
     7. `Garage` (Independent, can be seeded anytime)

4. **Future Expansion**:
   - When User Accounts are introduced, `Garage` should receive an `ownerId` relating back to a `User` model.
   - We will require an intersection table mapping `Users` to `Garages` for a "Reviews" or "Testimonials" feature.
