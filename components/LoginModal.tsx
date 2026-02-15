import React, { useState } from 'react';
import { signIn, signUp } from '@/lib/supabase';

/**
 * components/LoginModal.tsx - HACKER/TERMINAL THEME
 * Terminal-style authentication modal
 */

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      if (!email || !password) {
        setError('$ missing email or password');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('$ password must be 6+ chars');
        setLoading(false);
        return;
      }

      if (isSignUp) {
        await signUp(email, password);
        setSuccess(true);
      } else {
        await signIn(email, password);
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || '$ auth_failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 font-mono"
      onClick={onClose}
      style={{
        backdropFilter: 'blur(2px)',
      }}
    >
      <div
        className="terminal-box max-w-md w-full p-8 space-y-6 animate-slide-up border-2 border-primary"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#0d0d0d',
          boxShadow: '0 0 30px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.05)',
        }}
      >
        {/* Terminal Header */}
        <div className="border-b-2 border-primary pb-4">
          <div className="text-neon-green text-sm font-bold">
            $ {isSignUp ? 'REGISTER_USER' : 'LOGIN_USER'}
          </div>
          <h2 className="text-2xl font-bold text-neon-cyan mt-2" style={{
            textShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
          }}>
            {isSignUp ? '▓ CREATE_ACCOUNT ▓' : '▓ AUTHENTICATE ▓'}
          </h2>
          <p className="text-neon-green text-xs mt-3 opacity-70">
            {isSignUp
              ? '[*] Complete registration to generate_games'
              : '[*] Enter_credentials to proceed'}
          </p>
        </div>

        {/* Status Messages */}
        {success && (
          <div className="p-4 border-2 border-primary bg-terminal-dark text-neon-green text-sm font-mono" style={{
            boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
          }}>
            <div className="text-neon-cyan">[SUCCESS]</div>
            $ {isSignUp ? 'account_created_check_email' : 'login_successful'}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 border-2 border-accent bg-terminal-dark text-accent text-sm font-mono" style={{
            boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
          }}>
            <div className="text-accent">[ERROR]</div>
            {error}
          </div>
        )}

        {/* Form */}
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-neon-green text-xs font-bold mb-2 uppercase">
                email_address:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@domain.com"
                className="input w-full font-mono"
                disabled={loading}
                style={{
                  backgroundColor: '#0d0d0d',
                  borderColor: '#00ff00',
                  color: '#00ff00',
                }}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-neon-green text-xs font-bold mb-2 uppercase">
                password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input w-full font-mono"
                disabled={loading}
                style={{
                  backgroundColor: '#0d0d0d',
                  borderColor: '#00ff00',
                  color: '#00ff00',
                }}
              />
              <div className="text-neon-green text-xs mt-1 opacity-50">
                [min_length: 6_chars]
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary font-mono font-bold text-sm disabled:opacity-50"
            >
              {loading
                ? isSignUp
                  ? '$ CREATING_ACCOUNT...'
                  : '$ AUTHENTICATING...'
                : isSignUp
                ? '$ CREATE_ACCOUNT'
                : '$ LOGIN'}
            </button>
          </form>
        )}

        {/* Toggle Sign Up / Sign In */}
        {!success && (
          <div className="text-center text-xs text-neon-green border-t-2 border-primary pt-4">
            <span className="opacity-70">
              {isSignUp ? '[*] have_account?' : '[*] no_account?'}
            </span>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setEmail('');
                setPassword('');
              }}
              className="text-neon-cyan hover:text-neon-magenta font-bold ml-2 transition-colors"
              style={{
                textDecoration: 'underline',
                textDecorationColor: 'rgba(0, 255, 255, 0.5)',
              }}
            >
              {isSignUp ? '$_SIGNIN' : '$_SIGNUP'}
            </button>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full btn btn-secondary font-mono font-bold text-sm"
        >
          {success ? '$ EXIT' : '$ CANCEL'}
        </button>

        {/* Terminal Footer */}
        {isSignUp && (
          <div className="text-xs text-neon-green opacity-50 border-t-2 border-primary pt-4">
            $ confirmation_email_sent
            <br />
            $ check_inbox_and_spam_folder
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
