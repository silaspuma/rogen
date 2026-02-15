import React from 'react';
import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/components/AuthProvider';
import '@/styles/globals.css';

/**
 * _app.tsx - Next.js App Wrapper
 * HACKER/TERMINAL THEME
 * 
 * Wraps the entire app with:
 * - AuthProvider: Manages user authentication state via Supabase
 * - Navbar/Footer: Global layout components
 */
function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-terminal-bg font-mono">
        <Navbar />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
