-- CreateEnum
CREATE TYPE "RecipeStatus" AS ENUM ('Draft', 'Pending', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "RecipeCategory" AS ENUM ('Bengali_Sweets', 'Street_Food', 'Traditional_Meals', 'Festival_Specials', 'Tea_Snacks', 'Fish_Curry', 'Rice_Dishes', 'Vegetarian');

-- CreateTable
CREATE TABLE "recipes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" TEXT[],
    "instructions" TEXT[],
    "prepTime" INTEGER NOT NULL,
    "cookTime" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,
    "category" "RecipeCategory" NOT NULL,
    "tags" TEXT[],
    "image" TEXT,
    "videoUrl" TEXT,
    "nutritionInfo" JSONB,
    "tips" TEXT[],
    "story" TEXT,
    "region" TEXT,
    "status" "RecipeStatus" NOT NULL DEFAULT 'Draft',
    "authorId" TEXT NOT NULL,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;