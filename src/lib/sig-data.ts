/**
 * Real SIG content sourced from https://www.omaninvestgateway.com/
 * Do not replace with placeholder content.
 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const BRAND = {
  name: 'Smart Investment Gateway',
  short: 'SIG',
  tagline: 'Oman… opening doors for opportunities',
  logo: `${basePath}/logos/SIG_logo.svg`,
  heroVideo: `${basePath}/video-4.mp4`,
  site: 'https://www.omaninvestgateway.com',
};

export const NAV = [
  {
    label: 'About',
    href: '#about',
    children: [
      { label: 'Our Company', href: 'https://www.omaninvestgateway.com/our-company/' },
      { label: "Chairman's Message", href: 'https://www.omaninvestgateway.com/founders-message/' },
      { label: 'Our Team', href: 'https://www.omaninvestgateway.com/our-team/' },
      { label: 'Global Partners', href: 'https://www.omaninvestgateway.com/global-partners/' },
    ],
  },
  {
    label: 'Knowledge Hub',
    href: '#insights',
    children: [
      { label: 'Vision 2040', href: 'https://www.omaninvestgateway.com/oman-2/' },
      { label: 'Competitive Offer', href: 'https://www.omaninvestgateway.com/oman-2/#competitive' },
      { label: 'Vision 2040 Articles', href: 'https://www.omaninvestgateway.com/oman-2/#articles' },
      { label: 'Case Studies', href: 'https://www.omaninvestgateway.com/publications/' },
    ],
  },
  { label: 'Services', href: '#services' },
  { label: 'Briefs', href: 'https://www.omaninvestgateway.com/briefs/' },
  { label: 'Training', href: '#workshops' },
  {
    label: 'Media',
    href: '#insights',
    children: [
      { label: 'Publications', href: 'https://www.omaninvestgateway.com/publications/' },
      { label: 'FDI Workshops', href: 'https://www.omaninvestgateway.com/fdi-workshops/' },
    ],
  },
  { label: 'Contact', href: 'https://www.omaninvestgateway.com/contact/' },
];

export const HERO_LINES = [
  'Activating strategies for investment and growth',
  'Accelerating investment into Oman',
  'Connecting investors with opportunity',
  'Incorporating international best practice with local expertise',
];

export const WHAT_WE_DO = {
  eyebrow: 'What We Do',
  headline: 'We turn strategy, research, and investment insight into measurable impact.',
  body: 'We deliver economic advisory, feasibility studies, FDI support, and executive training to governments and the private sector, helping organizations make informed decisions and implement sustainable growth strategies aligned with national and regional priorities.',
  pillars: [
    { k: 'Strategy', v: 'Corporate and national growth architecture' },
    { k: 'Research', v: 'Feasibility, market and policy assessment' },
    { k: 'Investment', v: 'FDI promotion, packaging and outreach' },
    { k: 'Execution', v: 'Capability building and implementation' },
  ],
};

export const CLIENTS = [
  'Ministry Of Commerce',
  'Ahlibank',
  'Petroleum Development Oman',
  'Special Economic Zone Authority',
  'Al Fairuz',
  'Riyadha',
  'Royal Academy of Management',
  'edgo',
  'Al Haditha Petroleum Services',
  'The Zubair Corporation',
  'Al Roya',
  'Seeh Al Sarya',
  'Al Hajiry',
];

export type Service = {
  n: string;
  title: string;
  lead: string;
  body: string;
  image: string;
  span: 'wide' | 'tall' | 'std';
};

export const SERVICES: Service[] = [
  {
    n: '01',
    title: 'Investment Promotion & FDI Services',
    lead: 'We support governments and businesses in attracting and securing quality investments.',
    body: 'From investor targeting and sector positioning to project packaging and international outreach, we help translate opportunities into bankable, investor-ready propositions.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=70',
    span: 'wide',
  },
  {
    n: '02',
    title: 'Capability Building & Specialized Training',
    lead: 'We build institutional and executive capabilities through targeted programs.',
    body: 'Our training and workshops strengthen FDI skills, strategic thinking, and sector-specific expertise across government, banking, and the private sector.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=70',
    span: 'tall',
  },
  {
    n: '03',
    title: 'Economic & Market Intelligence',
    lead: 'We provide data-driven insights to support confident decision-making.',
    body: 'Our research, feasibility, and economic studies combine market analysis, financial modelling, and policy assessment to guide investment, strategy, and risk management.',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=70',
    span: 'std',
  },
  {
    n: '04',
    title: 'Sustainability & ESG Transformation',
    lead: 'We enable organizations to transition from sustainability ambition to measurable impact.',
    body: 'ESG strategy, carbon accounting, decarbonization roadmaps, regulatory compliance, and AI-powered sustainability solutions aligned with global standards and Oman Vision 2040.',
    image:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=70',
    span: 'std',
  },
  {
    n: '05',
    title: 'Corporate Strategy & Growth Advisory',
    lead: 'We help organizations design and execute sustainable growth strategies.',
    body: 'From market entry and expansion to performance improvement and diversification, we align corporate strategies with competitive realities and national development priorities.',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=70',
    span: 'std',
  },
  {
    n: '06',
    title: 'M&A, Due Diligence & Financial Advisory',
    lead: 'We support informed investment, acquisition, and partnership decisions.',
    body: 'Our advisory services cover commercial and financial due diligence, acquisition evaluation, fundraising, and strategic account analysis to manage risk and unlock value.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=70',
    span: 'wide',
  },
];

export const STATS = [
  { value: 5, suffix: '+', label: 'Partnered with Global Institutions' },
  { value: 40, suffix: '+', label: 'Feasibility & Pre-Feasibility Studies' },
  { value: 50, suffix: '+', label: 'Advisory Engagements' },
  { value: 300, suffix: '+', label: 'Senior Officers Trained' },
];

export const WORKSHOPS = [
  {
    title: 'FDI Training Salalah',
    location: 'Salalah, Dhofar',
    category: 'Foreign Direct Investment',
    body: 'Field-based FDI capability program equipping regional officers with investor targeting, sector positioning and project packaging skills.',
    href: 'https://www.omaninvestgateway.com/training-salalah/',
    // SIG's own event photography, from /fdi-workshops/
    image:
      'https://www.omaninvestgateway.com/wp-content/uploads/2025/12/FDI-Workshop-Salalah-Day-1-1-1.jpg',
  },
  {
    title: 'FDI Training Muscat',
    location: 'Muscat',
    category: 'Foreign Direct Investment',
    body: 'Executive FDI program for government and private sector professionals covering investment promotion practice and international outreach.',
    href: 'https://www.omaninvestgateway.com/training-muscat/',
    // SIG's own event photography, from /fdi-workshops/
    image:
      'https://www.omaninvestgateway.com/wp-content/uploads/2025/12/FDI-Workshop-Muscat-Day1-1.jpg',
  },
  {
    title: 'Economic Media & Institutional Communication',
    location: 'Muscat',
    category: 'Executive Program',
    body: 'Executive program for capacity building in the field of economic media and corporate communication.',
    href: 'https://www.omaninvestgateway.com/economic-media-and-institutional-communication_ar/',
    // TODO(asset): stock stand-in — SIG has no published photography for this
    // programme. Swap for a real event photo when available.
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1400&q=70',
  },
  {
    title: 'Capacity Building for Strategy Execution',
    location: 'Muscat',
    category: 'Leadership Development',
    body: 'Structured program translating strategic intent into operating models, delivery cadence and measurable execution.',
    href: 'https://www.omaninvestgateway.com/programs/',
    // TODO(asset): stock stand-in — the Programs page publishes no event
    // photography. Programme ran 3–5 May 2026, Kiwan Hotel, Muscat.
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=70',
  },
];

export const LEADER = {
  name: 'Dr. Yousuf bin Hamed al Balushi',
  role: 'Founder & CEO — Smart Investment Gateway',
  meta: 'Economist · Board Adviser · Business Transformation Mentor · Oman Observer Columnist',
  quote:
    'For 30 years supply chains were organized around one logic. That logic is being rewritten — and Oman has a narrow, real window to position itself inside the new one.',
  image:
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1400&q=80',
  href: 'https://www.omanobserver.om/author/1678/dr-yousuf-bin-hamed-al-balushi',
};

/* Titles, excerpts and article links mirror the Latest Insights section on
   omaninvestgateway.com. Images are stock: the live cards carry no artwork. */
export const NEWS_EN = [
  {
    title: 'Why Sri Lanka’s growth matters to Oman',
    excerpt:
      'An Omani manufacturer weighing a second production line this year faces an arithmetic problem. The Eleventh Five-Year Development Plan (2026–2030) asks the private sector to carry more of the load.',
    tag: 'Oman Observer',
    image:
      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1400&q=70',
    href: 'https://www.omanobserver.om/article/1194988/opinion/business/why-sri-lankas-growth-matters-to-oman',
  },
  {
    title: 'How Oman can turn trust into industry',
    excerpt:
      'For 30 years supply chains were organized around one logic. That logic is now being rewritten, and trust is becoming the scarce industrial input.',
    tag: 'Oman Observer',
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=70',
    href: 'https://www.omanobserver.om/article/1194620/opinion/business/how-oman-can-turn-trust-into-industry',
  },
  {
    title: 'The Fence, The Bloc, and The Future: Oman’s 2026 Choice',
    excerpt:
      'Every country, large or small, is in survival mode today. I say this not as rhetoric but as an observation from the data.',
    tag: 'Analysis',
    image:
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=70',
    href: 'https://www.omanobserver.om/article/1194286/opinion/the-fence-the-bloc-and-the-future-omans-2026-choice',
  },
  {
    title: 'The Economics of Calm Waters',
    excerpt:
      'The world is witnessing a profound reshaping of trade, energy and supply chains. Maritime routes are no longer merely passages for ships and goods.',
    tag: 'Trade & Energy',
    image:
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1400&q=70',
    href: 'https://www.omanobserver.om/article/1193898/opinion/the-economics-of-calm-waters',
  },
];

/** Arabic columns published in Al Roya. */
export const NEWS_AR_LINKS = [
  'https://alroya.om/post/389331',
  'https://alroya.om/post/388954',
  'https://alroya.om/post/388280',
  'https://alroya.om/post/385275',
];

export const NEWS_VIEW_ALL =
  'https://www.omanobserver.om/author/1678/dr-yousuf-bin-hamed-al-balushi';

export const NEWS_AR = [
  {
    title: 'حين يخاف المستهلك ويتردد المستثمر.. كيف يتأثر الاقتصاد العُماني بالتغيرات الجيوسياسية؟',
    tag: 'مقال رأي',
  },
  {
    title: 'اتفاقية الشراكة الاقتصادية الشاملة مع الهند "نحو ذهنية اقتصادية جديدة"',
    tag: 'مقال رأي',
  },
  {
    title: 'اتفاقية الشراكة الاقتصادية الشاملة مع الهند.. اختبار القطاع الخاص في مرحلة التنفيذ',
    tag: 'مقال رأي',
  },
  { title: 'تأمل استراتيجي في التموضع الاقتصادي لسلطنة عُمان', tag: 'مقال رأي' },
];

export const FOOTER_NAV = [
  {
    title: 'About',
    links: [
      { label: 'Our Company', href: 'https://www.omaninvestgateway.com/our-company/' },
      { label: "Chairman's Message", href: 'https://www.omaninvestgateway.com/founders-message/' },
      { label: 'Our Team', href: 'https://www.omaninvestgateway.com/our-team/' },
      { label: 'Global Partners', href: 'https://www.omaninvestgateway.com/global-partners/' },
    ],
  },
  {
    title: 'Knowledge Hub',
    links: [
      { label: 'Vision 2040', href: 'https://www.omaninvestgateway.com/oman-2/' },
      { label: 'Competitive Offer', href: 'https://www.omaninvestgateway.com/oman-2/#competitive' },
      { label: 'Case Studies', href: 'https://www.omaninvestgateway.com/publications/' },
      { label: 'Briefs', href: 'https://www.omaninvestgateway.com/briefs/' },
    ],
  },
  {
    title: 'Training & Media',
    links: [
      { label: 'Training', href: 'https://www.omaninvestgateway.com/training/' },
      { label: 'FDI Workshops', href: 'https://www.omaninvestgateway.com/fdi-workshops/' },
      { label: 'Publications', href: 'https://www.omaninvestgateway.com/publications/' },
      { label: 'Programs', href: 'https://www.omaninvestgateway.com/programs/' },
    ],
  },
];

/* ------------------------------------------------------------------
   Footer / contact — mirrored from omaninvestgateway.com
------------------------------------------------------------------ */

export const CONTACT = {
  emails: ['yousufh@omaninvestgateway.com', 'md.office@omaninvestgateway.com'],
  phones: ['+968 99313714', '+968 94834111'],
  address: ['P.O. Box 1906, P.C. 130', 'Azaiba, Muscat', 'Sultanate of Oman'],
};

export const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/smart-investment-gateway-sig/',
  },
  { label: 'Facebook', href: 'https://www.facebook.com/SmartInvestmentGatewaySIG' },
  { label: 'X', href: 'https://x.com/SpcSmart15194' },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/smartinvestmentgatewaysig/',
  },
  { label: 'YouTube', href: 'https://www.youtube.com/@SmartInvestmentGateway' },
] as const;

export const LEGAL = {
  blurb:
    'Smart Investment Gateway (“SIG”) is a registered SME, licensed in administrative, investment and financial consulting. SIG is incorporated under the laws of the Sultanate of Oman under CR 1348517, with its registered office at Al Misfah, Bousher, Muscat Governorate, Sultanate of Oman.',
  cr: 'CR 1348517',
  copyright: '© 2026 Smart Investment Gateway “SIG”. All rights reserved.',
  privacy: 'https://www.omaninvestgateway.com/privacy-policy-2/',
  terms: 'https://www.omaninvestgateway.com/terms-and-conditions/',
};
