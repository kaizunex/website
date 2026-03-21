export interface PersonaBenefit {
  text: string
}

export interface Persona {
  id: string
  label: string
  emoji: string
  name: string
  subtitle: string
  benefits: PersonaBenefit[]
  bulletColor: string
}

export interface UseCase {
  id: string
  tag: string
  tagColor: 'purple' | 'green' | 'blue'
  title: string
  description: string
  featured?: boolean
  personas: Persona[]
}

export interface ScenarioCard {
  id: string
  title: string
  summary: string
  medium: 'Access' | 'Opportunity' | 'Trust'
  visual: 'funding' | 'referral' | 'mentor' | 'global' | 'creative' | 'builder'
}

export const useCases: UseCase[] = [
  {
    id: 'financial-access',
    tag: 'Access Medium',
    tagColor: 'purple',
    title: 'Financial Access',
    description:
      'Peer-to-peer financial support, community lending circles, and resource sharing — all powered by trust scores and verified relationships.',
    featured: true,
    personas: [
      {
        id: 'seeker',
        label: 'Seeker',
        emoji: '🔍',
        name: 'The Seeker',
        subtitle: 'Needs access to financial resources through trusted connections',
        benefits: [
          { text: 'Access community lending circles backed by trust scores' },
          { text: 'Connect with supporters who have verified track records' },
          { text: 'Build financial reputation through successful interactions' },
          { text: 'Get matched with resources based on genuine need, not credit scores' },
          { text: 'Transparent terms — no hidden fees, no predatory rates' },
        ],
        bulletColor: '#A78BFA',
      },
      {
        id: 'supporter',
        label: 'Supporter',
        emoji: '🤝',
        name: 'The Supporter',
        subtitle: 'Provides financial resources and mentorship to trusted seekers',
        benefits: [
          { text: 'Support vetted individuals through trust-verified profiles' },
          { text: 'Track impact with transparent outcome reporting' },
          { text: 'Build reputation as a reliable community supporter' },
          { text: 'Set your own terms and boundaries for support' },
          { text: 'Join lending circles with shared accountability' },
        ],
        bulletColor: '#A78BFA',
      },
      {
        id: 'builder',
        label: 'Builder',
        emoji: '🏗️',
        name: 'The Builder',
        subtitle: 'Creates financial tools and infrastructure on the platform',
        benefits: [
          { text: 'Build lending products on top of trust scores' },
          { text: 'Access anonymized data for community-serving innovation' },
          { text: 'Create tools that reduce financial friction for underserved communities' },
          { text: 'Earn platform incentives for high-impact tools' },
          { text: 'Integrate with existing financial infrastructure' },
        ],
        bulletColor: '#A78BFA',
      },
    ],
  },
  {
    id: 'referrals-opportunities',
    tag: 'Opportunity Medium',
    tagColor: 'green',
    title: 'Referrals & Opportunities',
    description:
      'Job referrals, partnership introductions, and professional opportunities — flowing through authentic relationships instead of cold applications.',
    personas: [
      {
        id: 'job-seeker',
        label: 'Job Seeker',
        emoji: '💼',
        name: 'The Job Seeker',
        subtitle: 'Looking for career opportunities through genuine connections',
        benefits: [
          { text: 'Get referred by people who know your work firsthand' },
          { text: 'Access hidden job market through trusted network pathways' },
          { text: 'Build professional reputation through verified project outcomes' },
          { text: 'Skip the resume black hole — connections vouch for you' },
          { text: 'Find roles aligned with your actual skills, not keyword matches' },
        ],
        bulletColor: '#34D399',
      },
      {
        id: 'connector',
        label: 'Connector',
        emoji: '🔗',
        name: 'The Connector',
        subtitle: 'Bridges talent with opportunity through trusted introductions',
        benefits: [
          { text: 'Earn reputation points for successful introductions' },
          { text: 'Build a track record as a valuable network node' },
          { text: 'Get recognized when your referrals lead to successful outcomes' },
          { text: 'Curate your introduction network with quality over quantity' },
          { text: 'Access analytics on the impact of your connections' },
        ],
        bulletColor: '#34D399',
      },
      {
        id: 'recruiter',
        label: 'Recruiter',
        emoji: '🎯',
        name: 'The Recruiter',
        subtitle: 'Finds verified talent through trust-based referral chains',
        benefits: [
          { text: 'Access candidates pre-vetted by trusted community members' },
          { text: 'Reduce hiring risk with trust scores and verified outcomes' },
          { text: 'Tap into diverse talent pools beyond traditional pipelines' },
          { text: 'Track referral chain quality for better sourcing decisions' },
          { text: 'Build employer reputation through transparent hiring practices' },
        ],
        bulletColor: '#34D399',
      },
    ],
  },
  {
    id: 'life-business',
    tag: 'Trust Medium',
    tagColor: 'blue',
    title: 'Life & Business Connections',
    description:
      'Mentorship, co-founder matching, creative collaborations, and life connections — built on verified trust and shared values.',
    personas: [
      {
        id: 'founder',
        label: 'Founder',
        emoji: '🚀',
        name: 'The Founder',
        subtitle: 'Seeks co-founders, advisors, and early supporters through trust',
        benefits: [
          { text: 'Find co-founders with verified complementary skills' },
          { text: 'Connect with advisors who have real track records' },
          { text: 'Access early supporters through trusted network chains' },
          { text: 'Build credibility through transparent milestone tracking' },
          { text: 'Join founder circles for shared learning and accountability' },
        ],
        bulletColor: '#93C5FD',
      },
      {
        id: 'mentor',
        label: 'Mentor',
        emoji: '🧭',
        name: 'The Mentor',
        subtitle: 'Shares expertise and guidance through structured relationships',
        benefits: [
          { text: 'Get matched with mentees based on genuine compatibility' },
          { text: 'Build a verified mentorship track record over time' },
          { text: 'Set structured engagement terms that respect your time' },
          { text: 'Track mentee outcomes as part of your platform reputation' },
          { text: 'Join mentorship networks with shared specializations' },
        ],
        bulletColor: '#93C5FD',
      },
      {
        id: 'creative',
        label: 'Creative',
        emoji: '🎨',
        name: 'The Creative',
        subtitle: 'Finds collaborators and opportunities through authentic connections',
        benefits: [
          { text: 'Showcase work through verified project portfolios' },
          { text: 'Find collaborators who match your creative vision and values' },
          { text: 'Access opportunities through trust-based referrals, not algorithms' },
          { text: 'Build reputation through completed collaborative projects' },
          { text: 'Connect with patrons and supporters who value authentic creativity' },
        ],
        bulletColor: '#93C5FD',
      },
    ],
  },
]

export const scenarioCards: ScenarioCard[] = [
  {
    id: 'startup-funding-path',
    title: 'Startup funding through trust circles',
    summary:
      'A founder gets early runway through three trusted introductions before approaching institutional capital.',
    medium: 'Access',
    visual: 'funding',
  },
  {
    id: 'warm-job-chain',
    title: 'Warm job referral chain',
    summary:
      'A product designer lands an unlisted role after a two-hop referral where each step is transparent.',
    medium: 'Opportunity',
    visual: 'referral',
  },
  {
    id: 'mentor-match',
    title: 'Mentor matching with accountability',
    summary:
      'A first-time operator finds a mentor aligned by domain, values, and verified guidance outcomes.',
    medium: 'Trust',
    visual: 'mentor',
  },
  {
    id: 'cross-border-intro',
    title: 'Cross-border collaborator intro',
    summary:
      'A builder in Lagos and an engineer in Berlin connect through trusted mutuals to ship a pilot together.',
    medium: 'Opportunity',
    visual: 'global',
  },
  {
    id: 'creative-client-loop',
    title: 'Creative client loop',
    summary:
      'A motion designer gets recurring client work from verified relationship chains instead of algorithm feeds.',
    medium: 'Trust',
    visual: 'creative',
  },
  {
    id: 'builder-resource-stack',
    title: 'Builder resource stack',
    summary:
      'A solo founder unlocks legal, hiring, and infra support via trusted supporters in one coordinated flow.',
    medium: 'Access',
    visual: 'builder',
  },
]
