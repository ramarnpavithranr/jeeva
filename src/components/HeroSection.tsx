import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Sparkles, ArrowRight, ShieldCheck, Zap, Terminal, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { FEST_STATS } from '../data/events';

export const HeroSection: React.FC = () => {
  // Live Countdown to Fest Date: March 27, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 38,
    seconds: 20,
  });

  useEffect(() => {
    // Realistic live countdown ticking
    const targetDate = new Date('2026-03-27T09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call to Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 backdrop-blur-md shadow-lg shadow-emerald-500/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-widest">
                National Level Mega Tech Fest • 2026
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-none">
              INNOVATE.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-teal-300">
                CREATE.
              </span>{' '}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-400 to-teal-200">
                DOMINATE.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300/90 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Experience the future of technology at our flagship college fest. Compete in high-stakes coding, robotics, esports, and design challenges to claim glory and cash rewards.
            </p>

            {/* Date & Venue Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-300 pt-2">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">{FEST_STATS.festDates}</span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-semibold text-white">{FEST_STATS.location}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/events"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm sm:text-base border border-slate-700/80 hover:border-emerald-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <span>Explore Events</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </Link>
            </div>

            {/* Ticker / Countdown Row */}
            <div className="pt-6 border-t border-slate-800/80">
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">
                Fest Starts In:
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto lg:mx-0">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-2 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800/90 text-center backdrop-blur-md shadow-sm"
                  >
                    <div className="text-lg sm:text-2xl font-black text-emerald-300 font-mono">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Isometric Holographic Cyber Portal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* 3D Visual Stage */}
            <div className="relative w-full max-w-[420px] aspect-square perspective-1000">
              {/* Outer Glowing Ring */}
              <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-pulse-glow" />
              <div className="absolute -inset-4 rounded-full border border-teal-500/20 border-dashed animate-spin" style={{ animationDuration: '40s' }} />

              {/* Central 3D Card Stack with Isometric Tilt */}
              <div className="relative w-full h-full transform-style-3d rotate-x-12 rotate-y-[-16deg] hover:rotate-x-0 hover:rotate-y-0 transition-transform duration-700 ease-out">
                {/* Back card */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-950/70 to-teal-950/50 border border-emerald-500/30 transform -translate-y-4 translate-x-4 blur-[1px] opacity-70" />

                {/* Main Hero Showcase Card */}
                <div className="relative h-full w-full rounded-3xl glass-panel-glow p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
                  {/* Subtle scanline */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

                  {/* Top card header */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                      LIVE_STAGE://XORA-26
                    </span>
                  </div>

                  {/* 3D Holographic Cube Visual */}
                  <div className="relative py-8 flex items-center justify-center z-10">
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center animate-float-slow">
                      {/* Geometric rotating wireframe illusion */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-green-600/30 to-teal-600/30 border border-emerald-400/50 backdrop-blur-md transform rotate-12" />
                      <div className="absolute inset-2 rounded-2xl bg-slate-950/80 border border-emerald-500/40 backdrop-blur-md transform -rotate-6 flex flex-col items-center justify-center p-4 text-center">
                        <Trophy className="w-10 h-10 text-amber-400 mb-2 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
                        <span className="text-sm font-black text-white">PRIZE POOL</span>
                        <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-lime-200">
                          {FEST_STATS.totalPrizePool}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive badges at bottom */}
                  <div className="space-y-2.5 z-10">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-300 font-medium">18+ National Events</span>
                      </div>
                      <span className="text-emerald-400 font-bold">Open</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span className="text-slate-300 font-medium">Spot & Online Entry</span>
                      </div>
                      <span className="text-emerald-400 font-bold">Fast Pass</span>
                    </div>
                  </div>
                </div>

                {/* Floating Chips with 3D offset */}
                <div className="absolute -bottom-6 -left-6 z-20 px-4 py-2.5 rounded-2xl glass-panel border border-emerald-500/40 text-xs font-bold text-emerald-300 shadow-xl flex items-center gap-2 transform translate-z-20">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Authorized Certificate for All</span>
                </div>

                <div className="absolute -top-6 -right-4 z-20 px-3.5 py-2 rounded-2xl glass-panel border border-teal-500/40 text-xs font-bold text-teal-300 shadow-xl flex items-center gap-2 transform translate-z-20">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>75+ Colleges Enrolled</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
