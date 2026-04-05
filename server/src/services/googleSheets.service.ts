import { readFile } from "node:fs/promises";
import path from "node:path";
import { google, type sheets_v4 } from "googleapis";
import { logger } from "../utils/logger.js";

type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
};

const SPREADSHEET_ID = process.env["GOOGLE_SHEETS_SPREADSHEET_ID"] ?? "";

/** Strips accidental outer quotes from .env values (e.g. "'Early access'!A:B"). */
function trimOuterEnvQuotes(value: string): string {
  const t = value.trim();
  if (t.length >= 2) {
    const q = t[0];
    if ((q === '"' || q === "'") && t.endsWith(q)) {
      return t.slice(1, -1).trim();
    }
  }
  return t;
}

const WAITLIST_RANGE = trimOuterEnvQuotes(
  process.env["GOOGLE_SHEETS_WAITLIST_RANGE"] ?? "'Early access'!A:B",
);
const CONTACT_RANGE = trimOuterEnvQuotes(
  process.env["GOOGLE_SHEETS_CONTACT_RANGE"] ?? "'something in mind'!A:D",
);

let sheetsClientPromise: Promise<sheets_v4.Sheets | null> | null = null;
let didLogMissingConfig = false;

function isSheetConfigPresent(): boolean {
  return Boolean(SPREADSHEET_ID);
}

function normalizePrivateKey(privateKey: string): string {
  return privateKey.replace(/\\n/g, "\n");
}

async function readCredentialsFromJsonPath(
  credentialsPath: string,
): Promise<ServiceAccountCredentials> {
  const normalized = credentialsPath.replace(/^\.?\//, "");
  const normalizedFromServer = normalized.replace(/^server\//, "");

  const candidatePaths = path.isAbsolute(credentialsPath)
    ? [credentialsPath]
    : Array.from(
        new Set([
          path.resolve(process.cwd(), credentialsPath),
          path.resolve(process.cwd(), normalized),
          path.resolve(process.cwd(), normalizedFromServer),
          path.resolve(process.cwd(), "..", normalized),
          path.resolve(process.cwd(), "server", normalizedFromServer),
        ]),
      );

  let raw: string | null = null;
  let lastError: unknown = null;

  for (const candidate of candidatePaths) {
    try {
      raw = await readFile(candidate, "utf8");
      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!raw) {
    throw lastError instanceof Error
      ? lastError
      : new Error("Unable to read service account JSON file.");
  }

  const parsed = JSON.parse(raw) as Partial<ServiceAccountCredentials>;

  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("Missing client_email/private_key in service account JSON file.");
  }

  return {
    client_email: parsed.client_email,
    private_key: normalizePrivateKey(parsed.private_key),
  };
}

async function resolveCredentials(): Promise<ServiceAccountCredentials | null> {
  const jsonPath = process.env["GOOGLE_SERVICE_ACCOUNT_JSON_PATH"];
  if (jsonPath) {
    return readCredentialsFromJsonPath(jsonPath);
  }

  const jsonRaw = process.env["GOOGLE_SERVICE_ACCOUNT_JSON"];
  if (jsonRaw) {
    const parsed = JSON.parse(jsonRaw) as Partial<ServiceAccountCredentials>;
    if (!parsed.client_email || !parsed.private_key) {
      throw new Error("Missing client_email/private_key in GOOGLE_SERVICE_ACCOUNT_JSON.");
    }
    return {
      client_email: parsed.client_email,
      private_key: normalizePrivateKey(parsed.private_key),
    };
  }

  const clientEmail = process.env["GOOGLE_CLIENT_EMAIL"];
  const privateKey = process.env["GOOGLE_PRIVATE_KEY"];
  if (clientEmail && privateKey) {
    return {
      client_email: clientEmail,
      private_key: normalizePrivateKey(privateKey),
    };
  }

  return null;
}

async function getSheetsClient(): Promise<sheets_v4.Sheets | null> {
  if (sheetsClientPromise) {
    return sheetsClientPromise;
  }

  sheetsClientPromise = (async () => {
    if (!isSheetConfigPresent()) {
      return null;
    }

    const credentials = await resolveCredentials();
    if (!credentials) {
      return null;
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return google.sheets({ version: "v4", auth });
  })();

  return sheetsClientPromise;
}

export async function appendWaitlistEmailToSheet(email: string): Promise<void> {
  const sheets = await getSheetsClient();

  if (!sheets || !SPREADSHEET_ID) {
    if (!didLogMissingConfig) {
      logger.warn(
        "Google Sheets waitlist sync skipped: missing spreadsheet ID or credentials.",
      );
      didLogMissingConfig = true;
    }
    return;
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: WAITLIST_RANGE,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[email, new Date().toISOString()]],
    },
  });
}

export async function appendContactToSheet(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const sheets = await getSheetsClient();

  if (!sheets || !SPREADSHEET_ID) {
    if (!didLogMissingConfig) {
      logger.warn(
        "Google Sheets contact sync skipped: missing spreadsheet ID or credentials.",
      );
      didLogMissingConfig = true;
    }
    return;
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: CONTACT_RANGE,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[data.name, data.email, data.message, new Date().toISOString()]],
    },
  });
}
