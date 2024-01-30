-- CreateTable
CREATE TABLE "Links" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "expires" TIMESTAMP(3),
    "clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Links_path_key" ON "Links"("path");
