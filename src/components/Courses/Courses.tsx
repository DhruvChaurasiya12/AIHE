import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { useCourseCatalog, useCourses } from "@/services/queries";
import CourseCard from "./CourseCard";
import CourseCatalogCard from "./CourseCatalogCard";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import type { Course } from "@/types";
import { isCourseLive, isCourseUpcoming } from "@/lib/utils";
import CarouselNavigation from "../ui/CarouselNavigation";

interface CoursesProps {
  onRegister: (course: Course) => void;
}

const Courses = ({ onRegister }: CoursesProps) => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const { data: catalogData, isLoading: catalogLoading } = useCourseCatalog();

  const { data: coursesData, isLoading: coursesLoading } = useCourses();

  const catalogCourses = catalogData?.data || [];

  const allCourses = coursesData?.data || [];

  const liveCourses = allCourses.filter((course) => {
    const status = String(course.status || "")
      .toLowerCase()
      .trim();

    if (["ongoing", "live", "running", "active"].includes(status)) return true;

    if (["upcoming", "closed"].includes(status)) return false;

    return isCourseLive(course.startDate, course.endDate);
  });

  const upcomingCourses = allCourses.filter((course) => {
    const status = String(course.status || "")
      .toLowerCase()
      .trim();

    if (status === "upcoming") return true;

    if (["ongoing", "live", "running", "active", "closed"].includes(status))
      return false;

    return isCourseUpcoming(course.startDate);
  });

  /* ------------------------------------------------ */

  const [upcomingApi, setUpcomingApi] = useState<CarouselApi>();

  const [liveApi, setLiveApi] = useState<CarouselApi>();

  const [catalogApi, setCatalogApi] = useState<CarouselApi>();

  const [upcomingIndex, setUpcomingIndex] = useState(0);

  const [liveIndex, setLiveIndex] = useState(0);

  const [catalogIndex, setCatalogIndex] = useState(0);

  /* Upcoming */

  const [canUpcomingPrev, setCanUpcomingPrev] = useState(false);
  const [canUpcomingNext, setCanUpcomingNext] = useState(false);

  /* Live */

  const [canLivePrev, setCanLivePrev] = useState(false);
  const [canLiveNext, setCanLiveNext] = useState(false);

  /* Catalog */

  const [canCatalogPrev, setCanCatalogPrev] = useState(false);
  const [canCatalogNext, setCanCatalogNext] = useState(false);

  useEffect(() => {
    if (!upcomingApi) return;

    const onSelect = () => {
      setUpcomingIndex(upcomingApi.selectedScrollSnap());
      setCanUpcomingPrev(upcomingApi.canScrollPrev());
      setCanUpcomingNext(upcomingApi.canScrollNext());
    };

    onSelect();

    upcomingApi.on("select", onSelect);
    upcomingApi.on("reInit", onSelect);

    return () => {
      upcomingApi.off("select", onSelect);
      upcomingApi.off("reInit", onSelect);
    };
  }, [upcomingApi]);

  useEffect(() => {
    if (!liveApi) return;

    const onSelect = () => {
      setLiveIndex(liveApi.selectedScrollSnap());
      setCanLivePrev(liveApi.canScrollPrev());
      setCanLiveNext(liveApi.canScrollNext());
    };

    onSelect();

    liveApi.on("select", onSelect);
    liveApi.on("reInit", onSelect);

    return () => {
      liveApi.off("select", onSelect);
      liveApi.off("reInit", onSelect);
    };
  }, [liveApi]);

  useEffect(() => {
    if (!catalogApi) return;

    const onSelect = () => {
      setCatalogIndex(catalogApi.selectedScrollSnap());
      setCanCatalogPrev(catalogApi.canScrollPrev());
      setCanCatalogNext(catalogApi.canScrollNext());
    };

    onSelect();

    catalogApi.on("select", onSelect);
    catalogApi.on("reInit", onSelect);

    return () => {
      catalogApi.off("select", onSelect);
      catalogApi.off("reInit", onSelect);
    };
  }, [catalogApi]);

  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1280); // xl
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1280); // md-lg
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const shouldLoop = (count: number) => {
    if (isDesktop) return count > 6; // 3 cards visible
    if (isTablet) return count > 2; // 2 cards visible
    return count > 1; // 1 card visible
  };

  /* ------------------------------------------------ */

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-8 text-center">
      <h3 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
        {title}
      </h3>

      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-orange-400" />
    </div>
  );

  const Indicators = ({
    api,
    active,
  }: {
    api?: CarouselApi;
    active: number;
  }) => {
    if (!api) return null;

    return (
      <div className="mt-8 flex items-center justify-center gap-3">
        {api.scrollSnapList().map((_, index) => (
          <button
            key={index}
            onClick={() => api.scrollTo(index)}
            className={`transition-all duration-500 ${
              active === index
                ? "h-3 w-10 rounded-full bg-orange-400"
                : "h-3 w-3 rounded-full bg-slate-300 hover:bg-orange-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      id="courses"
      ref={ref}
      className="bg-gradient-to-b from-background via-card to-background py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.6,
          }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-20"
        >
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            AIHE Offerings
          </span>

          <h2 className="mt-5 font-serif text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            Explore Our Programs
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Discover structured courses rooted in Vedic wisdom, guided by
            experienced teachers and designed for systematic spiritual learning.
          </p>
        </motion.div>
        {/* Upcoming Courses */}
        <section className="mb-16 sm:mb-24">
          <SectionHeader title="Upcoming Courses" />

          {coursesLoading ? (
            <div className="rounded-3xl border border-dashed border-primary/20 bg-white py-16 text-center shadow-sm">
              Loading upcoming courses...
            </div>
          ) : upcomingCourses.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-primary/20 bg-white px-6 py-16 text-center shadow-sm">
              <h4 className="text-lg font-semibold text-primary">
                No Upcoming Courses
              </h4>

              <p className="mt-2 text-sm text-muted-foreground">
                New batches will be announced soon.
              </p>
            </div>
          ) : (
            <>
              <Carousel
                setApi={setUpcomingApi}
                opts={{
                  align: "start",
                  loop: shouldLoop(upcomingCourses.length),
                }}
                className="relative"
              >
                <CarouselContent className="-ml-4">
                  {upcomingCourses.map((course, index) => (
                    <CarouselItem
                      key={course.courseId}
                      className="basis-full pl-4 md:basis-1/2 xl:basis-1/3"
                    >
                      <CourseCard
                        course={course}
                        index={index}
                        onRegister={onRegister}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselNavigation
                  onPrev={() => upcomingApi?.scrollPrev()}
                  onNext={() => upcomingApi?.scrollNext()}
                  canPrev={canUpcomingPrev}
                  canNext={canUpcomingNext}
                />
              </Carousel>

              <Indicators api={upcomingApi} active={upcomingIndex} />
            </>
          )}
        </section>
        {/* Live Courses */}
        <section className="mb-16 sm:mb-24">
          <SectionHeader title="Live Courses" />

          {coursesLoading ? (
            <div className="rounded-3xl border border-dashed border-primary/20 bg-white py-16 text-center shadow-sm">
              Loading live courses...
            </div>
          ) : liveCourses.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-primary/20 bg-white px-6 py-16 text-center shadow-sm">
              <h4 className="text-lg font-semibold text-primary">
                No Live Courses
              </h4>

              <p className="mt-2 text-sm text-muted-foreground">
                There are no active batches at the moment. Please explore our
                upcoming programs.
              </p>
            </div>
          ) : (
            <>
              <Carousel
                setApi={setLiveApi}
                opts={{
                  align: "start",
                  loop: shouldLoop(upcomingCourses.length),
                }}
                className="relative"
              >
                <CarouselContent className="-ml-4">
                  {liveCourses.map((course, index) => (
                    <CarouselItem
                      key={course.courseId}
                      className="basis-full pl-4 md:basis-1/2 xl:basis-1/3"
                    >
                      <CourseCard
                        course={course}
                        index={index}
                        onRegister={onRegister}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselNavigation
                  onPrev={() => liveApi?.scrollPrev()}
                  onNext={() => liveApi?.scrollNext()}
                  canPrev={canLivePrev}
                  canNext={canLiveNext}
                />
              </Carousel>

              <Indicators api={liveApi} active={liveIndex} />
            </>
          )}
        </section>{" "}
        {/* Course Catalog */}
        <section>
          <SectionHeader title="Course Catalog" />

          {catalogLoading ? (
            <div className="rounded-3xl border border-dashed border-primary/20 bg-white py-16 text-center shadow-sm">
              Loading course catalog...
            </div>
          ) : catalogCourses.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-primary/20 bg-white px-6 py-16 text-center shadow-sm">
              <h4 className="text-lg font-semibold text-primary">
                No Courses Available
              </h4>

              <p className="mt-2 text-sm text-muted-foreground">
                The course catalog is currently empty. Please check back again
                soon.
              </p>
            </div>
          ) : (
            <>
              <Carousel
                setApi={setCatalogApi}
                opts={{
                  align: "start",
                  loop: shouldLoop(upcomingCourses.length),
                }}
                className="relative"
              >
                <CarouselContent className="-ml-4">
                  {catalogCourses.map((catalog, index) => (
                    <CarouselItem
                      key={catalog.courseId}
                      className="basis-full pl-4 md:basis-1/2 xl:basis-1/3"
                    >
                      <CourseCatalogCard catalog={catalog} index={index} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNavigation
                  onPrev={() => catalogApi?.scrollPrev()}
                  onNext={() => catalogApi?.scrollNext()}
                  canPrev={canCatalogPrev}
                  canNext={canCatalogNext}
                />
              </Carousel>

              <Indicators api={catalogApi} active={catalogIndex} />
            </>
          )}
        </section>{" "}
      </div>
    </section>
  );
};

export default Courses;
