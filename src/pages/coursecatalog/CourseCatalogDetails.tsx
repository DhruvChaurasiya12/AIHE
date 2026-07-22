import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import CatalogHero from "./CatalogHero";
import CatalogAbout from "./CatalogAbout";
import CatalogCurriculum from "./CatalogCurriculum";

import Footer from "@/components/Footer";

import { useCourseCatalog } from "@/services/queries";

import type { CourseCatalog } from "@/types";
import CatalogInfoCard from "./CatalogInfoCard";

const CourseCatalogDetails = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { data: catalogsData, isLoading } = useCourseCatalog();

  const catalogs = catalogsData?.data ?? [];

  const catalog = useMemo(
    () => catalogs.find((item: CourseCatalog) => item.courseId === courseId),
    [catalogs, courseId],
  );

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <p className="text-lg text-muted-foreground">Loading course...</p>
      </div>
    );
  }

  if (!catalog) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-primary">Course Not Found</h1>

        <p className="mt-4 text-muted-foreground">
          The course you're looking for doesn't exist.
        </p>

        <Button
          className="mt-8"
          onClick={() => {
            navigate("/");

            setTimeout(() => {
              document.getElementById("courses")?.scrollIntoView({
                behavior: "smooth",
              });
            }, 100);
          }}
        >
          Back to Courses
        </Button>
      </div>
    );
  }

  return (
    <main className="bg-[#FAF8F3]">
      {/* Top Bar */}

      <div className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-center bg-primary">
        <div className="w-full max-w-7xl px-4">
          <Button
            variant="ghost"
            className="h-full gap-2 text-white hover:bg-transparent hover:text-white focus:bg-transparent active:bg-transparent lg:text-xl lg:[&_svg]:!size-6"
            onClick={() => {
              navigate("/");

              setTimeout(() => {
                document.getElementById("courses")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            <ArrowLeft />
            Back to Courses
          </Button>
        </div>
      </div>

      <section className="mt-20 pb-20">
        <div className="mx-auto max-w-7xl lg:px-6">
          {/* Hero */}
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="min-w-0 lg:col-span-2">
              <CatalogHero catalog={catalog} />
            </div>

            <aside>
              <div className="hidden pt-10 lg:block">
                <CatalogInfoCard catalog={catalog} />
              </div>
            </aside>
          </div>

          <div className="px-4 lg:hidden">
            <CatalogInfoCard catalog={catalog} />
          </div>

          {/* Content */}
          <div className="space-y-6 lg:space-y-12 px-4">
            <CatalogAbout catalog={catalog} />

            <CatalogCurriculum />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CourseCatalogDetails;
