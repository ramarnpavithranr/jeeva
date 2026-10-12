/**
 * Google Sheet Backend Configuration
 * Sheet: https://docs.google.com/spreadsheets/d/1E0vk9EMA1HTBodwBSY-S2gGan39ckiSIeqoctXxpyqw/edit
 */

export const GOOGLE_SHEET_CONFIG = {
  // Your Google Sheet ID extracted from the provided URL
  sheetId: '1E0vk9EMA1HTBodwBSY-S2gGan39ckiSIeqoctXxpyqw',
  sheetUrl: 'https://docs.google.com/spreadsheets/d/1E0vk9EMA1HTBodwBSY-S2gGan39ckiSIeqoctXxpyqw/edit?usp=drivesdk',
  
  // Google Apps Script Web App URL:
  // Once you deploy the script in Extensions > Apps Script, paste your /exec URL here or in .env (VITE_GOOGLE_SHEET_WEBAPP_URL)
  webAppUrl: import.meta.env.VITE_GOOGLE_SHEET_WEBAPP_URL || '',
};
