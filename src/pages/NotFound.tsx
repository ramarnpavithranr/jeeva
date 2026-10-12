import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Layers, Compass } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="pt-36 pb-28 min-h-[80vh] flex items-center justify-center relative z-10 px-4">
      <div className="max-w-lg w-full p-8 sm:p-12 rounded-3xl glass-panel-glow border border-slate-800 text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-2xl">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <div className="text-6xl sm:text-8xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-teal-300 mb-2">
          404
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          Dimension Not Found
        </h1>

        <p className="text-sm text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">
          The festival coordinates you requested do not exist or have shifted to a different timeline.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/events"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs border border-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Browse Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
