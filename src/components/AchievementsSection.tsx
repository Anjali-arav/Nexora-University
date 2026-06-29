/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Trophy, BookOpen, Users, Briefcase, Award, ArrowUpRight, GraduationCap } from 'lucide-react';
import { ACHIEVEMENTS } from '../data';

export default function AchievementsSection() {
  
  // Custom iconic mapper for badges
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-amber-500" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-amber-500" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-amber-500" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-amber-500" />;
      default: return <Trophy className="w-6 h-6 text-amber-500" />;
    }
  };

  const timelineMilestones = [
    { year: '2015', title: 'Nexora Foundation', desc: 'Inception of Nexora with 3 basic computer laboratories.' },
    { year: '2018', title: 'Global Accreditation Tier', desc: 'Secured primary academic alignment certifications across American & European credit platforms.' },
    { year: '2021', title: 'AI Research Cluster Unveiled', desc: 'Inaugurated the multi-million high-performance computing campus stack.' },
    { year: '2024', title: 'National Placement Trophy', desc: 'Ranked in top 5 national institutes for corporate technical placement programs.' },
    { year: '2026', title: 'Next-Gen Biotechnology Wing', desc: 'Unveiled advanced clinical diagnostic laboratories equipped with CRISPR research bays.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="achievements-section-wrapper">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
          Elite Accolades
        </span>
        <h2 className="text-3xl font-sans font-black text-blue-950 tracking-tight leading-none">
          Nexora Scholastic Achievements & Landmarks
        </h2>
        <p className="text-sm text-slate-500">
          Ranked among the top research-focused global universities, with active excellence recorded in patents, athletics, and elite startup founders.
        </p>
      </div>

      {/* Hero Achievement Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="spotlight-stats-row">
        
        {/* Spotlight Card 1 */}
        <div className="bg-gradient-to-br from-blue-950 to-blue-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-lg border border-blue-800">
          <div className="absolute right-3 bottom-3 text-white/5 font-sans font-black text-7xl select-none pointer-events-none">
            #1
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-amber-400 mb-4 border border-white/10">
            <Award className="w-5.5 h-5.5" />
          </div>
          <h3 className="text-xl font-bold">Ranked Among Top Universities</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Rated 5-Stars in teaching and computational systems by the Global University Index.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-400 font-bold">
            <span>Read Index Report</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Spotlight Card 2 */}
        <div className="bg-gradient-to-br from-blue-950 to-blue-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-lg border border-blue-800">
          <div className="absolute right-3 bottom-3 text-white/5 font-sans font-black text-7xl select-none pointer-events-none">
            100+
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-amber-400 mb-4 border border-white/10">
            <BookOpen className="w-5.5 h-5.5" />
          </div>
          <h3 className="text-xl font-bold">100+ Research Publications</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Revolutionary studies in artificial neural systems and genetic therapeutics published in high-impact journals.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-400 font-bold">
            <span>Explore Research Center</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Spotlight Card 3 */}
        <div className="bg-gradient-to-br from-blue-950 to-blue-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-lg border border-blue-800">
          <div className="absolute right-3 bottom-3 text-white/5 font-sans font-black text-7xl select-none pointer-events-none">
            5K+
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-amber-400 mb-4 border border-white/10">
            <GraduationCap className="w-5.5 h-5.5" />
          </div>
          <h3 className="text-xl font-bold">5,000+ Successful Graduates</h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Our alumni active inside multinational conglomerates, shaping technical paradigms worldwide.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-400 font-bold">
            <span>Browse Alumni Directory</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Categorized Detailed Accolades Grid */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-blue-950 border-b border-slate-100 pb-3 uppercase tracking-wider">
          University Achievements Directory
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="achievements-list-grid">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs flex items-start gap-4 hover:shadow-md transition-all"
              id={`achievement-row-${ach.id}`}
            >
              {/* Icon Container */}
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-200 shrink-0">
                {getIcon(ach.icon)}
              </div>

              {/* Text content */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-850 bg-blue-50 px-2 py-0.5 rounded-sm">
                  {ach.category}
                </span>
                <h4 className="text-sm font-bold text-blue-950 tracking-tight">
                  {ach.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {ach.description}
                </p>
                <div className="text-[10px] font-bold text-amber-600 font-mono pt-1">
                  ★ {ach.badge}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline design Section */}
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-100 space-y-8" id="timeline-box">
        <div className="text-center max-w-md mx-auto space-y-2">
          <h3 className="text-xl font-bold text-blue-950 uppercase tracking-wider">
            Nexora Chronological Journey
          </h3>
          <p className="text-xs text-slate-500">
            A fast-track timeline displaying our rapid evolution from a local computing center to an international powerhouse.
          </p>
        </div>

        {/* Visual Timeline component */}
        <div className="relative max-w-3xl mx-auto" id="visual-timeline-layout">
          {/* Vertical central bar */}
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-0.5 bg-slate-200" />

          <div className="space-y-8">
            {timelineMilestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:justify-start' : 'sm:justify-end'
                  }`}
                >
                  {/* Circle Pin indicator */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-[7px] w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow-xs z-10" />

                  {/* Bubble Container */}
                  <div
                    className={`w-full sm:w-[45%] pl-10 sm:pl-0 ${
                      isEven ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
                    }`}
                  >
                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs hover:border-blue-200 transition-colors">
                      <span className="text-xs font-black text-amber-600 font-mono block mb-1">
                        YEAR {milestone.year}
                      </span>
                      <h4 className="text-sm font-bold text-blue-950 tracking-tight">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
