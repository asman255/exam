-- CreateTable
CREATE TABLE `Tester` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestScore` (
    `id` VARCHAR(191) NOT NULL,
    `testerId` VARCHAR(191) NOT NULL,
    `colorblind` INTEGER NOT NULL,
    `longsight` INTEGER NOT NULL,
    `astigmatic` INTEGER NOT NULL,
    `reflec` INTEGER NOT NULL,
    `sign` INTEGER NOT NULL,
    `line` INTEGER NOT NULL,
    `giveway` INTEGER NOT NULL,
    `practice` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TestScore` ADD CONSTRAINT `TestScore_testerId_fkey` FOREIGN KEY (`testerId`) REFERENCES `Tester`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
