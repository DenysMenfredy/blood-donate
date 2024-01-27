-- CreateTable
CREATE TABLE "Donator" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "bloodType" VARCHAR(10) NOT NULL,
    "gender" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donator_pkey" PRIMARY KEY ("id")
);
