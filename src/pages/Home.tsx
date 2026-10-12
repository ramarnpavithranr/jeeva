import React from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Users,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  Flame,
  Code2,
  Cpu,
  Gamepad2,
  CheckCircle2,
  Star,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/HeroSection';
import { EventCard } from '../components/EventCard';
import { ScheduleSection } from '../components/ScheduleSection';
import { EVENTS, FEST_STATS } from '../data/events';

export const Home: React.FC = () => {
  const featuredEvents = EVENTS.filter((e) => e.featured).slice(0, 6);

  const statsList = [
    {
      label: 'Total Events',
      value: FEST_STATS.totalEvents,
      icon: Layers,
      color: 'from-emerald-400 to-green-500',
      description: 'Technical, Cultural & Gaming tracks',
    },
    {
      label: 'Colleges Participating',
      value: FEST_STATS.participatingColleges,
      icon: Award,
      color: 'from-teal-400 to-emerald-500',
      description: 'Premier institutes nationwide',
    },
    {
      label: 'Expected Participants',
      value: FEST_STATS.expectedParticipants,
      icon: Users,
      color: 'from-green-400 to-lime-500',
      description: 'Students, hackers, artists & designers',
    },
    {
      label: 'Total Prize Pool',
      value: FEST_STATS.totalPrizePool,
      icon: Trophy,
      color: 'from-emerald-300 to-teal-400',
      description: 'Cash prizes, gadgets & trophies',
    },
  ];

  const features = [
    {
      icon: Code2,
      title: 'Algorithmic Mastery',
      description: 'Battle-tested problem sets spanning dynamic programming, graph theory, and real-time concurrency under timer pressure.',
      badge: 'Competitive',
    },
    {
      icon: Cpu,
      title: 'Robotics & Hardware Expo',
      description: 'Interact with autonomous drones, AI robots, embedded IoT devices, and microcontrollers crafted by top engineering teams.',
      badge: 'Hardware',
    },
    {
      icon: Gamepad2,
      title: 'LAN Arena E-Sports',
      description: 'Low-latency competitive brackets featuring Valorant 5v5 and BGMI squads with live casting and massive hall projections.',
      badge: 'High FPS',
    },
    {
      icon: Sparkles,
      title: 'Cultural Extravaganza',
      description: 'Concert sound systems, stage laser choreography, battle of the bands, and celebrity DJ performances under the stars.',
      badge: 'Live Stage',
    },
  ];

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Event Statistics Strip */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {statsList.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl glass-panel border border-slate-800/80 hover:border-slate-700 transition-all hover:scale-[1.02] group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${stat.color} p-[1px] mb-4`}>
                  <div className="w-full h-full bg-[#080c1e] rounded-[11px] flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-300 mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About the Event Section */}
      <section id="about" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-emerald-400" />
                <span>About EventXora 2026</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Where Engineering Meets{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-teal-300">
                  Unbounded Imagination.
                </span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                EventXora is the crown-jewel annual national technology and cultural symposium hosted at {FEST_STATS.collegeName}. Bringing together the brightest minds, hackers, designers, and performers from across 75+ universities, our festival is a melting pot of pure talent and breakthrough innovations.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Official merit certificates and trophy honors for winners',
                  'Networking with top technical leads, researchers, and VC mentors',
                  'High-speed Wi-Fi, lab workstations, and campus meal kits provided',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 transition-colors"
                >
                  <span>Browse All 18+ Events</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </Link>
              </div>
            </div>

            {/* Right Feature Cards in 2x2 Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 rounded-2xl glass-panel-glow border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <feat.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {feat.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Events Showcase */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Featured Competitions</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Top Flagship <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-teal-300">Events</span>
              </h2>
            </div>

            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 text-xs sm:text-sm font-bold border border-slate-800 hover:border-slate-700 transition-all self-start md:self-auto"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredEvents.map((event, idx) => (
              <EventCard key={event.id} event={event} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Prize Pool Section with 3D Podiums */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Rewards & Honors</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Massive <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-200">₹2,50,000+</span> Prize Pool
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Excellence deserves celebration. Stand atop the podium to claim grand cash prizes, trophies, premium software subscriptions, and recruiter recommendations.
            </p>
          </div>

          {/* 3 Tier Podiums */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-end">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-700/80 text-center relative order-2 md:order-1"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 shadow-lg">
                <Award className="w-8 h-8 text-slate-300" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                2nd Runner-up
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-100 my-2">
                Silver Honors
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Lucrative cash rewards, silver cup trophy, and certificates of distinction.
              </p>
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
                Up to ₹25,000 / Event
              </div>
            </motion.div>

            {/* 1st Place (Center & Elevated) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 sm:p-10 rounded-3xl glass-panel-glow border-2 border-amber-500/50 text-center relative order-1 md:order-2 transform md:-translate-y-4 shadow-2xl shadow-amber-500/10"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-black" />
                Grand Champion
              </div>

              <div className="w-16 h-16 mx-auto mb-4 mt-2 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                <Trophy className="w-9 h-9" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                1st Place Winner
              </span>
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 my-2">
                Gold Supremacy
              </div>
              <p className="text-xs text-slate-300 mb-6">
                Maximum cash bounties, rolling gold trophy, VIP passes, and direct internship fast-tracks.
              </p>
              <div className="px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-sm font-black text-amber-300 shadow-inner">
                Up to ₹40,000 / Event
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 sm:p-8 rounded-2xl glass-panel border border-amber-800/60 text-center relative order-3"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-950/60 border border-amber-700/60 flex items-center justify-center text-amber-600 shadow-lg">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                3rd Runner-up
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-200/90 my-2">
                Bronze Honors
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Exciting cash prizes, bronze shields, and festival merchandise hampers.
              </p>
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
                Up to ₹12,000 / Event
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Event Schedule Section */}
      <ScheduleSection />

      {/* 7. Bottom Call To Action Banner */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-emerald-950/90 via-[#071f16]/90 to-slate-950 border border-emerald-500/40 shadow-2xl text-center">
            <div className="absolute inset-0 bg-cyber-grid opacity-25" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="px-4 py-1.5 rounded-full bg-emerald-950 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-widest">
                Seats Filling Fast
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Ready to Prove Your Tech Dominance?
              </h2>

              <p className="text-slate-300 text-sm sm:text-base">
                Join over 3,500 students from across the country. Register now to claim your spot before event slots are locked.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Register Free / Fast Pass</span>
                </Link>

                <Link
                  to="/events"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Explore All Competitions</span>
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
