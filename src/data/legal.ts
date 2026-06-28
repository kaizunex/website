export type InfoBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: { label?: string; text: string }[] }

export interface InfoSection {
  id: string
  title?: string
  blocks: InfoBlock[]
}

export type InfoSlug = 'about' | 'privacy' | 'terms'

export interface InfoPageData {
  slug: InfoSlug
  eyebrow: string
  title: string
  intro?: string
  updated?: string
  sections: InfoSection[]
}

export const infoPages: Record<InfoSlug, InfoPageData> = {
  about: {
    slug: 'about',
    eyebrow: 'About us',
    title: 'Welcome to Kaizuna',
    intro:
      'At Kaizuna, we believe in the power of continuous improvement and meaningful connections. Our platform is dedicated to bridging gaps, streamlining experiences, and providing innovative solutions tailored to your modern needs. The name "Kaizuna" embodies our core philosophy: *Kaizen* (continuous growth and improvement) intertwined with *Kizuna* (the powerful bonds and connections between people).',
    sections: [
      {
        id: 'mission',
        title: 'Our Mission',
        blocks: [
          {
            type: 'paragraph',
            text: 'Our mission is simple: to empower individuals and businesses by delivering reliable, efficient, and forward-thinking tools. We strive to foster an ecosystem where technology enhances human capability, making daily operations smoother and more impactful.',
          },
        ],
      },
      {
        id: 'why',
        title: 'Why Choose Kaizuna?',
        blocks: [
          {
            type: 'list',
            items: [
              {
                label: 'Innovation-Driven',
                text: 'We constantly evolve our features to stay ahead of industry standards and user expectations.',
              },
              {
                label: 'User-Centric Design',
                text: 'Every tool and interface we build is designed with simplicity, accessibility, and the user experience in mind.',
              },
              {
                label: 'Unwavering Support',
                text: "We value our community's trust above all else. Our dedicated team is always ready to assist and evolve based on your feedback.",
              },
            ],
          },
        ],
      },
      {
        id: 'contact',
        title: 'Get in Touch',
        blocks: [
          {
            type: 'paragraph',
            text: 'We love hearing from our community. Whether you have a question, feedback, or a partnership proposal, please reach out to us at **kaizunanexus@gmail.com**.',
          },
        ],
      },
    ],
  },

  privacy: {
    slug: 'privacy',
    eyebrow: 'Privacy policy',
    title: 'Privacy Policy',
    updated: 'June 21, 2026',
    intro:
      'Welcome to www.kaizuna.com (the "Site"). We value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website.',
    sections: [
      {
        id: 'info-we-collect',
        title: '1. Information We Collect',
        blocks: [
          { type: 'paragraph', text: 'We may collect information about you in a variety of ways, including:' },
          {
            type: 'list',
            items: [
              {
                label: 'Personal Data',
                text: 'Voluntarily provided information such as your name, email address, and contact details when you register, subscribe, or contact us.',
              },
              {
                label: 'Derivative Data',
                text: 'Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, access times, and the pages you viewed.',
              },
            ],
          },
        ],
      },
      {
        id: 'how-we-use',
        title: '2. How We Use Your Information',
        blocks: [
          { type: 'paragraph', text: 'We use the information collected to:' },
          {
            type: 'list',
            items: [
              { text: 'Operate, maintain, and improve our website and services.' },
              { text: 'Respond to your comments, questions, and support requests.' },
              { text: 'Send you administrative information, updates, and promotional materials (where permitted).' },
              { text: 'Prevent fraudulent transactions and monitor against theft or illegal activity.' },
            ],
          },
        ],
      },
      {
        id: 'disclosure',
        title: '3. Disclosure of Your Information',
        blocks: [
          {
            type: 'paragraph',
            text: 'We do not sell, trade, or rent your personal information to third parties. We may share information with third-party service providers who assist us in operating our website, so long as those parties agree to keep this information confidential. We may also disclose information if required to do so by law.',
          },
        ],
      },
      {
        id: 'security',
        title: '4. Security of Your Information',
        blocks: [
          {
            type: 'paragraph',
            text: 'We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide, please be aware that no security measures are perfect or impenetrable.',
          },
        ],
      },
      {
        id: 'rights',
        title: '5. Your Privacy Rights',
        blocks: [
          {
            type: 'paragraph',
            text: 'Depending on your location, you may have rights to access, correct, or delete the personal data we hold about you.',
          },
        ],
      },
      {
        id: 'contact',
        title: '6. Contact Us',
        blocks: [
          {
            type: 'paragraph',
            text: 'If you have questions, complaints, or comments about this Privacy Policy, please contact us at **kaizunanexus@gmail.com**.',
          },
        ],
      },
    ],
  },

  terms: {
    slug: 'terms',
    eyebrow: 'Terms & conditions',
    title: 'Terms and Conditions',
    updated: 'June 21, 2026',
    intro:
      'Welcome to www.kaizuna.com. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use our Site.',
    sections: [
      {
        id: 'ip',
        title: '1. Intellectual Property Rights',
        blocks: [
          {
            type: 'paragraph',
            text: 'Unless otherwise stated, Kaizuna owns the intellectual property rights for all material on www.kaizuna.com. All intellectual property rights are reserved. You may access this from the Site for your own personal use subjected to restrictions set in these terms.',
          },
        ],
      },
      {
        id: 'restrictions',
        title: '2. User Restrictions',
        blocks: [
          { type: 'paragraph', text: 'You are specifically restricted from:' },
          {
            type: 'list',
            items: [
              { text: 'Publishing any Site material in any other media without prior consent.' },
              { text: 'Selling, sublicensing, or commercializing any Site material.' },
              { text: 'Using this Site in any way that is or may be damaging to this Site.' },
              { text: 'Engaging in any data mining, data harvesting, data extracting, or any other similar activity.' },
            ],
          },
        ],
      },
      {
        id: 'user-content',
        title: '3. User Content',
        blocks: [
          {
            type: 'paragraph',
            text: 'In these Terms, "User Content" shall mean any audio, video text, images, or other material you choose to display or submit on this Site. By displaying your content, you grant Kaizuna a non-exclusive, worldwide irrevocable, sub-licensable license to use, reproduce, adapt, publish, and distribute it. Your content must not invade any third-party\u2019s rights.',
          },
        ],
      },
      {
        id: 'warranties',
        title: '4. No Warranties',
        blocks: [
          {
            type: 'paragraph',
            text: 'This Site is provided "as is," with all faults, and Kaizuna expresses no representations or warranties of any kind related to this Site or the materials contained on this Site.',
          },
        ],
      },
      {
        id: 'liability',
        title: '5. Limitation of Liability',
        blocks: [
          {
            type: 'paragraph',
            text: 'In no event shall Kaizuna, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Site.',
          },
        ],
      },
      {
        id: 'indemnification',
        title: '6. Indemnification',
        blocks: [
          {
            type: 'paragraph',
            text: 'You hereby indemnify to the fullest extent Kaizuna from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.',
          },
        ],
      },
      {
        id: 'severability',
        title: '7. Severability & Changes to Terms',
        blocks: [
          {
            type: 'paragraph',
            text: 'If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions. Kaizuna is permitted to revise these Terms at any time as it sees fit.',
          },
        ],
      },
      {
        id: 'governing-law',
        title: '8. Governing Law',
        blocks: [
          {
            type: 'paragraph',
            text: 'These Terms will be governed by and interpreted in accordance with the laws of the operating jurisdiction, and you submit to the non-exclusive jurisdiction of the state and federal courts for the resolution of any disputes.',
          },
        ],
      },
      {
        id: 'complaints',
        title: '9. Complaints and Contact Information',
        blocks: [
          {
            type: 'paragraph',
            text: 'For any resolution of complaints, disputes, or clarifications regarding these Terms, please contact us immediately at **kaizunanexus@gmail.com**.',
          },
        ],
      },
    ],
  },
}

export const infoSlugs = Object.keys(infoPages) as InfoSlug[]
