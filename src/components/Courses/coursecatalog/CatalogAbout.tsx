import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";

import type { CourseCatalog } from "@/types";

interface CatalogAboutProps {
  catalog: CourseCatalog;
}

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const SectionCard = ({ icon, title, content }: SectionCardProps) => (
  <div className="rounded-3xl border border-primary/5 bg-white p-6 shadow-sm">
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/20">
        {icon}
      </div>

      <h3 className="font-serif text-2xl font-bold text-primary">{title}</h3>
    </div>

    <div className="space-y-4 text-[15px] leading-8 text-muted-foreground">
      {content
        .split(/\n+/)
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
    </div>
  </div>
);

const CatalogAbout = ({ catalog }: CatalogAboutProps) => {
  return (
    <section className="mt-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-8"
        >
          {/* Header */}

          <div>
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Academic Course
            </span>

            <h1 className="font-serif text-3xl font-bold leading-tight text-primary md:text-4xl xl:text-5xl">
              {catalog.name}
            </h1>

            <div className="mt-4 border-t border-primary/10 pt-4 sm:mt-8 sm:pt-8">
              <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
                Course Overview
              </h2>

              <p className="mt-2 text-muted-foreground">
                Learn about the course objectives, curriculum, and what you'll
                explore throughout your learning journey.
              </p>
            </div>
          </div>

          {/* About */}

          <SectionCard
            icon={<BookOpen className="h-5 w-5 text-primary" />}
            title="About this Course"
            content={
              catalog.description ||
              "No description is available for this course."
            }
          />

          {/* Curriculum */}

          <SectionCard
            icon={<GraduationCap className="h-5 w-5 text-primary" />}
            title="Curriculum Overview"
            content={
              catalog.curriculumSummary ||
              "Curriculum information will be updated soon."
            }
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CatalogAbout;
