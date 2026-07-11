import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Users, Award, Heart } from "lucide-react";
import QuoteSlider from "./QuoteSlider";

const features = [
  {
    icon: BookOpen,
    title: "Authentic Teachings",
    description:
      "Study directly from scriptures under the guidance of experienced devotee teachers rooted in the disciplic succession.",
  },
  {
    icon: Users,
    title: "Community Learning",
    description:
      "Join a vibrant community of sincere seekers and devotees on the path of Bhakti.",
  },
  {
    icon: Award,
    title: "Certified Courses",
    description:
      "Receive recognized certifications after successfully completing structured spiritual programs.",
  },
  {
    icon: Heart,
    title: "Spiritual Growth",
    description:
      "Transform your life through the practical application of timeless Vedic wisdom.",
  },
];

const About = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="about"
      ref={ref}
      className="bg-slate-50 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex items-center rounded-full bg-orange-100 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-400 sm:text-sm">
            About Us
          </span>

          <h2 className="mt-6 font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            Nurturing Spiritual
            <span className="block text-orange-400">Excellence</span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-orange-400" />

          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg lg:text-xl px-2">
            The Avantika Institute for Higher Education (AIHE) aims to preserve
            and disseminate the standards Srila Prabhupada established for
            practicing Krishna Consciousness. Through systematic spiritual
            education, we deepen devotees' understanding, realization, and
            appreciation of Srila Prabhupada's teachings so these timeless
            values continue to inspire generations to come.
          </p>
        </motion.div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:border-orange-300 hover:shadow-2xl"
              >
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 transition-all duration-300 group-hover:bg-orange-400">
                  <Icon className="h-8 w-8 text-orange-400 transition-colors duration-300 group-hover:text-white" />
                </div>

                {/* Title */}
                <h3 className="mb-4 text-center font-serif text-xl font-semibold text-primary">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-center text-sm leading-7 text-muted-foreground sm:text-base">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 lg:mt-20 grid grid-cols-2 gap-6 rounded-3xl bg-white p-8 shadow-lg md:grid-cols-4"
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold text-orange-400">20+</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Years of Service
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-orange-400">10000+</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Students Guided
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-orange-400">25+</h3>
            <p className="mt-2 text-sm text-muted-foreground">Expert Faculty</p>
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-orange-400">3+</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Spiritual Courses
            </p>
          </div>
        </motion.div>

        {/* Quote Slider */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 lg:mt-20"
        >
          <QuoteSlider />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
