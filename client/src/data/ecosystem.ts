export interface PillarSummary {
  id: 'kaicards' | 'kairefer' | 'kaitree'
  name: string
  vertical: string
  bridgeLine: string
  oneLiner: string
  outcomes: string[]
  glow: 'purple' | 'cyan' | 'emerald'
}

export interface ProductFlowStep {
  step: number
  actor: string
  title: string
  detail: string
}

export interface ProductJourneyStep {
  number: string
  title: string
  text: string
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
  benefits: string[]
}

export interface ProductFastFact {
  label: string
  value: string
}

export interface ProductDetail {
  id: PillarSummary['id']
  name: string
  heroTitle: string
  heroTag: string
  accent: 'blue' | 'emerald' | 'purple'
  icon: ProductIcon
  vertical: string
  statement: string
  motivation: string
  namingMotivation: string
  highlights: string[]
  fastFacts: ProductFastFact[]
  personas: {
    seeker: ProductPersona
    provider: ProductPersona
  }
  journeySteps: ProductJourneyStep[]
  platforms?: { name: string; icon: string }[]
  flow: ProductFlowStep[]
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
    oneLiner: 'Get the discount; give the milestone.',
    outcomes: [
      'Proxy checkout sessions',
      'Escrow-backed settlements',
      'Cardholder milestone completion',
    ],
    glow: 'purple',
  },
  {
    id: 'kairefer',
    name: 'Kairefer',
    vertical: 'HR-Tech Vertical',
    bridgeLine:
      'A no-broker referral engine for direct internal portal uploads.',
    oneLiner: 'Bridge the gap to your next career move.',
    outcomes: [
      'Persona-based referral filters',
      'One-click internal portal upload',
      'No manual data re-entry',
    ],
    glow: 'cyan',
  },
  {
    id: 'kaitree',
    name: 'Kaitree',
    vertical: 'Community Vertical',
    bridgeLine:
      'An ancestral graph connecting communities through verified lineage.',
    oneLiner: 'Find roots, map paths, unlock trust.',
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
    heroTitle: 'Credit Bridge',
    heroTag: 'Financial Utility',
    accent: 'blue',
    icon: 'credit-card',
    vertical: 'Fintech Vertical',
    statement:
      'Kaicards is a first-of-its-kind financial matchmaking engine. Many premium credit cards offer massive discounts (10-50%) on specific platforms, but most people do not own every card. Conversely, cardholders often struggle to hit high annual spending milestones. Kaicards bridges this gap using a secure escrow system.',
    motivation:
      'Millions of card discounts go unused while holders still need milestone spend. Existing sharing methods are risky and expose sensitive card data. Kaicards closes this trust gap.',
    namingMotivation:
      '"Kai" means bond or connection, and "Cards" reflects financial utility. Kaicards represents a two-sided financial bond where both participants win without compromising security.',
    highlights: [
      'No card numbers shared',
      'No address exposure',
      'Bridge encrypted end to end',
    ],
    fastFacts: [
      { label: 'Security', value: 'Kaizuna Guard(TM)' },
      { label: 'Processing', value: 'Real-time' },
      { label: 'Integration', value: 'API Enabled' },
    ],
    personas: {
      seeker: {
        icon: 'wallet-user',
        title: 'The Discount Seeker',
        benefits: [
          'Access 20%+ discounts without owning 10+ cards',
          'No credit inquiry or annual fees required',
          'Kaizuna Escrow protection guarantees your money',
          'Seamless checkout experience',
        ],
      },
      provider: {
        icon: 'card-holder',
        title: 'The Card Holder',
        benefits: [
          'Hit high-tier spending milestones faster',
          "Earn reward points on other people's purchases",
          'Maintain card active status without personal spending',
          'Fully compliant and secure data handling',
        ],
      },
    },
    journeySteps: [
      {
        number: '01',
        title: 'Discovery',
        text: 'Seekers browse available card-specific discounts on supported platforms.',
      },
      {
        number: '02',
        title: 'Matchmaking',
        text: 'Our engine matches the Seeker with a verified Holder who has the required card.',
      },
      {
        number: '03',
        title: 'Escrow Lock',
        text: 'Seeker deposits funds into a secure Kaizuna escrow account.',
      },
      {
        number: '04',
        title: 'Execution',
        text: 'Holder processes the transaction; Seeker receives the product/service.',
      },
      {
        number: '05',
        title: 'Release',
        text: 'Upon confirmation, funds are released to the Holder, helping them hit spend milestones.',
      },
    ],
    platforms: [
      { name: 'Flipkart', icon: 'flipkart' },
      { name: 'Myntra', icon: 'myntra' },
      { name: 'Cleartrip', icon: 'cleartrip' },
      { name: 'BookMyShow', icon: 'bookmyshow' },
      { name: 'Ajio', icon: 'ajio' },
      { name: 'Paytm Travel', icon: 'paytm' }
    ],
    flow: [
      {
        step: 1,
        actor: 'User',
        title: 'Deposit Discounted Amount',
        detail:
          'User identifies an offer and deposits the discounted amount into Kaizuna escrow.',
      },
      {
        step: 2,
        actor: 'Holder',
        title: 'Accept Discount-Power Request',
        detail:
          'Card holder accepts request to lend discount power without exposing card details.',
      },
      {
        step: 3,
        actor: 'Bridge',
        title: 'Run Secure Proxy Session',
        detail:
          'Encrypted proxy session executes checkout. Card number and delivery address remain protected.',
      },
      {
        step: 4,
        actor: 'Settlement',
        title: 'Close Loop for Both Sides',
        detail:
          'User receives product. Holder bill gets settled, milestone progresses, and service fee is credited.',
      },
    ],
  },
  {
    id: 'kairefer',
    name: 'Kairefer',
    heroTitle: 'Referral Gateway',
    heroTag: 'Professional Growth',
    accent: 'emerald',
    icon: 'briefcase',
    vertical: 'HR-Tech Vertical',
    statement:
      'Kairefer solves the "Referral Fatigue" experienced by employees at top companies. Instead of manually filtering hundreds of LinkedIn DMs, users place a custom Gateway link in their bio. Candidates must pass a pre-screening bot based on the referrer\'s specific criteria before the request ever hits their inbox.',
    motivation:
      'Traditional referral DMs are noisy. Givers are flooded with resumes and seekers disappear into hiring black holes. Kairef automates manual upload friction.',
    namingMotivation:
      '"Kai" plus "Refer" simplifies the complex act of vouching into one direct, high-trust action.',
    highlights: [
      'High-fit persona matching',
      'Top-tier match notification',
      'Workday-like portal auto-fill',
    ],
    fastFacts: [
      { label: 'Security', value: 'Kaizuna Guard(TM)' },
      { label: 'Processing', value: 'Real-time' },
      { label: 'Integration', value: 'API Enabled' },
    ],
    personas: {
      seeker: {
        icon: 'job-candidate',
        title: 'The Candidate',
        benefits: [
          'Skip the LinkedIn inbox "black hole"',
          'Get immediate feedback on if you qualify for a referral',
          'Direct line to high-intent referrers',
          'Track referral status in real-time',
        ],
      },
      provider: {
        icon: 'team-referrer',
        title: 'The Referrer',
        benefits: [
          'Save hours of manual resume reviewing',
          'Zero LinkedIn spam-only qualified leads reach you',
          'Earn company referral bonuses with minimal effort',
          'Help your team grow with higher-quality hires',
        ],
      },
    },
    journeySteps: [
      {
        number: '01',
        title: 'Bot Setup',
        text: 'Referrer defines "must-have" criteria (experience, skills, location).',
      },
      {
        number: '02',
        title: 'Bio Integration',
        text: 'Add your unique Gateway link to LinkedIn or Twitter bios.',
      },
      {
        number: '03',
        title: 'Self-Service Screening',
        text: 'Candidates complete a 60-second assessment via the link.',
      },
      {
        number: '04',
        title: 'Auto-Filter',
        text: 'Only candidates who meet 100% of criteria are presented to the referrer.',
      },
    ],
    platforms: [
      { name: 'LinkedIn', icon: 'linkedin' },
      { name: 'Naukri', icon: 'naukri' },
      { name: 'IIMJobs', icon: 'iimjobs' },
      { name: 'Instahyre', icon: 'instahyre' },
      { name: 'Workday', icon: 'workday' }
    ],
    flow: [
      {
        step: 1,
        actor: 'Giver',
        title: 'Set Referral Persona',
        detail:
          'Giver defines a specific referral persona so only high-fit candidates are surfaced.',
      },
      {
        step: 2,
        actor: 'Seeker',
        title: 'Broadcast Resume for Role',
        detail:
          'Seeker submits resume and target role to the Kaizuna network distribution layer.',
      },
      {
        step: 3,
        actor: 'Match',
        title: 'Filter for Top-Tier Fit',
        detail:
          'Matching engine notifies the giver only when role fit and persona quality pass threshold.',
      },
      {
        step: 4,
        actor: 'Bridge',
        title: 'Direct Internal Upload',
        detail:
          'One click auto-populates seeker profile into the giver internal portal workflow.',
      },
      {
        step: 5,
        actor: 'Confirmation',
        title: 'Log Referral with Proof',
        detail:
          'Referral is officially logged and giver remains eligible for company referral bonus.',
      },
    ],
  },
  {
    id: 'kaitree',
    name: 'Kaitree',
    heroTitle: 'Community Tree',
    heroTag: 'Social Discovery',
    accent: 'purple',
    icon: 'network',
    vertical: 'Community Vertical',
    statement:
      'Kaitree is a visual representation of the "Six Degrees of Separation" theory, applied practically. Unlike standard social media, the Tree focuses on verified relationships-familial, community-based, and high-trust professional links-to help people find suitable matches for life-defining events like marriage or business partnerships.',
    motivation:
      'Globalization has broken continuity in Vanshavali records. Kaitree digitizes the banyan model so ancestral trust can support networking, business, and matrimonial verification.',
    namingMotivation:
      '"Kai" plus "Tree" represents rooted ancestry with branching opportunity across generations.',
    highlights: [
      'Village and gotra graphing',
      'Interconnected community forest',
      'Trust-led path utilization',
    ],
    fastFacts: [
      { label: 'Security', value: 'Kaizuna Guard(TM)' },
      { label: 'Processing', value: 'Real-time' },
      { label: 'Integration', value: 'API Enabled' },
    ],
    personas: {
      seeker: {
        icon: 'community-connector',
        title: 'The Connector',
        benefits: [
          'Discover verified paths to high-value individuals',
          'Reduce "stranger danger" in networking',
          'Find matrimonial matches within trusted social circles',
          'Understand community roots and heritage',
        ],
      },
      provider: {
        icon: 'trust-bridge',
        title: 'The Bridge',
        benefits: [
          'Strengthen community ties by acting as a trusted link',
          'Control who can see your connections',
          'Earn "Trust Points" for successful introductions',
          'Help family and friends find life-changing opportunities',
        ],
      },
    },
    journeySteps: [
      {
        number: '01',
        title: 'Node Creation',
        text: 'Users map their immediate trusted circle (family, close peers).',
      },
      {
        number: '02',
        title: 'Verification',
        text: "Nodes must mutually verify connections to ensure the tree's integrity.",
      },
      {
        number: '03',
        title: 'Path Discovery',
        text: 'Search for a target profile to see the exact chain of humans linking you.',
      },
      {
        number: '04',
        title: 'Vouching',
        text: 'Request a digital "vouch" from intermediaries to build instant trust.',
      },
    ],
    flow: [
      {
        step: 1,
        actor: 'Rooting',
        title: 'Input Ancestral Identity',
        detail:
          'User enters ancestral village, lineage/gotra, and historical family context.',
      },
      {
        step: 2,
        actor: 'Graph',
        title: 'Build Community Forest',
        detail:
          'System connects individual family trees into a wider, validated community graph.',
      },
      {
        step: 3,
        actor: 'Path Discovery',
        title: 'Compute Ancestral Path',
        detail:
          'Users discover lineage paths between themselves and any other verified community member.',
      },
      {
        step: 4,
        actor: 'Utilization',
        title: 'Activate Verified Roots',
        detail:
          'Community members use verified lineage for high-trust networking, startup support, and matrimonial checks.',
      },
    ],
  },
]
