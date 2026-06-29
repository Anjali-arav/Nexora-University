/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Phone, BookOpen, Clock, Calendar, ShieldCheck, CheckCircle2, AlertTriangle, Info, Edit3, Save, X, Bell } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function StudentDashboard() {
  const { currentUser, updateProfile, applications, notifications } = useAppContext();

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(currentUser?.fullName || '');
  const [editedPhone, setEditedPhone] = useState(currentUser?.phone || '');
  const [editedAcademic, setEditedAcademic] = useState(currentUser?.academicDetails || '');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h3 className="text-xl font-bold text-slate-800">Session Expired</h3>
        <p className="text-slate-500 text-xs">Please sign in to access the Student Dashboard.</p>
      </div>
    );
  }

  // Filter applications specifically for currently logged in student
  const myApplications = applications.filter((app) => app.studentId === currentUser.id);

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!editedName.trim()) {
      setError('Please enter your full name');
      return;
    }

    const result = updateProfile(editedName, editedPhone, editedAcademic);
    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => {
        setIsEditing(false);
        setSuccess('');
      }, 1500);
    } else {
      setError(result.message);
    }
  };

  // Badge stylings
  const getStatusBadge = (status: 'Pending' | 'Approved' | 'Rejected') => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approved
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-200">
            <X className="w-3.5 h-3.5" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200 animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
    }
  };

  const getNotifIcon = (type: 'info' | 'success' | 'warning') => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />;
      default:
        return <Info className="w-4.5 h-4.5 text-blue-700" />;
    }
  };

  const getNotifBg = (type: 'info' | 'success' | 'warning') => {
    switch (type) {
      case 'success': return 'bg-emerald-50/50 border-emerald-100';
      case 'warning': return 'bg-amber-50/40 border-amber-100';
      default: return 'bg-blue-50/40 border-blue-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" id="student-hub-wrapper">
      
      {/* Dynamic Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl relative overflow-hidden" id="student-welcome-banner">
        <div className="space-y-2 relative z-10">
          <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500 text-blue-950 px-2.5 py-1 rounded-sm">
            Student Academic Hub
          </span>
          <h2 className="text-2xl sm:text-3xl font-sans font-black tracking-tight leading-none mt-2">
            Welcome Back, {currentUser.fullName}!
          </h2>
          <p className="text-xs text-slate-300">
            Check application evaluation statuses, edit metrics, or review official announcements below.
          </p>
        </div>
        <div className="text-xs bg-white/10 rounded-xl px-4 py-3 border border-white/10 font-mono space-y-1 shrink-0 relative z-10">
          <div><span className="text-slate-300">Academic ID:</span> {currentUser.id}</div>
          <div><span className="text-slate-300">Role level:</span> {currentUser.role.toUpperCase()}</div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient(from_center,rgba(245,158,11,0.1),transparent) pointer-events-none" />
      </div>

      {/* Grid: Left Profile Card, Right Sub-panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Profile Detail Card */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-6" id="student-profile-summary">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-950 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-800" />
              Student Credentials
            </h3>
            
            {!isEditing && (
              <button
                onClick={() => {
                  setEditedName(currentUser.fullName);
                  setEditedPhone(currentUser.phone || '');
                  setEditedAcademic(currentUser.academicDetails || '');
                  setIsEditing(true);
                }}
                className="p-1.5 hover:bg-slate-50 text-blue-800 font-semibold rounded-lg text-xs flex items-center gap-1 cursor-pointer transition-colors"
                id="profile-btn-edit"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
                id="profile-view-mode"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">FULL NAME</span>
                  <div className="text-sm font-bold text-slate-800">{currentUser.fullName}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">EMAIL ADDRESS</span>
                  <div className="text-sm text-slate-600 font-mono flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {currentUser.email}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">CONTACT PHONE</span>
                  <div className="text-sm text-slate-600 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {currentUser.phone || 'Not Specified (Click Edit to update)'}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">ACADEMIC PROFILE SUMMARY</span>
                  <div className="text-xs bg-slate-50 border border-slate-100 rounded-lg p-3 text-slate-600 leading-relaxed font-mono">
                    {currentUser.academicDetails || 'None described yet. Add GPA/SAT metrics to support admissions review.'}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400">
                  Registered: {new Date(currentUser.joinedAt).toLocaleDateString()}
                </div>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleEditSubmit}
                className="space-y-4"
                id="profile-edit-mode"
              >
                {error && (
                  <div className="p-2.5 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-r-md">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="p-2.5 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-xs rounded-r-md">
                    {success}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800 text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                    placeholder="+1 (555) 321-4567"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800 text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Academic Scores / SAT / GPA
                  </label>
                  <textarea
                    value={editedAcademic}
                    onChange={(e) => setEditedAcademic(e.target.value)}
                    placeholder="Describe high school GPAs, scores, etc."
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-800 text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-600 resize-none font-mono"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-1/2 py-2 border border-slate-200 text-slate-500 font-bold rounded-lg text-xs cursor-pointer hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Details
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sub-panels (Applied Courses & Notifications) */}
        <div className="lg:col-span-8 space-y-8" id="student-actions-column">
          
          {/* Section 1: Applied Courses */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-4" id="applied-courses-panel">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-950 flex items-center gap-2 border-b border-slate-100 pb-4">
              <BookOpen className="w-5 h-5 text-blue-800" />
              Active Admission Applications
            </h3>

            {myApplications.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {myApplications.map((app) => (
                  <div key={app.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-800 leading-tight">
                        {app.courseName}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-xxs text-slate-400 font-mono">
                        <span>Application Ref: {app.id}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Applied: {new Date(app.appliedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {getStatusBadge(app.status)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-700">No Applications Submitted</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  You have not applied for any undergraduate or graduate program.
                </p>
              </div>
            )}
          </div>

          {/* Section 2: Notifications / Updates */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-4" id="notifications-panel">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-950 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Bell className="w-5 h-5 text-blue-800" />
              Nexora Official Notifications & Updates
            </h3>

            <div className="space-y-3.5">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 border rounded-xl flex items-start gap-3.5 transition-colors ${getNotifBg(notif.type)}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white shadow-xs border border-slate-150 flex items-center justify-center shrink-0">
                    {getNotifIcon(notif.type)}
                  </div>
                  
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-start gap-3">
                      <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-tight">
                        {notif.title}
                      </h4>
                      <span className="text-[9px] font-mono text-slate-400 font-bold shrink-0">
                        {notif.date}
                      </span>
                    </div>
                    <p className="text-xxs sm:text-xs text-slate-500 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
