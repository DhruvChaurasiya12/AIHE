import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import iskconLogo from "@/assets/iskcon-logo.png";
import aiheLogo from "@/assets/aihe-logo.png";

const CoursesHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-20 bg-primary shadow-lg">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logos */}
        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => navigate("/")}
        >
          <img
            src={iskconLogo}
            alt="ISKCON Ujjain"
            className="h-10 w-auto brightness-0 invert md:h-14"
          />

          <div className="h-10 w-px bg-white/30" />

          <img src={aiheLogo} alt="AIHE" className="h-12 w-auto md:h-16" />
        </div>

        {/* Back Button */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg  py-2 text-white transition-colors hover:bg-white/10 lg:text-lg"
          onClick={() => {
            navigate("/");

            setTimeout(() => {
              document
                .getElementById("courses")
                ?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
        >
          <ArrowLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          <span>Back to Courses</span>
        </button>
      </div>
    </div>
  );
};

export default CoursesHeader;
