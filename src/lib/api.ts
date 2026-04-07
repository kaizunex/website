const SPREADSHEET_ID = (__APP_ENV__.GOOGLE_SHEETS_SPREADSHEET_ID || '').trim()
const WAITLIST_RANGE = (__APP_ENV__.GOOGLE_SHEETS_WAITLIST_RANGE || '').trim()
const CONTACT_RANGE = (__APP_ENV__.GOOGLE_SHEETS_CONTACT_RANGE || '').trim()
const SERVICE_ACCOUNT_CLIENT_EMAIL = (
  __APP_ENV__.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL || ''
).trim()
const SERVICE_ACCOUNT_PRIVATE_KEY = (
  __APP_ENV__.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || ''
).replace(/\\n/g, '\n')
const SERVICE_ACCOUNT_TOKEN_URI = (
  __APP_ENV__.GOOGLE_SERVICE_ACCOUNT_TOKEN_URI || 'https://oauth2.googleapis.com/token'
).trim()

type ServiceAccountJson = {
  client_email: string
  private_key: string
  token_uri?: string
}

let tokenCache: { accessToken: string; expiresAt: number } | null = null

function base64UrlEncode(input: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < input.length; i += 1) {
    binary += String.fromCharCode(input[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function textToUint8(text: string): Uint8Array {
  return new TextEncoder().encode(text)
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const clean = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s+/g, '')
  const binary = atob(clean)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

async function signJwt(payload: Record<string, unknown>, privateKeyPem: string): Promise<string> {
  const header = { alg: 'RS256', typ: 'JWT' }
  const encodedHeader = base64UrlEncode(textToUint8(JSON.stringify(header)))
  const encodedPayload = base64UrlEncode(textToUint8(JSON.stringify(payload)))
  const input = `${encodedHeader}.${encodedPayload}`

  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(privateKeyPem),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    textToUint8(input) as BufferSource,
  )

  return `${input}.${base64UrlEncode(new Uint8Array(signature))}`
}

async function loadServiceAccount(): Promise<ServiceAccountJson> {
  if (!SERVICE_ACCOUNT_CLIENT_EMAIL || !SERVICE_ACCOUNT_PRIVATE_KEY) {
    throw new Error(
      'Missing GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.',
    )
  }
  return {
    client_email: SERVICE_ACCOUNT_CLIENT_EMAIL,
    private_key: SERVICE_ACCOUNT_PRIVATE_KEY,
    token_uri: SERVICE_ACCOUNT_TOKEN_URI,
  }
}

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  if (tokenCache && tokenCache.expiresAt - 60 > now) {
    return tokenCache.accessToken
  }

  const account = await loadServiceAccount()
  const iat = now
  const exp = now + 3600

  const jwt = await signJwt(
    {
      iss: account.client_email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: account.token_uri,
      iat,
      exp,
    },
    account.private_key,
  )

  const tokenRes = await fetch(account.token_uri ?? 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  const tokenJson = (await tokenRes.json()) as {
    access_token?: string
    expires_in?: number
    error?: string
    error_description?: string
  }
  if (!tokenRes.ok || !tokenJson.access_token) {
    throw new Error(tokenJson.error_description || tokenJson.error || 'Unable to get access token.')
  }
  tokenCache = {
    accessToken: tokenJson.access_token,
    expiresAt: now + (tokenJson.expires_in ?? 3600),
  }
  return tokenJson.access_token
}

async function appendValues(range: string, values: string[][]): Promise<void> {
  if (!SPREADSHEET_ID || !range) {
    throw new Error('Google Sheets configuration is incomplete in .env.')
  }
  const accessToken = await getAccessToken()
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
    SPREADSHEET_ID,
  )}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ values }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Unable to append row to Google Sheets.')
  }
}

export async function postWaitlist(email: string) {
  const normalizedEmail = email.trim().toLowerCase()
  await appendValues(WAITLIST_RANGE, [[normalizedEmail, new Date().toISOString()]])
  return { success: true, message: "You're on the list!" }
}

export async function postContact(data: {
  name: string
  email: string
  message: string
}) {
  await appendValues(CONTACT_RANGE, [
    [data.name.trim(), data.email.trim().toLowerCase(), data.message.trim(), new Date().toISOString()],
  ])
  return { success: true, message: 'Thank you!' }
}

export function trackEvent(
  _event: string,
  _payload?: Record<string, string>,
) {
  /* No backend analytics. */
}
