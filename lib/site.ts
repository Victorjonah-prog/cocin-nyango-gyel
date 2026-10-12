/**
 * Central config for COCIN LCC Nyango Gyel website.
 * Edit this file to update church name, tagline, nav links,
 * service times, and contact details — all pages consume from here.
 */

/** Path (relative to /public) to the official COCIN logo. */
export const LOGO_PATH = "/Church-of-Christ-in-Nations.jpg";

export const siteConfig = {
  name: "COCIN LCC Nyango Gyel",
  shortName: "COCIN Nyango Gyel",
  /** Expanded denomination name — use this instead of hardcoding the string. */
  fullName: "Church of Christ in Nations (COCIN)",
  tagline: "A Community of Faith, Hope & Love",
  description:
    "The Church of Christ in Nations (COCIN) Local Church Council, Nyango Gyel — a welcoming congregation rooted in scripture, community, and service.",

  contact: {
    address: "Nyango Gyel, Jos South LGA, Plateau State, Nigeria",
    email: "info@cocinnyangogel.org",
    phone: "+234 000 000 0000",
  },

  serviceTimes: [
    { label: "Sunday Worship", time: "8:00 AM & 10:30 AM" },
    { label: "Wednesday Bible Study", time: "5:30 PM" },
    { label: "Friday Prayer", time: "6:00 PM" },
  ],

  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Announcements", href: "/announcements" },
    { label: "Events", href: "/events" },
    { label: "Projects", href: "/projects" },
    { label: "Elders", href: "/elders" },
    { label: "Give", href: "/give" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
