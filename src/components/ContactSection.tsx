/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, Send, CheckCircle2, ShieldAlert, Globe, Compass } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function ContactSection() {
  const { submitEnquiry } = useAppContext();

  // Contact fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Status
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!name.trim()) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    if (!message.trim() || message.length < 10) {
      setError('Please write down your message (minimum 10 characters)');
      setLoading(false);
      return;
    }

    // Submit as general enquiry
    const result = submitEnquiry(name, email, 'Not Specified', 'General Admission Questions', message);
    if (result.success) {
      setSuccess('Your academic inquiry has been registered. Our counsellor will email you within 24 hours!');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => {
        setSuccess('');
        setLoading(false);
      }, 4000);
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="contact-section-wrapper">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
          Get In Touch
        </span>
        <h2 className="text-3xl font-sans font-black text-blue-950 tracking-tight leading-none">
          Contact Nexora Admissions & Counselor Center
        </h2>
        <p className="text-sm text-slate-500">
          Have questions regarding courses, eligibility, scholarship grants or campus tours? Our counsellors are ready to help.
        </p>
      </div>

      {/* Grid Layout Contact Details vs Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-blue-950 uppercase tracking-wider">
              Admissions Office Headquarters
            </h3>
            
            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 bg-blue-50 text-blue-850 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Physical Campus Location</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Nexora Towers, 45 University Boulevard, Silicon Avenue, New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center shrink-0 border border-amber-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Direct Telephone / Hotline</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Toll-Free: +1 (800) 555-NEXO<br />
                    International Office: +1 (212) 555-1290
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Direct Email Channels</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    General Inquiries: info@nexora.edu<br />
                    Admissions Support: admissions@nexora.edu<br />
                    Registrar Office: registrar@nexora.edu
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Map Vector representation simulating Google Maps */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-3" id="contact-map-block">
            <div className="flex items-center justify-between">
              <span className="text-xxs uppercase tracking-wider text-slate-400 font-bold block font-mono">
                Admissions Map coordinates
              </span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Online Satellite Mode
              </span>
            </div>

            {/* Styled interactive map design */}
            <div className="h-44 bg-blue-50/50 rounded-xl border border-blue-100 relative overflow-hidden flex flex-col justify-between p-4 font-mono text-[10px] text-slate-500 select-none">
              {/* Grid map overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:14px_14px] opacity-40" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 space-y-2">
                <div className="w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md animate-bounce mx-auto border-2 border-white">
                  📍
                </div>
                <div className="bg-white px-2 py-1 rounded-sm border border-slate-200 shadow-xs font-sans font-bold text-blue-950 text-xxs">
                  Nexora Towers HQ
                </div>
              </div>

              {/* Satellite labels */}
              <div className="absolute top-3 left-3 text-slate-400">Lat: 40.7128° N</div>
              <div className="absolute bottom-3 right-3 text-slate-400">Long: 74.0060° W</div>
            </div>
          </div>

        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between" id="contact-form-block">
          
          <div className="bg-gradient-to-r from-blue-950 to-blue-900 p-6 text-white">
            <h3 className="text-base font-bold uppercase tracking-wider">Academic Inquiry Form</h3>
            <p className="text-xs text-slate-300">Submit secure questions regarding programs and visa policies</p>
          </div>

          <div className="p-6 sm:p-8 flex-1">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md flex gap-2 items-center" id="contact-form-error">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-sm rounded-r-md flex gap-2 items-center" id="contact-form-success">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Carter"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-sm transition-all"
                  required
                  id="contact-input-name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@domain.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-sm transition-all"
                  required
                  id="contact-input-email"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Specific Inquiry / Questions *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Explain your specific inquiry regarding campus guidelines, scholarships, eligibility checks..."
                  rows={6}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-sm transition-all resize-none"
                  required
                  id="contact-input-message"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">A minimum of 10 characters is required.</span>
              </div>

              {/* Security warning */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xxs text-slate-500 font-mono">
                ● This form is fully encrypted. Nexora respects your personal data privacy policy.
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 bg-blue-800 hover:bg-blue-900 active:bg-blue-950 text-white rounded-lg text-sm font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  loading ? 'opacity-75 pointer-events-none' : ''
                }`}
                id="contact-btn-submit"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Submitting inquiry...' : 'Send Inquiry Message'}
              </button>

            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
