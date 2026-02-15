/**
 * lib/gemini.ts
 * Gemini API integration for AI-powered game generation
 * 
 * This module handles all calls to the Google Gemini API.
 * The API key is stored securely on the server and never exposed to the client.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI client with API key
// This runs only server-side and is never exposed to the client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * Generate a Roblox game Lua script using Gemini API
 * 
 * @param description - User's game idea description
 * @param gameType - Type of game (adventure, puzzle, racing, etc.)
 * @param theme - Visual theme for the game
 * @returns Generated Lua script code
 * @throws Error if API call fails
 */
export async function generateGameScript(
  description: string,
  gameType: string,
  theme: string
): Promise<string> {
  try {
    // Validate inputs
    if (!description || description.length < 10) {
      throw new Error('Game description must be at least 10 characters');
    }

    if (!gameType || !theme) {
      throw new Error('Game type and theme are required');
    }

    // Create the prompt for Gemini
    const prompt = `You are an expert Roblox Lua developer. Generate a complete, functional Lua script for a ${gameType} game with a ${theme} theme.

User's Game Concept:
${description}

REQUIREMENTS:
1. Create a valid Roblox Lua script that can be pasted directly into Roblox Studio
2. Include these sections with clear comments:
   - Game Configuration (settings, constants)
   - Player Management (joining, leaving)
   - Core Game Mechanics (specific to the ${gameType} type)
   - Game Loop (main update logic)
   - Cleanup (proper disposal of resources)

3. The script MUST:
   - Be fully functional and error-free
   - Include proper comments explaining each section
   - Use Roblox API correctly
   - Have proper error handling
   - Be optimized for performance
   - Be ready to use immediately in Roblox Studio

4. For a ${gameType} game with ${theme} theme, implement specific mechanics:
   - ${getGameTypeMechanics(gameType)}
   - Visual style: ${theme}

IMPORTANT: Return ONLY the Lua code, starting with the opening comment and ending with the final comment. No markdown, no explanations, just pure Lua code.`;

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 4096,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error('No response received from Gemini API');
    }

    // Clean up markdown code blocks if present (sometimes Gemini wraps in ```)
    let luaCode = text;
    if (luaCode.includes('```lua')) {
      luaCode = luaCode.replace(/```lua\n?/g, '').replace(/```\n?/g, '');
    } else if (luaCode.includes('```')) {
      luaCode = luaCode.replace(/```\n?/g, '');
    }

    return luaCode.trim();
  } catch (error: any) {
    console.error('Gemini API Error:', error);

    // Provide helpful error messages
    if (error.message?.includes('API_KEY')) {
      throw new Error('Gemini API key not configured. Please set GEMINI_API_KEY environment variable.');
    }

    if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    }

    throw new Error(`Failed to generate game: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Get game-specific mechanics description for the prompt
 * 
 * @param gameType - Type of game
 * @returns Description of mechanics to implement
 */
function getGameTypeMechanics(gameType: string): string {
  const mechanics: Record<string, string> = {
    adventure:
      'Include combat system, enemy spawning, item collection, level progression, and boss battles',
    puzzle:
      'Implement puzzle mechanics, level difficulty progression, solving checks, and win/lose conditions',
    racing:
      'Create checkpoint system, lap counting, speed mechanics, collision detection, and leaderboard',
    survival:
      'Include resource management, crafting system, health/hunger mechanics, waves of enemies, and base building',
    shooter:
      'Implement shooting mechanics, ammunition system, enemy AI, scoring, and health system',
    tycoon:
      'Create business mechanics, currency system, upgrades, profit generation, and player progression',
    platformer:
      'Include jumping mechanics, platforming challenges, collectibles, and level completion',
    rpg: 'Create character stats, quest system, inventory, combat, and progression system',
  };

  return mechanics[gameType.toLowerCase()] || 'Include core gameplay mechanics appropriate for this game type';
}

/**
 * Generate a game name from description using Gemini
 * 
 * @param description - Game description
 * @returns Generated game name
 */
export async function generateGameName(description: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Based on this game description, generate a short, catchy, and memorable Roblox game name (2-4 words max). Return ONLY the game name, nothing else.\n\nDescription: ${description}`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 20,
        temperature: 0.8,
      },
    });

    const name = result.response.text().trim();
    
    // Clean up any extra characters
    return name.replace(/^["']|["']$/g, '').substring(0, 50);
  } catch (error) {
    console.error('Error generating game name:', error);
    // Fallback to extracting first few words from description
    return description.split(' ').slice(0, 3).join(' ').substring(0, 50);
  }
}

/**
 * Validate the Gemini API is working
 * 
 * @returns true if API is accessible
 */
export async function validateGeminiAPI(): Promise<boolean> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not set');
      return false;
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent('Say "OK"');
    const response = result.response.text();

    return response.length > 0;
  } catch (error) {
    console.error('Gemini API validation failed:', error);
    return false;
  }
}
