import { motion } from "framer-motion";
import {
  Calendar,
  CalendarDays,
  Clock,
  Globe,
  IndianRupee,
  MapPin,
  Timer,
  GraduationCap,
  User,
} from "lucide-react";
import type { Course } from "@/types";
import { formatDate } from "@/lib/utils";

interface CourseQuickInfoProps {
  course: Course;
}

import { cn } from "@/lib/utils";

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}

const InfoCard = ({ icon, label, value, className }: InfoCardProps) => (
  <div
    className={cn(
      "rounded-2xl border border-primary/5 bg-secondary/20 p-4",
      className,
    )}
  >
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold leading-tight text-primary break-words">
          {value}
        </p>
      </div>
    </div>
  </div>
);

const CourseQuickInfo = ({ course }: CourseQuickInfoProps) => {
  const { catalog } = course;

  const title = catalog?.name || "Course";

  return (
    <section className="mx-auto lg:mt-10 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <div>
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Academic Course
          </span>

          <h1 className="font-serif text-3xl font-bold leading-tight text-primary md:text-4xl xl:text-5xl">
            {title}
          </h1>

          <div className="mt-4 sm:mt-8 lg:mt-12 border-t border-primary/10 pt-4 sm:pt-8">
            <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
              Course Information
            </h2>

            <p className="mt-2 text-muted-foreground">
              Everything you need to know before joining this course.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard
            icon={<Calendar className="w-5 h-5 text-primary " />}
            label="Start Date"
            value={formatDate(course.startDate)}
          />

          <InfoCard
            icon={<Calendar className="w-5 h-5 text-primary" />}
            label="End Date"
            value={
              course.endDate ? formatDate(course.endDate) : "To Be Announced"
            }
          />

          <InfoCard
            icon={<Timer className="w-5 h-5 text-primary" />}
            label="Duration"
            value={course.duration || catalog?.duration || "N/A"}
          />

          <InfoCard
            icon={<Clock className="w-5 h-5 text-primary" />}
            label="Timings"
            value={course.timings || "To Be Announced"}
          />

          <InfoCard
            icon={<CalendarDays className="w-5 h-5 text-primary" />}
            label="Days"
            value={course.days || "Flexible"}
          />

          <InfoCard
            icon={<Globe className="w-5 h-5 text-primary" />}
            label="Language"
            value={course.language}
          />

          <InfoCard
            icon={
              course.mode.toLowerCase() === "online" ? (
                <Globe className="w-5 h-5 text-primary" />
              ) : (
                <MapPin className="w-5 h-5 text-primary" />
              )
            }
            label="Mode"
            value={course.mode}
          />

          <InfoCard
            icon={<IndianRupee className="w-5 h-5 text-primary" />}
            label="Course Fee"
            value={
              course.fee > 0
                ? `${Number(course.fee).toLocaleString()} ${course.currency ?? ""}`
                : "Free"
            }
          />

          <InfoCard
            icon={<GraduationCap className="w-5 h-5 text-primary " />}
            label="Eligibility"
            value={catalog?.enrollmentCriteria || "Open to Everyone"}
            className="col-span-2 lg:col-span-4"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default CourseQuickInfo;
