import React, { useState, useMemo } from 'react';
import { Search, Filter, Layers, Sparkles, X } from 'lucide-react';
import { EventCard } from './EventCard';
import type { EventItem, EventCategory } from '../data/events';

interface EventGridProps {
  events: EventItem[];
  showFilters?: boolean;
  initialCategory?: EventCategory;
  title?: string;
  subtitle?: string;
}

export const EventGrid: React.FC<EventGridProps> = ({
  events,
  showFilters = true,
  initialCategory = 'All',
  title,
  subtitle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'prize' | 'day'>('default');

  const categories: EventCategory[] = ['All', 'Technical', 'Non-Technical', 'Gaming', 'Cultural'];

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesCategory =
        selectedCategory === 'All' || ev.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        ev.title.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q) ||
        ev.venue.toLowerCase().includes(q) ||
        ev.tagline.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'day') {
        return a.scheduleDay.localeCompare(b.scheduleDay);
      }
      if (sortBy === 'prize') {
        const getVal = (item: EventItem) => {
          const match = item.prizes.total.replace(/[^0-9]/g, '');
          return parseInt(match || '0', 10);
        };
        return getVal(b) - getVal(a);
      }
      return 0;
    });
  }, [events, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && (
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {showFilters && (
        <div className="mb-10 space-y-4">
          {/* Search bar & Sorting control */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, algorithms, gaming, venues..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-md"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown & Count */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Showing <strong className="text-white">{filteredEvents.length}</strong> events
                </span>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
                <Filter className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-slate-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="default" className="bg-slate-900 text-slate-200">Featured</option>
                  <option value="prize" className="bg-slate-900 text-slate-200">Highest Prize</option>
                  <option value="day" className="bg-slate-900 text-slate-200">By Fest Day</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/30'
                      : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat === 'All' && <Sparkles className="w-3 h-3 text-amber-300" />}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid of Event Cards */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredEvents.map((event, idx) => (
            <EventCard key={event.id} event={event} index={idx} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/60 flex items-center justify-center text-slate-500 border border-slate-700">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No matching events found</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">
            We couldn't find any competitions or workshops matching "{searchQuery}" in {selectedCategory}.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
          >
            Clear Filters & Show All
          </button>
        </div>
      )}
    </div>
  );
};
