/*
  Warnings:

  - You are about to drop the column `snackId` on the `user` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Order_sessionId_fkey` ON `order`;

-- DropIndex
DROP INDEX `Snack_orderId_fkey` ON `snack`;

-- DropIndex
DROP INDEX `User_snackId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `snackId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `favouriteSnack` INTEGER NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    MODIFY `totalEatenSnacks` INTEGER NOT NULL DEFAULT 0,
    MODIFY `totalBrownBreadEaten` INTEGER NOT NULL DEFAULT 0,
    MODIFY `totalWhiteBreadEaten` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Snack` ADD CONSTRAINT `Snack_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
