import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const modules = [
  {
    title: "Foundation",
    description:
      "Build a strong understanding of the fundamental concepts before progressing to advanced topics.",
  },
  {
    title: "Core Teachings",
    description:
      "Study the principal philosophy, scriptures and practical applications through guided lessons.",
  },
  {
    title: "Practical Learning",
    description:
      "Participate in discussions, assignments and real-life implementation of the teachings.",
  },
  {
    title: "Assessment & Revision",
    description:
      "Review important concepts through quizzes, discussions and instructor guidance.",
  },
];

const CatalogCurriculum = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="space-y-8"
    >
      {/* Modules */}

      <div>
        <h3 className="mb-6 font-serif text-2xl font-bold text-primary">
          Course Structure
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: index * 0.08,
              }}
              className="rounded-3xl border border-primary/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Header */}

              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/20">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>

                  <h4 className="font-serif text-xl font-bold text-primary">
                    {module.title}
                  </h4>
                </div>

                <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-primary">
                  Module {index + 1}
                </span>
              </div>

              {/* Description */}

              <p className="text-[15px] leading-8 text-muted-foreground">
                {module.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CatalogCurriculum;
