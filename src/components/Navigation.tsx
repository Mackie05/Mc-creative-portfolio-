import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work/", label: "Process" },
  { href: "/services/", label: "Services" },
  { href: "/contact/", label: "Contact" },
];

const MotionLink = motion(Link);

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const color = "#f97316"; // Brand orange
  const skew = -8;        // Elegant slant on hover

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-bold tracking-tight hover:text-accent transition-colors text-foreground"
          >
            MC KINLY BONGADILLO
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="text-foreground hover:text-accent/85 transition-colors focus:outline-none z-50 relative"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-md md:hidden flex flex-col justify-center pb-12"
          >
            <div className="flex w-full flex-col gap-6 items-end justify-center px-10">
              {navLinks.map((item, index) => (
                <motion.div
                  key={`${item.href}-${index}`}
                  className="group/nav flex items-center gap-3 cursor-pointer text-foreground justify-end"
                  initial="initial"
                  whileHover="hover"
                  onClick={() => setMobileOpen(false)}
                >
                  <motion.div
                    variants={{
                      initial: { x: -20, color: "inherit", opacity: 0 },
                      hover: { x: 0, color, opacity: 1 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="z-0"
                  >
                    <ArrowRight strokeWidth={2.5} className="w-8 h-8" />
                  </motion.div>

                  <MotionLink
                    to={item.href}
                    variants={{
                      initial: { x: -30, color: "inherit" },
                      hover: { x: 0, color, skewX: skew },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="font-bold text-4xl no-underline tracking-wide select-none"
                  >
                    {item.label}
                  </MotionLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

