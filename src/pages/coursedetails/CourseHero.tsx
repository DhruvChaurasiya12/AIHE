import { motion } from "framer-motion";
import type { Course } from "@/types";

interface CourseHeroProps {
  course: Course;
  onRegister?: (course: Course) => void;
}

const CourseHero = ({ course }: CourseHeroProps) => {
  const { catalog } = course;

  const title = catalog?.name || "Course";
  const thumbnail =
    course.thumbnail || catalog?.thumbnail || "/placeholder.svg";

  const isRegistrationOpen = !!course.registrationFormUrl;

  return (
    <section className="w-full mx-auto lg:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        {/* Image */}

        <div className="relative overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="h-full sm:h-[360px] lg:h-[460px] w-full  object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute top-5 right-5">
            <div
              className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider ${
                isRegistrationOpen
                  ? "bg-green-500 text-white"
                  : "bg-amber-500 text-white"
              }`}
            >
              {isRegistrationOpen ? "Registration Open" : "Coming Soon"}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CourseHero;
