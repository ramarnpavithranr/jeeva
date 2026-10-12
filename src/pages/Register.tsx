import React from 'react';
import { Sparkles, Shield, HelpCircle, CheckCircle } from 'lucide-react';
import { RegistrationForm } from '../components/RegistrationForm';

export const Register: React.FC = () => {
  return (
    <div className="pt-32 pb-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Fast Pass Registration</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
            EventXora 2026{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-teal-300">
              Registration
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Reserve your spot for coding battles, robotic arenas, and design championships. Fill out your details below to generate your instant festival digital pass.
          </p>
        </div>

        {/* Main Form Component */}
        <RegistrationForm />

        {/* FAQ & Guidelines Accordion */}
        <div className="max-w-4xl mx-auto mt-16 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <span>Frequently Asked Questions & Instructions</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300">
            <div className="space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Can I register for multiple events?
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Yes! Ensure that your selected events do not have overlapping schedules. Submit one registration form per competition.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Is an institutional ID card required?
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Yes. A valid college or university student ID card must be presented at the check-in desk on the morning of March 27, 2026.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Are spot registrations permitted?
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Spot registrations will be available subject to seat availability. Pre-registering online guarantees your spot in the preliminary rounds.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-purple-400" />
                What if our team members belong to different colleges?
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Inter-college teams are welcome for open category hackathons, gaming tournaments, and technical quizzes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
