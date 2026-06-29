/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, FileText, CheckCircle, GraduationCap, ArrowRight, ClipboardList, Info, ShieldAlert, Send } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface AdmissionSectionProps {
  onOpenAuth: (tab: 'login' | 'register') => void;
  preselectedCourseId?: string;
}

export default function AdmissionSection({ onOpenAuth, preselectedCourseId = '' }: AdmissionSectionProps) {
  const { courses, currentUser, submitApplication, applications } = useAppContext();

  // Form Fields
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [courseId, setCourseId] = useState(preselectedCourseId);
  const [academicDetails, setAcademicDetails] = useState('');

  // Status
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prepopulate if user changes
  useEffect(() => {
    if (currentUser) {
      setStudentName(currentUser.fullName);
      setStudentEmail(currentUser.email);
      setStudentPhone(currentUser.phone || '');
      setAcademicDetails(currentUser.academicDetails || '');
    }
  }, [currentUser]);

  // Adjust preselected course if passed down
  useEffect(() => {
    if (preselectedCourseId) {
      setCourseId(preselectedCourseId);
    }
  }, [preselectedCourseId]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    if (!studentName.trim()) {
      setError('Please enter your full name');
      setIsSubmitting(false);
      return;
    }
    if (!studentEmail.trim() || !studentEmail.includes('@')) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }
    if (!studentPhone.trim() || studentPhone.length < 7) {
      setError('Please enter your phone contact number');
      setIsSubmitting(false);
      return;
    }
    if (!courseId) {
      setError('Please select your preferred course');
      setIsSubmitting(false);
      return;
    }
    if (academicDetails.trim().length < 15) {
      setError('Please provide complete academic scores/grades (at least 15 characters)');
      setIsSubmitting(false);
      return;
    }

    const matchedCourse = courses.find((c) => c.id === courseId);
    if (!matchedCourse) {
      setError('Selected course is invalid.');
      setIsSubmitting(false);
      return;
    }

    const result = submitApplication(courseId, matchedCourse.name, academicDetails);
    
    if (result.success) {
      setSuccess(result.message);
      // Reset non-user fields
      setCourseId('');
      setAcademicDetails('');
      setTimeout(() => {
        setSuccess('');
        setIsSubmitting(false);
      }, 4000);
    } else {
      setError(result.message);
      setIsSubmitting(false);
    }
  };

  const currentSelectionDetails = courses.find((c) => c.id === courseId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="admission-section-wrapper">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
          Admissions Hub
        </span>
        <h2 className="text-3xl font-sans font-black text-blue-950 tracking-tight leading-none">
          Nexora University Enrollment & Intake Drive
        </h2>
        <p className="text-sm text-slate-500">
          Learn about undergraduate standards, eligibility requirements, and submit your official application portfolio securely.
        </p>
      </div>

      {/* Grid: Process and Eligibility Left, Form Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Process & Criteria */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Eligibility Criteria Cards */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-950 flex items-center gap-2 border-b border-slate-100 pb-3">
              <ClipboardList className="w-5 h-5 text-amber-500" />
              General Eligibility Guidelines
            </h3>
            
            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-700 shrink-0 mt-2" />
                <div>
                  <span className="font-bold text-slate-800">Undergraduate standard:</span> Minimum 10+2 standard or high-school certificate aggregate of 60% or higher, or equivalent IB credit points.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-700 shrink-0 mt-2" />
                <div>
                  <span className="font-bold text-slate-800">Technical courses (AI & CS):</span> Advanced algebra, physics, or computational engineering credentials in secondary schools are highly preferred.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-700 shrink-0 mt-2" />
                <div>
                  <span className="font-bold text-slate-800">English Language standard:</span> Satisfactory TOEFL iBT (80+), IELTS Academic (6.5+), or equivalent school-certified medium of instruction.
                </div>
              </div>
            </div>
          </div>

          {/* Detailed step roadmap */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-950 flex items-center gap-2 border-b border-slate-100 pb-3">
              <GraduationCap className="w-5 h-5 text-amber-500" />
              Admission Evaluation Roadmap
            </h3>

            <div className="space-y-4 font-sans text-xs sm:text-sm">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Submit Application</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Fill academic transcript summaries and telephone details on the portal.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Document Review</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Academic Council evaluates school GPAs and letters within 5 business days.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Counselor Interview</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Live video consultation concerning majors, visa assistance, and scholarship opportunities.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Onboarding & Fee Payment</h4>
                  <p className="text-slate-500 text-xs mt-0.5">Receive official offer letter and pay initial deposit to secure university seat.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Portal Application Form Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden" id="admission-form-wrapper">
            
            {/* Header branding */}
            <div className="bg-blue-950 p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider">Nexora Online Enrollment Form</h3>
                <p className="text-xs text-slate-300">Submit secure application file directly to our registrar center</p>
              </div>
              <FileText className="w-8 h-8 text-amber-400 shrink-0" />
            </div>

            <div className="p-6 sm:p-8">
              {currentUser ? (
                <div>
                  {/* Status Banner */}
                  {error && (
                    <div className="mb-5 p-3.5 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md" id="admission-form-error">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="mb-5 p-3.5 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-sm rounded-r-md" id="admission-form-success">
                      {success}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Two cols layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Student Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Applicant Full Name *
                        </label>
                        <input
                          type="text"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="e.g. Alex Carter"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-sm bg-slate-50 transition-all"
                          required
                          id="admission-input-name"
                        />
                      </div>

                      {/* Student Email */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Contact Email Address *
                        </label>
                        <input
                          type="email"
                          value={studentEmail}
                          disabled
                          placeholder="e.g. yourname@domain.com"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-400 focus:outline-hidden text-sm bg-slate-100 transition-all cursor-not-allowed"
                          required
                          id="admission-input-email"
                        />
                        <span className="text-[9px] text-slate-400 mt-1 block">Locked to logged in academic session</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Phone / Contact Number *
                        </label>
                        <input
                          type="tel"
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                          placeholder="e.g. +1 (555) 321-4567"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-sm transition-all"
                          required
                          id="admission-input-phone"
                        />
                      </div>

                      {/* Course Dropdown */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Course / Major Selection *
                        </label>
                        <select
                          value={courseId}
                          onChange={(e) => setCourseId(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-sm transition-all cursor-pointer"
                          required
                          id="admission-select-course"
                        >
                          <option value="">-- Choose Course --</option>
                          {courses.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name} ({c.duration})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Show selected course eligibility mini review */}
                    {currentSelectionDetails && (
                      <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-xs text-slate-600 space-y-1">
                        <div>
                          <span className="font-bold text-blue-900">Target Tuition:</span> {currentSelectionDetails.fee}
                        </div>
                        <div>
                          <span className="font-bold text-blue-900">Eligibility check:</span> {currentSelectionDetails.eligibility}
                        </div>
                      </div>
                    )}

                    {/* Academic Details */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Academic score & secondary transcript details *
                      </label>
                      <textarea
                        value={academicDetails}
                        onChange={(e) => setAcademicDetails(e.target.value)}
                        placeholder="Please write down high school scores, GPA, SAT/TOEFL scores, or outstanding accomplishments here..."
                        rows={5}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-sm transition-all resize-none"
                        required
                        id="admission-input-academic"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">Minimum of 15 characters describing high-school grades is required.</span>
                    </div>

                    {/* Applications Info checklist */}
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xxs text-slate-500 space-y-1 font-mono">
                      <div>● Transcripts will require official physical validation upon campus arrival.</div>
                      <div>● Application fees are waived for early-bird portal submissions.</div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 bg-blue-800 hover:bg-blue-900 active:bg-blue-950 text-white rounded-lg text-sm font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                        isSubmitting ? 'opacity-70 pointer-events-none' : ''
                      }`}
                      id="admission-btn-submit"
                    >
                      <Send className="w-4 h-4 animate-pulse" />
                      {isSubmitting ? 'Recording enrollment application...' : 'Submit Admission Application'}
                    </button>

                  </form>
                </div>
              ) : (
                <div className="py-12 px-4 text-center space-y-5" id="admission-form-locked">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto border border-red-200">
                    <Lock className="w-7 h-7 text-red-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-blue-950 uppercase tracking-wider">Admissions Form Locked</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      "Please Login/Register to view complete details"
                    </p>
                    <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                      For security and accurate student profile synchronization, our online enrollment portal is strictly available to registered members.
                    </p>
                  </div>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => onOpenAuth('login')}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => onOpenAuth('register')}
                      className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg text-xs transition-colors shadow-xs cursor-pointer"
                    >
                      Register Portal
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
