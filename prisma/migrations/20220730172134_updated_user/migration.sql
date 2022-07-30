/*
  Warnings:

  - You are about to drop the column `status` on the `Issue` table. All the data in the column will be lost.
  - Made the column `description` on table `Issue` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_authorId_fkey";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "status",
ALTER COLUMN "description" SET NOT NULL;
