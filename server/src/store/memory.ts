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

let waitlistSignupCount = 0;
const contacts: Contact[] = [];
const analyticsEvents: AnalyticsEvent[] = [];

export function incrementWaitlistCount(): void {
  waitlistSignupCount += 1;
}

export function getWaitlistCount(): number {
  return waitlistSignupCount;
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
