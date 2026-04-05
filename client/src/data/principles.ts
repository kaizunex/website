export interface Principle {
  name: string
  description: string
  footerText: string
  footerColor: string
  iconBg: string
  iconBorderColor: string
  svgMarkup: string
}

export const principles: Principle[] = [
  {
    name: 'Privacy First',
    description:
      'Sensitive information never surfaces on the platform. Your connections, transactions, and interactions remain private by default - visible only to the parties involved.',
    footerText: 'Zero data exploitation →',
    footerColor: '#A78BFA',
    iconBg: 'rgba(139, 92, 246, 0.1)',
    iconBorderColor: 'rgba(139, 92, 246, 0.3)',
    svgMarkup: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>`,
  },
  {
    name: 'Transparent Interactions',
    description:
      'Every connection, every exchange, every outcome - fully visible to participants. No hidden algorithms, no shadow rankings, no manipulation of who sees what.',
    footerText: 'Full interaction audit trails →',
    footerColor: '#34D399',
    iconBg: 'rgba(16, 185, 129, 0.1)',
    iconBorderColor: 'rgba(16, 185, 129, 0.3)',
    svgMarkup: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/></svg>`,
  },
  {
    name: 'Trust-Based Ecosystem',
    description:
      'Trust is earned, tracked, and transferable. Your reputation follows you across the platform - built through real interactions, not self-reported credentials.',
    footerText: 'On-chain reputation model →',
    footerColor: '#93C5FD',
    iconBg: 'rgba(59, 130, 246, 0.1)',
    iconBorderColor: 'rgba(59, 130, 246, 0.3)',
    svgMarkup: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  },
]
