import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, Lock, Chrome, LogIn, UserPlus, AlertCircle, Shield } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { email: string; name: string }) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bypassMode, setBypassMode] = useState(false);

  // HIDDEN BYPASS: Press Ctrl+Shift+D to enable bypass mode
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setBypassMode(true);
        setTimeout(() => setBypassMode(false), 3000);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    // Check for bypass mode
    if (bypassMode) {
      const user = {
        email: 'dev@test.com',
        name: 'Developer Mode (Bypass Active)'
      };
      onLogin(user);
      onClose();
      setLoading(false);
      setBypassMode(false);
      return;
    }
    
    try {
      // TODO: Implement Google OAuth with MongoDB
      // Step 1: Redirect to Google OAuth
      // window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
      
      // Step 2: Backend handles Google OAuth and returns user data
      // Backend API endpoint should:
      // - Authenticate with Google
      // - Create/Update user in MongoDB
      // - Return JWT token and user data
      
      // const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/google/callback`, {
      //   method: 'GET',
      //   credentials: 'include'
      // });
      // const data = await response.json();
      // if (data.success) {
      //   localStorage.setItem('authToken', data.token);
      //   onLogin({ email: data.user.email, name: data.user.name });
      //   onClose();
      // }
      
      // For now, simulate successful login
      const user = {
        email: 'admin@areopc.com',
        name: 'Admin User'
      };
      onLogin(user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📧 handleEmailLogin called');
    console.log('🔐 Bypass mode:', bypassMode);
    setLoading(true);
    setError('');

    // Check for bypass mode
    if (bypassMode) {
      console.log('✅ Bypass mode active - logging in...');
      const user = {
        email: 'dev@test.com',
        name: 'Developer Mode (Bypass Active)'
      };
      onLogin(user);
      onClose();
      setLoading(false);
      setBypassMode(false);
      return;
    }

    console.log('📝 Regular login flow - Email:', email);

    try {
      if (isSignUp) {
        // TODO: Implement sign up with MongoDB
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     email: email,
        //     password: password,
        //     name: name
        //   }),
        // });
        // 
        // const data = await response.json();
        // 
        // if (!response.ok) {
        //   throw new Error(data.message || 'Sign up failed');
        // }
        // 
        // // Store JWT token
        // localStorage.setItem('authToken', data.token);
        // 
        // onLogin({ email: data.user.email, name: data.user.name });
        // onClose();
        
        // Simulate sign up for now
        const user = {
          email: email,
          name: name
        };
        onLogin(user);
        onClose();
      } else {
        // TODO: Implement sign in with MongoDB
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     email: email,
        //     password: password
        //   }),
        // });
        // 
        // const data = await response.json();
        // 
        // if (!response.ok) {
        //   throw new Error(data.message || 'Sign in failed');
        // }
        // 
        // // Store JWT token
        // localStorage.setItem('authToken', data.token);
        // 
        // onLogin({ email: data.user.email, name: data.user.name });
        // onClose();
        
        // Simulate sign in for now
        const user = {
          email: email,
          name: 'Admin User'
        };
        onLogin(user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 border-2 border-yellow-500/20">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent">
            {isSignUp ? 'Create Admin Account' : 'Admin Login'}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-500 dark:text-gray-400">
            {isSignUp ? 'Enter your details to create a new account.' : 'Enter your credentials to access the dashboard.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Bypass Mode Indicator */}
          <AnimatePresence>
            {bypassMode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-500 dark:border-green-600 rounded-lg flex items-center gap-2"
              >
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400 animate-pulse" />
                <div>
                  <p className="text-green-700 dark:text-green-300">
                    🔓 Developer Bypass Mode Active
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Click any login button to enter dashboard
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400 text-sm"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Google Sign In Button */}
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            variant="outline"
            className="w-full h-12 border-2 border-blue-500/30 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 disabled:opacity-50"
          >
            <Chrome className="mr-2 h-5 w-5 text-blue-600" />
            {loading ? 'Connecting...' : 'Continue with Google'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-800 px-2 text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} noValidate={bypassMode} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!bypassMode}
                  disabled={loading}
                  className="h-11 border-2 focus:border-yellow-500"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@areopc.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={!bypassMode}
                  disabled={loading}
                  className="h-11 pl-10 border-2 focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={!bypassMode}
                  disabled={loading}
                  className="h-11 pl-10 border-2 focus:border-yellow-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gradient-to-r from-yellow-500 to-blue-600 hover:from-yellow-600 hover:to-blue-700 text-white disabled:opacity-50"
            >
              {loading ? (
                'Loading...'
              ) : isSignUp ? (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create Account
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                if (!isSignUp) {
                  // Prefill defaults when switching to Sign Up
                  setEmail("rjmanongsong@yahoo.com");
                  setPassword("12345678");
                  setName("RJ Manongsong");
                } else {
                  // Clear when switching back to Sign In
                  setEmail("");
                  setPassword("");
                  setName("");
                }
              }}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}