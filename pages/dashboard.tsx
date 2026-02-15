import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/router';
import { getUserGames, deleteGame } from '@/lib/supabase';
import LoginModal from '@/components/LoginModal';
import Link from 'next/link';

/**
 * pages/dashboard.tsx - HACKER/TERMINAL THEME
 * Terminal-style user dashboard for game management
 */

interface GeneratedGame {
  id: string;
  user_id: string;
  game_name: string;
  game_type: string;
  theme: string;
  prompt: string;
  download_url: string;
  lua_script: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [games, setGames] = useState<GeneratedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setIsLoginOpen(true);
      return;
    }

    loadGames();
  }, [user, authLoading]);

  const loadGames = async () => {
    try {
      setLoading(true);
      setError(null);
      if (user?.id) {
        const userGames = await getUserGames(user.id);
        setGames(userGames || []);
      }
    } catch (err) {
      console.error('Error loading games:', err);
      setError('$ error: failed_to_load_games');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (gameId: string) => {
    if (!confirm('[CONFIRM] Delete this game? [Y/N]')) return;

    try {
      setDeleting(gameId);
      setGames(games.filter((g) => g.id !== gameId));
    } catch (err) {
      console.error('Error deleting game:', err);
      setError('$ error: delete_failed');
    } finally {
      setDeleting(null);
    }
  };

  const handleDownload = (game: GeneratedGame) => {
    if (game.download_url) {
      if (game.download_url.startsWith('http')) {
        window.open(game.download_url, '_blank');
      } else {
        window.location.href = game.download_url;
      }
    }
  };

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
  };

  if (!authLoading && !user) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-terminal-bg font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-neon-cyan mb-4 uppercase" style={{
            textShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
          }}>
            ▓ DASHBOARD ▓
          </h1>
          <p className="text-neon-green mb-8 text-sm">
            $ authentication_required
          </p>
          <button
            onClick={() => setIsLoginOpen(true)}
            className="btn btn-primary text-lg py-3 px-8 font-mono font-bold uppercase"
          >
            $ LOGIN
          </button>
        </div>
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 bg-terminal-bg font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 border-b-2 border-primary pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-neon-cyan uppercase mb-2" style={{
                textShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
              }}>
                ▓ DASHBOARD ▓
              </h1>
              <p className="text-neon-green text-xs">
                {user?.email && `$ USER: ${user.email}`}
              </p>
            </div>
            <Link href="/generate">
              <button className="btn btn-primary font-bold uppercase text-sm">
                $ NEW_GAME
              </button>
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 border-2 border-accent bg-terminal-dark text-accent font-mono text-sm" style={{
            boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
          }}>
            <div className="font-bold mb-1">▓ [ERROR] ▓</div>
            {error}
          </div>
        )}

        {/* Games Container */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 border-2 border-primary bg-terminal-dark animate-pulse"
                style={{
                  boxShadow: '0 0 10px rgba(0, 255, 0, 0.1)',
                }}
              />
            ))}
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-20 border-2 border-primary bg-terminal-dark">
            <p className="text-2xl font-bold text-neon-cyan mb-4 uppercase">
              $ NO_GAMES_FOUND
            </p>
            <p className="text-neon-green text-sm mb-8">
              Create your first game to get started
            </p>
            <Link href="/generate">
              <button className="btn btn-primary text-lg py-3 px-8 font-mono font-bold uppercase">
                $ GENERATE_GAME
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Table-like display */}
            <div className="border-2 border-primary overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-terminal-border border-b-2 border-primary font-bold text-neon-cyan uppercase text-xs">
                <div>[GAME_NAME]</div>
                <div className="hidden md:block">[TYPE]</div>
                <div className="hidden md:block">[THEME]</div>
                <div className="hidden md:block">[DATE]</div>
                <div>[ACTION]</div>
              </div>

              {/* Data Rows */}
              {games.map((game) => {
                const createdDate = new Date(game.created_at);
                const formattedDate = createdDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <div
                    key={game.id}
                    className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-terminal-dark border-b border-terminal-border hover:bg-terminal-border transition-all items-center text-neon-green text-xs font-mono"
                  >
                    <div className="font-bold truncate text-neon-cyan">
                      {game.game_name}
                    </div>
                    <div className="hidden md:block uppercase">
                      [{game.game_type}]
                    </div>
                    <div className="hidden md:block uppercase">
                      [{game.theme}]
                    </div>
                    <div className="hidden md:block">
                      {formattedDate}
                    </div>
                    <div className="flex gap-2 justify-between md:justify-start">
                      <button
                        onClick={() => handleDownload(game)}
                        disabled={deleting === game.id}
                        className="btn btn-secondary text-xs font-bold px-3 py-2 disabled:opacity-50"
                      >
                        [DL]
                      </button>
                      <button
                        onClick={() => handleDelete(game.id)}
                        disabled={deleting === game.id}
                        className="btn bg-accent border-accent text-accent text-xs font-bold px-3 py-2 disabled:opacity-50"
                      >
                        {deleting === game.id ? '[...]' : '[RM]'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Terminal Stats */}
            <div className="border-2 border-primary bg-terminal-dark p-4 text-neon-green text-xs font-mono space-y-2">
              <div>$ total_games: {games.length}</div>
              <div>$ storage_used: {games.length * 2.5}MB / 1000MB</div>
              <div>$ last_generated: {games[0] ? new Date(games[0].created_at).toLocaleString() : 'N/A'}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
