import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Globe, MapPin } from "lucide-react";

import type { CourseCatalog } from "@/types";

interface CatalogHeroProps {
  catalog: CourseCatalog;
}

const CatalogHero = ({ catalog }: CatalogHeroProps) => {
  return (
    <section className="w-full lg:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="relative overflow-hidden">
          <img
            src={catalog.thumbnail}
            alt={catalog.name}
            className="h-full w-full object-cover sm:h-[360px] lg:h-[460px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default CatalogHero;
