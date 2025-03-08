-- CreateEnum
CREATE TYPE "ModelTypeEnum" AS ENUM ('Man', 'Women', 'Kids', 'Others');

-- CreateEnum
CREATE TYPE "EthnicityEnum" AS ENUM ('White', 'Black', 'Asian American', 'East Asian', 'Hispanic', 'Middle Eastern', 'South Asian', 'South East Asian', 'Pacific Islander', 'Others');

-- CreateEnum
CREATE TYPE "EyeColorEnum" AS ENUM ('Brown', 'Blue', 'Green', 'Hazel', 'Gray', 'Amber', 'Red', 'Black', 'Others');

-- CreateEnum
CREATE TYPE "HairColorEnum" AS ENUM ('Black', 'Brown', 'Blonde', 'Red', 'Gray', 'White', 'Others');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profilePicture" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ModelTypeEnum" NOT NULL,
    "age" INTEGER NOT NULL,
    "ethinicity" "EthnicityEnum" NOT NULL,
    "eyeColor" "EyeColorEnum" NOT NULL,
    "hairColor" "HairColorEnum" NOT NULL,
    "bald" BOOLEAN NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingImages" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,

    CONSTRAINT "TrainingImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutputImages" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutputImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Packs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Packs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackPrompts" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "packId" TEXT NOT NULL,

    CONSTRAINT "PackPrompts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "TrainingImages" ADD CONSTRAINT "TrainingImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutputImages" ADD CONSTRAINT "OutputImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackPrompts" ADD CONSTRAINT "PackPrompts_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Packs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
