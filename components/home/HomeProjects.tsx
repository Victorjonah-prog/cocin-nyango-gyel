import Image from "next/image";
import { getProjects } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import type { ProjectRow } from "@/lib/database.types";

function formatNGN(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function HomeProjects() {
  const projects = await getProjects(2);

  return (
    <section className="py-24 lg:py-32" aria-labelledby="projects-heading">
      <Container>

        <FadeIn>
          <SectionHeading
            id="projects-heading"
            label="Community Impact"
            title="Our Projects"
            subtitle="See how COCIN Nyango Gyel is investing in the community through development, education, and outreach."
            className="max-w-2xl mb-14"
          />
        </FadeIn>

        {projects.length === 0 ? (
          <FadeIn>
            <p className="text-[var(--color-muted)] text-center py-12 text-lg">
              No projects to show right now — check back soon.
            </p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <FadeIn key={project.id} direction="up" delay={i * 0.12}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        )}

      </Container>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectRow }) {
  const progressPct = project.target_amount > 0
    ? Math.min(100, Math.round((project.raised_amount / project.target_amount) * 100))
    : 0;

  return (
    <article className="bg-white rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] overflow-hidden flex flex-col">

      {/* Image or gradient placeholder */}
      <div className="relative h-52 bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)]">
        {project.image_url && (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 44vw, 90vw"
            className="object-cover object-center"
          />
        )}
        {/* Status badge overlay */}
        <span className="absolute top-4 left-4 bg-[var(--color-navy)]/80 backdrop-blur-sm text-[var(--color-gold)] text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full border border-[var(--color-gold)]/30">
          {project.status}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-7 gap-5">
        <h3 className="font-display text-xl text-[var(--color-navy)] leading-snug">
          {project.title}
        </h3>

        {project.description && (
          <p className="text-[var(--color-muted)] text-sm leading-relaxed flex-1">
            {project.description}
          </p>
        )}

        {/* Progress bar */}
        <div className="space-y-2" aria-label={`Fundraising progress: ${progressPct}%`}>
          <div className="flex justify-between text-xs font-medium">
            <span className="text-[var(--color-navy)]">
              Raised: <strong>{formatNGN(project.raised_amount)}</strong>
            </span>
            <span className="text-[var(--color-muted)]">
              Goal: {formatNGN(project.target_amount)}
            </span>
          </div>
          <div
            className="h-2 w-full rounded-full bg-[var(--color-grey)]"
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[var(--color-gold-dark)] to-[var(--color-gold-light)] transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-right text-[var(--color-navy)] text-xs font-semibold">
            {progressPct}% funded
          </p>
        </div>

        <Button variant="gold" size="sm" href="/give" className="self-start">
          Support This Project
        </Button>
      </div>

    </article>
  );
}
