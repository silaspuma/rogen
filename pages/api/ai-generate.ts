import { NextApiRequest, NextApiResponse } from 'next';
import { generateGameScript, generateGameName } from '@/lib/gemini';
import { generateGameId } from '@/lib/utils';

/**
 * pages/api/ai-generate.ts
 * 
 * API endpoint for AI-powered Roblox game generation
 * 
 * This endpoint:
 * 1. Accepts game description, type, and theme from frontend
 * 2. Calls Gemini API on the server (API key never exposed to client)
 * 3. Returns generated Lua script and game metadata
 * 4. Handles errors gracefully
 * 
 * The frontend is responsible for:
 * - User authentication check
 * - Uploading ZIP to Supabase storage
 * - Saving metadata to database
 */

interface GenerateRequestBody {
  description: string;
  gameType: string;
  theme: string;
}

interface GenerateResponseBody {
  game: {
    id: string;
    gameName: string;
    description: string;
    gameType: string;
    theme: string;
    luaScript: string;
  };
}

interface ErrorResponseBody {
  error: string;
  details?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponseBody | ErrorResponseBody>
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { description, gameType, theme } = req.body as GenerateRequestBody;

  // ============ INPUT VALIDATION ============
  if (!description || !gameType || !theme) {
    return res.status(400).json({
      error: 'Missing required fields',
      details: 'Please provide description, gameType, and theme',
    });
  }

  if (description.length < 10) {
    return res.status(400).json({
      error: 'Description too short',
      details: 'Description must be at least 10 characters',
    });
  }

  if (description.length > 500) {
    return res.status(400).json({
      error: 'Description too long',
      details: 'Description must be less than 500 characters',
    });
  }

  // ============ API KEY VALIDATION ============
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY environment variable not set');
    return res.status(500).json({
      error: 'Server configuration error',
      details: 'AI service is not configured. Please contact support.',
    });
  }

  try {
    // ============ CALL GEMINI API ============
    console.log(`[AI-Generate] Starting generation for ${gameType} game...`);

    // Generate the Lua script using Gemini
    const luaScript = await generateGameScript(description, gameType, theme);

    if (!luaScript || luaScript.length < 100) {
      throw new Error('Generated script is too short or empty');
    }

    // Generate a creative game name
    const gameName = await generateGameName(description);

    // Create game metadata
    const gameId = generateGameId();

    console.log(`[AI-Generate] Successfully generated game: ${gameName}`);

    // ============ RETURN RESPONSE ============
    return res.status(200).json({
      game: {
        id: gameId,
        gameName: gameName || 'Untitled Game',
        description,
        gameType,
        theme,
        luaScript,
      },
    });
  } catch (error: any) {
    console.error('[AI-Generate] Error:', error);

    // Provide user-friendly error messages
    let errorMessage = 'Failed to generate game';
    let details = 'Please try again later';

    if (error.message?.includes('API key')) {
      errorMessage = 'AI service configuration error';
      details = 'The AI service is not properly configured';
    } else if (error.message?.includes('quota')) {
      errorMessage = 'Rate limit exceeded';
      details = 'Too many requests. Please wait a moment and try again.';
    } else if (error.message?.includes('network')) {
      errorMessage = 'Network error';
      details = 'Failed to connect to AI service. Check your internet connection.';
    } else if (error.message?.includes('invalid')) {
      errorMessage = 'Invalid request';
      details = error.message;
    }

    return res.status(500).json({
      error: errorMessage,
      details,
    });
  }
}

export default handler;

