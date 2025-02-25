/*
  Warnings:

  - Added the required column `bodyresult` to the `Tester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theoryresult` to the `Tester` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tester` ADD COLUMN `bodyresult` BOOLEAN NOT NULL,
    ADD COLUMN `theoryresult` BOOLEAN NOT NULL;
