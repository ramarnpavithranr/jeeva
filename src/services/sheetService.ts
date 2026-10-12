import { GOOGLE_SHEET_CONFIG } from '../config/googleSheet';

export interface RegistrationPayload {
  regId: string;
  timestamp: string;
  fullName: string;
  collegeName: string;
  department: string;
  academicYear: string;
  email: string;
  phone: string;
  eventId: string;
  eventName: string;
  participationType: string;
  teamName: string;
  teamMembers: string;
}

const STORAGE_KEY_URL = 'eventxora_sheet_webapp_url';
const STORAGE_KEY_REGISTRATIONS = 'eventxora_registrations';

/**
 * Gets the current Web App URL (from localStorage, env, or default config)
 */
export function getGoogleSheetWebAppUrl(): string {
  const customUrl = localStorage.getItem(STORAGE_KEY_URL);
  if (customUrl && customUrl.trim()) {
    return customUrl.trim();
  }
  return GOOGLE_SHEET_CONFIG.webAppUrl || '';
}

/**
 * Saves a custom Web App URL to localStorage
 */
export function saveGoogleSheetWebAppUrl(url: string): void {
  if (url) {
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_URL);
  }
}

/**
 * Saves registration record locally as backup
 */
export function saveRegistrationLocally(payload: RegistrationPayload): void {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_REGISTRATIONS) || '[]');
    existing.unshift(payload);
    localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to save registration locally:', err);
  }
}

/**
 * Retrieves all locally saved registrations
 */
export function getLocalRegistrations(): RegistrationPayload[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_REGISTRATIONS) || '[]');
  } catch {
    return [];
  }
}

/**
 * Submits registration data to Google Sheets via Google Apps Script Web App
 */
export async function submitRegistrationToSheet(payload: RegistrationPayload): Promise<{
  success: boolean;
  savedToSheet: boolean;
  message: string;
}> {
  // Always save locally as immediate safety backup
  saveRegistrationLocally(payload);

  const endpointUrl = getGoogleSheetWebAppUrl();

  if (!endpointUrl) {
    return {
      success: true,
      savedToSheet: false,
      message: 'Saved to local browser storage. Connect Google Apps Script to automatically sync with your Google Sheet!',
    };
  }

  try {
    // Send data to Google Apps Script Web App
    // Note: mode: 'no-cors' allows submission to Google Apps Script endpoints without CORS blocks
    await fetch(endpointUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      savedToSheet: true,
      message: 'Registration successfully synchronized with Google Sheet!',
    };
  } catch (error) {
    console.warn('Network issue writing to Google Sheet, backed up locally:', error);
    return {
      success: true,
      savedToSheet: false,
      message: 'Registration saved locally! Check internet connection or Web App permissions to sync with Google Sheet.',
    };
  }
}
