/*
  Warnings:

  - You are about to drop the `_BookingToEquipment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_BookingToEquipment";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "BookingsOnEquipments" (
    "bookingId" INTEGER NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("bookingId", "equipmentId"),
    CONSTRAINT "BookingsOnEquipments_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Booking" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookingsOnEquipments_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Equipment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
