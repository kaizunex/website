export interface PillarSummary {
  id: 'kaicards' | 'kairefer' | 'kaitree'
  name: string
  vertical: string
  bridgeLine: string
  oneLiner: string
  outcomes: string[]
  glow: 'purple' | 'cyan' | 'emerald'
}

export interface ProductJourneyStep {
  number: string
  title: string
  text: string
}

export interface ProductJourneyByRole {
  roles: [string, string]
  steps: Record<string, ProductJourneyStep[]>
}

export type ProductIcon = 'credit-card' | 'briefcase' | 'network'
export type ProductPersonaIcon =
  | 'wallet-user'
  | 'card-holder'
  | 'job-candidate'
  | 'team-referrer'
  | 'community-connector'
  | 'trust-bridge'

export interface ProductPersona {
  icon: ProductPersonaIcon
  title: string
  subtitle: string
  benefits: ProductBenefit[]
}

export interface ProductBenefit {
  label: string
  text: string
}

export interface ProductDetail {
  id: PillarSummary['id']
  name: string
  heroTag: string
  accent: 'blue' | 'cyan' | 'emerald' | 'purple'
  icon: ProductIcon
  vertical: string
  oneLiner: string
  statement: string
  personas: {
    seeker: ProductPersona
    provider: ProductPersona
  }
  journeyStepsByRole: ProductJourneyByRole
  platforms?: { name: string; icon: string }[]
}

export const nexusStats = [
  { value: '3', label: 'Live Bridges' },
  { value: '∞', label: 'Connections Enabled' }
]

export const pillarSummaries: PillarSummary[] = [
  {
    id: 'kaicards',
    name: 'Kaicards',
    vertical: 'Fintech Vertical',
    bridgeLine:
      'Securely share credit card benefits without sharing card data.',
    oneLiner: 'Credit perks without sharing card details',
    outcomes: [
      'Secure checkout sessions',
      'Escrow-backed settlements',
      'Mutual wins: Seekers save, holders earn',
    ],
    glow: 'purple',
  },
  {
    id: 'kairefer',
    name: 'Kairefer',
    vertical: 'HR-Tech Vertical',
    bridgeLine:
      'Get vetted by real people and get referred directly to the right desk with a single click.',
    oneLiner: 'Referrals that actually reach the right desk',
    outcomes: [
      'Persona-based referral filters',
      'Single-click job portal uploads',
      'High-intent referrer network',
    ],
    glow: 'cyan',
  },
  {
    id: 'kaitree',
    name: 'Kaitree',
    vertical: 'Community Vertical',
    bridgeLine:
      'Mapping ancestral memories and roots to unlock generational trust.',
    oneLiner: 'Map ancestral roots to bridge generations',
    outcomes: [
      'Digitized Vanshavali records',
      'Ancestral path discovery',
      'High-trust social verification',
    ],
    glow: 'emerald',
  },
]

export const productDetails: ProductDetail[] = [
  {
    id: 'kaicards',
    name: 'Kaicards',
    heroTag: 'Financial Utility',
    accent: 'purple',
    icon: 'credit-card',
    vertical: 'Fintech Vertical',
    oneLiner: 'Unlock every perk. Hit every milestone.',
    statement:
      'Kaicards connects savvy shoppers with premium cardholders. Most users miss out on deep platform discounts because they lack the right card, while cardholders fall short of annual spend targets. Kaicards platform empowers to access upto 50% savings without owning every card, while helping cardholders reach their goals safely and seamlessly.',
    personas: {
      seeker: {
        icon: 'wallet-user',
        title: 'The Discount Seeker',
        subtitle: 'Unlock savings without the clutter of extra cards.',
        benefits: [
          {
            label: 'Zero Barrier',
            text: 'No credit inquiries or annual fees required.',
          },
          {
            label: 'Safe Haven',
            text: 'Kaizuna Escrow ensures 100% payment protection.',
          },
          {
            label: 'Frictionless',
            text: 'A fast, seamless checkout experience.',
          },
          {
            label: 'Massive Reach',
            text: 'Access premium perks from every major bank.',
          },
        ],
      },
      provider: {
        icon: 'card-holder',
        title: 'The Card Holder',
        subtitle: 'Smash spending milestones without spending your own capital.',
        benefits: [
          {
            label: 'Rapid Growth',
            text: 'Accelerate high-tier milestone rewards.',
          },
          {
            label: 'Point Stacking',
            text: 'Earn rewards on every third-party purchase.',
          },
          {
            label: 'Active Status',
            text: 'Maintain card activity with zero personal outgoings.',
          },
          {
            label: 'Total Security',
            text: 'Bank-grade compliance and secure data handling.',
          },
        ],
      },
    },
    journeyStepsByRole: {
      roles: ['Card User', 'Card Holder'],
      steps: {
        'Card User': [
          {
            number: '01',
            title: 'Find the Best Offer',
            text: 'Browse available card-powered offers across supported partner platforms.',
          },
          {
            number: '02',
            title: 'Get Matched',
            text: 'Kaicards matches you with a verified card holder with the eligible card.',
          },
          {
            number: '03',
            title: 'Lock Escrow',
            text: 'Deposit the discounted amount into secure Kaizuna Escrow before checkout.',
          },
          {
            number: '04',
            title: 'Receive & Confirm',
            text: 'Track completion and confirm delivery or service completion from your dashboard.',
          },
        ],
        'Card Holder': [
          {
            number: '01',
            title: 'Accept the Request',
            text: 'Review and accept high-fit requests that align with your card perks and spend goals.',
          },
          {
            number: '02',
            title: 'Run Secure Checkout',
            text: 'Complete the purchase through a protected proxy flow without exposing sensitive card data.',
          },
          {
            number: '03',
            title: 'Hit Milestones',
            text: 'Purchase value gets added toward annual spend targets and reward milestones.',
          },
          {
            number: '04',
            title: 'Get Settled',
            text: 'Escrow releases funds after user confirmation, completing a trusted two-sided win.',
          },
        ],
      },
    },
    platforms: [
      { name: 'Flipkart', icon: 'flipkart' },
      { name: 'Myntra', icon: 'myntra' },
      { name: 'Cleartrip', icon: 'cleartrip' },
      { name: 'BookMyShow', icon: 'bookmyshow' },
      { name: 'Ajio', icon: 'ajio' },
      { name: 'Paytm Travel', icon: 'paytm' },
    ],
  },
  {
    id: 'kairefer',
    name: 'Kairefer',
    heroTag: 'Referral Gateway',
    accent: 'cyan',
    icon: 'briefcase',
    vertical: 'HR-Tech Vertical',
    oneLiner: 'Referrals that actually reach the right desk.',
    statement:
      'Kairefer solves the "Referral Fatigue" experienced by employees at top companies. Instead of manually filtering hundreds of LinkedIn DMs, users place a custom Gateway link in their bio. Our pre-screening bot vets candidates against your specific criteria, ensuring only the best requests ever reach your inbox.',
    personas: {
      seeker: {
        icon: 'job-candidate',
        title: 'The Candidate',
        subtitle: 'Get discovered by high-intent referrers, not inbox noise.',
        benefits: [
          {
            label: 'Faster Access',
            text: 'Skip the LinkedIn inbox black hole and reach active referrers directly.',
          },
          {
            label: 'Instant Fit Check',
            text: 'Get immediate feedback on whether you qualify before requesting a referral.',
          },
          {
            label: 'Direct Path',
            text: 'Connect with high-intent professionals already open to referring.',
          },
          {
            label: 'Live Tracking',
            text: 'Track referral progress and updates in real-time.',
          },
        ],
      },
      provider: {
        icon: 'team-referrer',
        title: 'The Referrer',
        subtitle: 'Filter noise and help the right candidates faster.',
        benefits: [
          {
            label: 'Time Saver',
            text: 'Save hours of manual resume review with automated pre-screening.',
          },
          {
            label: 'Quality Inbound',
            text: 'Only qualified candidates reach your queue, not random LinkedIn spam.',
          },
          {
            label: 'Bonus Friendly',
            text: 'Stay eligible for referral bonuses with less manual effort.',
          },
          {
            label: 'Better Hiring',
            text: 'Help your teams hire faster with stronger candidate quality.',
          },
        ],
      },
    },
    journeyStepsByRole: {
      roles: ['Candidate', 'Referrer'],
      steps: {
        Candidate: [
          {
            number: '01',
            title: 'Discover Gateway Link',
            text: 'Find a referrer gateway link from LinkedIn, X, or professional communities.',
          },
          {
            number: '02',
            title: 'Complete Screening',
            text: 'Submit your details and finish a quick role-fit screening flow.',
          },
          {
            number: '03',
            title: 'Get Qualified Match',
            text: 'Only high-fit profiles move forward to the right internal referrer.',
          },
          {
            number: '04',
            title: 'Track Referral',
            text: 'Follow referral status updates without losing visibility in the process.',
          },
        ],
        Referrer: [
          {
            number: '01',
            title: 'Define Persona',
            text: 'Set role criteria so only suitable profiles enter your queue.',
          },
          {
            number: '02',
            title: 'Publish Gateway',
            text: 'Share your personalized link in public profiles and hiring channels.',
          },
          {
            number: '03',
            title: 'Review Top Fits',
            text: 'Receive pre-filtered candidates who pass your threshold.',
          },
          {
            number: '04',
            title: 'Refer in One Flow',
            text: 'Upload to internal portals quickly and log referral proof.',
          },
        ],
      },
    },
    platforms: [
      { name: 'LinkedIn', icon: 'linkedin' },
      { name: 'Naukri', icon: 'naukri' },
      { name: 'IIMJobs', icon: 'iimjobs' },
      { name: 'Instahyre', icon: 'instahyre' },
      { name: 'Workday', icon: 'workday' },
    ],
  },
  {
    id: 'kaitree',
    name: 'Kaitree',
    heroTag: 'Social Discovery',
    accent: 'emerald',
    icon: 'network',
    vertical: 'Community Vertical',
    oneLiner: 'Map ancestral roots to bridge generations.',
    statement:
      'Kaitree is a visual representation of the "Six Degrees of Separation" theory, applied practically. Unlike standard social media, the Tree focuses on verified relationships-familial, community-based, and high-trust professional links-to help people find suitable matches for life-defining events like marriage or business partnerships.',
    personas: {
      seeker: {
        icon: 'community-connector',
        title: 'The Connector',
        subtitle: 'Discover trusted pathways to people and opportunities.',
        benefits: [
          {
            label: 'Verified Paths',
            text: 'Discover high-trust pathways to valuable people and communities.',
          },
          {
            label: 'Safer Networking',
            text: 'Reduce stranger risk by relying on validated social links.',
          },
          {
            label: 'Trusted Matchmaking',
            text: 'Find matrimonial or partnership matches within verified circles.',
          },
          {
            label: 'Cultural Continuity',
            text: 'Preserve and understand your roots and ancestral heritage.',
          },
        ],
      },
      provider: {
        icon: 'trust-bridge',
        title: 'The Bridge',
        subtitle: 'Become a trusted node that strengthens collective trust.',
        benefits: [
          {
            label: 'Community Strength',
            text: 'Strengthen social fabric by acting as a trusted connection point.',
          },
          {
            label: 'Privacy Control',
            text: 'Choose visibility and control who can access your network.',
          },
          {
            label: 'Trust Credits',
            text: 'Earn recognition for successful and meaningful introductions.',
          },
          {
            label: 'Impact Multiplier',
            text: 'Help friends and families unlock life-changing opportunities.',
          },
        ],
      },
    },
    journeyStepsByRole: {
      roles: ['Connector', 'Bridge'],
      steps: {
        Connector: [
          {
            number: '01',
            title: 'Set Your Roots',
            text: 'Add ancestry, village, and lineage context to establish identity anchors.',
          },
          {
            number: '02',
            title: 'Verify Connections',
            text: 'Mutually validate links with trusted people in your immediate graph.',
          },
          {
            number: '03',
            title: 'Find a Path',
            text: 'Search for a target person and discover real human bridges to reach them.',
          },
          {
            number: '04',
            title: 'Request a Vouch',
            text: 'Ask intermediaries for digital vouching to build confidence quickly.',
          },
        ],
        Bridge: [
          {
            number: '01',
            title: 'Maintain Trusted Links',
            text: 'Keep your connection graph accurate and actively verified.',
          },
          {
            number: '02',
            title: 'Control Visibility',
            text: 'Decide how much of your network is visible for discovery and introductions.',
          },
          {
            number: '03',
            title: 'Enable Introductions',
            text: 'Support relevant connections for networking, business, or matrimony.',
          },
          {
            number: '04',
            title: 'Build Community Trust',
            text: 'Strengthen shared trust capital through successful, meaningful connections.',
          },
        ],
      },
    },
  },
]
