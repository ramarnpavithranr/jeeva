import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Phone,
  ShieldCheck,
  AlertCircle,
  Share2,
  Tag
} from 'lucide-react';
import { EVENTS } from '../data/events';

export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = EVENTS.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="pt-40 pb-24 min-h-[70vh] flex items-center justify-center relative z-10 px-4">
        <div className="max-w-md w-full p-8 rounded-3xl glass-panel-glow border border-slate-800 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Event Not Found</h2>
          <p className="text-sm text-slate-400 mb-6">
            The event with ID <code className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded">"{id}"</code> could not be located in our records.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${event.title} - EventXora 2026`,
        text: event.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  return (
    <div className="pt-28 pb-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Events</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-800 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Share</span>
          </button>
        </div>

        {/* Hero Banner Card */}
        <div className="relative rounded-3xl overflow-hidden glass-panel-glow border border-slate-800/90 shadow-2xl mb-10">
          {/* Backdrop Image */}
          <div className="relative h-64 sm:h-96 w-full overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04120d] via-[#04120d]/75 to-transparent" />
            <div className="absolute inset-0 bg-radial-gradient opacity-60" />

            {/* Top Badges */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2.5 z-10">
              <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 shadow-md">
                {event.category}
              </span>
              <span className="px-3.5 py-1 text-xs font-bold rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-200">
                {event.scheduleDay}
              </span>
            </div>
          </div>

          {/* Banner Floating Title Content */}
          <div className="p-6 sm:p-10 -mt-24 sm:-mt-32 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  {event.title}
                </h1>
                <p className="text-base sm:text-xl text-emerald-300 font-medium">
                  {event.tagline}
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  to={`/register?event=${event.id}`}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Register for this Event</span>
                </Link>
                <div className="text-center text-xs text-slate-400">
                  Entry Fee: <strong className="text-emerald-400">{event.registrationFee}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid: Left Information & Right Key Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Column: Full Description, Rules, Eligibility */}
          <div className="lg:col-span-8 space-y-8">
            {/* Detailed Overview */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-emerald-400" />
                <span>Event Overview</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {event.fullDescription}
              </p>
            </div>

            {/* Rules and Regulations */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
                <span>Rules & Regulations</span>
              </h2>
              <ul className="space-y-3">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility Criteria */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <span>Eligibility Criteria</span>
              </h2>
              <ul className="space-y-3">
                {event.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Event Coordinators */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>Event Coordinators & Student Leads</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {event.coordinators.map((coord, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="font-bold text-white text-sm">{coord.name}</div>
                    <div className="text-xs text-slate-400">{coord.role}</div>
                    <div className="text-xs text-emerald-400 font-mono mt-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{coord.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Key Details & Prize Breakdown */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Details Box */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                Key Event Info
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Date</span>
                    <span className="font-semibold text-white">{event.date}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Time</span>
                    <span className="font-semibold text-white">{event.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Venue</span>
                    <span className="font-semibold text-white">{event.venue}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Team Size</span>
                    <span className="font-semibold text-white">
                      {event.teamType} ({event.minTeamSize} to {event.maxTeamSize} members)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prize Card */}
            <div className="p-6 rounded-2xl glass-panel-glow border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Prize Breakdown</h3>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Total Prize Pool
                </span>
                <div className="text-2xl font-black text-amber-300 font-mono mt-0.5">
                  {event.prizes.total}
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-amber-400 font-bold">1st Prize</span>
                  <span className="text-slate-200 font-semibold">{event.prizes.first}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300 font-bold">2nd Prize</span>
                  <span className="text-slate-200 font-semibold">{event.prizes.second}</span>
                </div>
                {event.prizes.third && (
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <span className="text-amber-600 font-bold">3rd Prize</span>
                    <span className="text-slate-200 font-semibold">{event.prizes.third}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Register CTA */}
            <div className="pt-2">
              <Link
                to={`/register?event=${event.id}`}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider text-center block shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-98 transition-all"
              >
                Enroll in {event.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
