/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Lock, Mail, User, ShieldAlert, LogIn, UserPlus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }: AuthModalProps) {
  const { login, register } = useAppContext();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (activeTab === 'register') {
      if (!fullName.trim()) {
        setError('Full name is required');
        setLoading(false);
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      // Perform Register
      const result = register(fullName, email, password);
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          setLoading(false);
          onClose();
          // Reset form
          setFullName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }, 1500);
      } else {
        setError(result.message);
        setLoading(false);
      }
    } else {
      // Perform Login
      if (!email.trim() || !password.trim()) {
        setError('Please fill in all credentials');
        setLoading(false);
        return;
      }

      const result = login(email, password);
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          setLoading(false);
          onClose();
          // Reset form
          setEmail('');
          setPassword('');
        }, 1500);
      } else {
        setError(result.message);
        setLoading(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            id="auth-backdrop"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl z-10 border border-slate-100"
            id="auth-modal-card"
          >
            {/* Accent strip */}
            <div className="h-1.5 bg-gradient-to-r from-blue-800 via-amber-400 to-blue-900" />

            <div className="p-6 sm:p-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 rounded-full p-1 hover:bg-slate-100 transition-colors duration-200"
                aria-label="Close"
                id="close-auth-btn"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Logo Visual */}
              <div className="text-center mb-6">
                <span className="font-sans font-black tracking-wider text-xl text-blue-900 uppercase">
                  NEXORA<span className="text-amber-500">.</span>
                </span>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">
                  University Student Portal
                </p>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-lg mb-6" id="auth-tab-group">
                <button
                  onClick={() => handleTabChange('login')}
                  className={`py-2 text-sm font-semibold rounded-md transition-all cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-white text-blue-950 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  id="tab-btn-login"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </span>
                </button>
                <button
                  onClick={() => handleTabChange('register')}
                  className={`py-2 text-sm font-semibold rounded-md transition-all cursor-pointer ${
                    activeTab === 'register'
                      ? 'bg-white text-blue-950 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  id="tab-btn-register"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <UserPlus className="w-4 h-4" />
                    Register
                  </span>
                </button>
              </div>

              {/* Status messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md flex gap-2 items-start" id="auth-error-banner">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-sm rounded-r-md" id="auth-success-banner">
                  {success}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'register' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Alex Carter"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition-all"
                        required
                        id="auth-input-fullname"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Academic Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@nexora.edu"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition-all"
                      required
                      id="auth-input-email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Secure Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition-all"
                      required
                      id="auth-input-password"
                    />
                  </div>
                </div>

                {activeTab === 'register' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition-all"
                        required
                        id="auth-input-confirm"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 bg-blue-800 hover:bg-blue-900 active:bg-blue-950 text-white rounded-lg text-sm font-semibold tracking-wide transition-all shadow-md shadow-blue-800/10 cursor-pointer ${
                    loading ? 'opacity-70 pointer-events-none' : ''
                  }`}
                  id="auth-btn-submit"
                >
                  {loading
                    ? 'Processing Authentication...'
                    : activeTab === 'register'
                    ? 'Create Student Account'
                    : 'Secure Student Login'}
                </button>
              </form>

              {/* Helpful Preloaded Credentials hint block */}
              <div className="mt-6 pt-5 border-t border-dashed border-slate-200 text-center" id="credentials-helper-box">
                <span className="text-xxs uppercase tracking-wider text-slate-400 font-bold block mb-2">
                  Testing Credentials Hint
                </span>
                <div className="text-xs bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-left text-slate-600 space-y-1 font-mono">
                  <div>
                    <span className="text-amber-600 font-bold">Student:</span> student@nexora.edu
                    <span className="block text-[10px] text-slate-400">PW: student123</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-100">
                    <span className="text-blue-700 font-bold">Admin:</span> admin@nexora.edu
                    <span className="block text-[10px] text-slate-400">PW: admin123</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
