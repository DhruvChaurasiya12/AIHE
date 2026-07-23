import { motion } from "framer-motion";
import { Clock, Globe, MapPin, GraduationCap } from "lucide-react";

import type { CourseCatalog } from "@/types";

interface CatalogInfoCardProps {
  catalog: CourseCatalog;
}

const CatalogInfoCard = ({ catalog }: CatalogInfoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="overflow-hidden rounded-3xl border border-primary/5 bg-white shadow-lg">
        {/* Header */}

        <div className="bg-primary px-6 py-6 text-white">
          <p className="text-xs uppercase tracking-[0.25em] opacity-80">
            Quick Information
          </p>

          <h2 className="mt-2 font-serif text-3xl font-bold">Course Details</h2>
        </div>

        {/* Body */}

        <div className="space-y-2 px-6 py-4">
          <InfoRow
            icon={<Clock className="h-5 w-5 text-primary" />}
            label="Duration"
            value={catalog.duration}
          />

          <InfoRow
            icon={
              catalog.mode.toLowerCase() === "online" ? (
                <Globe className="h-5 w-5 text-primary" />
              ) : (
                <MapPin className="h-5 w-5 text-primary" />
              )
            }
            label="Mode"
            value={catalog.mode}
          />

          <InfoRow
            icon={<GraduationCap className="h-5 w-5 text-primary" />}
            label="Eligibility"
            value={catalog.enrollmentCriteria}
          />

          <div className="rounded-2xl bg-primary/5 p-5 text-center">
            <h4 className="font-semibold text-primary">Need Assistance?</h4>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Contact the course coordinator if you have questions regarding
              admissions, eligibility, curriculum or upcoming batches.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <div className="flex items-start gap-3">
    {icon}

    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>

      <p className="font-semibold text-primary">{value}</p>
    </div>
  </div>
);

export default CatalogInfoCard;
