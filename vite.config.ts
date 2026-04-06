import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify({
        GOOGLE_SHEETS_SPREADSHEET_ID: env.GOOGLE_SHEETS_SPREADSHEET_ID ?? '',
        GOOGLE_SHEETS_WAITLIST_RANGE: env.GOOGLE_SHEETS_WAITLIST_RANGE ?? '',
        GOOGLE_SHEETS_CONTACT_RANGE: env.GOOGLE_SHEETS_CONTACT_RANGE ?? '',
        GOOGLE_SERVICE_ACCOUNT_JSON_PATH: env.GOOGLE_SERVICE_ACCOUNT_JSON_PATH ?? '',
      } as const),
    },
  }
})
