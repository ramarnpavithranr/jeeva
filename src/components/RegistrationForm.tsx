import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User,
  Building,
  GraduationCap,
  Mail,
  Phone,
  Sparkles,
  Users,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Download,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EVENTS, type EventItem } from '../data/events';
import { submitRegistrationToSheet } from '../services/sheetService';

interface FormState {
  fullName: string;
  collegeName: string;
  department: string;
  academicYear: string;
  email: string;
  phone: string;
  eventId: string;
  participationType: 'Individual' | 'Team';
  teamName: string;
  teamMembers: string;
  agreeRules: boolean;
}

interface FormErrors {
  fullName?: string;
  collegeName?: string;
  department?: string;
  academicYear?: string;
  email?: string;
  phone?: string;
  eventId?: string;
  teamName?: string;
  teamMembers?: string;
  agreeRules?: string;
}

const INITIAL_FORM: FormState = {
  fullName: '',
  collegeName: '',
  department: '',
  academicYear: '3rd Year',
  email: '',
  phone: '',
  eventId: '',
  participationType: 'Individual',
  teamName: '',
  teamMembers: '',
  agreeRules: true,
};

export const RegistrationForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedEventId = searchParams.get('event') || '';

  const [formData, setFormData] = useState<FormState>(() => ({
    ...INITIAL_FORM,
    eventId: preselectedEventId,
  }));

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationReceipt, setRegistrationReceipt] = useState<{
    regId: string;
    registeredAt: string;
    selectedEvent?: EventItem;
  } | null>(null);

  // Sync event when query param changes
  useEffect(() => {
    if (preselectedEventId) {
      setFormData((prev) => ({ ...prev, eventId: preselectedEventId }));
    }
  }, [preselectedEventId]);

  const selectedEvent = EVENTS.find((e) => e.id === formData.eventId);

  // Automatically update participation type if the event strictly requires team or individual
  useEffect(() => {
    if (selectedEvent) {
      if (selectedEvent.teamType === 'Team') {
        setFormData((prev) => ({ ...prev, participationType: 'Team' }));
      } else if (selectedEvent.teamType === 'Individual') {
        setFormData((prev) => ({ ...prev, participationType: 'Individual' }));
      }
    }
  }, [formData.eventId, selectedEvent]);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = 'Name must be at least 3 characters.';
    }

    if (!formData.collegeName.trim()) {
      errs.collegeName = 'College or University name is required.';
    }

    if (!formData.department.trim()) {
      errs.department = 'Department / Branch is required (e.g. CSE, IT, ECE).';
    }

    if (!formData.academicYear) {
      errs.academicYear = 'Please select your academic year.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Mobile number is required.';
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.eventId) {
      errs.eventId = 'Please select an event to register.';
    }

    if (formData.participationType === 'Team') {
      if (!formData.teamName.trim()) {
        errs.teamName = 'Team name is required for team participation.';
      }
      if (!formData.teamMembers.trim()) {
        errs.teamMembers = 'Please list team members (names and college IDs).';
      }
    }

    if (!formData.agreeRules) {
      errs.agreeRules = 'You must accept festival guidelines and conduct code.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for modified field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to top of form
      const el = document.getElementById('reg-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const regId = `EX26-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleString();

    const payload = {
      regId,
      timestamp,
      fullName: formData.fullName,
      collegeName: formData.collegeName,
      department: formData.department,
      academicYear: formData.academicYear,
      email: formData.email,
      phone: formData.phone,
      eventId: formData.eventId,
      eventName: selectedEvent?.title || formData.eventId,
      participationType: formData.participationType,
      teamName: formData.teamName,
      teamMembers: formData.teamMembers,
    };

    // Submit to Google Sheet Backend (and save local fallback backup)
    await submitRegistrationToSheet(payload);

    setIsSubmitting(false);
    setIsSuccess(true);
    setRegistrationReceipt({
      regId,
      registeredAt: timestamp,
      selectedEvent,
    });

    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#818cf8', '#c084fc', '#f59e0b'],
    });
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setIsSuccess(false);
    setRegistrationReceipt(null);
  };

  return (
    <div id="reg-form" className="w-full max-w-4xl mx-auto">
      {isSuccess && registrationReceipt ? (
        /* Success State: Cyber E-Pass Ticket */
        <div className="p-6 sm:p-10 rounded-3xl glass-panel-glow border border-cyan-500/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Registration Confirmed!
            </h3>
            <p className="text-sm text-slate-300">
              Your demo pass has been generated. Save your registration credentials below.
            </p>
          </div>

          {/* Cyber Digital Pass */}
          <div className="max-w-xl mx-auto rounded-2xl bg-gradient-to-br from-slate-950 via-[#0c1024] to-[#111736] border border-cyan-500/40 p-6 sm:p-8 relative shadow-2xl overflow-hidden mb-8">
            {/* Top Pass Strip */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                  EventXora 2026 // PASS
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
                {registrationReceipt.regId}
              </span>
            </div>

            {/* Pass Body */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                    Participant Name
                  </span>
                  <span className="font-bold text-white text-base">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                    College
                  </span>
                  <span className="font-semibold text-slate-200 line-clamp-1">{formData.collegeName}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                    Registered Event
                  </span>
                  <span className="font-bold text-cyan-300">
                    {registrationReceipt.selectedEvent?.title || 'Selected Event'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                    Department & Year
                  </span>
                  <span className="font-semibold text-slate-200">
                    {formData.department} ({formData.academicYear})
                  </span>
                </div>
              </div>

              {formData.participationType === 'Team' && (
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider mb-1">
                    Team: <strong className="text-white">{formData.teamName}</strong>
                  </span>
                  <p className="text-slate-300 text-xs italic">{formData.teamMembers}</p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Verified: {registrationReceipt.registeredAt}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Confirmed &amp; Saved
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Print / Save Demo Pass</span>
            </button>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Register Another Student</span>
            </button>

            <Link
              to="/events"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-800 transition-colors"
            >
              <span>Back to Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Active Form */
        <form
          onSubmit={handleSubmit}
          noValidate
          className="p-6 sm:p-10 rounded-3xl glass-panel-glow border border-slate-800 shadow-2xl space-y-8"
        >
          {/* Header */}
          <div className="border-b border-slate-800 pb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              College Fest Registration Portal
            </h2>
            <p className="text-sm text-slate-400">
              Complete your information below to register for competitive events at EventXora 2026.
            </p>
          </div>

          {/* Section 1: Event Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Step 1: Choose Your Competition</span>
            </div>

            <div>
              <label htmlFor="eventId" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select Event <span className="text-rose-400">*</span>
              </label>
              <select
                id="eventId"
                name="eventId"
                value={formData.eventId}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border text-slate-100 text-sm focus:outline-none focus:ring-1 transition-all ${
                  errors.eventId
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                }`}
              >
                <option value="" className="bg-slate-900 text-slate-400">-- Select an Event --</option>
                {EVENTS.map((ev) => (
                  <option key={ev.id} value={ev.id} className="bg-slate-900 text-slate-200">
                    {ev.title} ({ev.category}) - Pool: {ev.prizes.total}
                  </option>
                ))}
              </select>
              {errors.eventId && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.eventId}
                </p>
              )}
            </div>

            {selectedEvent && (
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Category</span>
                  <span className="font-bold text-cyan-300">{selectedEvent.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Date & Time</span>
                  <span className="font-bold text-slate-200">{selectedEvent.date} ({selectedEvent.time})</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Participation</span>
                  <span className="font-bold text-indigo-300">{selectedEvent.teamType}</span>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Student Details */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>Step 2: Participant Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Student Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Student Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Aditi Sharma"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.fullName
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* College Name */}
              <div>
                <label htmlFor="collegeName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  College / University <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    id="collegeName"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="e.g. National Institute of Technology"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.collegeName
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                    }`}
                  />
                </div>
                {errors.collegeName && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.collegeName}
                  </p>
                )}
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Department / Branch <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science & Engg"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.department
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                    }`}
                  />
                </div>
                {errors.department && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.department}
                  </p>
                )}
              </div>

              {/* Academic Year */}
              <div>
                <label htmlFor="academicYear" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Academic Year <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <select
                    id="academicYear"
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  >
                    <option value="1st Year" className="bg-slate-900">1st Year (Freshman)</option>
                    <option value="2nd Year" className="bg-slate-900">2nd Year (Sophomore)</option>
                    <option value="3rd Year" className="bg-slate-900">3rd Year (Junior)</option>
                    <option value="4th Year" className="bg-slate-900">4th Year (Senior)</option>
                    <option value="Postgraduate / Research" className="bg-slate-900">Postgraduate / Research</option>
                  </select>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="aditi@example.edu"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.email
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Mobile Number (10 Digits) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.phone
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Participation Type (Individual vs Team) */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <span>Step 3: Participation Mode</span>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer flex-1 hover:border-slate-700 transition-colors">
                <input
                  type="radio"
                  name="participationType"
                  value="Individual"
                  checked={formData.participationType === 'Individual'}
                  onChange={handleChange}
                  disabled={selectedEvent?.teamType === 'Team'}
                  className="w-4 h-4 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  Solo / Individual
                </span>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer flex-1 hover:border-slate-700 transition-colors">
                <input
                  type="radio"
                  name="participationType"
                  value="Team"
                  checked={formData.participationType === 'Team'}
                  onChange={handleChange}
                  disabled={selectedEvent?.teamType === 'Individual'}
                  className="w-4 h-4 text-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  Team Entry
                </span>
              </label>
            </div>

            {/* Conditional Team Details */}
            {formData.participationType === 'Team' && (
              <div className="space-y-4 p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 mt-4 animate-in fade-in duration-300">
                <div>
                  <label htmlFor="teamName" className="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">
                    Team Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    placeholder="e.g. CyberVanguard, ByteBandits"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.teamName
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.teamName && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.teamName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="teamMembers" className="block text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">
                    Team Member Names & IDs <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="teamMembers"
                    name="teamMembers"
                    rows={3}
                    value={formData.teamMembers}
                    onChange={handleChange}
                    placeholder="1. Priya (Roll: CS2104)&#10;2. Rahul (Roll: CS2109)"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.teamMembers
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.teamMembers && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.teamMembers}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Rules Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeRules"
                checked={formData.agreeRules}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700"
              />
              <span className="text-xs text-slate-400 leading-relaxed">
                I hereby declare that the information provided is accurate and I agree to abide by the rules, code of ethics, and schedule regulations established by EventXora 2026.
              </span>
            </label>
            {errors.agreeRules && (
              <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.agreeRules}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-800">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.02] active:scale-98 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Submitting to Google Sheet...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Submit Registration</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
            >
              Reset Form
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
