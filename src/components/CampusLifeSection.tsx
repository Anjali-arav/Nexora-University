/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building, BookOpen, Hotel, Trophy, Sparkles, Map, Info, HelpCircle } from 'lucide-react';
import { CAMPUS_LIFE } from '../data';

export default function CampusLifeSection() {
  const [activeFacility, setActiveFacility] = useState(CAMPUS_LIFE[0].id);

  const getFacilityIcon = (title: string) => {
    const name = title.toLowerCase();
    if (name.includes('lab') || name.includes('computing')) return <Building className="w-5 h-5 text-blue-800" />;
    if (name.includes('library')) return <BookOpen className="w-5 h-5 text-blue-800" />;
    if (name.includes('hostel') || name.includes('residence')) return <Hotel className="w-5 h-5 text-blue-800" />;
    if (name.includes('sports') || name.includes('aquatic')) return <Trophy className="w-5 h-5 text-blue-800" />;
    return <Sparkles className="w-5 h-5 text-blue-800" />;
  };

  const currentSelection = CAMPUS_LIFE.find(fac => fac.id === activeFacility) || CAMPUS_LIFE[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="campus-life-section-wrapper">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
          Our Facilities
        </span>
        <h2 className="text-3xl font-sans font-black text-blue-950 tracking-tight leading-none">
          Nexora Campus Lifestyle & Modern Infrastructure
        </h2>
        <p className="text-sm text-slate-500">
          Our dynamic state-of-the-art campus is custom-built to support round-the-clock research, high-performance athletic drives, and comfortable student residences.
        </p>
      </div>

      {/* Interactive Interactive Showcase split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="interactive-facility-showcase">
        
        {/* Left selector menu buttons */}
        <div className="lg:col-span-4 flex flex-col justify-start gap-3.5" id="facility-selectors">
          <span className="text-xxs uppercase tracking-wider text-slate-400 font-bold block px-2">
            Campus Infrastructure Directory
          </span>

          {CAMPUS_LIFE.map((fac) => (
            <button
              key={fac.id}
              onClick={() => setActiveFacility(fac.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                activeFacility === fac.id
                  ? 'bg-blue-950 border-blue-950 text-white shadow-md shadow-blue-950/20'
                  : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
              }`}
              id={`facility-btn-${fac.id}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  activeFacility === fac.id ? 'bg-amber-500 text-blue-950' : 'bg-slate-50 text-slate-500 group-hover:bg-slate-100'
                }`}>
                  {getFacilityIcon(fac.title)}
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider line-clamp-1">{fac.title}</h4>
                  <span className={`text-[10px] ${activeFacility === fac.id ? 'text-amber-400 font-medium' : 'text-slate-400'}`}>
                    {fac.tag}
                  </span>
                </div>
              </div>
              <span className={`text-xs transition-transform duration-300 ${
                activeFacility === fac.id ? 'text-amber-400 translate-x-1' : 'text-slate-300 group-hover:translate-x-1'
              }`}>
                ➔
              </span>
            </button>
          ))}
        </div>

        {/* Right Preview details with motion fade-in */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between" id="facility-viewer">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFacility}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-between h-full"
            >
              {/* Feature Image with tag */}
              <div className="relative h-72 sm:h-96 w-full bg-slate-100">
                <img
                  src={currentSelection.image}
                  alt={currentSelection.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-5 bg-amber-500 text-blue-950 text-xxs font-black uppercase tracking-widest px-3 py-1.5 rounded-md">
                  ★ {currentSelection.tag}
                </span>
              </div>

              {/* Text Area */}
              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-950 tracking-tight leading-none uppercase">
                  {currentSelection.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentSelection.desc}
                </p>

                {/* Meta details highlights */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-500">
                  <div>
                    <span className="text-amber-600 font-bold block mb-1">ACCESS HOURS</span>
                    <span>24 / 7 Active Access</span>
                  </div>
                  <div>
                    <span className="text-amber-600 font-bold block mb-1">CAPACITY STATUS</span>
                    <span>Fully Serviced</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-amber-600 font-bold block mb-1">CLEAN PROTOCOLS</span>
                    <span>Standard ISO Certified</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>


      {/* Static Visual Campus Map section */}
      <section className="bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center" id="campus-map-highlight">
        
        {/* Texts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-lg flex items-center justify-center">
            <Map className="w-5.5 h-5.5" />
          </div>
          <h3 className="text-xl font-bold text-blue-950 uppercase tracking-wider">
            Smart Virtual Campus Guide
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Spreading over 120 lush-green acres, our modern layout is fully digitized with secure NFC barriers, dynamic campus shuttle buses tracking, and ambient green reserves.
          </p>
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span>Free Campus WiFi: "Nexora_Secure_Guest"</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span>Solar Infrastructure: 100% Net Zero Energy Grid</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Shuttle Schedule: Every 15 minutes across sectors</span>
            </div>
          </div>
        </div>

        {/* Beautiful Map Graphic Simulation */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/60 shadow-lg p-5 space-y-4 relative overflow-hidden">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
            Interactive Campus Grid Representation
          </span>

          {/* SVG Map Graphic simulation with hover pins */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg h-56 flex flex-col justify-between p-4 relative font-sans overflow-hidden">
            {/* Mock Vector Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

            {/* Simulated Road Paths */}
            <div className="absolute top-1/4 left-0 right-0 h-4 bg-slate-200/50 -rotate-3 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-1/3 w-4 bg-slate-200/50 rotate-12 pointer-events-none" />

            {/* Interactive styled hover tags/pins inside map */}
            <div className="absolute top-8 left-1/4 bg-blue-900 text-white text-[9px] font-bold px-2 py-1 rounded-sm shadow-xs border border-white cursor-pointer hover:bg-amber-500 hover:text-blue-950 transition-colors">
              📍 Tech Hub Lab
            </div>
            <div className="absolute bottom-12 left-1/3 bg-blue-900 text-white text-[9px] font-bold px-2 py-1 rounded-sm shadow-xs border border-white cursor-pointer hover:bg-amber-500 hover:text-blue-950 transition-colors">
              📍 Central Library
            </div>
            <div className="absolute top-1/2 right-12 bg-blue-900 text-white text-[9px] font-bold px-2 py-1 rounded-sm shadow-xs border border-white cursor-pointer hover:bg-amber-500 hover:text-blue-950 transition-colors">
              📍 Dorms Alpha
            </div>
            <div className="absolute bottom-6 right-1/4 bg-blue-900 text-white text-[9px] font-bold px-2 py-1 rounded-sm shadow-xs border border-white cursor-pointer hover:bg-amber-500 hover:text-blue-950 transition-colors">
              📍 Sports Arena
            </div>

            {/* Map Legend */}
            <div className="mt-auto relative z-10 flex gap-4 text-[9px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                Sectors Active
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Transit Paths
              </span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
