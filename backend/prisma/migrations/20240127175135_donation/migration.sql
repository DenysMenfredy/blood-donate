-- CreateTable
CREATE TABLE "Donation" (
    "donatorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "bloodBankId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("donatorId","patientId","bloodBankId")
);

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donatorId_fkey" FOREIGN KEY ("donatorId") REFERENCES "Donator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_bloodBankId_fkey" FOREIGN KEY ("bloodBankId") REFERENCES "BloodBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
