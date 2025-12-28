# How to Resume Neon Database

## Step 1: Resume Database in Neon Console

1. Go to: https://console.neon.tech
2. Log in to your account
3. Select your project (should be named something like "neondb")
4. Look for a **"Resume"** or **"Resume Database"** button
5. Click it and wait for the database to resume (usually 10-30 seconds)

## Step 2: Verify Connection

After resuming, run:
```powershell
cd backend
node test-connection.js
```

## Step 3: If Pooler Doesn't Work, Try Direct Connection

If the pooler connection still fails, try updating your `.env` file to use direct connection:

**Current (pooler):**
```
DATABASE_URL="postgresql://neondb_owner:npg_9meSnIk0QDJz@ep-tiny-sunset-adt90a6a-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

**Direct connection (remove -pooler):**
```
DATABASE_URL="postgresql://neondb_owner:npg_9meSnIk0QDJz@ep-tiny-sunset-adt90a6a.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

Then restart your backend server.

## Common Issues

- **Database paused**: Neon free tier pauses databases after inactivity
- **Cold start delay**: After resuming, wait 10-20 seconds before connecting
- **Network issues**: Check firewall/antivirus isn't blocking port 5432


