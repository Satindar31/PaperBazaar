-- DropForeignKey
ALTER TABLE "public"."Bet" DROP CONSTRAINT "Bet_questionId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Bet" ADD CONSTRAINT "Bet_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
