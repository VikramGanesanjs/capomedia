-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BookingsOnEquipments" (
    "bookingId" INTEGER NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("bookingId", "equipmentId"),
    CONSTRAINT "BookingsOnEquipments_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookingsOnEquipments_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BookingsOnEquipments" ("assignedAt", "bookingId", "equipmentId") SELECT "assignedAt", "bookingId", "equipmentId" FROM "BookingsOnEquipments";
DROP TABLE "BookingsOnEquipments";
ALTER TABLE "new_BookingsOnEquipments" RENAME TO "BookingsOnEquipments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
