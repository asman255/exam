/*
  Warnings:

  - You are about to drop the `testscore` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `astigmatic` to the `Tester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorblind` to the `Tester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `giveway` to the `Tester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `line` to the `Tester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longsight` to the `Tester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `practice` to the `Tester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reflec` to the `Tester` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sign` to the `Tester` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `testscore` DROP FOREIGN KEY `TestScore_testerId_fkey`;

-- AlterTable
ALTER TABLE `tester` ADD COLUMN `astigmatic` INTEGER NOT NULL,
    ADD COLUMN `colorblind` INTEGER NOT NULL,
    ADD COLUMN `giveway` INTEGER NOT NULL,
    ADD COLUMN `line` INTEGER NOT NULL,
    ADD COLUMN `longsight` INTEGER NOT NULL,
    ADD COLUMN `practice` BOOLEAN NOT NULL,
    ADD COLUMN `reflec` INTEGER NOT NULL,
    ADD COLUMN `sign` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `testscore`;
