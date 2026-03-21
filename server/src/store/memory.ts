interface WaitlistEntry {
  email: string;
  code: string;
  confirmed: boolean;
  createdAt: Date;
}

interface Contact {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

interface AnalyticsEvent {
  event: string;
  payload: Record<string, string>;
  timestamp: Date;
}

const waitlistEntries = new Map<string, WaitlistEntry>();
const contacts: Contact[] = [];
const analyticsEvents: AnalyticsEvent[] = [];

export function addWaitlistEntry(
  email: string,
  code: string,
): { exists: boolean } {
  if (waitlistEntries.has(email)) {
    const entry = waitlistEntries.get(email)!;
    if (entry.confirmed) return { exists: true };
    entry.code = code;
    entry.createdAt = new Date();
    return { exists: false };
  }
  waitlistEntries.set(email, {
    email,
    code,
    confirmed: false,
    createdAt: new Date(),
  });
  return { exists: false };
}

export function confirmWaitlistEntry(
  email: string,
  code: string,
): boolean {
  const entry = waitlistEntries.get(email);
  if (!entry || entry.code !== code) return false;
  entry.confirmed = true;
  return true;
}

export function getWaitlistCount(): number {
  let count = 0;
  for (const entry of waitlistEntries.values()) {
    if (entry.confirmed) count++;
  }
  return count;
}

export function addContact(
  name: string,
  email: string,
  message: string,
): void {
  contacts.push({ name, email, message, createdAt: new Date() });
}

export function addAnalyticsEvent(
  event: string,
  payload: Record<string, string> = {},
): void {
  analyticsEvents.push({ event, payload, timestamp: new Date() });
}

export function getAnalyticsSummary(): Record<string, number> {
  const summary: Record<string, number> = {};
  for (const e of analyticsEvents) {
    summary[e.event] = (summary[e.event] ?? 0) + 1;
  }
  return summary;
}
