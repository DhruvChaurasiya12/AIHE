import { motion } from "framer-motion";
import { Clock, Globe, GraduationCap, MapPin } from "lucide-react";
import type { CourseCatalog } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CourseCatalogCardProps {
  catalog: CourseCatalog;
  index: number;
}

const CourseCatalogCard = ({ catalog, index }: CourseCatalogCardProps) => {
  const InfoItem = ({
    icon,
    label,
    value,
    full = false,
  }: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    full?: boolean;
  }) => (
    <div className={`flex items-start gap-2 ${full ? "col-span-2" : ""}`}>
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">
        <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>

        <p className="text-[12px] font-semibold leading-tight text-primary">
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-primary/5 bg-white transition-all duration-500 hover:shadow-xl"
    >
      {/* Image */}

      <div className="relative h-56 overflow-hidden">
        <img
          src={catalog.thumbnail}
          alt={catalog.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50" />

        <div className="absolute right-4 top-4">
          <div className="rounded-xl border border-blue-400/20 bg-blue-600/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-xl backdrop-blur-md">
            Academic Course
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6">
          <h3 className="font-serif text-lg font-bold text-white drop-shadow-md sm:text-xl md:text-2xl">
            {catalog.name}
          </h3>
        </div>
      </div>

      {/* Content */}

      <div className="flex flex-col px-4 py-2 sm:px-6 sm:py-4">
        {/* Details */}

        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-primary/5 bg-secondary/20 p-2 sm:p-4">
          <InfoItem
            icon={<Clock className="h-3.5 w-3.5 text-primary" />}
            label="Duration"
            value={catalog.duration}
          />
          <InfoItem
            icon={
              catalog.mode?.toLowerCase() === "offline" ? (
                <MapPin className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Globe className="h-3.5 w-3.5 text-primary" />
              )
            }
            label="Mode"
            value={catalog.mode || "Online"}
          />
          <InfoItem
            full
            icon={<GraduationCap className="h-3.5 w-3.5 text-primary" />}
            label="Eligibility"
            value={catalog.enrollmentCriteria || "Open to everyone"}
          />{" "}
        </div>

        <div className="mt-auto border-t border-primary/5 pt-4">
          <Button variant="outline" className="w-full" asChild>
            <Link to={`/courses/catalog/${catalog.courseId}`}>See Details</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCatalogCard;
