import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Loader2,
  PlayCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useCourseCatalog, useCourses } from "@/services/queries";

import { isCourseLive, isCourseUpcoming } from "@/lib/utils";

import SimpleCourseCard from "./SimpleCourseCard";

const AllCourses = () => {
  const navigate = useNavigate();

  const { data: coursesData, isLoading: coursesLoading } = useCourses();

  const { data: catalogData, isLoading: catalogLoading } = useCourseCatalog();

  const allCourses = coursesData?.data || [];

  const catalogCourses = catalogData?.data || [];

  /* ---------------------------------------------------------- */
  /* Course Filters                                              */
  /* ---------------------------------------------------------- */

  const upcomingCourses = allCourses.filter((course) => {
    const status = String(course.status || "")
      .toLowerCase()
      .trim();

    if (status === "upcoming") return true;

    if (["ongoing", "running", "active", "live", "closed"].includes(status))
      return false;

    return isCourseUpcoming(course.startDate);
  });

  const liveCourses = allCourses.filter((course) => {
    const status = String(course.status || "")
      .toLowerCase()
      .trim();

    if (["ongoing", "running", "active", "live"].includes(status)) return true;

    if (["upcoming", "closed"].includes(status)) return false;

    return isCourseLive(course.startDate, course.endDate);
  });

  /* ---------------------------------------------------------- */

  const openCourse = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  /* ---------------------------------------------------------- */

  const Hero = () => (
    <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/5 via-background to-orange-50 px-6 py-16 shadow-sm">
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          AIHE Programs
        </span>

        <h1 className="mt-6 font-serif text-4xl font-bold text-primary md:text-5xl">
          Explore All Courses
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          Discover every course offered by AIHE, including upcoming batches,
          live programs and our complete course catalog.
        </p>
      </div>
    </section>
  );

  /* ---------------------------------------------------------- */

  const SectionHeader = ({
    icon,
    title,
    subtitle,
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
  }) => (
    <div className="mb-8 flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <h2 className="font-serif text-3xl font-bold text-primary">{title}</h2>

        <p className="mt-1 text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );

  /* ---------------------------------------------------------- */

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center rounded-3xl border bg-card py-20">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />

      <p className="mt-4 text-muted-foreground">Loading courses...</p>
    </div>
  );

  /* ---------------------------------------------------------- */

  const EmptyState = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => (
    <div className="rounded-3xl border border-dashed border-primary/20 bg-card py-20 text-center">
      <BookOpen className="mx-auto h-10 w-10 text-primary/60" />

      <h3 className="mt-5 text-xl font-semibold">{title}</h3>

      <p className="mx-auto mt-2 max-w-md text-muted-foreground">
        {description}
      </p>
    </div>
  );

  /* ---------------------------------------------------------- */

  const CourseGrid = ({
    courses,
    catalog = false,
  }: {
    courses: any[];
    catalog?: boolean;
  }) => (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <SimpleCourseCard
          key={course.courseId}
          id={course.courseId}
          title={catalog ? course.name : course.catalog?.name}
          image={
            catalog
              ? course.thumbnail
              : course.thumbnail || course.catalog?.thumbnail
          }
          isCatalog={catalog}
        />
      ))}
    </div>
  );

  /* ---------------------------------------------------------- */

  return (
    <section className="bg-gradient-to-b from-background via-card to-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        {/* Upcoming Courses */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <SectionHeader
            icon={<CalendarDays className="h-7 w-7" />}
            title="Upcoming Courses"
            subtitle="Registration is currently open."
          />

          {coursesLoading ? (
            <LoadingState />
          ) : upcomingCourses.length === 0 ? (
            <EmptyState
              title="No Upcoming Courses"
              description="New batches will be announced soon. Please check back later."
            />
          ) : (
            <CourseGrid courses={upcomingCourses} />
          )}
        </motion.section>
        {/* ---------------------------------------------------------- */}
        {/* Live Courses */}
        {/* ---------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <SectionHeader
            icon={<PlayCircle className="h-7 w-7" />}
            title="Live Courses"
            subtitle="Currently running batches."
          />

          {coursesLoading ? (
            <LoadingState />
          ) : liveCourses.length === 0 ? (
            <EmptyState
              title="No Live Courses"
              description="There are no active batches at the moment."
            />
          ) : (
            <CourseGrid courses={liveCourses} />
          )}
        </motion.section>
        {/* ---------------------------------------------------------- */}
        {/* Course Catalog */}
        {/* ---------------------------------------------------------- */}
        {/* Part 3 continues from here... */}{" "}
        {/* ---------------------------------------------------------- */}
        {/* Course Catalog */}
        {/* ---------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <SectionHeader
            icon={<GraduationCap className="h-7 w-7" />}
            title="Course Catalog"
            subtitle="Self-paced learning and upcoming programs."
          />

          {catalogLoading ? (
            <LoadingState />
          ) : catalogCourses.length === 0 ? (
            <EmptyState
              title="No Courses Available"
              description="The course catalog is currently empty. Please check back later."
            />
          ) : (
            <CourseGrid courses={catalogCourses} catalog />
          )}
        </motion.section>
      </div>
    </section>
  );
};

export default AllCourses;
