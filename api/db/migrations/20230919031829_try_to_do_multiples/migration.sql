-- AlterTable
ALTER TABLE "BookingsOnEquipments" ADD COLUMN "multiple" BOOLEAN DEFAULT false;
ALTER TABLE "BookingsOnEquipments" ADD COLUMN "quantity" INTEGER DEFAULT 1;
