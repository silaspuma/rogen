# 🚀 RoboxGen Setup Guide

Complete guide to configure Google Gemini API and Supabase for the RoboxGen platform.

## Table of Contents
1. [Gemini API Setup](#gemini-api-setup)
2. [Supabase Setup](#supabase-setup)
3. [Environment Variables](#environment-variables)
4. [Testing the Setup](#testing-the-setup)
5. [Troubleshooting](#troubleshooting)

---

## Gemini API Setup

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com)
2. Click **"Get API Key"** in the left sidebar
3. Select **"Create API Key"** → **"Create API Key in new project"**
4. Your API key will be generated and displayed
5. **Important**: Copy this key and keep it safe. Never commit it to Git.

### Step 2: Verify Your API Key

Once you have your API key, it should follow this format:
```
AIza... (long alphanumeric string)
```

### Step 3: Add to Environment Variables

Add to your `.env.local` file (see [Environment Variables](#environment-variables) section below).

---

## Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click **Sign Up** and create an account (or sign in)
3. Click **"New Project"** in your dashboard
4. **Project Details:**
   - **Name**: `roboxgen` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location (e.g., `us-east-1`)
5. Click **Create New Project** and wait ~2 minutes for setup

### Step 2: Get Your Supabase Credentials

After project creation, you'll see the **Project Settings** page:

1. **Project URL** (looks like `https://xxxx.supabase.co`):
   - This is your `NEXT_PUBLIC_SUPABASE_URL`
   - Found under **Project Settings** → **API** → **Project URL**

2. **Anon Key** (public, safe to expose):
   - Found under **Project Settings** → **API** → **Project API Keys**
   - Look for the **anon (public)** key
   - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Service Role Key** (secret, never expose):
   - Found under **Project Settings** → **API** → **Project API Keys**
   - Look for the **service_role (secret)** key
   - This is your `SUPABASE_SERVICE_ROLE_KEY`
   - Store this securely in `.env.local` (NOT in `.env.local.example`)

### Step 3: Create Database Table and Storage Bucket

#### Create `generated_games` Table

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Create generated_games table
CREATE TABLE IF NOT EXISTS generated_games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  game_name VARCHAR(255) NOT NULL,
  game_type VARCHAR(50) NOT NULL,
  theme VARCHAR(50) NOT NULL,
  lua_script TEXT NOT NULL,
  download_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS generated_games_user_id_idx ON generated_games(user_id);
CREATE INDEX IF NOT EXISTS generated_games_created_at_idx ON generated_games(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE generated_games ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only see/modify their own games
CREATE POLICY "Users can view their own games"
  ON generated_games FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own games"
  ON generated_games FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own games"
  ON generated_games FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own games"
  ON generated_games FOR DELETE
  USING (auth.uid() = user_id);
```

4. Click **"Run"** to execute
5. You should see "Success" message

#### Create Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click **"Create a new bucket"**
3. **Settings:**
   - **Name**: `generated-games`
   - **Privacy**: Select **Public**
4. Click **Create Bucket**

#### Set Storage Policies

1. Click on the `generated-games` bucket
2. Click **Policies** tab
3. Click **New Policy** → **For full customization**
4. Add this policy:

```
-- Allow public read access
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'generated-games');

-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'generated-games' AND
    auth.role() = 'authenticated'
  );

-- Allow users to delete their own files
CREATE POLICY "Allow users to delete own files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'generated-games' AND
    auth.uid() = owner_id
  );
```

---

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase (Public - can expose in browser)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Supabase (Secret - server-side only)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Finding Your Values

| Variable | Where to Find |
|----------|---|
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com) → Get API Key |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → Keys → anon (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Project Settings → API → Keys → service_role (secret) |

### Example .env.local

```env
GEMINI_API_KEY=AIzaSyDxK8Z9h5fJ3jN8k2mL7pQ0r3sT9u1vW2xY
NEXT_PUBLIC_SUPABASE_URL=https://yourcustomname.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ **Never commit `.env.local` to Git!** It's already in `.gitignore`.

---

## Testing the Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The app should start on `http://localhost:3000`

### 3. Test Authentication

1. Go to [http://localhost:3000](http://localhost:3000)
2. Click **Sign In** in the navbar
3. Enter a test email and password (e.g., `test@example.com`, `password123`)
4. You should be able to sign up and then sign in

### 4. Test Game Generation

1. After signing in, go to **Generate** page
2. Enter a game description like: "A simple adventure game where you battle monsters"
3. Select game type and theme
4. Click **"Generate Game"**
5. Wait for AI to generate Lua script (~10-15 seconds)
6. You should see a success message
7. Download the ZIP file

### 5. Test Dashboard

1. Click **Dashboard** in the navbar
2. You should see your generated game listed
3. You can download the ZIP or delete the game

### 6. Verify Database

In Supabase Dashboard:
1. Go to **SQL Editor**
2. Run: `SELECT * FROM generated_games;`
3. You should see your generated game listed

---

## Troubleshooting

### "API key not found" Error

**Problem**: Getting error "GEMINI_API_KEY is not set"

**Solution**:
1. Check `.env.local` file exists in project root
2. Verify `GEMINI_API_KEY=...` is present
3. Restart dev server: `npm run dev`

### "Connection to Supabase failed"

**Problem**: Can't connect to Supabase

**Solution**:
1. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct (should start with `https://`)
2. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is not empty
3. Check Supabase project is "Active" (not suspended)
4. Try creating a new project if issues persist

### "Permission denied" on Upload

**Problem**: Getting 403/permission error when uploading games

**Solution**:
1. Verify storage bucket `generated-games` is created
2. Check bucket is set to **Public**
3. Verify storage policies are created correctly
4. Check user is authenticated (signed in)

### "Row Level Security" Errors

**Problem**: Can't insert/view games, RLS errors

**Solution**:
1. Verify all RLS policies are created (4 total)
2. Make sure `generated_games` table has RLS enabled
3. Check that `user_id` in database matches authenticated user ID

### Gemini API Rate Limited

**Problem**: Getting "resource exhausted" or quota errors

**Solution**:
1. Gemini API has usage limits (free tier: 60 requests/minute)
2. Wait a minute and try again
3. Upgrade to Gemini API paid plan for higher limits

### Games Not Appearing in Dashboard

**Problem**: Generated games not showing in dashboard

**Solution**:
1. Check you're signed in with correct account
2. Verify games were actually saved to database (check Supabase SQL Editor)
3. Try refreshing page
4. Check browser console for errors (F12)

---

## Deployment

### Deploying to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **Add New** → **Project** → Select your GitHub repo
4. **Environment Variables**: Add all variables from `.env.local`
5. Click **Deploy**

### Important Environment Variables for Production

- ✅ `GEMINI_API_KEY` - Add to Vercel
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Add to Vercel
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Add to Vercel
- ✅ `SUPABASE_SERVICE_ROLE_KEY` - Add to Vercel (secret)

---

## Useful Links

- [Google AI Studio Docs](https://aistudio.google.com)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)

---

## Questions?

If you encounter issues not covered here:

1. Check browser console for errors (F12 → Console)
2. Check server logs in terminal
3. Visit Supabase docs for database/auth issues
4. Check Gemini API quota in [Google Cloud Console](https://console.cloud.google.com)

Happy game generating! 🎮✨
