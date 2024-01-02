CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('BORROWED', 'RETURNED');

-- CreateTable
CREATE TABLE "UserBookBorrowing" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "borrowed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" TIMESTAMP(3),
    "status" "Status" NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserBookBorrowing_id_borrowed_at_key" ON "UserBookBorrowing"("id", "borrowed_at");

-- AddForeignKey
ALTER TABLE "UserBookBorrowing" ADD CONSTRAINT "UserBookBorrowing_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookBorrowing" ADD CONSTRAINT "UserBookBorrowing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

SELECT create_hypertable('"UserBookBorrowing"', 'borrowed_at');