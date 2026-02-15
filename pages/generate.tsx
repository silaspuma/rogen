import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Form from '@/components/Form';
import GameCard from '@/components/GameCard';
import LoginModal from '@/components/LoginModal';
import { useGameStore, GeneratedGame } from '@/lib/store';
import LoadingState, { GameResultSkeleton } from '@/components/LoadingState';
import ShareModal from '@/components/ShareModal';
import { useAuth } from '@/components/AuthProvider';
import { getUserGames } from '@/lib/supabase';
import axios from 'axios';

/**
 * pages/generate.tsx - HACKER/TERMINAL THEME
 * Terminal-style game generation page
 */

export default function GeneratePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { games, currentGame, setCurrentGame } = useGameStore();
  const [shareOpen, setShareOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [userGames, setUserGames] = useState<GeneratedGame[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserGames();
    }
  }, [user]);

  const loadUserGames = async () => {
    if (!user) return;

    setLoadingGames(true);
    try {
      const games = await getUserGames(user.id);
      setUserGames(games);
    } catch (error) {
      console.error('Failed to load games:', error);
    } finally {
      setLoadingGames(false);
    }
  };

  const instructions = [
    {
      step: 1,
      title: 'DOWNLOAD',
      description: 'Extract your generated game files from the ZIP',
    },
    {
      step: 2,
      title: 'EXTRACT',
      description: 'Unpack and locate the main Lua script file',
    },
    {
      step: 3,
      title: 'ROBLOX_STUDIO',
      description: 'Open Roblox Studio with a new Place',
    },
    {
      step: 4,
      title: 'IMPORT',
      description: 'Paste the Lua script into a ServerScript',
    },
    {
      step: 5,
      title: 'TEST',
      description: 'Run and test your game in Studio',
    },
    {
      step: 6,
      title: 'PUBLISH',
      description: 'Publish to Roblox and share with the world',
    },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-terminal-bg flex items-center justify-center font-mono">
        <div className="text-center">
          <div className="text-neon-green text-2xl mb-4 animate-pulse">
            ▓▒░ INITIALIZING ░▒▓
          </div>
          <p className="text-neon-cyan">$ wait 1 second...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Generate - RoboxGen</title>
        <meta name="description" content="Generate your Roblox game with AI" />
      </Head>

      <div className="min-h-screen bg-terminal-bg font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-16 border-b-2 border-primary pb-8">
            <h1 className="text-5xl font-bold text-neon-cyan mb-4 uppercase" style={{
              textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
            }}>
              ▓ GAME_GENERATOR ▓
            </h1>
            <p className="text-neon-green max-w-2xl mx-auto text-sm font-mono">
              $ {user
                ? 'describe_your_idea && roblox_ai_will_generate_lua_code'
                : 'authenticate_account_to_continue'}
            </p>
          </div>

          {!user ? (
            // Not logged in - show login prompt
            <div className="max-w-2xl mx-auto mb-12">
              <div className="terminal-box p-12 text-center space-y-6 border-2 border-primary" style={{
                boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)',
              }}>
                <div className="text-4xl text-neon-cyan mb-4">
                  ▓ [AUTHENTICATION_REQUIRED] ▓
                </div>
                <h2 className="text-2xl font-bold text-neon-cyan uppercase">$ Authentication Required</h2>
                <p className="text-neon-green text-sm">
                  $ create_account_or_login_to_generate_and_save_games
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="btn btn-primary font-bold uppercase"
                  >
                    $ LOGIN / REGISTER
                  </button>
                </div>

                <p className="text-xs text-neon-green opacity-60">
                  $ unlimited_generations • secure_cloud_storage • free_tier
                </p>
              </div>
            </div>
          ) : (
            // Logged in - show generation interface
            <>
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Form Section */}
                <div className="space-y-6">
                  <div className="terminal-box p-8 border-2 border-primary" style={{
                    boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)',
                  }}>
                    <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-primary">
                      <h2 className="text-2xl font-bold text-neon-cyan uppercase">
                        $ NEW_GAME
                      </h2>
                      <span className="text-xs px-3 py-1 border-2 border-primary text-neon-cyan font-mono"  style={{
                        boxShadow: '0 0 5px rgba(0, 255, 0, 0.2)',
                      }}>
                        [LOGGED_IN]
                      </span>
                    </div>
                    <Form
                      onSuccess={() => {
                        loadUserGames();
                        setTimeout(() => {
                          document
                            .getElementById('results')
                            ?.scrollIntoView({ behavior: 'smooth' });
                        }, 200);
                      }}
                      userId={user.id}
                    />
                  </div>
                </div>

                {/* Instructions Section */}
                <div className="space-y-6">
                  <div className="terminal-box p-8 h-full border-2 border-secondary" style={{
                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)',
                  }}>
                    <h2 className="text-2xl font-bold text-neon-cyan uppercase mb-6 pb-4 border-b-2 border-secondary">
                      $ WORKFLOW
                    </h2>
                    <div className="space-y-4">
                      {instructions.map((item) => (
                        <div key={item.step} className="flex gap-4 p-3 border-l-2 border-primary">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-8 w-8 border-2 border-primary bg-terminal-dark text-neon-green font-bold text-xs" style={{
                              boxShadow: '0 0 5px rgba(0, 255, 0, 0.3)',
                            }}>
                              {item.step}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-neon-cyan text-xs uppercase">{item.title}</h3>
                            <p className="text-neon-green text-xs mt-1 opacity-70">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t-2 border-secondary">
                      <p className="text-xs text-neon-cyan font-bold mb-2">$ PROTIP:</p>
                      <p className="text-xs text-neon-green opacity-70">
                        be_specific_with_mechanics_and_features_for_better_results
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              {currentGame && (
                <div id="results" className="mt-20 scroll-mt-20">
                  <div className="mb-8 border-b-2 border-primary pb-6">
                    <h2 className="text-3xl font-bold text-neon-cyan uppercase" style={{
                      textShadow: '0 0 10px rgba(0, 255, 255, 0.4)'
                    }}>
                      ▓ GENERATED_GAME ▓
                    </h2>
                    <p className="text-neon-green text-sm mt-2">
                      $ your_game_is_ready_to_download
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <GameCard game={currentGame} />
                    </div>

                    <div className="terminal-box p-8 space-y-6 border-2 border-primary" style={{
                      boxShadow: '0 0 15px rgba(0, 255, 0, 0.2)',
                    }}>
                      <h3 className="text-2xl font-bold text-neon-cyan uppercase border-b-2 border-primary pb-4">
                        $ NEXT_STEPS
                      </h3>

                      <div className="space-y-4">
                        <p className="text-neon-green text-xs">
                          $ your_game_code_ready
                        </p>

                        <ol className="space-y-3 text-xs text-neon-green font-mono">
                          <li className="flex gap-3 p-2 border-l-2 border-primary">
                            <span className="text-neon-cyan font-bold">[1]</span>
                            <span>click_download_zip_to_get_game_files</span>
                          </li>
                          <li className="flex gap-3 p-2 border-l-2 border-primary">
                            <span className="text-neon-cyan font-bold">[2]</span>
                            <span>extract_and_find_lua_script</span>
                          </li>
                          <li className="flex gap-3 p-2 border-l-2 border-primary">
                            <span className="text-neon-cyan font-bold">[3]</span>
                            <span>open_roblox_studio</span>
                          </li>
                          <li className="flex gap-3 p-2 border-l-2 border-primary">
                            <span className="text-neon-cyan font-bold">[4]</span>
                            <span>paste_code_into_serverscript</span>
                          </li>
                          <li className="flex gap-3 p-2 border-l-2 border-primary">
                            <span className="text-neon-cyan font-bold">[5]</span>
                            <span>test_and_customize_as_needed</span>
                          </li>
                          <li className="flex gap-3 p-2 border-l-2 border-primary">
                            <span className="text-neon-cyan font-bold">[6]</span>
                            <span>publish_to_roblox</span>
                          </li>
                        </ol>
                      </div>

                      <button
                        onClick={() => setShareOpen(true)}
                        className="w-full btn btn-secondary font-bold uppercase text-sm mt-6"
                      >
                        $ SHARE_ON_SOCIAL
                      </button>

                      <div className="p-4 border-2 border-primary bg-terminal-dark text-neon-green text-xs" style={{
                        boxShadow: '0 0 5px rgba(0, 255, 0, 0.1)',
                      }}>
                        $ need_help? visit_docs_or_join_discord
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Previous Games */}
              {userGames.length > 0 && (
                <div className="mt-20 border-t-2 border-primary pt-12">
                  <h2 className="text-3xl font-bold text-neon-cyan uppercase mb-8" style={{
                    textShadow: '0 0 10px rgba(0, 255, 255, 0.4)'
                  }}>
                    ▓ YOUR_GAMES ▓
                  </h2>
                  {loadingGames ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(3)].map((_, i) => (
                        <GameResultSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userGames.map((game) => (
                        <GameCard
                          key={game.id}
                          game={game}
                          onDelete={() => loadUserGames()}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={() => {
          setLoginOpen(false);
          router.push('/generate');
        }}
      />

      {/* Share Modal */}
      {currentGame && (
        <ShareModal
          isOpen={shareOpen}
          gameName={currentGame.name}
          onClose={() => setShareOpen(false)}
        />
      )}
    </>
  );
}

