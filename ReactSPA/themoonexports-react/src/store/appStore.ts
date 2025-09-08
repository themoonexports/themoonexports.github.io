import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppState {
  isLoading: boolean;
  error: string | null;
  language: string;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLanguage: (language: string) => void;
  clearError: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      isLoading: false,
      error: null,
      language: 'en',
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setLanguage: (language) => set({ language }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'app-store',
    }
  )
);
