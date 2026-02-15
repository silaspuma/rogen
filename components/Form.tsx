import React, { useState } from 'react';
import axios from 'axios';
import { useGameStore } from '@/lib/store';

/**
 * components/Form.tsx - HACKER/TERMINAL THEME
 * Terminal-style game generation form
 * 
 * This component:
 * 1. Collects game description, type, and theme from user
 * 2. Calls /api/ai-generate to get Lua script from Gemini
 * 3. Calls /api/upload-game to upload ZIP to Supabase
 * 4. Stores game metadata in Supabase database
 */

interface FormProps {
  onSuccess?: () => void;
  userId?: string;
}

const Form: React.FC<FormProps> = ({ onSuccess, userId }) => {
  const [description, setDescription] = useState('');
  const [gameType, setGameType] = useState('adventure');
  const [theme, setTheme] = useState('fantasy');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { addGame, setCurrentGame } = useGameStore();

  const gameTypes = [
    { value: 'adventure', label: 'ADVENTURE' },
    { value: 'puzzle', label: 'PUZZLE' },
    { value: 'racing', label: 'RACING' },
    { value: 'survival', label: 'SURVIVAL' },
    { value: 'shooter', label: 'SHOOTER' },
    { value: 'tycoon', label: 'TYCOON' },
  ];

  const themes = [
    { value: 'fantasy', label: 'FANTASY' },
    { value: 'sci-fi', label: 'SCI-FI' },
    { value: 'modern', label: 'MODERN' },
    { value: 'medieval', label: 'MEDIEVAL' },
    { value: 'cyberpunk', label: 'CYBERPUNK' },
    { value: 'retro', label: 'RETRO' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!description.trim()) {
      setError('$ error: description_required');
      return;
    }

    if (description.trim().length < 10) {
      setError('$ error: min_10_characters');
      return;
    }

    setIsLoading(true);

    try {
      // ============ STEP 1: Call AI API to generate Lua script ============
      console.log('[Form] Generating game with Gemini AI...');
      const aiResponse = await axios.post('/api/ai-generate', {
        description: description.trim(),
        gameType,
        theme,
      });

      const { game: generatedGame } = aiResponse.data;

      // ============ STEP 2: Upload to Supabase (if authenticated) ============
      let downloadUrl = '';
      let gameId = generatedGame.id;

      if (userId) {
        console.log('[Form] Uploading game to Supabase...');
        const uploadResponse = await axios.post('/api/upload-game', {
          gameName: generatedGame.gameName,
          description,
          gameType,
          theme,
          luaScript: generatedGame.luaScript,
        });

        if (uploadResponse.data.success) {
          downloadUrl = uploadResponse.data.downloadUrl || '';
          gameId = uploadResponse.data.gameId || gameId;
        }
      }

      // ============ STEP 3: Store in local state ============
      const game = {
        id: gameId,
        name: generatedGame.gameName,
        description,
        type: gameType,
        theme,
        createdAt: new Date(),
        luaScript: generatedGame.luaScript,
        downloadUrl: downloadUrl || `/api/download/${gameId}`,
        views: 0,
        shared: false,
      };

      // Add to store
      addGame(game);
      setCurrentGame(game);

      // Success state
      setSuccess(true);
      setDescription('');

      // Trigger callback
      onSuccess?.();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('[Form] Error:', err);
      let errorMessage = '$ generation_failed';

      if (err.response?.data?.error) {
        errorMessage = '$ error: ' + err.response.data.error;
        if (err.response.data.details) {
          errorMessage += ' (' + err.response.data.details + ')';
        }
      } else if (err.message) {
        errorMessage = '$ error: ' + err.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full font-mono">
      <div className="space-y-8">
        {/* Terminal Title */}
        <div className="text-neon-green text-sm border-b-2 border-primary pb-3" style={{
          textShadow: '0 0 5px rgba(0, 255, 0, 0.3)'
        }}>
          $ <span className="text-neon-cyan">generate_game</span> --interactive
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-neon-green text-xs font-bold uppercase">
            $ describe_your_game:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A dungeon crawler where players fight monsters, collect loot, and level up. Include boss battles..."
            className="input w-full min-h-28 resize-none font-mono"
            disabled={isLoading}
            style={{
              backgroundColor: '#0d0d0d',
              borderColor: '#00ff00',
              color: '#00ff00',
            }}
          />
          <div className="text-neon-green text-xs opacity-60 font-mono">
            $ char_count: {description.length}/500
          </div>
        </div>

        {/* Game Type Selector */}
        <div className="space-y-2">
          <div className="text-neon-green text-xs font-bold uppercase">
            $ select_game_type:
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {gameTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setGameType(type.value)}
                disabled={isLoading}
                className={`p-3 font-mono text-xs font-bold uppercase border-2 transition-all ${
                  gameType === type.value
                    ? 'border-primary bg-terminal-dark text-neon-cyan'
                    : 'border-terminal-border bg-terminal-dark text-neon-green hover:border-primary'
                }`}
                style={gameType === type.value ? {
                  boxShadow: '0 0 10px rgba(0, 255, 0, 0.4), inset 0 0 8px rgba(0, 255, 0, 0.1)'
                } : {}}
              >
                [{type.label}]
              </button>
            ))}
          </div>
        </div>

        {/* Theme Selector */}
        <div className="space-y-2">
          <div className="text-neon-green text-xs font-bold uppercase">
            $ select_visual_theme:
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {themes.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTheme(t.value)}
                disabled={isLoading}
                className={`p-3 font-mono text-xs font-bold uppercase border-2 transition-all ${
                  theme === t.value
                    ? 'border-secondary bg-terminal-dark text-neon-cyan'
                    : 'border-terminal-border bg-terminal-dark text-neon-green hover:border-secondary'
                }`}
                style={theme === t.value ? {
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.4), inset 0 0 8px rgba(0, 255, 255, 0.1)'
                } : {}}
              >
                [{t.label}]
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 border-2 border-accent bg-terminal-dark font-mono text-accent text-xs" style={{
            boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
          }}>
            <div className="font-bold mb-1">▓ [ERROR] ▓</div>
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-4 border-2 border-primary bg-terminal-dark font-mono text-neon-green text-xs animate-fade-in" style={{
            boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
          }}>
            <div className="font-bold mb-1">▓ [SUCCESS] ▓</div>
            $ game_generated_successfully {userId && '• saved_to_account'}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !description.trim()}
          className="w-full btn btn-primary font-mono font-bold text-sm uppercase py-4 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <span className="animate-pulse">▓</span>
              $ initializing_gemini_api...
              <span className="animate-pulse">▓</span>
            </span>
          ) : (
            '$ GENERATE_GAME.exe'
          )}
        </button>

        {/* Terminal Footer */}
        <div className="text-neon-green text-xs font-mono opacity-60 border-t-2 border-primary pt-4 space-y-1">
          <div>$ gemini_api: {userId ? '[ACTIVE]' : '[INACTIVE]'}</div>
          <div>$ auth_status: {userId ? '[AUTHENTICATED]' : '[GUEST]'}</div>
          <div>$ mode: {userId ? 'save_to_database' : 'local_only'}</div>
        </div>
      </div>
    </form>
  );
};

export default Form;

