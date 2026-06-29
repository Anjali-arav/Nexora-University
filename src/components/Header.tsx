/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, Phone, LogIn, LogOut, User, Shield, GraduationCap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCallNow: () => void;
  onOpenAuth: (tab: 'login' | 'register') => void;
}

export default function Header({ activeTab, setActiveTab, onOpenCallNow, onOpenAuth }: HeaderProps) {
  const { currentUser, logout } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About University' },
    { id: 'courses', label: 'Courses' },
    { id: 'admission', label: 'Academics' },
    { id: 'achievements', label: 'Our Placements' },
    { id: 'campus', label: 'Campus Life' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setActiveTab('home');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs" id="app-header">
      {/* Top Banner Alert / Contact Info */}
      <div className="bg-blue-950 text-white text-[11px] font-medium py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Fall 2026 Admissions Now Open
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-amber-400">Accredited Global Research Center</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 font-mono">
            <span>Enquiries: info@nexora.edu</span>
            <span>Tel: +1 (800) 555-NEXO</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Crest */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
            id="header-logo"
          >
            <div className="w-11 h-11 bg-blue-800 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-800/10 group-hover:bg-amber-500 group-hover:scale-105 transition-all duration-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black tracking-wider text-xl text-blue-950 leading-tight uppercase">
                NEXORA<span className="text-amber-500">.</span>
              </span>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest leading-none">
                UNIVERSITY
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" id="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === link.id
                    ? 'text-blue-800 bg-blue-50/50 border-b-2 border-amber-500 font-bold'
                    : 'text-slate-600 hover:text-blue-950 hover:bg-slate-50'
                }`}
                id={`nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}

            {/* Admin link shortcut if logged in as admin */}
            {currentUser && currentUser.role === 'admin' && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'admin'
                    ? 'text-amber-600 bg-amber-50/50'
                    : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                }`}
                id="nav-link-admin"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Dashboard
              </button>
            )}

            {/* Student Dashboard link shortcut if logged in as student */}
            {currentUser && currentUser.role === 'student' && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'dashboard'
                    ? 'text-blue-800 bg-blue-50/50'
                    : 'text-blue-700 hover:bg-slate-50'
                }`}
                id="nav-link-dashboard"
              >
                <User className="w-3.5 h-3.5" />
                Student Hub
              </button>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3" id="header-actions">
            {/* Call Now Button */}
            <button
              onClick={onOpenCallNow}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-blue-950 rounded-lg text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 border border-amber-400 shadow-sm shadow-amber-500/10 cursor-pointer"
              id="header-btn-call"
            >
              <Phone className="w-3.5 h-3.5 animate-bounce" />
              Call Now
            </button>

            {/* Auth / Account Trigger */}
            {currentUser ? (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-800 max-w-[120px] truncate">
                    {currentUser.fullName}
                  </span>
                  <span className="text-[9px] font-bold text-blue-700 uppercase tracking-widest leading-none">
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                  title="Secure Logout"
                  id="header-btn-logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-slate-700 hover:text-blue-950 text-sm font-semibold transition-colors cursor-pointer"
                  id="header-btn-login"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                  id="header-btn-register"
                >
                  Apply Online
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Direct Callback shortcut for mobile */}
            <button
              onClick={onOpenCallNow}
              className="p-2.5 bg-amber-500 hover:bg-amber-600 text-blue-950 rounded-lg transition-colors cursor-pointer"
              title="Callback"
              id="mobile-call-shortcut"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg px-4 pt-2 pb-6 space-y-3" id="mobile-nav-drawer">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  activeTab === link.id
                    ? 'text-blue-800 bg-blue-50/50 font-bold border-l-4 border-amber-500'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                id={`mobile-nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}

            {currentUser && currentUser.role === 'admin' && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors text-amber-800 bg-amber-50/50`}
                id="mobile-nav-admin"
              >
                🛡️ Admin Dashboard
              </button>
            )}

            {currentUser && currentUser.role === 'student' && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-colors text-blue-700 bg-blue-50/30`}
                id="mobile-nav-dashboard"
              >
                🎓 Student Dashboard
              </button>
            )}
          </div>

          {/* Mobile session info / triggers */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            {currentUser ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-4">
                  <div className="w-9 h-9 bg-blue-50 text-blue-800 rounded-full flex items-center justify-center font-bold">
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800 leading-none">
                      {currentUser.fullName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                      {currentUser.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                  id="mobile-logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out Securely
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="py-2.5 text-center border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-semibold cursor-pointer"
                  id="mobile-login-btn"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="py-2.5 text-center bg-blue-800 text-white hover:bg-blue-900 rounded-lg text-sm font-semibold cursor-pointer"
                  id="mobile-register-btn"
                >
                  Apply Online
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
