const BASE = ''

export async function postWaitlist(email: string) {
  const res = await fetch(`${BASE}/api/waitlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  return res.json()
}

export async function confirmWaitlist(email: string, code: string) {
  const res = await fetch(`${BASE}/api/waitlist/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  })
  return res.json()
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
  return res.json()
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
    /* silent fail — analytics should never break UX */
  }
}
