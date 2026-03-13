/*
  Warnings:

  - You are about to drop the column `evento_id` on the `inscricoes` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `inscricoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inscricoes` DROP COLUMN `evento_id`,
    DROP COLUMN `usuario_id`;
