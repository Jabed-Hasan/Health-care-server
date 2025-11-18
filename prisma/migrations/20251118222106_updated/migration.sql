/*
  Warnings:

  - Made the column `contactNumber` on table `admins` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "contactNumber" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "needsPasswordReset" BOOLEAN NOT NULL DEFAULT true;
