/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Award, Compass, Heart, ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react';
import { STATS } from '../data';

interface HomeSectionProps {
  onNavigate: (tabId: string) => void;
  onOpenCallNow: () => void;
}

export default function HomeSection({ onNavigate, onOpenCallNow }: HomeSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
      heading: 'Shape Your Future With Nexora University',
      subheading: 'World-class education, innovation and career opportunities',
      buttonText: 'Explore Courses',
      action: () => onNavigate('courses')
    },
    {
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80',
      heading: 'Learn Today, Lead Tomorrow',
      subheading: 'Build skills for a successful future',
      buttonText: 'Apply Now',
      action: () => onNavigate('admission')
    }
  ];

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="space-y-20 pb-16" id="home-section-container">
      
      {/* 1. Hero Image Slider */}
      <section className="relative h-[550px] sm:h-[650px] overflow-hidden bg-slate-900" id="hero-slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0.8, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            {/* Ambient Dark Overlay with Brand Blue hint */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-900/75 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Slider Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold tracking-wider uppercase mb-5"
              >
                <Award className="w-3.5 h-3.5" />
                Global Leadership Academy
              </motion.div>

              <motion.h1
                key={`h1-${currentSlide}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight leading-tight text-white"
              >
                {slides[currentSlide].heading}
              </motion.h1>

              <motion.p
                key={`p-${currentSlide}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-medium"
              >
                {slides[currentSlide].subheading}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <button
                  onClick={slides[currentSlide].action}
                  className="px-7 py-3.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white rounded-lg text-sm font-bold tracking-wide transition-all shadow-lg shadow-blue-700/20 hover:scale-102 flex items-center gap-2 cursor-pointer"
                >
                  {slides[currentSlide].buttonText}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenCallNow}
                  className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-sm font-bold tracking-wide transition-all backdrop-blur-xs cursor-pointer"
                >
                  Admission Enquiry
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Carousel Slider Nav Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 p-2 bg-slate-900/35 hover:bg-slate-900/60 text-white rounded-full backdrop-blur-xs transition-all cursor-pointer hidden sm:block"
          id="hero-btn-prev"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 p-2 bg-slate-900/35 hover:bg-slate-900/60 text-white rounded-full backdrop-blur-xs transition-all cursor-pointer hidden sm:block"
          id="hero-btn-next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'bg-amber-500 scale-120' : 'bg-white/40 hover:bg-white/70'
              }`}
              id={`hero-dot-${idx}`}
            />
          ))}
        </div>
      </section>


      {/* 2. Stats Section Overview Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 relative z-10" id="stats-section">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2 border-b sm:border-b-0 pb-6 sm:pb-0 border-slate-100 last:border-b-0">
              <span className="text-3xl sm:text-4xl font-sans font-black text-blue-900 tracking-tight">
                {stat.value}
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                  {stat.label}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 3. About Nexora University Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
              Nexora Introduction
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-black text-blue-950 tracking-tight leading-tight">
              Pioneering Academic Excellence & Multi-Disciplinary Frontiers
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Established as an international center of academic excellence, Nexora University stands at the intersection of rigorous science, computational innovation, and global business practices. We empower the next generation of engineers, scientists, and leaders to break traditional boundaries.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Through strategic corporate partnerships, state-of-the-art cleanlabs, and a high-impact faculty representing Ph.D scholars from top-tier research institutes, we prepare students for dynamic environments requiring fluid adaptation, strong analytical foundations, and ethical vision.
            </p>

            {/* Core Values: Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
              <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider">
                  Our Vision
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To be a pre-eminent global research university cultivating intellectual freedom, pioneering tech, and creating scalable benefits for society.
                </p>
              </div>

              <div className="p-5 bg-amber-50/40 rounded-xl border border-amber-100 space-y-2">
                <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider">
                  Our Mission
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To provide holistic, immersive, and technology-enriched learning pathways that turn students into agile, industry-ready global leaders.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Image Block */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
                alt="Nexora Faculty Guidance"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent" />
              
              {/* Floating Highlight Card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-blue-950 font-black text-sm shrink-0">
                  95%
                </div>
                <div>
                  <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">Successful Career Placement</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Tracked globally across elite tech, biotech & consulting</p>
                </div>
              </div>
            </div>

            {/* Graphic Accent behind image */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-700/10 rounded-full blur-xl -z-10" />
          </div>

        </div>
      </section>


      {/* 4. Why Nexora Feature Grid */}
      <section className="bg-slate-50 py-16 border-y border-slate-100" id="why-choose-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
              Institutional Strengths
            </span>
            <h2 className="text-3xl font-sans font-black text-blue-950 tracking-tight">
              Why Choose Nexora University?
            </h2>
            <p className="text-sm text-slate-600">
              Discover the unique pillars that have placed Nexora at the pinnacle of modern academic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs space-y-4 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 bg-blue-100 text-blue-800 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-blue-950 uppercase tracking-wider">
                Globally Accredited Degrees
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our curriculum aligns fully with European ECTS and American university systems, ensuring seamless degree transfers, research collaboration, and credential approvals globally.
              </p>
            </div>

            {/* Column 2 */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs space-y-4 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-blue-950 uppercase tracking-wider">
                Advanced Industry Partnerships
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nexora works directly with tech giants, finance leaders, and health networks. Get early access to exclusive research internship placements, guest lectures, and recruitment drives.
              </p>
            </div>

            {/* Column 3 */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs space-y-4 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-blue-950 uppercase tracking-wider">
                Vibrant Cross-Cultural Community
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                With students representing 45+ countries, campus life is enriched by international hackathons, sports championships, diverse dining options, and creative student societies.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
