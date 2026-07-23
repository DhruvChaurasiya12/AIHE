import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

import CoursesHeader from "../CoursesHeader";
import CourseHero from "./CourseHero";
import CourseQuickInfo from "./CourseQuickInfo";
import CourseDescription from "./CourseDescription";
import CourseInstructor from "./CourseInstructor";
import CourseRegistrationCard from "./CourseRegistrationCard";

import { useCourses } from "@/services/queries";
import type { Course } from "@/types";
import Footer from "@/components/Footer";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { data: coursesData, isLoading } = useCourses();

  const courses = coursesData?.data ?? [];

  const course = useMemo(
    () => courses.find((item: Course) => item.courseId === courseId),
    [courses, courseId],
  );

  const handleRegister = (course: Course) => {
    if (!course.registrationFormUrl) return;
    window.open(course.registrationFormUrl, "_blank");
  };

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <p className="text-lg text-muted-foreground">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-primary">Course Not Found</h1>

        <p className="mt-4 text-muted-foreground">
          The course you're looking for doesn't exist.
        </p>

        <Button
          className="mt-8"
          onClick={() => {
            navigate("/");

            setTimeout(() => {
              document
                .getElementById("courses")
                ?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
        >
          Back to Courses
        </Button>
      </div>
    );
  }

  return (
    <main className="bg-[#FAF8F3]">

      <CoursesHeader/>  

      <section className="mt-20 pb-20">
        <div className="mx-auto max-w-7xl lg:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Left */}
            <div className="min-w-0 space-y-12 lg:col-span-2">
              <CourseHero course={course} />
            </div>

            {/* Right Sidebar */}
            <aside>
              <div className="pt-10 hidden lg:block">
                <CourseRegistrationCard
                  course={course}
                  onRegister={handleRegister}
                />
              </div>
            </aside>
          </div>

          <div className="px-2 sm:px-4">
            <CourseQuickInfo course={course} />

            <CourseDescription course={course} />

            <CourseInstructor course={course} />
          </div>

          {/* Mobile */}

          <div className="lg:hidden px-2 pt-10">
            <CourseRegistrationCard
              course={course}
              onRegister={handleRegister}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CourseDetails;
