import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Sparkles, Heart, Lock } from 'lucide-react';
import { FEST_STATS } from '../data/events';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#04060e] border-t border-slate-900 pt-16 pb-12 overflow-hidden">
      {/* Subtle background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-emerald-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 via-green-500 to-teal-400 p-[2px]">
                <div className="w-full h-full bg-[#04120d] rounded-[10px] flex items-center justify-center">
                  <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                    X
                  </span>
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Event<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-300">Xora</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier national-level technological and cultural symposium celebrating engineering excellence, innovative hackathons, esports, and creative arts.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-emerald-300">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Theme: "Innovate. Create. Dominate."</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Home Landing
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-emerald-400 transition-colors">
                  All Competitions
                </Link>
              </li>
              <li>
                <a href="/#schedule" className="hover:text-emerald-400 transition-colors">
                  Fest Schedule
                </a>
              </li>
              <li>
                <Link to="/register" className="hover:text-emerald-400 transition-colors">
                  Registration Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Featured Domains
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/events" className="hover:text-emerald-400 transition-colors">
                  CodeSprint & Algorithms
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-emerald-400 transition-colors">
                  RoboInnovate 360 Hardware Expo
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-emerald-400 transition-colors">
                  CyberCraft UI/UX Sprint
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-emerald-400 transition-colors">
                  FragFest LAN Championship
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Venue */}
          <div id="contact" className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Contact & Venue
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>{FEST_STATS.collegeName}, Tech Campus Arena, Block C</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>fest@eventxora2026.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>+91 98765 43210 / +91 98765 43211</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2026 EventXora. All rights reserved. Crafted for National College Tech Fest.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-400">
              <span>Built with passion &</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for innovators</span>
            </div>

            <Link
              to="/owner"
              title="Private Owner Sheet Portal"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-400 transition-colors text-[11px]"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
