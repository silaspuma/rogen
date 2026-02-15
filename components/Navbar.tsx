import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from '@/components/LoginModal';

/**
 * Navbar Component - HACKER/TERMINAL THEME
 * Terminal-style navigation bar with neon accents
 * 
 * Features:
 * - Monospace font with neon green/cyan text
 * - Glowing border effects
 * - Terminal-style logo
 * - Auth state display
 */
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/', slug: '[home]' },
    { name: 'Generate', href: '/generate', slug: '[gen]' },
    { name: 'Dashboard', href: '/dashboard', slug: '[dash]' },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    router.push('/');
  };

  const handleLoginSuccess = () => {
    setIsLoginOpen(false);
    router.push('/generate');
  };

  return (
    <>
      {/* Terminal Header */}
      <nav className="fixed top-0 w-full z-50 bg-terminal-bg border-b-2 border-primary" style={{
        boxShadow: '0 0 10px rgba(0, 255, 0, 0.2)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Terminal Style */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="font-mono text-xl font-bold text-neon-green" style={{
                textShadow: '0 0 10px rgba(0, 255, 0, 0.6), 0 0 20px rgba(0, 255, 0, 0.3)',
              }}>
                ▓▒░ ROBOXGEN ░▒▓
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group"
                >
                  <span className={`font-mono text-sm font-semibold uppercase tracking-widest transition-all ${
                    router.pathname === link.href
                      ? 'text-neon-cyan'
                      : 'text-neon-green hover:text-neon-cyan'
                  }`} style={{
                    textShadow: router.pathname === link.href 
                      ? '0 0 8px rgba(0, 255, 255, 0.6)' 
                      : 'none'
                  }}>
                    {link.slug}
                  </span>
                  {router.pathname === link.href && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-cyan" style={{
                      boxShadow: '0 0 8px rgba(0, 255, 255, 0.8)'
                    }} />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {loading ? (
                <div className="font-mono text-neon-green text-sm animate-pulse">
                  [LOADING...]
                </div>
              ) : user ? (
                <>
                  <span className="font-mono text-neon-green text-xs">
                    {user.email}
                  </span>
                  <div className="flex gap-2">
                    <Link href="/dashboard">
                      <button className="btn btn-secondary">
                        [DASH]
                      </button>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="btn btn-primary"
                    >
                      [EXIT]
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="btn btn-secondary"
                  >
                    [LOGIN]
                  </button>
                  <Link href="/generate">
                    <button className="btn btn-primary">
                      [START]
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button - Terminal Style */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 font-mono text-neon-green hover:text-neon-cyan transition-colors"
              style={{
                textShadow: '0 0 5px rgba(0, 255, 0, 0.3)'
              }}
            >
              {isOpen ? '[✕]' : '[≡]'}
            </button>
          </div>

          {/* Mobile Menu - Terminal Style */}
          {isOpen && (
            <div className="md:hidden pb-6 space-y-3 border-t-2 border-primary pt-4" style={{
              backgroundColor: '#1a1a1a'
            }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={`block font-mono px-4 py-2 text-sm font-semibold uppercase tracking-widest transition-all ${
                    router.pathname === link.href
                      ? 'text-neon-cyan border-l-2 border-neon-cyan'
                      : 'text-neon-green hover:text-neon-cyan hover:border-l-2 hover:border-neon-cyan'
                  }`}>
                    {link.slug}
                  </span>
                </Link>
              ))}
              
              <div className="pt-3 space-y-2 border-t-2 border-primary">
                {loading ? (
                  <div className="font-mono text-neon-green text-xs px-4 py-2">
                    [LOADING...]
                  </div>
                ) : user ? (
                  <>
                    <div className="font-mono text-neon-green text-xs px-4">
                      $ USER: {user.email}
                    </div>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <button className="w-full btn btn-secondary text-xs">
                        [DASH]
                      </button>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full btn btn-primary text-xs"
                    >
                      [EXIT]
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsLoginOpen(true);
                        setIsOpen(false);
                      }}
                      className="flex-1 btn btn-secondary text-xs"
                    >
                      [LOGIN]
                    </button>
                    <Link href="/generate" className="flex-1" onClick={() => setIsOpen(false)}>
                      <button className="w-full btn btn-primary text-xs">
                        [START]
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;
