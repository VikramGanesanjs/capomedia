/*
  Warnings:

  - Added the required column `directorName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraComments` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `producerEmail` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `producerName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Equipment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "producerName" TEXT NOT NULL,
    "producerEmail" TEXT NOT NULL,
    "directorName" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "extraComments" TEXT NOT NULL,
    CONSTRAINT "Booking_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("createdAt", "endTime", "equipmentId", "id", "startTime", "userId") SELECT "createdAt", "endTime", "equipmentId", "id", "startTime", "userId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE TABLE "new_Equipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL
);
INSERT INTO "new_Equipment" ("createdAt", "description", "id", "name") SELECT "createdAt", "description", "id", "name" FROM "Equipment";
DROP TABLE "Equipment";
ALTER TABLE "new_Equipment" RENAME TO "Equipment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
