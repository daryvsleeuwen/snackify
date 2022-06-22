/*
  Warnings:

  - You are about to drop the `_ordertosnack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Order_sessionId_fkey` ON `order`;

-- AlterTable
ALTER TABLE `snack` ADD COLUMN `orderId` INTEGER NULL;

-- DropTable
DROP TABLE `_ordertosnack`;

-- AddForeignKey
ALTER TABLE `Snack` ADD CONSTRAINT `Snack_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
