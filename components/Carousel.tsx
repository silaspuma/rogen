import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Carousel Component - HACKER/TERMINAL THEME
 * Displays a carousel of example games
 */

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Mock data for example games
  const examples = [
    {
      id: 1,
      title: 'Dragon Quest Dungeon',
      description: 'Epic dungeon crawler with dragon boss battles',
      icon: '🐉',
      type: 'Adventure',
      rating: 4.9,
      plays: '12.5K',
    },
    {
      id: 2,
      title: 'Puzzle Master 3D',
      description: 'Mind-bending 3D puzzle game with 100 levels',
      icon: '🧩',
      type: 'Puzzle',
      rating: 4.8,
      plays: '8.3K',
    },
    {
      id: 3,
      title: 'Neon Racing League',
      description: 'Fast-paced futuristic racing game',
      icon: '🏎️',
      type: 'Racing',
      rating: 4.7,
      plays: '15.2K',
    },
    {
      id: 4,
      title: 'Survival Island',
      description: 'Survive on a mysterious island with friends',
      icon: '🏝️',
      type: 'Survival',
      rating: 4.6,
      plays: '9.8K',
    },
    {
      id: 5,
      title: 'Tycoon Empire',
      description: 'Build a business empire and compete online',
      icon: '💰',
      type: 'Tycoon',
      rating: 4.9,
      plays: '20.1K',
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % examples.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, examples.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);
    setAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % examples.length);
    setAutoPlay(false);
  };

  const visibleItems = [
    examples[currentIndex],
    examples[(currentIndex + 1) % examples.length],
    examples[(currentIndex + 2) % examples.length],
  ];

  return (
    <section id="examples" className="relative py-20 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 uppercase text-neon-green" style={{
            textShadow: '0 0 20px rgba(0, 255, 0, 0.6)',
          }}>
            AI-Generated Game <span style={{ color: '#00ffff', textShadow: '0 0 20px rgba(0, 255, 255, 0.6)' }}>Examples</span>
          </h2>
          <p className="text-base text-neon-green opacity-80 max-w-2xl mx-auto">
            $ display_examples && showcase_ai_generated_games
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visibleItems.map((item, idx) => (
              <div
                key={item.id}
                className="terminal-box border-2 border-neon-green p-6 transform transition-all duration-500 hover:translate-y-[-8px] hover:border-neon-cyan"
                style={{
                  boxShadow: '0 0 15px rgba(0, 255, 0, 0.3)',
                }}
              >
                {/* Image Area */}
                <div className="w-full h-40 rounded-lg border-2 border-neon-magenta bg-terminal-dark flex items-center justify-center text-6xl mb-4" style={{
                  boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
                }}>
                  {item.icon}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-neon-cyan uppercase">{item.title}</h3>
                    <p className="text-xs text-neon-green opacity-70 mt-1">{item.description}</p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-3 border-t-2 border-neon-green">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-terminal-dark border-2 border-neon-cyan text-neon-cyan">
                      [{item.type}]
                    </span>
                    <div className="flex items-center gap-2 text-xs text-neon-magenta">
                      <span>⭐ {item.rating}</span>
                      <span>•</span>
                      <span>▶️ {item.plays}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full py-2 border-2 border-neon-green text-neon-green font-bold text-xs uppercase transition-all hover:border-neon-cyan hover:text-neon-cyan bg-terminal-bg" style={{
                    boxShadow: '0 0 8px rgba(0, 255, 0, 0.3)',
                  }}>
                    [VIEW_DETAILS]
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={goToPrevious}
              className="p-3 border-2 border-neon-green text-neon-green bg-terminal-bg hover:border-neon-cyan hover:text-neon-cyan transition-all transform hover:scale-110"
              aria-label="Previous"
              style={{
                boxShadow: '0 0 8px rgba(0, 255, 0, 0.3)',
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {examples.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setAutoPlay(false);
                  }}
                  className={`transition-all border-2 ${
                    idx === currentIndex
                      ? 'border-neon-magenta text-neon-magenta w-8 h-3'
                      : 'border-neon-green text-neon-green w-3 h-3 hover:border-neon-cyan'
                  }`}
                  aria-label={`Go to slide ${idx}`}
                  style={{
                    boxShadow: idx === currentIndex ? '0 0 8px rgba(255, 0, 255, 0.4)' : 'none',
                  }}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-3 border-2 border-neon-green text-neon-green bg-terminal-bg hover:border-neon-cyan hover:text-neon-cyan transition-all transform hover:scale-110"
              aria-label="Next"
              style={{
                boxShadow: '0 0 8px rgba(0, 255, 0, 0.3)',
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom instruction */}
          <p className="text-center text-xs text-neon-green opacity-50 mt-6 font-mono">
            $ auto_playing • click_controls_to_explore
          </p>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
