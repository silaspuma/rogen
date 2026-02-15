import React from 'react';
import Link from 'next/link';

/**
 * Hero Component - HACKER/TERMINAL THEME
 * Main landing page hero section with CTA
 */
const Hero: React.FC = () => {
  const stats = [
    { value: '50K+', label: 'Games Generated' },
    { value: '10K+', label: 'Active Users' },
    { value: '99%', label: 'Success Rate' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 font-mono">
      {/* Animated background elements - subtle neon glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-green/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-6 px-4 py-2 border-2 border-neon-cyan bg-terminal-bg text-neon-cyan text-xs font-bold" style={{
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)',
            }}>
              [$ POWERED_BY_AI]
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 text-neon-green uppercase tracking-wider" style={{
              textShadow: '0 0 20px rgba(0, 255, 0, 0.6)',
            }}>
              Make Any{' '}
              <span style={{ color: '#00ffff', textShadow: '0 0 20px rgba(0, 255, 255, 0.6)' }}>Roblox Game</span> in Seconds
            </h1>

            <p className="text-base text-neon-green opacity-80 mb-8 leading-relaxed max-w-2xl">
              $ describe_your_game_idea && ai_generates_complete_lua_code<br />
              Download, import into Roblox Studio, and play instantly.<br />
              No coding knowledge required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link href="/generate">
                <button className="btn btn-primary w-full sm:w-auto">
                  $ GENERATE_MY_GAME
                </button>
              </Link>
              <a href="#examples">
                <button className="btn btn-secondary w-full sm:w-auto">
                  $ SEE_EXAMPLES
                </button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t-2 border-neon-green">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-neon-magenta uppercase" style={{
                    textShadow: '0 0 10px rgba(255, 0, 255, 0.6)',
                  }}>{stat.value}</p>
                  <p className="text-xs text-neon-green opacity-60 mt-1 font-mono uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Showcase */}
          <div className="hidden lg:grid gap-4 relative">
            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="terminal-box border-2 border-neon-green p-6 transform hover:translate-y-[-4px] transition-transform" style={{
                boxShadow: '0 0 15px rgba(0, 255, 0, 0.3)',
              }}>
                <div className="text-lg font-bold text-neon-magenta mb-3">[THEMES]</div>
                <h3 className="font-semibold text-neon-cyan mb-2 uppercase">$ Custom Themes</h3>
                <p className="text-xs text-neon-green opacity-70">
                  Select from dozens of visual themes
                </p>
              </div>
              <div className="terminal-box border-2 border-neon-cyan p-6 transform hover:translate-y-[-4px] transition-transform" style={{
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
              }}>
                <div className="text-lg font-bold text-neon-magenta mb-3">[DEPLOY]</div>
                <h3 className="font-semibold text-neon-cyan mb-2 uppercase">$ Instant Lua</h3>
                <p className="text-xs text-neon-green opacity-70">
                  Get ready-to-use scripts immediately
                </p>
              </div>
              <div className="terminal-box border-2 border-neon-magenta p-6 transform hover:translate-y-[-4px] transition-transform" style={{
                boxShadow: '0 0 15px rgba(255, 0, 255, 0.3)',
              }}>
                <div className="text-lg font-bold text-neon-green mb-3">[CONFIG]</div>
                <h3 className="font-semibold text-neon-cyan mb-2 uppercase">$ Fully Custom</h3>
                <p className="text-xs text-neon-green opacity-70">
                  Modify and tweak code to your needs
                </p>
              </div>
              <div className="terminal-box border-2 border-neon-green p-6 transform hover:translate-y-[-4px] transition-transform" style={{
                boxShadow: '0 0 15px rgba(0, 255, 0, 0.3)',
              }}>
                <div className="text-lg font-bold text-neon-magenta mb-3">[MOBILE]</div>
                <h3 className="font-semibold text-neon-cyan mb-2 uppercase">$ All Devices</h3>
                <p className="text-xs text-neon-green opacity-70">
                  Works on all devices and platforms
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom badge */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 border-2 border-neon-green bg-terminal-bg hover:border-neon-cyan transition-all cursor-pointer font-mono text-xs" style={{
            boxShadow: '0 0 8px rgba(0, 255, 0, 0.3)',
          }}>
            <span className="inline-block w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>
            <span className="text-neon-green">
              $ free_tier_available • premium_unlocks_unlimited_generations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
