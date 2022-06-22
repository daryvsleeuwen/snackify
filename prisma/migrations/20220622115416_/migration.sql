-- DropIndex
DROP INDEX `Order_sessionId_fkey` ON `order`;

-- DropIndex
DROP INDEX `Snack_orderId_fkey` ON `snack`;

-- AlterTable
ALTER TABLE `order` MODIFY `sessionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `snack` MODIFY `orderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Snack` ADD CONSTRAINT `Snack_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
