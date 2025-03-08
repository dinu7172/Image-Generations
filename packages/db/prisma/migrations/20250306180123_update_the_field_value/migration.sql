/*
  Warnings:

  - You are about to drop the column `faAiRequestId` on the `Model` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Model" DROP COLUMN "faAiRequestId",
ADD COLUMN     "falAiRequestId" TEXT;
