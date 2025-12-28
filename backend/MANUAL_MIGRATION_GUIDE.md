# Manual Database Migration Guide

Since Prisma migrations are failing due to database connectivity issues, you can run the SQL migration manually through Neon's SQL Editor.

## Steps to Run Manual Migration

### 1. Open Neon SQL Editor
1. Go to https://console.neon.tech
2. Select your project
3. Click on "SQL Editor" in the left sidebar
4. Make sure your database is active (not paused)

### 2. Run the Migration SQL

Copy and paste the following SQL into the SQL Editor and click "Run":

```sql
-- Add category column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'feedback' AND column_name = 'category'
    ) THEN
        ALTER TABLE "feedback" ADD COLUMN "category" TEXT DEFAULT 'platform';
    END IF;

    -- Add verified column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'feedback' AND column_name = 'verified'
    ) THEN
        ALTER TABLE "feedback" ADD COLUMN "verified" BOOLEAN NOT NULL DEFAULT false;
    END IF;
END $$;

-- Verify the changes
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'feedback'
ORDER BY ordinal_position;
```

### 3. Verify Migration Success

After running the SQL, you should see:
- `category` column added (TEXT type, default 'platform')
- `verified` column added (BOOLEAN type, default false)

### 4. Regenerate Prisma Client

After the migration is complete, regenerate the Prisma client:

```powershell
cd backend
npx prisma generate
```

This will update the Prisma client to recognize the new fields.

## Alternative: Simple SQL (if the above doesn't work)

If the DO block doesn't work, try this simpler version:

```sql
ALTER TABLE "feedback" ADD COLUMN IF NOT EXISTS "category" TEXT DEFAULT 'platform';
ALTER TABLE "feedback" ADD COLUMN IF NOT EXISTS "verified" BOOLEAN NOT NULL DEFAULT false;
```

## Troubleshooting

- **If columns already exist**: The migration will skip adding them (safe to run multiple times)
- **If you get permission errors**: Make sure you're using the correct database user
- **If the database is paused**: Resume it from the Neon dashboard first

## What This Migration Does

1. Adds `category` field to store feedback category (guide, accommodation, transport, marketplace, platform)
2. Adds `verified` field to track admin verification status (defaults to false)
3. Both fields are required for the feedback system to work properly

After this migration, the feedback system will be fully functional!



