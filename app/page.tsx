import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import ServiceTimesStrip from "@/components/home/ServiceTimesStrip";
import HomeWelcome from "@/components/home/HomeWelcome";
import HomeAnnouncements from "@/components/home/HomeAnnouncements";
import HomeEvents from "@/components/home/HomeEvents";
import HomeProjects from "@/components/home/HomeProjects";
import HomeGivingCTA from "@/components/home/HomeGivingCTA";
import HomeElders from "@/components/home/HomeElders";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      {/* 1. Full-screen hero — navbar transparent over this */}
      <HomeHero />

      {/* 2. Service times card — overlaps hero bottom */}
      <ServiceTimesStrip />

      {/* 3. Welcome / About preview */}
      <HomeWelcome />

      {/* Gold section divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divider-gold" aria-hidden="true" />
      </div>

      {/* 4. Latest announcements */}
      <HomeAnnouncements />

      {/* 5. Upcoming events — navy background */}
      <HomeEvents />

      {/* 6. Projects spotlight */}
      <HomeProjects />

      {/* 7. Giving call-to-action — navy background */}
      <HomeGivingCTA />

      {/* 8. Elders preview */}
      <HomeElders />
    </>
  );
}
