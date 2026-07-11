import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import iskconLogo from "@/assets/iskcon-logo.png";
import aiheLogo from "@/assets/aihe-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Courses", href: "#courses" },
    { name: "Our Faculty", href: "#instructors" },
    { name: "Our Inspiration", href: "#inspiration" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Results", href: "#results" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8 xl:px-12">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <img
            src={iskconLogo}
            alt="ISKCON Ujjain"
            className="h-10 md:h-14 w-auto brightness-0 invert"
          />

          <div className="h-10 w-px bg-white/30" />

          <img src={aiheLogo} alt="AIHE" className="h-12 md:h-16 w-auto" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium transition-colors duration-300 ${
                activeSection === link.href.substring(1)
                  ? "text-white"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {link.name}

              <span
                className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-orange-400 transition-all duration-300 ${
                  activeSection === link.href.substring(1) ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Mobile Button */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            ref={menuRef}
            transition={{ duration: 0.2 }}
            className={`absolute right-4 top-[84px] z-50 w-72 overflow-hidden rounded-3xl border border-white/10 shadow-2xl lg:hidden ${
              activeSection === "home"
                ? "bg-transparent backdrop-blur-xl"
                : "bg-primary"
            }`}
          >
            <nav className="flex flex-col p-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>

                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-orange-400" />
                    )}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
