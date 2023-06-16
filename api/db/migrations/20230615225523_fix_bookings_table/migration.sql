/*
  Warnings:

  - You are about to drop the column `equipmentId` on the `Booking` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_BookingToEquipment" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BookingToEquipment_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookingToEquipment_B_fkey" FOREIGN KEY ("B") REFERENCES "Equipment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "producerName" TEXT NOT NULL,
    "producerEmail" TEXT NOT NULL,
    "directorName" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "extraComments" TEXT NOT NULL,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("createdAt", "directorName", "endTime", "extraComments", "id", "producerEmail", "producerName", "projectName", "startTime", "userId") SELECT "createdAt", "directorName", "endTime", "extraComments", "id", "producerEmail", "producerName", "projectName", "startTime", "userId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_BookingToEquipment_AB_unique" ON "_BookingToEquipment"("A", "B");

-- CreateIndex
CREATE INDEX "_BookingToEquipment_B_index" ON "_BookingToEquipment"("B");
