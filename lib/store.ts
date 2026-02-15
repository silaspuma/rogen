// Store for managing game generation state
import { create } from 'zustand';

export interface GeneratedGame {
  id: string;
  name: string;
  description: string;
  type: string;
  theme: string;
  createdAt: Date;
  luaScript: string;
  downloadUrl?: string;
  views?: number;
  shared?: boolean;
}

interface GameStore {
  games: GeneratedGame[];
  currentGame: GeneratedGame | null;
  isLoading: boolean;
  error: string | null;
  
  addGame: (game: GeneratedGame) => void;
  setCurrentGame: (game: GeneratedGame | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  removeGame: (id: string) => void;
  clearError: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  games: [],
  currentGame: null,
  isLoading: false,
  error: null,

  addGame: (game) =>
    set((state) => ({
      games: [game, ...state.games],
    })),

  setCurrentGame: (game) =>
    set({
      currentGame: game,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  setError: (error) =>
    set({
      error,
    }),

  removeGame: (id) =>
    set((state) => ({
      games: state.games.filter((game) => game.id !== id),
    })),

  clearError: () =>
    set({
      error: null,
    }),
}));
