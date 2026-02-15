/**
 * lib/supabase.ts
 * Supabase client initialization and database functions
 * 
 * This module handles:
 * - Client-side Supabase initialization
 * - Authentication utilities
 * - Database queries for games and user data
 */

import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { createClient as createServerClient } from '@supabase/auth-helpers-nextjs';

/**
 * Create a Supabase client for browser/client-side operations
 * Uses public anonymous key (safe to expose)
 */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

/**
 * Database type definitions for generated games
 */
export interface GeneratedGame {
  id: string;
  user_id: string;
  prompt: string;
  game_name: string;
  game_type: string;
  theme: string;
  download_url: string;
  lua_script?: string;
  created_at: string;
  updated_at?: string;
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Save a generated game to Supabase database
 * 
 * @param userId - User ID from Supabase Auth
 * @param gameData - Game metadata to save
 * @returns Saved game object or error
 */
export async function saveGeneratedGame(
  userId: string,
  gameData: Omit<GeneratedGame, 'id' | 'created_at' | 'user_id'>
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('generated_games')
    .insert([
      {
        user_id: userId,
        ...gameData,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error saving game:', error);
    throw new Error(`Failed to save game: ${error.message}`);
  }

  return data as GeneratedGame;
}

/**
 * Get all games for the current user
 * 
 * @param userId - User ID from Supabase Auth
 * @returns Array of user's generated games
 */
export async function getUserGames(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('generated_games')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching games:', error);
    throw new Error(`Failed to fetch games: ${error.message}`);
  }

  // Transform Supabase data to store format
  return (data || []).map((game) => ({
    id: game.id,
    name: game.game_name,
    description: game.prompt,
    type: game.game_type,
    theme: game.theme,
    createdAt: new Date(game.created_at),
    luaScript: game.lua_script || '',
    downloadUrl: game.download_url,
    views: 0,
    shared: false,
  }));
}

/**
 * Delete a game record from database
 * 
 * @param gameId - Game ID to delete
 * @param userId - User ID (for verification)
 */
export async function deleteGame(gameId: string, userId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('generated_games')
    .delete()
    .eq('id', gameId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error deleting game:', error);
    throw new Error(`Failed to delete game: ${error.message}`);
  }
}

/**
 * Upload a game ZIP file to Supabase storage
 * 
 * @param userId - User ID
 * @param fileName - Name of file
 * @param fileBuffer - File buffer/blob
 * @returns Public URL of uploaded file
 */
export async function uploadGameZip(
  userId: string,
  fileName: string,
  fileBuffer: Buffer | Blob
): Promise<string> {
  const supabase = createClient();

  // Create a unique file path: users/{userId}/games/{fileName}
  const filePath = `users/${userId}/games/${Date.now()}_${fileName}`;

  const { data, error } = await supabase.storage
    .from('generated-games')
    .upload(filePath, fileBuffer, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error uploading file:', error);
    throw new Error(`Failed to upload game: ${error.message}`);
  }

  // Get public URL for the file
  const { data: publicUrlData } = supabase.storage
    .from('generated-games')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

/**
 * Sign up a new user with email
 * 
 * @param email - User's email
 * @param password - User's password
 */
export async function signUp(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(`Sign up failed: ${error.message}`);
  }

  return data;
}

/**
 * Sign in a user with email
 * 
 * @param email - User's email
 * @param password - User's password
 */
export async function signIn(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(`Sign in failed: ${error.message}`);
  }

  return data;
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Sign out failed: ${error.message}`);
  }
}

/**
 * Get auth state subscription
 * Returns function to unsubscribe
 */
export function onAuthStateChange(callback: (user: any) => void) {
  const supabase = createClient();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });

  return subscription;
}

/**
 * Database schema for Supabase setup
 * Run these SQL commands in Supabase SQL editor to create required tables
 */
export const DATABASE_SCHEMA = `
-- Create generated_games table
CREATE TABLE IF NOT EXISTS generated_games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  game_name TEXT NOT NULL,
  game_type VARCHAR(50) NOT NULL,
  theme VARCHAR(50) NOT NULL,
  lua_script TEXT,
  download_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_generated_games_user_id ON generated_games(user_id);
CREATE INDEX idx_generated_games_created_at ON generated_games(created_at DESC);

-- Enable Row Level Security
ALTER TABLE generated_games ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own games"
  ON generated_games
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create games"
  ON generated_games
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own games"
  ON generated_games
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own games"
  ON generated_games
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create storage bucket for game files
INSERT INTO storage.buckets (id, name, public)
VALUES ('generated-games', 'generated-games', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: users can upload to their own folder
CREATE POLICY "Users can upload game files"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'generated-games' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Storage policy: users can access their own files
CREATE POLICY "Users can access game files"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'generated-games');
`;

