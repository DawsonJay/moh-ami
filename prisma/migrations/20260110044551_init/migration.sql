-- CreateTable
CREATE TABLE "Translation" (
    "id" SERIAL NOT NULL,
    "englishText" TEXT NOT NULL,
    "frenchTranslation" TEXT NOT NULL,
    "explanations" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Translation_createdAt_idx" ON "Translation"("createdAt");
