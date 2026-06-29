/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tabId: string) => void;
  onOpenCallNow: () => void;
}

export default function Footer({ onNavigate, onOpenCallNow }: FooterProps) {
  const categories = [
    'Artificial Intelligence',
    'Computer Science',
    'Engineering',
    'MBA',
    'Data Science',
    'Biotechnology'
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-blue-700 text-white rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5.5 h-5.5" />
              </div>
              <span className="font-sans font-black tracking-wider text-lg text-white uppercase">
                NEXORA<span className="text-amber-500">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Nexora University offers cutting-edge education, nurturing world-class innovation, research breakthroughs, and securing elite careers for global leadership.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#facebook" className="w-9 h-9 bg-slate-900 hover:bg-blue-600 hover:text-white transition-all rounded-lg flex items-center justify-center text-slate-400">
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a href="#twitter" className="w-9 h-9 bg-slate-900 hover:bg-sky-500 hover:text-white transition-all rounded-lg flex items-center justify-center text-slate-400">
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a href="#instagram" className="w-9 h-9 bg-slate-900 hover:bg-pink-600 hover:text-white transition-all rounded-lg flex items-center justify-center text-slate-400">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="#linkedin" className="w-9 h-9 bg-slate-900 hover:bg-blue-700 hover:text-white transition-all rounded-lg flex items-center justify-center text-slate-400">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a href="#youtube" className="w-9 h-9 bg-slate-900 hover:bg-red-600 hover:text-white transition-all rounded-lg flex items-center justify-center text-slate-400">
                <Youtube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Academic Core */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-5 border-l-2 border-amber-500 pl-3">
              Academic Core
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate('courses')}
                    className="hover:text-amber-400 text-slate-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-amber-500 text-xs">›</span> {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-5 border-l-2 border-amber-500 pl-3">
              Explore Portal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 text-slate-400 transition-colors cursor-pointer">
                  University Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 text-slate-400 transition-colors cursor-pointer">
                  About University
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('achievements')} className="hover:text-amber-400 text-slate-400 transition-colors cursor-pointer">
                  Our Placements
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('campus')} className="hover:text-amber-400 text-slate-400 transition-colors cursor-pointer">
                  Student Campus Life
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admission')} className="hover:text-amber-400 text-slate-400 transition-colors cursor-pointer">
                  Academics & Admissions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 text-slate-400 transition-colors cursor-pointer">
                  Contact Counselor
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Office */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-1 border-l-2 border-amber-500 pl-3">
              Campus Office
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Nexora Towers, 45 University Boulevard, Silicon Avenue, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                <span>+1 (800) 555-NEXO</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                <span>admissions@nexora.edu</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={onOpenCallNow}
                className="w-full py-2.5 bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                Request Live callback
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Nexora University. All rights reserved. Globally Accredited Institution.
          </div>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-slate-300">Privacy Directives</a>
            <span>•</span>
            <a href="#terms" className="hover:text-slate-300">Academic Charter</a>
            <span>•</span>
            <a href="#map" className="hover:text-slate-300 flex items-center gap-0.5">
              Interactive Map <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
