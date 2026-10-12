import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FEST_SCHEDULE } from '../data/events';

export const ScheduleSection: React.FC = () => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const currentSchedule = FEST_SCHEDULE[activeDayIndex];

  return (
    <section id="schedule" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Festival Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">Schedule</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Two days packed with intense coding battles, paper symposiums, robotics showdowns, esports clash, and an explosive cultural evening.
          </p>

          {/* Day Tabs */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {FEST_SCHEDULE.map((dayData, idx) => {
              const isActive = activeDayIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveDayIndex(idx)}
                  className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-600/30 ring-2 ring-emerald-400/50 scale-105'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                  <span>{dayData.day}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline Items */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Glowing Timeline Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-emerald-400 via-green-500 to-teal-600/20" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDayIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              {currentSchedule.items.map((item, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={idx}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    } gap-4 sm:gap-8`}
                  >
                    {/* Glowing Marker Dot */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 w-5 h-5 rounded-full bg-slate-950 border-2 border-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)] z-20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-300" />
                    </div>

                    {/* Content Card (Takes half width on desktop) */}
                    <div className="w-full sm:w-[calc(50%-2rem)] pl-12 sm:pl-0">
                      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-[#06150f]/90 border border-slate-800/90 hover:border-emerald-500/40 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group">
                        {/* Time & Category Pill */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/70 border border-emerald-500/30 text-emerald-300">
                            <Clock className="w-3.5 h-3.5" />
                            {item.time}
                          </span>

                          <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {item.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                          {item.title}
                        </h4>

                        {/* Venue */}
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                          <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <span>{item.venue}</span>
                        </div>

                        {/* Optional Speaker or description */}
                        {'speaker' in item && item.speaker && (
                          <div className="text-xs text-slate-300/80 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 mb-3">
                            <span className="text-emerald-400 font-semibold">Keynote:</span> {item.speaker}
                          </div>
                        )}

                        {/* Link to details if this corresponds to an event */}
                        {'eventId' in item && item.eventId && (
                          <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
                            <Link
                              to={`/events/${item.eventId}`}
                              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group/link"
                            >
                              <span>Event Information</span>
                              <ArrowRight className="w-3 h-3 group-link-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                              to={`/register?event=${item.eventId}`}
                              className="text-xs font-bold text-teal-400 hover:text-teal-300"
                            >
                              Register Now
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Schedule Download & Venue Map Notice */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Timings are strictly adhered to. Report to respective venues 15 minutes prior.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
