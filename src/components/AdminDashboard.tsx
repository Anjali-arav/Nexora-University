/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, BookOpen, FileText, Phone, Users, PlusCircle, Edit, Trash2, Check, X, ShieldAlert, AlertCircle, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Course } from '../types';
import { CATEGORIES } from '../data';

export default function AdminDashboard() {
  const {
    courses,
    applications,
    enquiries,
    users,
    addCourse,
    updateCourse,
    deleteCourse,
    updateApplicationStatus
  } = useAppContext();

  // Active Admin Sub-tab
  const [adminTab, setAdminTab] = useState<'courses' | 'applications' | 'enquiries' | 'students'>('courses');

  // Form State for Add / Edit course
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [targetCourseId, setTargetCourseId] = useState('');

  // Course fields
  const [courseName, setCourseName] = useState('');
  const [courseCategory, setCourseCategory] = useState('Computer Science');
  const [courseDuration, setCourseDuration] = useState('4 Years');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseEligibility, setCourseEligibility] = useState('');
  const [courseFee, setCourseFee] = useState('');
  const [courseIntake, setCourseIntake] = useState('');
  const [courseImage, setCourseImage] = useState('');

  // Status feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Prepare edit course form
  const handleEditClick = (course: Course) => {
    setTargetCourseId(course.id);
    setCourseName(course.name);
    setCourseCategory(course.category);
    setCourseDuration(course.duration);
    setCourseDescription(course.description);
    setCourseEligibility(course.eligibility || '');
    setCourseFee(course.fee || '');
    setCourseIntake(course.intake || '');
    setCourseImage(course.image);

    setIsEditing(true);
    setIsAdding(false);
    setError('');
    setSuccess('');
  };

  const handleAddNewClick = () => {
    setTargetCourseId('');
    setCourseName('');
    setCourseCategory('Computer Science');
    setCourseDuration('4 Years');
    setCourseDescription('');
    setCourseEligibility('');
    setCourseFee('');
    setCourseIntake('');
    setCourseImage('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80');

    setIsAdding(true);
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const handleCancelForm = () => {
    setIsAdding(false);
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const handleCourseSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!courseName.trim()) return setError('Please enter course name');
    if (!courseDescription.trim()) return setError('Please enter course description');

    const courseData = {
      name: courseName,
      category: courseCategory,
      duration: courseDuration,
      description: courseDescription,
      eligibility: courseEligibility || 'Minimum secondary school completion.',
      fee: courseFee || '$15,000 / year',
      intake: courseIntake || '100 Seats',
      image: courseImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
    };

    if (isEditing) {
      const result = updateCourse({ id: targetCourseId, ...courseData });
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          setIsEditing(false);
          setSuccess('');
        }, 1500);
      } else {
        setError(result.message);
      }
    } else {
      const result = addCourse(courseData);
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          setIsAdding(false);
          setSuccess('');
        }, 1500);
      } else {
        setError(result.message);
      }
    }
  };

  const handleDeleteClick = (id: string) => {
    if (confirm('Are you sure you want to delete this course from curriculum?')) {
      deleteCourse(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="admin-hub-wrapper">
      
      {/* Admin Title Welcome */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl" id="admin-title-panel">
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500 text-blue-950 px-2.5 py-1 rounded-sm">
            University Command Center
          </span>
          <h2 className="text-2xl font-sans font-black tracking-tight leading-none mt-1.5 flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-500" />
            Registrar & Curriculum Administration
          </h2>
          <p className="text-xs text-slate-400">
            Securely oversee registrations, approve/reject student application folders, modify curriculum courses, and view callback callback forms.
          </p>
        </div>
        <div className="text-xs bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 shrink-0 text-slate-300 font-mono">
          System Status: <span className="text-emerald-500 font-bold">● ONLINE / STABLE</span>
        </div>
      </div>

      {/* Admin Subtabs Selectors */}
      <div className="flex flex-wrap border-b border-slate-200 gap-1" id="admin-tabs-list">
        <button
          onClick={() => setAdminTab('courses')}
          className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            adminTab === 'courses'
              ? 'text-blue-800 border-b-2 border-amber-500'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
          id="admin-tab-btn-courses"
        >
          <BookOpen className="w-4 h-4" />
          Manage Courses ({courses.length})
        </button>

        <button
          onClick={() => setAdminTab('applications')}
          className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            adminTab === 'applications'
              ? 'text-blue-800 border-b-2 border-amber-500'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
          id="admin-tab-btn-applications"
        >
          <FileText className="w-4 h-4" />
          Applications ({applications.length})
        </button>

        <button
          onClick={() => setAdminTab('enquiries')}
          className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            adminTab === 'enquiries'
              ? 'text-blue-800 border-b-2 border-amber-500'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
          id="admin-tab-btn-enquiries"
        >
          <Phone className="w-4 h-4" />
          Callback Enquiries ({enquiries.length})
        </button>

        <button
          onClick={() => setAdminTab('students')}
          className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            adminTab === 'students'
              ? 'text-blue-800 border-b-2 border-amber-500'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          }`}
          id="admin-tab-btn-students"
        >
          <Users className="w-4 h-4" />
          Registered Students ({users.filter(u => u.role === 'student').length})
        </button>
      </div>


      {/* Subtab Contents Container */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs" id="admin-subtab-contents">
        
        {/* TAB 1: COURSES MANAGER */}
        {adminTab === 'courses' && (
          <div className="space-y-6" id="admin-courses-subpanel">
            
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Curriculum List</h3>
              {!isAdding && !isEditing && (
                <button
                  onClick={handleAddNewClick}
                  className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                  id="admin-btn-add-course"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add New Course
                </button>
              )}
            </div>

            {/* Expansible Course Add/Edit Form */}
            <AnimatePresence>
              {(isAdding || isEditing) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-slate-50 rounded-xl p-5 border border-slate-200 overflow-hidden"
                  id="course-form-expandable"
                >
                  <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                    <h4 className="text-sm font-bold text-blue-950 uppercase tracking-wider">
                      {isEditing ? 'Modify Curriculum Course' : 'Create New Course Offering'}
                    </h4>
                    <button
                      onClick={handleCancelForm}
                      className="p-1 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      <X className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {error && (
                    <div className="mb-4 p-2.5 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-r-md">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="mb-4 p-2.5 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-xs rounded-r-md">
                      {success}
                    </div>
                  )}

                  <form onSubmit={handleCourseSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Course Name *
                        </label>
                        <input
                          type="text"
                          value={courseName}
                          onChange={(e) => setCourseName(e.target.value)}
                          placeholder="e.g. M.Sc in Advanced Quantum Computing"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 focus:outline-hidden"
                          required
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Category / Academic stream *
                        </label>
                        <select
                          value={courseCategory}
                          onChange={(e) => setCourseCategory(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 bg-white rounded-lg text-xs text-slate-800 focus:outline-hidden"
                          required
                        >
                          {CATEGORIES.filter(c => c !== 'All').map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      {/* Duration */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Duration *
                        </label>
                        <input
                          type="text"
                          value={courseDuration}
                          onChange={(e) => setCourseDuration(e.target.value)}
                          placeholder="4 Years"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 focus:outline-hidden"
                          required
                        />
                      </div>

                      {/* Intake */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Yearly Intake Seats
                        </label>
                        <input
                          type="text"
                          value={courseIntake}
                          onChange={(e) => setCourseIntake(e.target.value)}
                          placeholder="120 Seats"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 focus:outline-hidden"
                        />
                      </div>

                      {/* Tuition Fees */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Tuition Fee / Year
                        </label>
                        <input
                          type="text"
                          value={courseFee}
                          onChange={(e) => setCourseFee(e.target.value)}
                          placeholder="$18,500 / year"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 focus:outline-hidden"
                        />
                      </div>

                      {/* Course Image */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          Cover Image URL
                        </label>
                        <input
                          type="url"
                          value={courseImage}
                          onChange={(e) => setCourseImage(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    {/* Brief description */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Brief Description *
                      </label>
                      <input
                        type="text"
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        placeholder="A concise description shown on primary listing cards."
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 focus:outline-hidden"
                        required
                      />
                    </div>

                    {/* Syllabus full info */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Detailed Syllabus Overview (Expanded Modal details)
                      </label>
                      <textarea
                        value={courseEligibility}
                        onChange={(e) => setCourseEligibility(e.target.value)}
                        placeholder="Describe the overall syllabus structure, credits, technologies covered..."
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 focus:outline-hidden resize-none"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={handleCancelForm}
                        className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-500 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg text-xs font-bold cursor-pointer shadow-xs"
                      >
                        {isEditing ? 'Save Changes' : 'Publish Course'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Courses grid with modify triggers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="admin-courses-listing-grid">
              {courses.map((course) => (
                <div key={course.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[9px] font-black uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-sm shrink-0">
                        {course.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold shrink-0">ID: {course.id}</span>
                    </div>
                    <h4 className="text-xs font-bold text-blue-950 tracking-tight line-clamp-2">
                      {course.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex justify-end gap-2">
                    <button
                      onClick={() => handleEditClick(course)}
                      className="p-1.5 bg-white border border-slate-200 text-blue-800 hover:bg-blue-50 hover:border-blue-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      title="Edit Course"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(course.id)}
                      className="p-1.5 bg-white border border-slate-200 text-red-600 hover:bg-red-50 hover:border-red-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: APPLICATIONS MANAGER */}
        {adminTab === 'applications' && (
          <div className="space-y-4" id="admin-applications-subpanel">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Student Admissions Folders</h3>

            {applications.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600 border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                      <th className="py-3 px-4">Applicant / Phone</th>
                      <th className="py-3 px-4">Course Desired</th>
                      <th className="py-3 px-4">Transcript scores</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Approve/Reject Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50">
                        <td className="py-4 px-4 space-y-0.5">
                          <div className="font-bold text-slate-800">{app.studentName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{app.studentEmail}</div>
                          <div className="text-[10px] text-slate-500">{app.studentPhone}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-blue-950">{app.courseName}</div>
                          <div className="text-[9px] text-slate-400 font-mono">Applied: {new Date(app.appliedAt).toLocaleDateString()}</div>
                        </td>
                        <td className="py-4 px-4 max-w-xs">
                          <p className="line-clamp-2 text-xxs font-mono bg-slate-50 p-1.5 rounded-md border border-slate-100">
                            {app.academicDetails}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            app.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : app.status === 'Rejected'
                              ? 'bg-red-50 text-red-600 border-red-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right space-x-1 whitespace-nowrap">
                          {app.status !== 'Approved' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'Approved')}
                              className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md text-[10px] font-bold cursor-pointer transition-colors"
                              title="Approve student folder"
                            >
                              Approve
                            </button>
                          )}
                          {app.status !== 'Rejected' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                              className="px-2 py-1 bg-red-50 text-red-650 hover:bg-red-100 rounded-md text-[10px] font-bold cursor-pointer transition-colors"
                              title="Reject folder"
                            >
                              Reject
                            </button>
                          )}
                          {app.status !== 'Pending' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'Pending')}
                              className="px-2 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-md text-[10px] font-bold cursor-pointer transition-colors"
                              title="Reset to Pending"
                            >
                              Pending
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-700">No Admission Applications Recieved</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Once prospective students submit online enrollment forms, they will populate here for evaluation.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CALLBACK ENQUIRIES */}
        {adminTab === 'enquiries' && (
          <div className="space-y-4" id="admin-enquiries-subpanel">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Popup Callback & counselor Requests</h3>

            {enquiries.length > 0 ? (
              <div className="space-y-3">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2.5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-2">
                      <div>
                        <span className="font-bold text-slate-800 text-sm">{enq.studentName}</span>
                        <span className="text-[10px] text-slate-400 font-mono ml-2">Email: {enq.email} | Phone: {enq.phone}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-150">
                        Submitted: {new Date(enq.submittedAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <div>
                        <span className="font-bold text-blue-900">INTERESTED COHORT:</span> {enq.interestedCourse}
                      </div>
                      <div className="bg-white p-2.5 rounded-md border border-slate-100 text-slate-600 leading-relaxed font-mono text-[11px]">
                        "{enq.message || 'No specific questions described'}"
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <Phone className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-700">No Callback Inquiries Submitted</h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  Once a guest or student requests "Call Now" callback guides, they will populate here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: REGISTERED STUDENTS */}
        {adminTab === 'students' && (
          <div className="space-y-4" id="admin-students-subpanel">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Registered Student Directory</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Account ID</th>
                    <th className="py-3 px-4">Contact Details</th>
                    <th className="py-3 px-4">Academic GPAs / Scores</th>
                    <th className="py-3 px-4 text-right">Join Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.filter(u => u.role === 'student').map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/50">
                      <td className="py-4 px-4 font-bold text-slate-800">
                        {student.fullName}
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-400 text-xxs">
                        {student.id}
                      </td>
                      <td className="py-4 px-4 space-y-0.5">
                        <div className="font-mono text-slate-600">{student.email}</div>
                        <div className="text-slate-500 text-xxs">{student.phone || 'Phone Unspecified'}</div>
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <p className="line-clamp-2 text-xxs bg-slate-50 p-1 rounded-sm border border-slate-100 font-mono">
                          {student.academicDetails || 'No metrics supplied yet'}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-right text-slate-400 font-mono text-xxs">
                        {new Date(student.joinedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
