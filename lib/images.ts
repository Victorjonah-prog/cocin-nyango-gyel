/**
 * Central image manifest for COCIN LCC Nyango Gyel.
 *
 * Each key maps an image slot to a path under /public/images/.
 * When a real photo is ready, drop it into /public/images/ at the
 * listed path — no component code needs to change.
 *
 * Dimensions are the intrinsic size of the intended final image
 * (used by next/image for layout reservation; placeholders will fill
 * the same space with a navy/gold gradient).
 */

export interface ImageSlot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const images = {
  // ── Hero ────────────────────────────────────────────────────────
  hero: {
    src: "/images/hero-bg.jpg",
    alt: "COCIN LCC Nyango Gyel congregation worshipping together", // TODO: update alt when real photo added
    width: 1920,
    height: 1080,
  },

  // ── Welcome / About preview ──────────────────────────────────────
  welcomePhoto: {
    src: "/images/welcome-photo.jpg",
    alt: "Church community gathering at COCIN Nyango Gyel", // TODO: update alt when real photo added
    width: 800,
    height: 900,
  },

  // ── Projects Spotlight ───────────────────────────────────────────
  projectBuilding: {
    src: "/images/project-building.jpg",
    alt: "COCIN Nyango Gyel main sanctuary building project", // TODO: update alt when real photo added
    width: 800,
    height: 500,
  },
  projectOutreach: {
    src: "/images/project-outreach.jpg",
    alt: "Community outreach programme by COCIN Nyango Gyel", // TODO: update alt when real photo added
    width: 800,
    height: 500,
  },

  // ── Elders (indexed 1–8; add more as needed) ────────────────────
  elders: [
    { src: "/images/elders/elder-1.jpg", alt: "Elder placeholder 1", width: 400, height: 400 }, // TODO: real name + photo
    { src: "/images/elders/elder-2.jpg", alt: "Elder placeholder 2", width: 400, height: 400 }, // TODO: real name + photo
    { src: "/images/elders/elder-3.jpg", alt: "Elder placeholder 3", width: 400, height: 400 }, // TODO: real name + photo
    { src: "/images/elders/elder-4.jpg", alt: "Elder placeholder 4", width: 400, height: 400 }, // TODO: real name + photo
  ],
} as const satisfies Record<string, ImageSlot | ImageSlot[]>;
