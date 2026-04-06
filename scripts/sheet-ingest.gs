/**
 * Google Apps Script — paste into the spreadsheet’s script editor, then
 * Deploy → New deployment → Web app (Execute as: Me, Anyone can access).
 *
 * Set SPREADSHEET_ID to this file’s spreadsheet (or leave blank and bind the script
 * to the spreadsheet from the editor so openById is optional).
 *
 * Optional spam gate: Project Settings → Script properties → INGEST_SECRET
 * and send `secret` in request payload if needed.
 */

var SPREADSHEET_ID = ''; // e.g. '11-YxpN1xHbaNGrRbT3EGF5Gkims4FJZNlWAKLZSG3Kk' or leave '' if bound to sheet
var WAITLIST_SHEET = 'Early access';
var CONTACT_SHEET = 'something in mind';
var PROP_SECRET = 'INGEST_SECRET';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var data = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();
    var secret = props.getProperty(PROP_SECRET);
    if (secret && data.secret !== secret) {
      return outJson({ success: false, message: 'Forbidden.' });
    }

    var cfg = data.config || {};
    var id = cfg.spreadsheetId || SPREADSHEET_ID;
    var waitlistSheetName = sheetNameFromRange(cfg.waitlistRange) || WAITLIST_SHEET;
    var contactSheetName = sheetNameFromRange(cfg.contactRange) || CONTACT_SHEET;
    var ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
    var ts = new Date().toISOString();

    if (data.action === 'waitlist') {
      var email = String(data.email || '').trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return outJson({ success: false, message: 'Invalid email address.' });
      }
      ss.getSheetByName(waitlistSheetName).appendRow([email, ts]);
      return outJson({ success: true, message: "You're on the list!" });
    }

    if (data.action === 'contact') {
      var name = String(data.name || '').trim();
      var em = String(data.email || '').trim().toLowerCase();
      var message = String(data.message || '').trim();
      if (!name || !em || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
        return outJson({ success: false, message: 'All fields are required.' });
      }
      ss.getSheetByName(contactSheetName).appendRow([name, em, message, ts]);
      return outJson({ success: true, message: 'Thank you!' });
    }

    return outJson({ success: false, message: 'Unknown action.' });
  } catch (err) {
    return outJson({ success: false, message: 'Unable to save. Try again later.' });
  } finally {
    lock.releaseLock();
  }
}

function sheetNameFromRange(rangeText) {
  if (!rangeText) return '';
  var raw = String(rangeText).trim();
  if (!raw) return '';

  var bang = raw.indexOf('!');
  var left = bang >= 0 ? raw.substring(0, bang).trim() : raw;
  if (!left) return '';

  if (
    (left.charAt(0) === "'" && left.charAt(left.length - 1) === "'") ||
    (left.charAt(0) === '"' && left.charAt(left.length - 1) === '"')
  ) {
    left = left.substring(1, left.length - 1);
  }

  return left.trim();
}

function outJson(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
