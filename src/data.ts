/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'cs-ai',
    name: 'B.Tech in Artificial Intelligence & Machine Learning',
    category: 'Artificial Intelligence',
    duration: '4 Years',
    description: 'Learn neural networks, deep learning, computer vision, natural language processing, and robotic systems.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    fullDetails: 'This state-of-the-art program covers advanced computing principles, mathematical foundations of machine learning, cloud architecture, and moral frameworks of AI. Students engage in hands-on capstone research projects and get exclusive access to Nexora\'s high-performance AI research cluster.',
    eligibility: 'Minimum 60% aggregate in Physics, Chemistry, and Mathematics (10+2 standard or equivalent).',
    fee: '$18,500 / year',
    intake: '120 Seats'
  },
  {
    id: 'cs-se',
    name: 'B.Sc in Computer Science & Software Engineering',
    category: 'Computer Science',
    duration: '3 Years',
    description: 'Master core software engineering principles, algorithms, database systems, and full-stack web architectures.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    fullDetails: 'An intensive curriculum covering software development life cycle (SDLC), agile methodologies, functional and object-oriented paradigms, cloud computing, and advanced security concepts. Prepares students for elite technical roles in the global digital ecosystem.',
    eligibility: '10+2 with Mathematics as a compulsory subject, aggregate 55% or higher.',
    fee: '$15,000 / year',
    intake: '150 Seats'
  },
  {
    id: 'eng-me',
    name: 'B.Tech in Robotics & Mechatronics Engineering',
    category: 'Engineering',
    duration: '4 Years',
    description: 'Bridge mechanical systems, sensor technologies, embedded firmware, and robotic automations.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    fullDetails: 'Our Mechatronics program provides physical labs and advanced solid modeling tools. Students master system dynamics, automated manufacturing systems, electrical design, microprocessors, and cyber-physical integration with live experimental work.',
    eligibility: 'Minimum 60% in high-school science stream with excellent mathematics records.',
    fee: '$17,200 / year',
    intake: '80 Seats'
  },
  {
    id: 'elec-vlsi',
    name: 'B.Tech in Electronics & VLSI System Design',
    category: 'Electronics',
    duration: '4 Years',
    description: 'Study semiconductor physics, circuit design, VLSI architectures, microprocessors, and IoT hardware.',
    image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=800&q=80',
    fullDetails: 'Explore custom IC design, FPGA prototyping, signal processing, high-frequency telecommunications, and low-power hardware layouts. Hands-on training inside clean labs and advanced EDA toolkits from industry leaders.',
    eligibility: '10+2 standard with Physics and Mathematics, minimum 60% score.',
    fee: '$16,800 / year',
    intake: '90 Seats'
  },
  {
    id: 'mgt-mba',
    name: 'Master of Business Administration (Global MBA)',
    category: 'MBA',
    duration: '2 Years',
    description: 'An elite global management study on strategic leadership, design thinking, and international markets.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    fullDetails: 'Curated for future enterprise visionaries. Emphasizes real-world case studies, design thinking, global risk management, strategic consulting, venture building, and high-impact boardroom presentation capabilities.',
    eligibility: 'Bachelor\'s degree in any discipline with minimum 50% score. Satisfactory performance in admissions screening.',
    fee: '$22,000 / year',
    intake: '100 Seats'
  },
  {
    id: 'mgt-ba',
    name: 'Bachelor of Business Administration (BBA) in Fintech',
    category: 'Business Administration',
    duration: '3 Years',
    description: 'Explore business management, capital structures, digital assets, and algorithmic financial planning.',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80',
    fullDetails: 'Combines the foundations of a traditional BBA with digital innovation: blockchain technology, predictive financial models, data-driven marketing, micro-lending systems, and regulatory tech.',
    eligibility: '10+2 standard from any stream with minimum 50% aggregate score.',
    fee: '$14,000 / year',
    intake: '120 Seats'
  },
  {
    id: 'sci-ds',
    name: 'M.Sc in Data Science & Big Data Analytics',
    category: 'Data Science',
    duration: '2 Years',
    description: 'Master statistics, large-scale data engineering, Spark systems, and business intelligence models.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    fullDetails: 'Learn how to model, structure, clean, analyze, and visualize multi-terabyte datasets. The course leverages python ecosystems, R programming, AWS database scaling, and predictive statistical inferencing.',
    eligibility: 'B.Sc / B.Tech / B.E. in Mathematics, Computer Science, Statistics, or similar quantitative domain.',
    fee: '$19,000 / year',
    intake: '60 Seats'
  },
  {
    id: 'sci-bio',
    name: 'B.Sc in Biotechnology & Genetic Engineering',
    category: 'Biotechnology',
    duration: '3 Years',
    description: 'Dive deep into cellular biology, biochemistry, clinical therapeutics, and gene CRISPR technology.',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80',
    fullDetails: 'A high-impact study covering molecular genetics, bioprocess engineering, bioinformatics, agricultural improvements, and ethics of genetic manipulation. Students complete active lab terms inside our advanced medical research labs.',
    eligibility: '10+2 with Biology, Physics, and Chemistry, aggregate 55% or higher.',
    fee: '$15,500 / year',
    intake: '75 Seats'
  }
];

export const CATEGORIES = [
  'All',
  'Engineering',
  'Computer Science',
  'Artificial Intelligence',
  'Electronics',
  'MBA',
  'Business Administration',
  'Data Science',
  'Biotechnology'
];

export const STATS = [
  { value: '10,000+', label: 'Active Students', desc: 'From 45+ nations globally' },
  { value: '100+', label: 'Faculty Members', desc: 'Ph.D scholars & industry veterans' },
  { value: '50+', label: 'Premium Courses', desc: 'Accredited globally' },
  { value: '95%', label: 'Placement Rate', desc: 'At leading tech & business conglomerates' }
];

export const ACHIEVEMENTS = [
  {
    id: 'ach-1',
    category: 'University Awards',
    title: 'Ranked #1 for Innovation & Technology Research',
    description: 'Awarded by the National Education Council for pioneering machine learning research integrations and campus digitization efforts.',
    badge: 'Global Rank #124',
    icon: 'Award'
  },
  {
    id: 'ach-2',
    category: 'Student Achievements',
    title: 'Nexora Rover Team Wins International Space Challenge',
    description: 'A stellar multidisciplinary team of 12 students designed an autonomous Mars Rover prototype, winning the international grand final in Geneva.',
    badge: '1st Place Winner',
    icon: 'Trophy'
  },
  {
    id: 'ach-3',
    category: 'Research Achievements',
    title: '100+ Active Research Publications & Patents',
    description: 'Our computing and biotechnology faculties successfully published breakthrough studies in IEEE and Nature journals, filing 14 national patents.',
    badge: '100+ Publications',
    icon: 'BookOpen'
  },
  {
    id: 'ach-4',
    category: 'Placement Achievements',
    title: '5,000+ Successful Graduates Placed in Elite Fortune 500s',
    description: 'Our robust alumni network thrives across Apple, Google, McKinsey, SpaceX, and Goldman Sachs, with record salaries starting at $160K+.',
    badge: 'Top Placement Drive',
    icon: 'Briefcase'
  },
  {
    id: 'ach-5',
    category: 'Sports Achievements',
    title: 'All-University Sports Gold in Athletics & Basketball',
    description: 'Nexora Gladiators secured the Inter-University Sports Championship trophy for three consecutive seasons in swimming, track & field, and basketball.',
    badge: 'Gold Cup Winners',
    icon: 'Target'
  }
];

export const CAMPUS_LIFE = [
  {
    id: 'campus-1',
    title: 'Robotics & Advanced computing Lab',
    desc: 'Equipped with supercomputing server stacks, industry robotics arms, VR headsets, and FPGA boards.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tag: 'Innovation Hub'
  },
  {
    id: 'campus-2',
    title: 'The Great Nexora Library',
    desc: 'Containing over 250,000 physical volumes, digital access terminals, and private collaborative glass study rooms.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    tag: 'Resource Center'
  },
  {
    id: 'campus-3',
    title: 'Premium Student Residences (Hostels)',
    desc: 'Fully serviced modern single & double dorms featuring high-speed optic fiber, gyms, laundromats, and organic food courts.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    tag: 'Living Space'
  },
  {
    id: 'campus-4',
    title: 'Olympiad Sports Arena & Aquatic Center',
    desc: 'A complete sports facility boasting an indoor Olympic-sized pool, football turf, tennis courts, and a full athletic track.',
    image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=800&q=80',
    tag: 'Sports Complex'
  },
  {
    id: 'campus-5',
    title: 'The Nexora Grand Amphitheatre',
    desc: 'Our flagship arena hosting regular hackathons, celebrity guest keynotes, international music festivals, and graduation ceremonies.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    tag: 'Cultural Hub'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Fall Semester Registrations Opened',
    message: 'Admissions are officially open for all undergraduate & graduate cohorts. Early bird application window closes in 30 days.',
    date: 'June 25, 2026',
    type: 'info' as const
  },
  {
    id: 'notif-2',
    title: 'Global Research Grants Announced',
    message: 'Nexora is allocating $2.5 Million in funding for student-led AI and Sustainable Energy research projects starting next month.',
    date: 'June 20, 2026',
    type: 'success' as const
  },
  {
    id: 'notif-3',
    title: 'Annual Tech Hackathon Next Week',
    message: 'Prepare your teams for the Nexora DevQuest 2026! Over $10,000 in grand prizes and recruitment scouts from top firms.',
    date: 'June 18, 2026',
    type: 'info' as const
  }
];
