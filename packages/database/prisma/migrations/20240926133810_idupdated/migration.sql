/*
  Warnings:

  - The primary key for the `Chatbot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Visitor` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatbotId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_visitorId_fkey";

-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_chatbotId_fkey";

-- AlterTable
ALTER TABLE "Chatbot" DROP CONSTRAINT "Chatbot_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Chatbot_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Chatbot_id_seq";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "visitorId" SET DATA TYPE TEXT,
ALTER COLUMN "chatbotId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "chatbotId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Visitor_id_seq";

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
