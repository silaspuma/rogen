import React from 'react';
import Link from 'next/link';

/**
 * Footer Component - HACKER/TERMINAL THEME
 * Terminal-style footer with links and branding
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-primary bg-terminal-dark font-mono" style={{
      boxShadow: '0 -10px 20px rgba(0, 255, 0, 0.05)',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-neon-green" style={{
                textShadow: '0 0 10px rgba(0, 255, 0, 0.6)',
              }}>
                ▓▒░ ROBOXGEN ░▒▓
              </span>
            </div>
            <p className="text-xs text-neon-green opacity-60">
              $ create_roblox_games_with_ai
              <br />
              $ describe_idea && get_game_files
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-neon-cyan uppercase text-xs mb-4">$ [PRODUCT]</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/generate" className="text-xs text-neon-green hover:text-neon-cyan transition-colors hover:glow-green font-mono">
                  &gt; GENERATOR
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-xs text-neon-green hover:text-neon-cyan transition-colors">
                  &gt; PRICING
                </Link>
              </li>
              <li>
                <Link href="/#examples" className="text-xs text-neon-green hover:text-neon-cyan transition-colors">
                  &gt; EXAMPLES
                </Link>
              </li>
              <li>
                <a href="#" className="text-xs text-neon-green hover:text-neon-cyan transition-colors">
                  &gt; DOCS
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-neon-cyan uppercase text-xs mb-4">$ [RESOURCES]</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs text-neon-green hover:text-neon-cyan transition-colors">
                  &gt; BLOG
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-neon-green hover:text-neon-cyan transition-colors">
                  &gt; COMMUNITY
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-neon-green hover:text-neon-cyan transition-colors">
                  &gt; SUPPORT
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-neon-green hover:text-neon-cyan transition-colors">
                  &gt; STATUS
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-neon-cyan uppercase text-xs mb-4">$ [LEGAL]</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-xs text-neon-green hover:text-neon-cyan transition-colors">
                  &gt; PRIVACY
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-neon-green hover:text-neon-cyan transition-colors">
                  &gt; TERMS
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-neon-green hover:text-neon-cyan transition-colors">
                  &gt; COOKIES
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-primary pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-neon-green opacity-60 text-center md:text-left font-mono">
              $ © {currentYear} ROBOXGEN $ built_with_passion_for_creators
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 border-2 border-primary bg-terminal-bg hover:text-neon-cyan hover:border-secondary flex items-center justify-center transition-colors text-neon-green font-bold text-xs"
                title="Twitter"
                style={{
                  animation: 'none'
                }}
              >
                X
              </a>
              <a
                href="#"
                className="w-10 h-10 border-2 border-primary bg-terminal-bg hover:text-neon-cyan hover:border-secondary flex items-center justify-center transition-colors text-neon-green font-bold text-xs"
                title="Discord"
              >
                DC
              </a>
              <a
                href="#"
                className="w-10 h-10 border-2 border-primary bg-terminal-bg hover:text-neon-cyan hover:border-secondary flex items-center justify-center transition-colors text-neon-green font-bold text-xs"
                title="TikTok"
              >
                TK
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
