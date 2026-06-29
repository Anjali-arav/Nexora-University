/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Phone, User, Mail, BookOpen, Send, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourse?: string;
}

export default function EnquiryModal({ isOpen, onClose, preselectedCourse = '' }: EnquiryModalProps) {
  const { courses, submitEnquiry } = useAppContext();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(preselectedCourse);
  const [message, setMessage] = useState('');
  
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError('Please enter your full name');
    if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email address');
    if (!phone.trim() || phone.length < 7) return setError('Please enter a valid phone number');
    if (!course) return setError('Please select your course of interest');

    const result = submitEnquiry(name, email, phone, course, message);
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setEmail('');
        setPhone('');
        setCourse('');
        setMessage('');
        onClose();
      }, 3000);
    } else {
      setError(result.message);
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
            id="enquiry-backdrop"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl z-10 border border-slate-100"
            id="enquiry-modal-card"
          >
            {/* Design header accent */}
            <div className="h-2 bg-gradient-to-r from-blue-700 via-amber-500 to-blue-900" />

            <div className="p-6 sm:p-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 rounded-full p-1 hover:bg-slate-100 transition-colors duration-200"
                aria-label="Close"
                id="close-enquiry-btn"
              >
                <X className="w-5 h-5" />
              </button>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                  id="enquiry-success-view"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
                    <CheckCircle className="w-10 h-10 text-emerald-600 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">Enquiry Registered!</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed max-w-sm">
                    Thank you! Your Nexora callback profile was filed. A Senior Academic Counsellor will call your number shortly.
                  </p>
                  <div className="mt-6 text-sm text-slate-400 font-mono">
                    Direct Response Team Active
                  </div>
                </motion.div>
              ) : (
                <div id="enquiry-form-view">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-200">
                      <Phone className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-950">Academic Counselling</h3>
                      <p className="text-xs text-slate-500">Request a callback from our admission team</p>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md" id="enquiry-error-msg">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Student Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition-all"
                          required
                          id="enquiry-input-name"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@domain.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition-all"
                          required
                          id="enquiry-input-email"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition-all"
                          required
                          id="enquiry-input-phone"
                        />
                      </div>
                    </div>

                    {/* Interested Course */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Interested Academic Field *
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
                        <select
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm appearance-none transition-all cursor-pointer"
                          required
                          id="enquiry-select-course"
                        >
                          <option value="">-- Choose Course --</option>
                          {courses.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.name} ({c.duration})
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Specific Questions / Message (Optional)
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type any questions regarding course curriculums, campus housing, financial aids..."
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition-all resize-none"
                        id="enquiry-input-message"
                      />
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="w-1/3 py-2.5 border border-slate-200 rounded-lg text-slate-600 text-sm font-semibold hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
                        id="enquiry-btn-cancel"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-2.5 bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-700/20 hover:bg-blue-800 active:bg-blue-900 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        id="enquiry-btn-submit"
                      >
                        <Send className="w-4 h-4" />
                        Submit Enquiry
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
