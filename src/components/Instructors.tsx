import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { useInstructors } from "@/services/queries";
import type { Instructor } from "@/types";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import CarouselNavigation from "./ui/CarouselNavigation";

/* -------------------------------------------------- */
/* Instructor Card */
/* -------------------------------------------------- */

interface InstructorCardProps {
  instructor: Instructor;
  index: number;
  onClick: () => void;
  showProfile?: boolean;
}

const InstructorCard = ({
  instructor,
  index,
  onClick,
  showProfile = true,
}: InstructorCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.45,
      delay: index * 0.05,
    }}
    onClick={showProfile ? onClick : undefined}
    className={`group flex h-full flex-col rounded-2xl border border-border/50 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
      showProfile ? "cursor-pointer" : "cursor-default"
    }`}
  >
    <div className="mx-auto mb-5">
      <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-primary/10 bg-primary/5 md:h-28 md:w-28">
        {instructor.image && instructor.image !== "/placeholder.svg" ? (
          <img
            src={instructor.image}
            alt={instructor.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20 font-serif text-3xl font-bold text-primary">
            {instructor.name
              .split(" ")
              .slice(-2)
              .map((word) => word[0])
              .join("")}
          </div>
        )}
      </div>
    </div>

    <h3 className="font-serif text-lg font-bold text-primary">
      {instructor.name}
    </h3>

    <p className="mt-2 text-[10px] uppercase tracking-[0.2em]">
      {instructor.title}
    </p>

    {showProfile && (
      <>
        <div className="mt-auto border-b pt-2"></div>

        <div className="pt-4">
          <span className="text-[9px] uppercase tracking-[0.2em] text-primary/80 transition-colors group-hover:text-orange-500">
            View Profile
          </span>
        </div>
      </>
    )}
  </motion.div>
);

/* -------------------------------------------------- */
/* Indicators */
/* -------------------------------------------------- */

const Indicators = ({ api, active }: { api?: CarouselApi; active: number }) => {
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

/* -------------------------------------------------- */
/* Component */
/* -------------------------------------------------- */

const Instructors = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);

  const { data: instructorsData, isLoading } = useInstructors();

  const instructors = instructorsData?.data || [];

  const fullTimeInstructors = instructors.filter(
    (item) => item.category === "Full-Time Instructor",
  );

  const guestSpeakers = instructors.filter(
    (item) => item.category === "Guest Speaker",
  );

  /* ------------------------------------------ */
  /* Carousel State */
  /* ------------------------------------------ */

  const [facultyApi, setFacultyApi] = useState<CarouselApi>();

  const [guestApi, setGuestApi] = useState<CarouselApi>();

  const [facultyIndex, setFacultyIndex] = useState(0);

  const [guestIndex, setGuestIndex] = useState(0);
  const [canFacultyPrev, setCanFacultyPrev] = useState(false);
  const [canFacultyNext, setCanFacultyNext] = useState(false);

  const [canGuestPrev, setCanGuestPrev] = useState(false);
  const [canGuestNext, setCanGuestNext] = useState(false);

  useEffect(() => {
    if (!facultyApi) return;

    const onSelect = () => {
      setFacultyIndex(facultyApi.selectedScrollSnap());
      setCanFacultyPrev(facultyApi.canScrollPrev());
      setCanFacultyNext(facultyApi.canScrollNext());
    };

    onSelect();

    facultyApi.on("select", onSelect);
    facultyApi.on("reInit", onSelect);

    return () => {
      facultyApi.off("select", onSelect);
      facultyApi.off("reInit", onSelect);
    };
  }, [facultyApi]);

  useEffect(() => {
    if (!guestApi) return;

    const onSelect = () => {
      setGuestIndex(guestApi.selectedScrollSnap());
      setCanGuestPrev(guestApi.canScrollPrev());
      setCanGuestNext(guestApi.canScrollNext());
    };

    onSelect();

    guestApi.on("select", onSelect);
    guestApi.on("reInit", onSelect);

    return () => {
      guestApi.off("select", onSelect);
      guestApi.off("reInit", onSelect);
    };
  }, [guestApi]);

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

  /* -------------------------------------------------- */
  /* Section Header */
  /* -------------------------------------------------- */

  const SectionHeader = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => (
    <div className="mb-8 text-center sm:mb-10">
      <h3 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
        {subtitle}
      </p>

      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-orange-400" />
    </div>
  );

  /* -------------------------------------------------- */
  /* Faculty / Guest Section */
  /* -------------------------------------------------- */

  const renderSection = (
    title: string,
    subtitle: string,
    list: Instructor[],
    apiSetter: (api: CarouselApi) => void,
    api?: CarouselApi,
    activeIndex: number = 0,
    showProfile: boolean = true,
  ) => {
    if (!list.length) return null;

    return (
      <section className="mb-16 sm:mb-24">
        <SectionHeader title={title} subtitle={subtitle} />

        <Carousel
          setApi={apiSetter}
          opts={{
            align: "start",
            loop: shouldLoop(list.length),
          }}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {list.map((instructor, index) => (
              <CarouselItem
                key={instructor.id}
                className="
                  pl-4
                  basis-full
                  sm:basis-1/2
                  lg:basis-1/3
                  xl:basis-1/5
                "
              >
                <div className="h-full py-2">
                  <InstructorCard
                    instructor={instructor}
                    index={index}
                    showProfile={showProfile}
                    onClick={() => setSelectedInstructor(instructor)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNavigation
            onPrev={() => api?.scrollPrev()}
            onNext={() => api?.scrollNext()}
            canPrev={
              title === "Full-Time Faculty" ? canFacultyPrev : canGuestPrev
            }
            canNext={
              title === "Full-Time Faculty" ? canFacultyNext : canGuestNext
            }
          />
        </Carousel>

        <Indicators api={api} active={activeIndex} />
      </section>
    );
  };

  /* -------------------------------------------------- */

  return (
    <section
      id="instructors"
      ref={ref}
      className="bg-[#FAF8F3] py-14 sm:py-20 lg:py-24"
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
            Our Faculty
          </span>

          <h2 className="mt-5 font-serif text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            Meet Our Instructors
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Learn from experienced teachers who combine scriptural wisdom,
            practical realization and decades of devotional service.
          </p>
        </motion.div>{" "}
        {isLoading ? (
          <div className="rounded-3xl border border-dashed border-primary/20 bg-white py-20 text-center shadow-sm">
            <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-primary/10 border-t-orange-400" />

            <p className="font-medium text-primary/70">
              Loading instructors...
            </p>
          </div>
        ) : instructors.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-primary/20 bg-white py-20 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-primary">
              No Instructors Available
            </h3>

            <p className="mt-3 text-muted-foreground">
              Instructor profiles will appear here once they have been added.
            </p>
          </div>
        ) : (
          <>
            {renderSection(
              "Full-Time Faculty",
              "Dedicated teachers providing systematic spiritual education throughout the year.",
              fullTimeInstructors,
              setFacultyApi,
              facultyApi,
              facultyIndex,
              true,
            )}

            {renderSection(
              "Guest Speakers",
              "Senior devotees and visiting scholars sharing their realizations and expertise.",
              guestSpeakers,
              setGuestApi,
              guestApi,
              guestIndex,
              false,
            )}
          </>
        )}
      </div>

      {/* -------------------------------------------------- */}
      {/* Instructor Dialog */}
      {/* -------------------------------------------------- */}

      <Dialog
        open={!!selectedInstructor}
        onOpenChange={() => setSelectedInstructor(null)}
      >
        <DialogContent className="overflow-hidden rounded-3xl border border-primary/10 bg-white p-0 sm:max-w-xl">
          {selectedInstructor && (
            <>
              <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4 py-4">
                <DialogHeader className="items-center text-center">
                  <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
                    {selectedInstructor.image &&
                    selectedInstructor.image !== "/placeholder.svg" ? (
                      <img
                        src={selectedInstructor.image}
                        alt={selectedInstructor.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary font-serif text-2xl font-bold text-white">
                        {selectedInstructor.name
                          .split(" ")
                          .slice(-2)
                          .map((word) => word[0])
                          .join("")}
                      </div>
                    )}
                  </div>

                  <DialogTitle className="font-serif text-2xl text-primary">
                    {selectedInstructor.name}
                  </DialogTitle>

                  <p className=" text-sm uppercase tracking-[0.2em] text-muted-foreground text-center">
                    {selectedInstructor.title}
                  </p>

                  <Badge
                    variant="outline"
                    className=" border-primary/20 bg-primary/5 px-4 uppercase tracking-wider text-primary"
                  >
                    {selectedInstructor.category}
                  </Badge>
                </DialogHeader>
              </div>

              <div className="space-y-4 px-4 pb-4">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    About
                  </h4>

                  <div>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {selectedInstructor.bio || "Biography not available."}
                    </p>
                  </div>
                </div>
                {selectedInstructor.teaches &&
                  selectedInstructor.teaches.length > 0 && (
                    <div>
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        Courses Taught
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {selectedInstructor.teaches.map((course) => (
                          <Badge
                            key={course}
                            variant="secondary"
                            className="rounded-full border border-primary/10 bg-primary/5 px-3 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Instructors;
