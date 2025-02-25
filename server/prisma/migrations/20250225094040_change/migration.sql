/*
  Warnings:

  - Added the required column `final` to the `Tester` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tester` ADD COLUMN `final` VARCHAR(191) NOT NULL;
