/*
  Warnings:

  - You are about to drop the column `birthDate` on the `Donator` table. All the data in the column will be lost.
  - You are about to drop the column `bloodType` on the `Donator` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Donator` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Donator` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Donator` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Donator` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `bloodType` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Donator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updateAt` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Donator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Donator" DROP COLUMN "birthDate",
DROP COLUMN "bloodType",
DROP COLUMN "email",
DROP COLUMN "gender",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "birthDate",
DROP COLUMN "bloodType",
DROP COLUMN "email",
DROP COLUMN "gender",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "bloodType" VARCHAR(10) NOT NULL,
    "gender" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donator_userId_key" ON "Donator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "Patient"("userId");

-- AddForeignKey
ALTER TABLE "Donator" ADD CONSTRAINT "Donator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
