/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GOOGLE_SHEETS_SPREADSHEET_ID?: string
  readonly GOOGLE_SHEETS_WAITLIST_RANGE?: string
  readonly GOOGLE_SHEETS_CONTACT_RANGE?: string
  readonly GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL?: string
  readonly GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?: string
  readonly GOOGLE_SERVICE_ACCOUNT_TOKEN_URI?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const __APP_ENV__: {
  GOOGLE_SHEETS_SPREADSHEET_ID: string
  GOOGLE_SHEETS_WAITLIST_RANGE: string
  GOOGLE_SHEETS_CONTACT_RANGE: string
  GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL: string
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: string
  GOOGLE_SERVICE_ACCOUNT_TOKEN_URI: string
}
