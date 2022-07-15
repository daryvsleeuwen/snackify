/*
  Warnings:

  - Added the required column `amount` to the `SnackToOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SnackToOrder` ADD COLUMN `amount` INTEGER NOT NULL;
