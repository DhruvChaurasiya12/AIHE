import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import quote1 from "@/assets/quotes/quote1.png";
import quote2 from "@/assets/quotes/quote2.png";
import quote3 from "@/assets/quotes/quote3.png";

const images = [quote1, quote2, quote3];

const AUTOPLAY_DELAY = 6000;

const swipeConfidenceThreshold = 10000;

const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

const QuoteSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const [isPlaying, setIsPlaying] = useState(true);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndex = ((page % images.length) + images.length) % images.length;

  const paginate = useCallback(
    (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
    },
    [page],
  );

  useEffect(() => {
    if (!isPlaying) return;

    timeoutRef.current = setTimeout(() => {
      paginate(1);
    }, AUTOPLAY_DELAY);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [page, paginate, isPlaying]);

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl">
        <div
          className="group relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Progress Bar */}

          <div className="absolute left-0 top-0 z-30 h-1 w-full bg-white/10">
            <motion.div
              key={page}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: AUTOPLAY_DELAY / 1000,
                ease: "linear",
              }}
              className="h-full bg-orange-400"
            />
          </div>

          {/* Slides */}

          <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) paginate(1);

                  if (swipe > swipeConfidenceThreshold) paginate(-1);
                }}
                className="absolute inset-0"
              >
                <motion.img
                  src={images[activeIndex]}
                  alt={`Quote ${activeIndex + 1}`}
                  draggable={false}
                  initial={{
                    scale: 1.08,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    duration: 6,
                  }}
                  className="h-full w-full object-cover select-none"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Left */}

            <button
              onClick={() => paginate(-1)}
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-orange-400 group-hover:opacity-100 md:left-5 md:h-12 md:w-12"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Right */}

            <button
              onClick={() => paginate(1)}
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-orange-400 group-hover:opacity-100 md:right-5 md:h-12 md:w-12"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Indicators */}

        <div className="mt-6 flex items-center justify-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const diff = index - activeIndex;

                if (diff !== 0) paginate(diff);
              }}
              className={`transition-all duration-500 ${
                activeIndex === index
                  ? "h-3 w-10 rounded-full bg-orange-400"
                  : "h-3 w-3 rounded-full bg-slate-300 hover:bg-orange-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuoteSlider;
