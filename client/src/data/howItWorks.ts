export interface HowItWorksStep {
  number: string
  title: string
  description: string
  iconColor: 'purple' | 'green' | 'blue'
  svgPath: string
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: '01',
    title: 'Access as a Medium',
    description:
      'Financial access, resources, and tools — shared through people you trust. Not a bank. Not a lender. A network that opens doors.',
    iconColor: 'purple',
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/><path d="M6 14h4"/></svg>`,
  },
  {
    number: '02',
    title: 'Opportunity as a Medium',
    description:
      'Jobs, referrals, partnerships — flowing through genuine relationships. Your network becomes your most powerful career asset.',
    iconColor: 'green',
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>`,
  },
  {
    number: '03',
    title: 'Trust as a Medium',
    description:
      'Business, collaboration, life — built on verified relationships. Every connection is earned. Every interaction is transparent.',
    iconColor: 'blue',
    svgPath: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  },
]
