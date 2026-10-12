import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Trophy, Users, ArrowRight, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { EventItem } from '../data/events';

interface EventCardProps {
  event: EventItem;
  index?: number;
}

export const EventCard: React.FC<EventCardProps> = ({ event, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12; // tilt angle
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="perspective-1000 h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: shouldReduceMotion
            ? 'none'
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
        }}
        className="transform-style-3d group relative flex flex-col h-full rounded-2xl bg-gradient-to-b from-[#091f16]/90 via-[#06150f]/90 to-[#030d0a]/95 border border-slate-800/80 hover:border-emerald-500/50 hover:shadow-[0_15px_35px_-10px_rgba(34,197,94,0.3)] transition-all duration-300 overflow-hidden"
      >
        {/* Dynamic Glare overlay on mouse move */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}), transparent)`,
          }}
        />

        {/* Top visual / Image */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06150f] via-transparent to-black/40" />

          {/* Category Pill */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-emerald-300 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {event.category}
            </span>
          </div>

          {/* Team / Individual badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-200">
              <Users className="w-3 h-3 text-emerald-400" />
              {event.teamType}
            </span>
          </div>

          {/* Floating Prize Badge */}
          <div className="absolute bottom-3 left-3 z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold shadow-lg">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Pool: {event.prizes.total}</span>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="flex-1 flex flex-col p-5 justify-between relative z-10">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-200 line-clamp-1 mb-1.5">
              {event.title}
            </h3>

            <p className="text-xs text-emerald-400/90 font-medium mb-3 line-clamp-1">
              {event.tagline}
            </p>

            <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
              {event.description}
            </p>

            {/* Quick Metadata */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300/80 mb-5 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="truncate">{event.time}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 pt-1">
            <Link
              to={`/events/${event.id}`}
              className="flex-1 text-center py-2.5 px-3 text-xs font-semibold rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white border border-slate-700/50 hover:border-slate-600 transition-all flex items-center justify-center gap-1.5 group/btn"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>

            <Link
              to={`/register?event=${event.id}`}
              className="py-2.5 px-4 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
            >
              <Sparkles className="w-3 h-3" />
              <span>Register</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
