export interface PillarSummary {
  id: 'kaicards' | 'kairef' | 'kaitree'
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

export interface ProductDetail {
  id: PillarSummary['id']
  name: string
  vertical: string
  statement: string
  motivation: string
  namingMotivation: string
  flow: ProductFlowStep[]
  highlights: string[]
}

export const nexusStats = [
  { value: '3', label: 'Live Bridges' },
  { value: '1', label: 'Unified Nexus' },
  { value: '0', label: 'Middlemen Required' },
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
    id: 'kairef',
    name: 'Kairef',
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
    vertical: 'Fintech Vertical',
    statement:
      'A peer-to-peer credit benefit sharing platform using secure proxy sessions and escrow-backed settlement.',
    motivation:
      'Millions of card discounts go unused while holders still need milestone spend. Existing sharing methods are risky and expose sensitive card data. Kaicards closes this trust gap.',
    namingMotivation:
      '"Kai" means bond or connection, and "Cards" reflects financial utility. Kaicards represents a two-sided financial bond where both participants win without compromising security.',
    highlights: [
      'No card numbers shared',
      'No address exposure',
      'Bridge encrypted end to end',
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
    id: 'kairef',
    name: 'Kairef',
    vertical: 'HR-Tech Vertical',
    statement:
      'A streamlined referral engine that automates direct uploads into internal company job portals.',
    motivation:
      'Traditional referral DMs are noisy. Givers are flooded with resumes and seekers disappear into hiring black holes. Kairef automates manual upload friction.',
    namingMotivation:
      '"Kai" plus "Ref" simplifies the complex act of vouching into one direct, high-trust action.',
    highlights: [
      'High-fit persona matching',
      'Top-tier match notification',
      'Workday-like portal auto-fill',
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
    vertical: 'Community Vertical',
    statement:
      'A lineage-driven community graph that turns ancestral roots into modern, trusted social capital.',
    motivation:
      'Globalization has broken continuity in Vanshavali records. Kaitree digitizes the banyan model so ancestral trust can support networking, business, and matrimonial verification.',
    namingMotivation:
      '"Kai" plus "Tree" represents rooted ancestry with branching opportunity across generations.',
    highlights: [
      'Village and gotra graphing',
      'Interconnected community forest',
      'Trust-led path utilization',
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
