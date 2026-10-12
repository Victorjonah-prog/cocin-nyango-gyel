import Link from "next/link";
import Image from "next/image";
import { Share2, Rss, Globe, Mail, Phone, MapPin, Video } from "lucide-react";
import { siteConfig, LOGO_PATH } from "@/lib/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-navy)] text-white">
      {/* Gold divider at top */}
      <div className="divider-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* ── Column 1: Brand ── */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-2.5">
              {/* Off-white badge keeps the dark logo visible on the navy footer */}
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/90 overflow-hidden shrink-0">
                <Image
                  src={LOGO_PATH}
                  alt="COCIN Church of Christ in Nations logo"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </span>
              <span className="font-display font-semibold text-lg leading-tight">
                COCIN{" "}
                <span className="text-[var(--color-gold)]">Nyango Gyel</span>
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialLink href={siteConfig.social.facebook} label="Facebook">
                <Share2 size={16} />
              </SocialLink>
              <SocialLink href={siteConfig.social.twitter} label="Twitter / X">
                <Globe size={16} />
              </SocialLink>
              <SocialLink href={siteConfig.social.youtube} label="YouTube">
                <Video size={16} />
              </SocialLink>
              <SocialLink href={siteConfig.social.instagram} label="Instagram">
                <Rss size={16} />
              </SocialLink>
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div className="space-y-5">
            <h3 className="font-display text-[var(--color-gold)] text-base font-semibold tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-[var(--color-gold)] transition-colors duration-200 inline-flex items-center min-h-[48px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Service Times ── */}
          <div className="space-y-5">
            <h3 className="font-display text-[var(--color-gold)] text-base font-semibold tracking-wide">
              Service Times
            </h3>
            <ul className="space-y-3">
              {siteConfig.serviceTimes.map((s) => (
                <li key={s.label} className="space-y-0.5">
                  <p className="text-white/90 text-sm font-medium">{s.label}</p>
                  <p className="text-white/70 text-sm">{s.time}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact ── */}
          <div className="space-y-5">
            <h3 className="font-display text-[var(--color-gold)] text-base font-semibold tracking-wide">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2.5 text-white/70 text-sm hover:text-[var(--color-gold)] transition-colors duration-200 min-h-[48px]"
                >
                  <Mail size={15} className="shrink-0 text-[var(--color-gold)]/70" aria-hidden="true" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2.5 text-white/70 text-sm hover:text-[var(--color-gold)] transition-colors duration-200 min-h-[48px]"
                >
                  <Phone size={15} className="shrink-0 text-[var(--color-gold)]/70" aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-white/70 text-sm">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-[var(--color-gold)]/70" aria-hidden="true" />
                  {siteConfig.contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-xs">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-white/50 text-xs">
            {siteConfig.fullName}
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white/60 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-navy)]"
    >
      {children}
    </a>
  );
}
