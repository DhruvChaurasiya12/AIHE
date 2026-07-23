import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";
import type { Course } from "@/types";

interface CourseDescriptionProps {
  course: Course;
}

const SectionCard = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) => (
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

const CourseDescription = ({ course }: CourseDescriptionProps) => {
  const catalog = course.catalog;

  return (
    <section className="mt-12 sm:mt-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-8"
        >
          {/* About */}

          <SectionCard
            icon={<BookOpen className="h-5 w-5 text-primary" />}
            title="About this Course"
            content={
              catalog?.description ||
              "No description is available for this course."
            }
          />

          {/* Curriculum */}

          <SectionCard
            icon={<GraduationCap className="h-5 w-5 text-primary" />}
            title="Curriculum Overview"
            content={
              catalog?.curriculumSummary ||
              "Curriculum information will be updated soon."
            }
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CourseDescription;
