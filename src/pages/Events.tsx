import React from 'react';
import { Layers, Sparkles } from 'lucide-react';
import { EventGrid } from '../components/EventGrid';
import { EVENTS } from '../data/events';

export const Events: React.FC = () => {
  return (
    <div className="pt-32 pb-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official Event Lineup</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
            Explore All{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-teal-300">
              Competitions
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Filter through technical hackathons, coding sprints, paper presentations, hardware expos, esports championships, and cultural stages. Discover rules, eligibility, cash rewards, and register online.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Over ₹2,50,000 in Prizes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Official University Participation Certificates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>Free Wi-Fi & Food Coupons for Registered Attendees</span>
            </div>
          </div>
        </div>

        {/* Interactive Event Grid with Search, Categories, and Sort */}
        <EventGrid events={EVENTS} showFilters={true} />
      </div>
    </div>
  );
};
