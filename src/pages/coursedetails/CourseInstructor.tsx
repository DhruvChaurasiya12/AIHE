import { motion } from "framer-motion";
import { User, BookOpen, BadgeCheck, CheckCircle2 } from "lucide-react";

import type { Course } from "@/types";

interface CourseInstructorProps {
  course: Course;
}

const CourseInstructor = ({ course }: CourseInstructorProps) => {
  const instructor = course.instructor;

  if (!instructor) return null;

  return (
    <section className="mt-12 sm:mt-16">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-3xl border border-primary/5 bg-white shadow-sm"
        >
          {/* Header */}

          <div className="border-b border-primary/5 bg-secondary/20 px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                <User className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-primary">
                  Meet Your Instructor
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Learn from an experienced teacher guiding this course.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}

          <div className="grid gap-6 p-5 lg:grid-cols-[260px_1fr] lg:p-6">
            {/* Left */}

            <div className="flex flex-col items-center rounded-2xl border border-primary/5 bg-secondary/20 p-5 text-center">
              <div className="overflow-hidden rounded-full border-4 border-white shadow-lg">
                {instructor.image ? (
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="h-36 w-36 object-cover sm:h-40 sm:w-40"
                  />
                ) : (
                  <div className="flex h-36 w-36 items-center justify-center bg-secondary">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                )}
              </div>

              <h3 className="mt-4 text-xl font-bold text-primary">
                {instructor.name}
              </h3>

              {instructor.title && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {instructor.title}
                </p>
              )}
            </div>

            {/* Right */}

            <div className="space-y-5">
              {/* About */}

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />

                  <h4 className="text-lg font-semibold text-primary">About</h4>
                </div>

                <p className="leading-7 text-muted-foreground">
                  {instructor.fullBio || instructor.bio}
                </p>
              </div>

              {/* Expertise */}

              {instructor.teaches.length > 0 && (
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />

                    <h4 className="text-lg font-semibold text-primary">
                      Expertise
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {instructor.teaches.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-2 transition-colors hover:bg-primary/10"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary" />

                        <span className="text-sm font-medium text-primary">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseInstructor;
