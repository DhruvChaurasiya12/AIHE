import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  className?: string;
}

const buttonClasses = (
  enabled: boolean,
  side: "left" | "right",
  extra?: string,
) =>
  `absolute ${
    side === "left" ? "left-0" : "right-0"
  } top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full shadow-xl transition-all duration-300 ${
    enabled
      ? "bg-white/95 hover:scale-110 hover:bg-orange-400 hover:text-white active:scale-95"
      : "cursor-not-allowed bg-gray-200 text-gray-400 opacity-50"
  } ${extra ?? ""}`;

const CarouselNavigation = ({
  onPrev,
  onNext,
  canPrev,
  canNext,
  className = "",
}: CarouselNavigationProps) => {
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous"
        className={buttonClasses(canPrev, "left", className)}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next"
        className={buttonClasses(canNext, "right", className)}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </>
  );
};

export default CarouselNavigation;
