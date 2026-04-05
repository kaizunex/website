const BASE = ''

export async function postWaitlist(email: string) {
  const res = await fetch(`${BASE}/api/waitlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  const data = (await res.json()) as { success?: boolean; message?: string }
  if (!res.ok) {
    throw new Error(data.message ?? 'Unable to join waitlist right now.')
  }
  return data
}

export async function getWaitlistCount() {
  const res = await fetch(`${BASE}/api/waitlist/count`)
  return res.json()
}

export async function postContact(data: {
  name: string
  email: string
  message: string
}) {
  const res = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = (await res.json()) as { success?: boolean; message?: string }
  if (!res.ok) {
    throw new Error(json.message ?? 'Unable to send message right now.')
  }
  return json
}

export async function trackEvent(
  event: string,
  payload?: Record<string, string>,
) {
  try {
    await fetch(`${BASE}/api/analytics/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, payload }),
    })
  } catch {
    /* silent fail - analytics should never break UX */
  }
}
