import React from 'react';

/**
 * Share Modal Component - HACKER/TERMINAL THEME
 * Allows users to share generated games on social media
 */
interface ShareModalProps {
  isOpen: boolean;
  gameName: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, gameName, onClose }) => {
  if (!isOpen) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `I just created "${gameName}" using RoboxGen AI! 🎮 Create your own game in seconds: ${shareUrl}`;

  const shareLinks = [
    {
      name: 'TikTok',
      icon: 'TK',
      url: `https://www.tiktok.com/create?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Twitter',
      icon: 'X',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Discord',
      icon: 'DC',
      url: `https://discord.com/`,
    },
    {
      name: 'Copy Link',
      icon: 'LK',
      url: null,
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-mono"
      onClick={onClose}
    >
      <div
        className="terminal-box border-2 border-neon-green max-w-md w-full p-8 space-y-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.4)',
        }}
      >
        <div>
          <h2 className="text-base font-bold text-neon-green uppercase">$ [SHARE_GAME]</h2>
          <p className="text-neon-green text-xs mt-2 opacity-70">
            $ game_name: "{gameName}"
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url || '#'}
              onClick={(e) => {
                if (!link.url) {
                  e.preventDefault();
                  navigator.clipboard.writeText(shareUrl);
                }
              }}
              className="p-4 bg-terminal-bg border-2 border-neon-cyan text-center transition-all hover:border-neon-magenta hover:text-neon-magenta text-neon-cyan"
              style={{
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
              }}
            >
              <div className="text-base font-bold mb-2 uppercase">[{link.icon}]</div>
              <div className="text-xs font-bold uppercase">{link.name}</div>
            </a>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 border-2 border-neon-magenta text-neon-magenta font-bold uppercase text-xs transition-all bg-terminal-bg hover:border-neon-green hover:text-neon-green"
          style={{
            boxShadow: '0 0 8px rgba(255, 0, 255, 0.4)',
          }}
        >
          [CLOSE]
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
