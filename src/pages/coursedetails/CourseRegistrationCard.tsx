import { motion } from "framer-motion";
import {
  Calendar,
  Timer,
  Globe,
  MapPin,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Course } from "@/types";
import { formatDate } from "@/lib/utils";

interface CourseRegistrationCardProps {
  course: Course;
  onRegister?: (course: Course) => void;
}

const CourseRegistrationCard = ({
  course,
  onRegister,
}: CourseRegistrationCardProps) => {
  const isRegistrationOpen = !!course.registrationFormUrl;

  return (
    <div className=" ">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="overflow-hidden rounded-3xl border border-primary/5 bg-white shadow-lg">
          {/* Header */}

          <div className="bg-primary px-6 py-6 text-white">
            <p className="text-xs uppercase tracking-[0.25em] opacity-80">
              Course Fee
            </p>

            <div className="mt-2 flex items-center">
              <IndianRupee className="h-7 w-7" />

              <span className="text-4xl font-bold">
                {course.fee > 0 ? Number(course.fee).toLocaleString() : "Free"}
              </span>
            </div>
          </div>

          {/* Body */}

          <div className="space-y-4 px-6 py-4">
            {/* Quick Info */}

            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Calendar className="mt-1 h-5 w-5 text-primary" />

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Starts On
                  </p>

                  <p className="font-semibold text-primary">
                    {formatDate(course.startDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                {course.mode.toLowerCase() === "online" ? (
                  <Globe className="mt-1 h-5 w-5 text-primary" />
                ) : (
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                )}

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Mode
                  </p>

                  <p className="font-semibold text-primary">{course.mode}</p>
                </div>
              </div>
            </div>

            {/* Register */}

            <Button
              size="lg"
              disabled={!isRegistrationOpen}
              onClick={() => onRegister?.(course)}
              className={`w-full rounded-2xl py-6 text-base font-bold transition-all ${
                isRegistrationOpen
                  ? "bg-primary hover:bg-black"
                  : "cursor-not-allowed bg-secondary text-muted-foreground"
              }`}
            >
              {isRegistrationOpen ? "Register Now" : "Registration Closed"}
            </Button>

            {/* Help */}
            <div className="rounded-2xl bg-primary/5 p-5 text-center">
              <h4 className="font-semibold text-primary">Need Assistance?</h4>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                If you have questions regarding admissions, eligibility or
                registration, please contact the course coordinator.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseRegistrationCard;
