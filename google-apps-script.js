/**
 * ==============================================================================
 * EVENTXORA - GOOGLE APPS SCRIPT BACKEND
 * ==============================================================================
 * This script connects your Google Sheet to the EventXora registration website!
 *
 * HOW TO SET UP IN 3 EASY STEPS:
 * ------------------------------------------------------------------------------
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1E0vk9EMA1HTBodwBSY-S2gGan39ckiSIeqoctXxpyqw/edit
 * 
 * 2. In the top menu, click:
 *    Extensions  ->  Apps Script
 * 
 * 3. Delete any code in the editor, paste this ENTIRE file into it, and click "Save" (disk icon).
 * 
 * 4. In the top-right corner, click:
 *    "Deploy"  ->  "New deployment"
 * 
 * 5. Configure the deployment:
 *    - Click the gear icon next to "Select type" and choose "Web app"
 *    - Description: "EventXora Backend API"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone"  <--- (IMPORTANT: choose "Anyone")
 * 
 * 6. Click "Deploy", review/grant permissions, and copy the "Web app URL" (ending in /exec).
 * 
 * 7. Paste that Web App URL into:
 *    `src/config/googleSheet.ts` OR `.env` as `VITE_GOOGLE_SHEET_WEBAPP_URL=https://script.google.com/macros/s/.../exec`
 * ==============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON body
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Registration ID",
        "Full Name",
        "College / University",
        "Department",
        "Academic Year",
        "Email",
        "Phone Number",
        "Event ID",
        "Event Name",
        "Participation Type",
        "Team Name",
        "Team Members"
      ];
      sheet.appendRow(headers);
      
      // Style header row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1e1b4b");
      headerRange.setFontColor("#38bdf8");
    }

    // Append registration row
    var newRow = [
      data.timestamp || new Date().toLocaleString(),
      data.regId || "EX26-" + Math.floor(100000 + Math.random() * 900000),
      data.fullName || "",
      data.collegeName || "",
      data.department || "",
      data.academicYear || "",
      data.email || "",
      data.phone || "",
      data.eventId || "",
      data.eventName || "",
      data.participationType || "Individual",
      data.teamName || "",
      data.teamMembers || ""
    ];

    sheet.appendRow(newRow);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Registration successfully recorded in Google Sheets!",
        regId: data.regId
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Support GET requests for testing health check
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      message: "EventXora Google Sheets Backend API is running properly."
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
