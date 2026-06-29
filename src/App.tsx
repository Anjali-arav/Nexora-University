/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import AuthModal from './components/AuthModal';

// Pages Modules
import HomeSection from './components/HomeSection';
import CoursesSection from './components/CoursesSection';
import AchievementsSection from './components/AchievementsSection';
import CampusLifeSection from './components/CampusLifeSection';
import AdmissionSection from './components/AdmissionSection';
import ContactSection from './components/ContactSection';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';

// Custom icons
import { Award, Compass, Heart, Users, Shield, ArrowRight, CheckCircle } from 'lucide-react';

function AppContent() {
  const { currentUser } = useAppContext();
  
  // Navigation States
  const [activeTab, setActiveTab] = useState<string>('home');
  const [preselectedCourse, setPreselectedCourse] = useState<string>('');

  // Authentication & Callback Enquiry Modal Toggles
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  // Trigger Auth
  const handleOpenAuth = (tab: 'login' | 'register') => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  // Callback from Course Catalog to Admission Form
  const handleNavigateToApply = (courseId: string, courseName: string) => {
    setPreselectedCourse(courseId);
    setActiveTab('admission');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between font-sans selection:bg-blue-800 selection:text-white" id="nexora-portal-root">
      
      {/* 1. Sticky Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCallNow={() => setEnquiryOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* 2. Main Body Content Switcher */}
      <main className="flex-grow py-6 sm:py-10">
        {activeTab === 'home' && (
          <HomeSection
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCallNow={() => setEnquiryOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16" id="about-page">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">ABOUT NEXORA</span>
              <h2 className="text-3xl font-sans font-black text-blue-950 tracking-tight">Our Academic Foundations & Visionaries</h2>
              <p className="text-sm text-slate-500">Established in 2015, Nexora University shapes standard global research pathways for aspiring leaders and researchers.</p>
            </div>

            {/* Split row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-blue-950">Nurturing Technical Competency & Scientific Inquiry</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our comprehensive curriculum represents standard global standards. From clean laboratories to collaborative design libraries, we deliver modern infrastructures where students transform theories into commercial, scalable solutions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                    <span className="text-xl font-bold text-blue-900 block">10,000+</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Students</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                    <span className="text-xl font-bold text-blue-900 block">100+</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Ph.D Faculty</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                    <span className="text-xl font-bold text-blue-900 block">95%</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Placement</span>
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-150 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
                  alt="Campus Life"
                  className="w-full h-72 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Vision and Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs space-y-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-lg flex items-center justify-center">
                  <Compass className="w-5.5 h-5.5" />
                </div>
                <h4 className="text-base font-bold text-blue-950 uppercase tracking-wider">The Academic Vision</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To establish an internationally recognized academic framework that empowers prospective young engineers and leaders to create ethical, scalable benefits for global communities and modern businesses.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs space-y-4">
                <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center">
                  <Heart className="w-5.5 h-5.5" />
                </div>
                <h4 className="text-base font-bold text-blue-950 uppercase tracking-wider">The Academic Mission</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our mission is to translate traditional scholastic pathways into interactive, technology-guided frameworks that support hands-on clean labs experimentation, deep research journals publication, and sports excellence.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <CoursesSection
            onOpenAuth={handleOpenAuth}
            onNavigateToApply={handleNavigateToApply}
          />
        )}

        {activeTab === 'achievements' && <AchievementsSection />}

        {activeTab === 'campus' && <CampusLifeSection />}

        {activeTab === 'admission' && (
          <AdmissionSection
            onOpenAuth={handleOpenAuth}
            preselectedCourseId={preselectedCourse}
          />
        )}

        {activeTab === 'contact' && <ContactSection />}

        {activeTab === 'dashboard' && <StudentDashboard />}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* 3. Global Footer Section */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCallNow={() => setEnquiryOpen(true)}
      />

      {/* 4. Global Callback Modal (Call Now Popup) */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />

      {/* 5. Global Authentication Modal (Login/Register Forms) */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialTab={authTab}
      />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
