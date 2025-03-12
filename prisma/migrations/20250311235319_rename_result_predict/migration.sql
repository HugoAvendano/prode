/*
  Warnings:

  - You are about to drop the column `result_predic` on the `PredictMatch` table. All the data in the column will be lost.
  - Added the required column `result_predict` to the `PredictMatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PredictMatch" DROP COLUMN "result_predic",
ADD COLUMN     "result_predict" "validResult" NOT NULL;
