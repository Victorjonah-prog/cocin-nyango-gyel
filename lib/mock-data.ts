/**
 * Mock data for homepage sections.
 *
 * Structure mirrors what the eventual Supabase queries will return,
 * so swapping mock → real data is a one-line import change per section.
 *
 * TODO: Replace each array with a Supabase fetch when the DB is ready.
 */

// ── Announcements ────────────────────────────────────────────────────────────

export interface Announcement {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string; // ISO 8601
  href: string;
}

export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    category: "General Notice",
    title: "Annual General Meeting — Save the Date", // TODO: replace with real announcement
    excerpt:
      "The AGM for the 2025/2026 church year will be held on a date to be announced. All members are encouraged to attend.", // TODO: real excerpt
    date: "2026-10-05",
    href: "/announcements",
  },
  {
    id: "ann-2",
    category: "Youth Ministry",
    title: "Youth Camp Registration Now Open", // TODO: replace with real announcement
    excerpt:
      "Registration for the annual youth camp is now open. Spaces are limited — visit the church office to secure your spot.", // TODO: real excerpt
    date: "2026-10-08",
    href: "/announcements",
  },
  {
    id: "ann-3",
    category: "Building Project",
    title: "Sanctuary Building Fund Update", // TODO: replace with real announcement
    excerpt:
      "We praise God for the generous contributions so far. Construction on Phase 2 is scheduled to begin next month.", // TODO: real excerpt
    date: "2026-10-12",
    href: "/announcements",
  },
];

// ── Events ───────────────────────────────────────────────────────────────────

export interface ChurchEvent {
  id: string;
  title: string;
  day: number;    // day of month, e.g. 19
  month: string;  // abbreviated month, e.g. "OCT"
  time: string;
  location: string;
  href: string;
}

export const mockEvents: ChurchEvent[] = [
  {
    id: "evt-1",
    title: "Sunday Worship Service", // TODO: replace with real event
    day: 5,
    month: "OCT",
    time: "8:00 AM & 10:30 AM",
    location: "Main Sanctuary, Nyango Gyel",
    href: "/events",
  },
  {
    id: "evt-2",
    title: "Midweek Bible Study", // TODO: replace with real event
    day: 8,
    month: "OCT",
    time: "5:30 PM",
    location: "Fellowship Hall",
    href: "/events",
  },
  {
    id: "evt-3",
    title: "Men's Prayer & Fellowship", // TODO: replace with real event
    day: 11,
    month: "OCT",
    time: "6:00 AM",
    location: "Main Sanctuary",
    href: "/events",
  },
];

// ── Projects ─────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  imageKey: "projectBuilding" | "projectOutreach"; // maps to lib/images.ts
  category: string;
  title: string;
  description: string;
  raised: number;  // in NGN
  target: number;  // in NGN
  href: string;
}

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    imageKey: "projectBuilding",
    category: "Infrastructure",
    title: "Main Sanctuary Completion Project", // TODO: replace with real project name
    description:
      "Help us complete the construction of our permanent sanctuary. The new building will seat over 500 worshippers and include spaces for children's ministry and offices.", // TODO: real description
    raised: 4_500_000,
    target: 12_000_000,
    href: "/give",
  },
  {
    id: "proj-2",
    imageKey: "projectOutreach",
    category: "Community Outreach",
    title: "Community Borehole & Water Access", // TODO: replace with real project name
    description:
      "Clean water access for families in the Nyango Gyel community. This project will benefit hundreds of households and reduce waterborne illness.", // TODO: real description
    raised: 1_200_000,
    target: 3_000_000,
    href: "/give",
  },
];

// ── Elders Preview ───────────────────────────────────────────────────────────

export interface Elder {
  id: string;
  name: string;
  title: string;
  imageIndex: number; // index into images.elders[]
}

export const mockElders: Elder[] = [
  { id: "elder-1", name: "Elder Placeholder Name", title: "Chairman, Church Council",       imageIndex: 0 }, // TODO: real name & title
  { id: "elder-2", name: "Elder Placeholder Name", title: "Secretary, Church Council",      imageIndex: 1 }, // TODO: real name & title
  { id: "elder-3", name: "Elder Placeholder Name", title: "Treasurer",                      imageIndex: 2 }, // TODO: real name & title
  { id: "elder-4", name: "Elder Placeholder Name", title: "Women's Fellowship Leader",      imageIndex: 3 }, // TODO: real name & title
];
