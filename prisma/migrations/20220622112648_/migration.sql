/*
  Warnings:

  - Made the column `sessionId` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orderId` on table `snack` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Order_sessionId_fkey` ON `order`;

-- DropIndex
DROP INDEX `Snack_orderId_fkey` ON `snack`;

-- AlterTable
ALTER TABLE `order` MODIFY `sessionId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `snack` MODIFY `orderId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Snack` ADD CONSTRAINT `Snack_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
