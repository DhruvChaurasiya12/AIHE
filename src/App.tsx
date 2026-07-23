import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CourseDetails from "./components/Courses/coursedetails/CourseDetails";
import ScrollToTop from "./components/ScrollToTop";
import CourseCatalogDetails from "./components/Courses/coursecatalog/CourseCatalogDetails";
import AllCourses from "./components/Courses/AllCourses";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route
            path="/courses/catalog/:courseId"
            element={<CourseCatalogDetails />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
