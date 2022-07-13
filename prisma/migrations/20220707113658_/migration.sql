/*
  Warnings:

  - Added the required column `amount` to the `SnackToOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Order_sessionId_fkey` ON `order`;

-- DropIndex
DROP INDEX `Order_userId_fkey` ON `order`;

-- DropIndex
DROP INDEX `SnackToOrder_orderId_fkey` ON `snacktoorder`;

-- DropIndex
DROP INDEX `SnackToOrder_snackId_fkey` ON `snacktoorder`;

-- AlterTable
ALTER TABLE `snacktoorder` ADD COLUMN `amount` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SnackToOrder` ADD CONSTRAINT `SnackToOrder_snackId_fkey` FOREIGN KEY (`snackId`) REFERENCES `Snack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SnackToOrder` ADD CONSTRAINT `SnackToOrder_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
