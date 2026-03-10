import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Film } from "lucide-react";

const navItems = [
  { label: "Archétypes", href: "#archetypes" },
  { label: "Chronologie", href: "#timeline" },
  { label: "Archives", href: "#archives" },
  { label: "Données", href: "#data" },
];

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 100);
  });

  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(href);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group"
        >
          <Film className="w-5 h-5 text-primary transition-transform group-hover:rotate-12" />
          <span className="font-serif text-lg tracking-wider">
            Celluloïdes <span className="text-primary">Noires</span>
          </span>
        </a>

        {/* Navigation links */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleClick(item.href)}
                className={`relative text-sm tracking-wide transition-colors hover:text-primary ${
                  activeSection === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
                {activeSection === item.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Sisters in Cinema */}
        <div className="hidden lg:block">
          <span className="text-xs text-muted-foreground tracking-wider">
            Pour Sisters in Cinema
          </span>
        </div>
      </nav>
    </motion.header>
  );
}
