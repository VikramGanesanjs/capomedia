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
    "approval" TEXT NOT NULL DEFAULT 'Pending',
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("createdAt", "directorName", "endTime", "extraComments", "id", "producerEmail", "producerName", "projectName", "startTime", "userId") SELECT "createdAt", "directorName", "endTime", "extraComments", "id", "producerEmail", "producerName", "projectName", "startTime", "userId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
