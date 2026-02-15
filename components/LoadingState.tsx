import React from 'react';

/**
 * Loading State Component - HACKER/TERMINAL THEME
 * Shows skeleton loaders and animations while content is loading
 */
const LoadingState: React.FC = () => {
  return (
    <div className="space-y-6 font-mono">
      {/* Header skeleton */}
      <div className="h-10 bg-neon-green/20 border-2 border-neon-green/40 w-3/4 animate-pulse" style={{
        boxShadow: '0 0 8px rgba(0, 255, 0, 0.2)',
      }}></div>

      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-neon-green/20 border-2 border-neon-green/40 w-full animate-pulse" style={{
          boxShadow: '0 0 8px rgba(0, 255, 0, 0.2)',
        }}></div>
        <div className="h-6 bg-neon-cyan/20 border-2 border-neon-cyan/40 w-full animate-pulse" style={{
          boxShadow: '0 0 8px rgba(0, 255, 255, 0.2)',
        }}></div>
        <div className="h-6 bg-neon-magenta/20 border-2 border-neon-magenta/40 w-2/3 animate-pulse" style={{
          boxShadow: '0 0 8px rgba(255, 0, 255, 0.2)',
        }}></div>
      </div>

      {/* Button skeleton */}
      <div className="h-12 bg-neon-green/20 border-2 border-neon-green/40 w-full animate-pulse" style={{
        boxShadow: '0 0 8px rgba(0, 255, 0, 0.2)',
      }}></div>
    </div>
  );
};

/**
 * Game Result Skeleton - HACKER/TERMINAL THEME
 */
export const GameResultSkeleton: React.FC = () => {
  return (
    <div className="terminal-box border-2 border-neon-green p-6 space-y-4 font-mono" style={{
      boxShadow: '0 0 15px rgba(0, 255, 0, 0.3)',
    }}>
      <div className="h-6 bg-neon-green/20 border-2 border-neon-green/40 w-1/2 animate-pulse" style={{
        boxShadow: '0 0 8px rgba(0, 255, 0, 0.2)',
      }}></div>
      <div className="h-24 bg-neon-cyan/20 border-2 border-neon-cyan/40 w-full animate-pulse" style={{
        boxShadow: '0 0 8px rgba(0, 255, 255, 0.2)',
      }}></div>
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-neon-magenta/20 border-2 border-neon-magenta/40 animate-pulse" style={{
          boxShadow: '0 0 8px rgba(255, 0, 255, 0.2)',
        }}></div>
        <div className="flex-1 h-10 bg-neon-green/20 border-2 border-neon-green/40 animate-pulse" style={{
          boxShadow: '0 0 8px rgba(0, 255, 0, 0.2)',
        }}></div>
      </div>
    </div>
  );
};

export default LoadingState;
