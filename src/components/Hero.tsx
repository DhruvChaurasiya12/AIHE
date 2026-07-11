import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[520px] sm:min-h-[580px] md:min-h-[650px] lg:min-h-[720px] items-end overflow-hidden"
    >
      {/* Background Image */}
      <div
  className="absolute inset-0 bg-cover bg-[85%_center] bg-no-repeat lg:bg-center"
  style={{ backgroundImage: `url(${heroBg})` }}
/>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-end px-5 pb-12 sm:px-6 sm:pb-14 lg:px-8 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-white/90 sm:text-xs md:text-sm"
          >
            ISKCON Ujjain Presents
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-serif font-black leading-[1.05] tracking-tight text-white drop-shadow-2xl
                       text-3xl
sm:text-4xl
md:text-5xl
lg:text-6xl
xl:text-[4.5rem]
                       "
          >
            Avantika Institute
            <br />
            <span className="text-orange-400">for Higher</span>
            <br />
            Education
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-6 font-serif italic font-semibold text-white
                       text-lg
                       sm:text-xl
                       md:text-2xl
                       lg:text-3xl"
          >
            Systematic Spiritual Education
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-4 max-w-lg leading-relaxed text-white/90 text-sm sm:text-base md:text-lg"
          >
            Embark on a transformative journey through authentic Vedic wisdom
            and timeless teachings of the Bhakti tradition.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              asChild
              className="h-12 px-6 text-black font-semibold shadow-xl transition-all duration-300 hover:scale-105 sm:h-14 sm:px-8 sm:text-lg bg-orange-400"
            >
              <a href="#courses">
                <BookOpen className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Explore Courses
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-12 border-white/40 bg-white/5 px-6 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10 sm:h-14 sm:px-8 sm:text-lg"
            >
              <a href="#instructors">
                Meet Our Faculty
                <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
