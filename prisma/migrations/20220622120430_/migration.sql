/*
  Warnings:

  - You are about to drop the column `orderId` on the `snack` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Order_sessionId_fkey` ON `order`;

-- DropIndex
DROP INDEX `Snack_orderId_fkey` ON `snack`;

-- AlterTable
ALTER TABLE `snack` DROP COLUMN `orderId`;

-- CreateTable
CREATE TABLE `_OrderToSnack` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OrderToSnack_AB_unique`(`A`, `B`),
    INDEX `_OrderToSnack_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToSnack` ADD CONSTRAINT `_OrderToSnack_A_fkey` FOREIGN KEY (`A`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToSnack` ADD CONSTRAINT `_OrderToSnack_B_fkey` FOREIGN KEY (`B`) REFERENCES `Snack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
