-- DropIndex
DROP INDEX `Order_sessionId_fkey` ON `order`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `brownBuns` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `whiteBuns` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToSnack` ADD CONSTRAINT `_OrderToSnack_A_fkey` FOREIGN KEY (`A`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToSnack` ADD CONSTRAINT `_OrderToSnack_B_fkey` FOREIGN KEY (`B`) REFERENCES `Snack`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;