-- CreateTable
CREATE TABLE "VehicleType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "vehicleTypeId" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildGoalCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT,
    "warning" TEXT,

    CONSTRAINT "BuildGoalCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildOption" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "warning" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "BuildOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Garage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "specialties" TEXT[],
    "services" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL,
    "experience" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT,
    "instagram" TEXT,
    "email" TEXT,
    "address" TEXT,
    "timing" TEXT,

    CONSTRAINT "Garage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UpgradeCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "UpgradeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UpgradeSubCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "items" TEXT[],

    CONSTRAINT "UpgradeSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleType_name_key" ON "VehicleType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_slug_key" ON "Brand"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BuildGoalCategory_slug_key" ON "BuildGoalCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BuildOption_slug_key" ON "BuildOption"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Garage_slug_key" ON "Garage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UpgradeCategory_slug_key" ON "UpgradeCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UpgradeSubCategory_slug_key" ON "UpgradeSubCategory"("slug");

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildOption" ADD CONSTRAINT "BuildOption_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BuildGoalCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpgradeSubCategory" ADD CONSTRAINT "UpgradeSubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "UpgradeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
