-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "vimeoUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credits" TEXT NOT NULL,
    "category" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Video" ("createdAt", "credits", "description", "id", "title", "vimeoUrl") SELECT "createdAt", "credits", "description", "id", "title", "vimeoUrl" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
