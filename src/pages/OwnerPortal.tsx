import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  ExternalLink,
  Smartphone,
  ShieldCheck,
  Database,
  Users,
  Copy,
  Check,
  QrCode,
  Lock
} from 'lucide-react';
import { GOOGLE_SHEET_CONFIG } from '../config/googleSheet';
import {
  getGoogleSheetWebAppUrl,
  saveGoogleSheetWebAppUrl,
  getLocalRegistrations,
  type RegistrationPayload
} from '../services/sheetService';

export const OwnerPortal: React.FC = () => {
  const [webAppUrl, setWebAppUrl] = useState(() => getGoogleSheetWebAppUrl());
  const [inputUrl, setInputUrl] = useState(() => getGoogleSheetWebAppUrl());
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<RegistrationPayload[]>([]);

  useEffect(() => {
    setRegistrations(getLocalRegistrations());
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(GOOGLE_SHEET_CONFIG.sheetUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    saveGoogleSheetWebAppUrl(inputUrl);
    setWebAppUrl(inputUrl);
    setSaveNotice('✓ Webhook endpoint saved successfully!');
    setTimeout(() => setSaveNotice(null), 3000);
  };

  // QR code image URL for scanning directly to mobile
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=10b981&bgcolor=06150f&data=${encodeURIComponent(
    GOOGLE_SHEET_CONFIG.sheetUrl
  )}`;

  return (
    <div className="pt-32 pb-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Owner & Administrator Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Google Sheet{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-teal-300">
              Live Backend
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            This private dashboard is exclusively for the event owner. All participant registrations submitted from the public website are collected directly in your Google Spreadsheet.
          </p>
        </div>

        {/* Primary Action Card: Mobile & Desktop Sheet Access */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* Main Direct Access Card */}
          <div className="md:col-span-7 rounded-3xl glass-panel-glow border border-emerald-500/40 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                  <FileSpreadsheet className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Spreadsheet
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  EventXora Responses Sheet
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Access every registration row, student contact info, and team lists in real time.
                </p>
              </div>

              {/* Direct Open Button */}
              <div className="pt-2">
                <a
                  href={GOOGLE_SHEET_CONFIG.sheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 hover:scale-[1.02] active:scale-98 transition-all"
                >
                  <FileSpreadsheet className="w-5 h-5" />
                  <span>Open Google Sheet Now</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>

              {/* Quick Copy Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full py-3 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 flex items-center justify-center gap-2 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Sheet Link Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-emerald-400" />
                    <span>Copy Sheet Link for Mobile / WhatsApp</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate max-w-[280px] font-mono text-[11px] text-slate-500">
                ID: {GOOGLE_SHEET_CONFIG.sheetId}
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Owner Access
              </span>
            </div>
          </div>

          {/* Mobile QR Code Scanner Card */}
          <div className="md:col-span-5 rounded-3xl glass-panel border border-slate-800 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-3">
              <Smartphone className="w-6 h-6" />
            </div>

            <h4 className="text-base font-bold text-white mb-1">
              Open on Your Mobile
            </h4>
            <p className="text-xs text-slate-400 mb-4 max-w-xs">
              Scan this QR code with your phone camera to instantly view the Google Sheet on your smartphone:
            </p>

            <div className="p-3 bg-[#06150f] rounded-2xl border border-emerald-500/40 shadow-xl mb-3">
              <img
                src={qrCodeUrl}
                alt="Scan to open Google Sheet on Mobile"
                className="w-36 h-36 rounded-lg"
              />
            </div>

            <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
              <QrCode className="w-3 h-3" />
              Scan with Mobile Camera or Google Lens
            </span>
          </div>
        </div>

        {/* Private Webhook Endpoint Configuration */}
        <div className="rounded-3xl glass-panel border border-slate-800 p-6 sm:p-8 mb-8 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-400" />
              <span>Google Apps Script Live Webhook (Private)</span>
            </h3>
            {webAppUrl ? (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Connected &amp; Active
              </span>
            ) : (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Webhook Not Set
              </span>
            )}
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            When deployed, the public website automatically posts registration submissions directly to this endpoint without exposing your spreadsheet to users.
          </p>

          <form onSubmit={handleSaveUrl} className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              placeholder="https://script.google.com/macros/s/.../exec"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
            >
              Save Endpoint
            </button>
          </form>

          {saveNotice && (
            <p className="text-emerald-400 text-xs font-semibold">{saveNotice}</p>
          )}
        </div>

        {/* Recent Registrations Table */}
        <div className="rounded-3xl glass-panel border border-slate-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-400" />
              <span>Recent Registrations Backup</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Total: {registrations.length} record(s)
            </span>
          </div>

          {registrations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 bg-slate-900/60">
                  <tr>
                    <th className="p-3">Pass ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">College</th>
                    <th className="p-3">Event</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {registrations.slice(0, 10).map((reg) => (
                    <tr key={reg.regId} className="hover:bg-slate-900/40">
                      <td className="p-3 font-mono text-emerald-400 font-bold">{reg.regId}</td>
                      <td className="p-3 text-white font-semibold">{reg.fullName}</td>
                      <td className="p-3 text-slate-300">{reg.collegeName}</td>
                      <td className="p-3 text-teal-300">{reg.eventName}</td>
                      <td className="p-3 font-mono">{reg.phone}</td>
                      <td className="p-3 text-slate-400 text-[11px]">{reg.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500 rounded-2xl bg-slate-900/40 border border-slate-800">
              No registrations recorded in this browser session yet. Submissions will appear here and in your Google Spreadsheet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
