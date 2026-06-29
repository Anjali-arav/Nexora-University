/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, BookOpen, Clock, Lock, CheckCircle, GraduationCap, X, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES } from '../data';
import { Course } from '../types';

interface CoursesSectionProps {
  onOpenAuth: (tab: 'login' | 'register') => void;
  onNavigateToApply: (courseId: string, courseName: string) => void;
}

export default function CoursesSection({ onOpenAuth, onNavigateToApply }: CoursesSectionProps) {
  const { courses, currentUser } = useAppContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal states
  const [detailedCourse, setDetailedCourse] = useState<Course | null>(null);
  const [showAuthWarning, setShowAuthWarning] = useState<boolean>(false);

  // Handle View Details action
  const handleViewDetails = (course: Course) => {
    if (!currentUser) {
      setShowAuthWarning(true);
    } else {
      setDetailedCourse(course);
    }
  };

  // Filter courses based on search & category
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'All' ||
      course.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" id="courses-section-wrapper">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
          Academic Catalog
        </span>
        <h2 className="text-3xl font-sans font-black text-blue-950 tracking-tight leading-none">
          Explore Undergraduate & Graduate Courses
        </h2>
        <p className="text-sm text-slate-500">
          Find accredited, future-proof degrees tailored with advanced clean labs and global academic frameworks.
        </p>
      </div>

      {/* Search & Category Filter bar */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-100 p-5 space-y-5" id="search-filter-controls">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course names, computer, engineering, biotechnology..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              id="course-search-input"
            />
          </div>

          {/* Direct Category dropdown for compact views / mobiles */}
          <div className="relative md:w-64">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-9 pr-8 py-3 rounded-lg border border-slate-200 text-slate-700 bg-white text-sm appearance-none focus:outline-hidden focus:ring-2 focus:ring-blue-600 cursor-pointer"
              id="category-dropdown-selector"
            >
              {CATEGORIES.map((cat, idx) => (
                <option key={idx} value={cat}>
                  Category: {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>

        </div>

        {/* Big Category Tabs (Desktop Only) */}
        <div className="hidden lg:flex flex-wrap gap-2 pt-2" id="category-tabs-row">
          {CATEGORIES.map((cat, idx) => {
            const count = cat === 'All' 
              ? courses.length 
              : courses.filter(c => c.category.toLowerCase() === cat.toLowerCase()).length;

            return (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-blue-850 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                }`}
                id={`category-tab-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${
                  selectedCategory === cat ? 'bg-amber-400 text-blue-950' : 'bg-slate-200 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="courses-grid">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              id={`course-card-${course.id}`}
            >
              {/* Image & Category Overlay */}
              <div className="relative h-44 bg-slate-100">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-blue-900/90 backdrop-blur-xs text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {course.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Duration: {course.duration}</span>
                  </div>
                  <h3 className="text-sm font-bold text-blue-950 tracking-tight line-clamp-2">
                    {course.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3">
                    {course.description}
                  </p>
                </div>

                {/* View Details triggers */}
                <button
                  onClick={() => handleViewDetails(course)}
                  className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    currentUser 
                      ? 'bg-blue-50 text-blue-800 hover:bg-blue-100' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                  id={`course-view-btn-${course.id}`}
                >
                  {currentUser ? (
                    <>
                      <BookOpen className="w-3.5 h-3.5" />
                      View Full Details
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-amber-500" />
                      Unlock Details
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200" id="no-courses-found-view">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No Courses Match</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, selecting different category filters, or resetting filters.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-4 px-4 py-2 bg-blue-850 text-white rounded-lg text-xs font-semibold hover:bg-blue-900 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}


      {/* 1. Unauthorized Guest Access Warning Dialog */}
      <AnimatePresence>
        {showAuthWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthWarning(false)}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl z-10 border border-slate-100"
              id="auth-warning-modal"
            >
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                  <Lock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-950">Registration Required</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Please Login or Register an account to explore complete syllabi, admission criteria, annual fees, and submit enrollment applications.
                  </p>
                </div>

                <div className="pt-2 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { setShowAuthWarning(false); onOpenAuth('login'); }}
                    className="py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setShowAuthWarning(false); onOpenAuth('register'); }}
                    className="py-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg text-xs cursor-pointer shadow-xs"
                  >
                    Register Free
                  </button>
                </div>

                <button
                  onClick={() => setShowAuthWarning(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-medium underline mt-2 block mx-auto cursor-pointer"
                >
                  Explore as Guest
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* 2. Authenticated Detailed Course Information Modal */}
      <AnimatePresence>
        {detailedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailedCourse(null)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl z-10 border border-slate-100"
              id="course-detail-modal-card"
            >
              {/* Header Visual Stripe */}
              <div className="relative h-44 sm:h-52 bg-slate-100">
                <img
                  src={detailedCourse.image}
                  alt={detailedCourse.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <button
                  onClick={() => setDetailedCourse(null)}
                  className="absolute top-4 right-4 bg-slate-900/50 hover:bg-slate-900 text-white p-1.5 rounded-full transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[10px] font-black tracking-widest uppercase bg-amber-500/90 text-blue-950 px-2 py-0.5 rounded-sm">
                    {detailedCourse.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold mt-1.5 drop-shadow-xs">
                    {detailedCourse.name}
                  </h3>
                </div>
              </div>

              {/* Modal Details Scrollable */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[400px] overflow-y-auto" id="course-details-scrollable">
                
                {/* Meta details cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center gap-2.5">
                    <Calendar className="w-5 h-5 text-blue-800" />
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">DURATION</span>
                      <span className="text-xs font-bold text-slate-800">{detailedCourse.duration}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center gap-2.5">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">ANNUAL TUITION</span>
                      <span className="text-xs font-bold text-slate-800">{detailedCourse.fee || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center gap-2.5">
                    <GraduationCap className="w-5 h-5 text-amber-600" />
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">ANNUAL INTAKE</span>
                      <span className="text-xs font-bold text-slate-800">{detailedCourse.intake || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Course Syllabus Overview */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-blue-900">Syllabus Overview</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {detailedCourse.fullDetails}
                  </p>
                </div>

                {/* Admission Eligibility */}
                <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-amber-700 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                    Admission Eligibility Requirements
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {detailedCourse.eligibility}
                  </p>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                <button
                  onClick={() => setDetailedCourse(null)}
                  className="w-1/3 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold uppercase rounded-lg cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const id = detailedCourse.id;
                    const name = detailedCourse.name;
                    setDetailedCourse(null);
                    onNavigateToApply(id, name);
                  }}
                  className="w-2/3 py-2.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Apply Online Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
