export interface ImportantItem {
  id: string;
  title: string;
  why: string;
  demo: true;
}

export interface LifeEvent {
  id: string;
  name: string;
  description: string;
  demo: true;
}

export interface Law {
  id: string;
  title: string;
  category: string;
  jurisdiction: string;
  whyApplies: string;
  source: string;
  verification: string;
  demo: true;
}

export interface CourtDate {
  id: string;
  title: string;
  date: string;
  court: string;
  description: string;
  demo: true;
}

export interface CaseSummary {
  id: string;
  title: string;
  court: string;
  summary: string;
  relevance: string;
  demo: true;
}

export const importantForYou: ImportantItem[] = [
  { id: 'imp-1', title: 'Demo: General information overview', why: 'Placeholder reason why this may be relevant — demo only.', demo: true },
  { id: 'imp-2', title: 'Demo: Life event reminder', why: 'Placeholder reason why this may be relevant — demo only.', demo: true },
  { id: 'imp-3', title: 'Demo: Jurisdiction note', why: 'Placeholder reason why this may be relevant — demo only.', demo: true },
];

export const lifeEvents: LifeEvent[] = [
  { id: 'le-1', name: 'Turning 18', description: 'General information about age-related changes — placeholder.', demo: true },
  { id: 'le-2', name: 'Turning 21', description: 'General information about age-related changes — placeholder.', demo: true },
  { id: 'le-3', name: 'Getting a Driver\'s License', description: 'General information about licensing processes — placeholder.', demo: true },
  { id: 'le-4', name: 'Signing a Lease', description: 'General information about rental agreements — placeholder.', demo: true },
  { id: 'le-5', name: 'Starting a Job', description: 'General information about employment basics — placeholder.', demo: true },
  { id: 'le-6', name: 'Moving States', description: 'General information about relocation considerations — placeholder.', demo: true },
];

export const laws: Law[] = [
  {
    id: 'law-1',
    title: 'Demo Law Title A',
    category: 'Demo Category',
    jurisdiction: 'Jurisdiction — placeholder —',
    whyApplies: 'Why this applies to you: Placeholder explanation — demo data only, no legal claim.',
    source: 'Source: — (placeholder)',
    verification: 'Not verified — demo',
    demo: true,
  },
  {
    id: 'law-2',
    title: 'Demo Law Title B',
    category: 'Demo Category',
    jurisdiction: 'Jurisdiction — placeholder —',
    whyApplies: 'Why this applies to you: Placeholder explanation — demo data only, no legal claim.',
    source: 'Source: — (placeholder)',
    verification: 'Not verified — demo',
    demo: true,
  },
  {
    id: 'law-3',
    title: 'Demo Law Title C',
    category: 'Demo Category',
    jurisdiction: 'Jurisdiction — placeholder —',
    whyApplies: 'Why this applies to you: Placeholder explanation — demo data only, no legal claim.',
    source: 'Source: — (placeholder)',
    verification: 'Not verified — demo',
    demo: true,
  },
];

export const courtDates: CourtDate[] = [
  {
    id: 'cd-1',
    title: 'Demo Court Date',
    date: '— placeholder —',
    court: 'Court — placeholder —',
    description: 'Demo description — placeholder content only.',
    demo: true,
  },
];

export const cases: CaseSummary[] = [
  {
    id: 'case-1',
    title: 'Demo Case Title A',
    court: 'Court — placeholder —',
    summary: 'Placeholder summary text — demo only, no real case.',
    relevance: 'Relevance: — (demo)',
    demo: true,
  },
  {
    id: 'case-2',
    title: 'Demo Case Title B',
    court: 'Court — placeholder —',
    summary: 'Placeholder summary text — demo only, no real case.',
    relevance: 'Relevance: — (demo)',
    demo: true,
  },
];
