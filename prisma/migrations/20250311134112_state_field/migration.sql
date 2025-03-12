-- CreateEnum
CREATE TYPE "validStateFixture" AS ENUM ('DISABLED', 'ENABLED', 'ONGOING', 'CLOSED');

-- AlterTable
ALTER TABLE "Fixture" ADD COLUMN     "state" "validStateFixture" NOT NULL DEFAULT 'DISABLED';
