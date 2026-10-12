import type { Metadata } from "next";
import Image from "next/image";
import { getProjects } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import type { ProjectRow } from "@/lib/database.types";

export const metadata: Metadata = {
  title: "Projects",
};

function formatNGN(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function statusColor(status: string): string {
  if (status === "Completed") return "bg-green-100 text-green-800 border-green-200";
  if (status === "In Progress") return "bg-blue-100 text-blue-800 border-blue-200";
  return "bg-amber-100 text-amber-800 border-amber-200"; // Planning
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
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
            className="object-cover object-center"
          />
        )}
        <span
          className={[
            "absolute top-4 left-4 text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full border",
            statusColor(project.status),
          ].join(" ")}
        >
          {project.status}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-7 gap-5">
        <h2 className="font-display text-xl text-[var(--color-navy)] leading-snug">
          {project.title}
        </h2>

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

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="py-20 lg:py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            label="Community Impact"
            title="Our Projects"
            subtitle="See how COCIN Nyango Gyel is investing in the community through development, education, and outreach."
            className="max-w-3xl mb-16"
          />
        </FadeIn>

        {projects.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20">
              <p className="text-5xl mb-4" aria-hidden="true">🏗️</p>
              <p className="text-[var(--color-navy)] text-xl font-semibold mb-2">
                Nothing posted yet
              </p>
              <p className="text-[var(--color-muted)]">
                Our current projects will appear here soon.
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.09} direction="up">
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
