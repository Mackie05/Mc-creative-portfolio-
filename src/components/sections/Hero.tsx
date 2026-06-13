import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowDown, Palette, Film } from "lucide-react";
import { ScrambleHover } from "../ScrambleHover";

export function Hero() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollToEditRoom = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const targetElement = document.getElementById("edit-room");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("edit-room");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  // Staggered word animation container starting at 1.6s
  const headlineContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.6, // Phase 4 starts at 1600ms
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(8px)",
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Cinematic, non-bouncy easing
      },
    },
  };

  const fadeUpVariants = (delay: number) => ({
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  });

  const badgeContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 3.6, // Phase 5 staggers
        staggerChildren: 0.1,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start px-6 overflow-hidden">
      {/* Cinematic CSS keyframe styles inside the component to keep the module self-contained */}
      <style>{`
        /* Film grain overlay */
        .film-grain {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 0),
                            radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 0);
          background-size: 8px 8px;
          background-position: 0 0, 4px 4px;
          opacity: 0.035;
          pointer-events: none;
          z-index: 2;
          animation: grainMove 0.5s steps(6) infinite;
        }
        @keyframes grainMove {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 2%); }
          30% { transform: translate(-2%, -2%); }
          40% { transform: translate(1%, 1%); }
          50% { transform: translate(-1%, 2%); }
          60% { transform: translate(2%, 1%); }
          70% { transform: translate(-2%, 1%); }
          80% { transform: translate(2%, -1%); }
          90% { transform: translate(-1%, 1%); }
        }

        /* Monitor flicker & power-on sequence starting at 0.8s */
        .monitor-glow {
          position: absolute;
          top: 15%;        
          left: 45%;       
          width: 44%;
          height: 48%;
          background: radial-gradient(
            ellipse at center,
            rgba(13, 148, 136, 0.5) 0%,
            rgba(249, 115, 22, 0.22) 35%,
            transparent 70%
          );
          filter: blur(24px);
          opacity: 0;
          animation: monitorPowerOn 2s cubic-bezier(0.25, 1, 0.5, 1) forwards,
                     monitorBreath 4s ease-in-out infinite alternate;
          animation-delay: 0.8s, 2.8s;
          pointer-events: none;
          z-index: 3;
        }
        @keyframes monitorPowerOn {
          0% { opacity: 0; transform: scale(0.9); }
          10% { opacity: 0.65; transform: scale(1.05); }   /* Flicker spike */
          15% { opacity: 0.35; transform: scale(0.92); }   /* Flicker dip */
          22% { opacity: 0.72; transform: scale(1.03); }   /* Flicker spike 2 */
          30% { opacity: 0.48; transform: scale(0.98); }   /* Flicker settle */
          40% { opacity: 0.8; transform: scale(1.02); }    /* Flicker spike 3 */
          100% { opacity: 0.65; transform: scale(1); }
        }
        @keyframes monitorBreath {
          0% { opacity: 0.65; filter: blur(24px); }
          100% { opacity: 0.52; filter: blur(28px); }
        }

        /* Ambient Room lighting response */
        .ambient-light {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 70% 35%,
            rgba(13, 148, 136, 0.22) 0%,
            rgba(249, 115, 22, 0.12) 50%,
            transparent 85%
          );
          pointer-events: none;
          opacity: 0;
          z-index: 2;
          animation: ambientFadeIn 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          animation-delay: 0.9s;
        }
        @keyframes ambientFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        /* Warm Orange Accent light from the headphone ring */
        .orange-accent-glow {
          position: absolute;
          top: 30%;
          left: 20%;
          width: 32%;
          height: 35%;
          background: radial-gradient(
            circle at center,
            rgba(249, 115, 22, 0.16) 0%,
            transparent 65%
          );
          filter: blur(20px);
          pointer-events: none;
          opacity: 0;
          z-index: 2;
          animation: accentFadeIn 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          animation-delay: 1.8s;
        }
        @keyframes accentFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        /* Vignette setup */
        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            transparent 25%,
            rgba(10, 22, 40, 0.4) 70%,
            rgba(10, 22, 40, 0.9) 100%
          );
          pointer-events: none;
          z-index: 4;
        }

        /* GPU-accelerated background image sequence classes */
        .hero-image-animate {
          animation: heroImgSequence 3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes heroImgSequence {
          0% {
            filter: brightness(0.4) saturate(0.2);
          }
          66.6% { /* Keep dark during phase 1 & 2 (0ms - 2000ms) */
            filter: brightness(0.4) saturate(0.2);
          }
          93.3% { /* Fade in colors in phase 3 (2000ms - 2800ms) */
            filter: brightness(0.85) saturate(0.85);
          }
          100% {
            filter: brightness(0.85) saturate(0.85);
          }
        }

        /* Rotating glow border effect for first action button */
        .rotating-glow-border {
          position: relative;
          display: inline-flex;
          border-radius: 4px;
          padding: 1.5px;
          overflow: hidden;
          background: transparent;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .rotating-glow-border:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px -4px rgba(249, 115, 22, 0.3), 
                      0 8px 16px -6px rgba(13, 148, 136, 0.25);
        }
        .rotating-glow-border::before {
          content: "";
          position: absolute;
          top: -150%;
          left: -150%;
          width: 400%;
          height: 400%;
          background: conic-gradient(
            from 180deg at 50% 50%,
            transparent 0%,
            #e11d48 15%,
            #f97316 35%,
            transparent 45%,
            #0d9488 65%,
            #14b8a6 85%,
            transparent 100%
          );
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
        .glowing-inner-content {
          position: relative;
          z-index: 10;
          background: #0A1424;
          border-radius: 3px;
          padding: 12px 24px;
          font-family: inherit;
          font-weight: 500;
          font-size: 14px;
          color: #f8fafc;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background-color 0.2s ease;
          width: 100%;
          height: 100%;
          white-space: nowrap;
        }
        .glowing-inner-content:hover {
          background-color: #0e2038;
        }

        /* Ambient Indicator Pulsing with Orange-Teal glow for Selected Work button */
        .orange-teal-pulse-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #f97316, #0d9488);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(249, 115, 22, 0.7), 0 0 15px rgba(13, 148, 136, 0.6);
          animation: orangeTealPulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          display: inline-block;
        }
        @keyframes orangeTealPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 0 10px rgba(249, 115, 22, 0.7), 0 0 15px rgba(13, 148, 136, 0.6);
          }
          50% {
            opacity: 0.45;
            transform: scale(0.8);
            box-shadow: 0 0 4px rgba(249, 115, 22, 0.35), 0 0 6px rgba(13, 148, 136, 0.25);
          }
        }
      `}</style>

      {/* Cinematic Studio Background and Overlays */}
      <div className="absolute inset-0 z-0 select-none bg-[#0A1628]">
        <img
          src="/images/hero-bg.png"
          alt="Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover hero-image-animate"
        />

        {/* Room Ambient Light Overlay */}
        <div className="ambient-light" />

        {/* Flickering & Breathing Monitor Glow */}
        <div className="monitor-glow" />

        {/* Headphone Focal Highlight */}
        <div className="orange-accent-glow" />

        {/* Tactile Film Grain */}
        <div className="film-grain" />

        {/* Edge Vignette */}
        <div className="vignette" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="space-y-6">
          {/* Subtitle / Role tag (Phase 5) */}
          <motion.p
            variants={fadeUpVariants(3.2)}
            initial="hidden"
            animate="visible"
            className="text-sm md:text-base font-medium text-white/70 tracking-wide uppercase font-mono"
          >
            Creative Director & Video Editor
          </motion.p>

          {/* Word-by-Word Title Reveal with Hover Scrambler (Phase 4) */}
          <motion.h1
            variants={headlineContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white flex flex-col items-start gap-y-1 select-none"
          >
            <div className="flex flex-wrap gap-x-3 md:gap-x-4">
              <motion.span variants={wordVariants} className="inline-block">
                <ScrambleHover text="Shaping" scrambledClassName="text-orange-500" />
              </motion.span>
              <motion.span variants={wordVariants} className="inline-block">
                <ScrambleHover text="stories" scrambledClassName="text-orange-500" />
              </motion.span>
            </div>
            <div className="flex flex-wrap gap-x-3 md:gap-x-4">
              <motion.span variants={wordVariants} className="inline-block text-gradient">
                <ScrambleHover text="that" className="text-gradient" scrambledClassName="text-amber-500" />
              </motion.span>
              <motion.span variants={wordVariants} className="inline-block text-gradient">
                <ScrambleHover text="grow" className="text-gradient" scrambledClassName="text-amber-500" />
              </motion.span>
              <motion.span variants={wordVariants} className="inline-block text-gradient">
                <ScrambleHover text="brands." className="text-gradient" scrambledClassName="text-amber-500" />
              </motion.span>
            </div>
          </motion.h1>

          {/* Main Description Block (Phase 5) */}
          <motion.p
            variants={fadeUpVariants(3.4)}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed"
          >
            Multi-disciplinary creative focused on social media growth, short-form
            content, and long-form storytelling. Building the bridge between
            strategy and execution.
          </motion.p>

          {/* Call to Action Button Pair (Phase 5) */}
          <motion.div
            variants={fadeUpVariants(3.5)}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-4 pt-3"
          >
            {/* Start a project with custom rotating glowing border */}
            <Link to="/contact/" className="rotating-glow-border group">
              <span className="glowing-inner-content">
                Start a project <span className="text-orange-500 font-bold transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>

            {/* Selected Work button with orange-teal live status dot linking to The Edit Room */}
            <button
              onClick={handleScrollToEditRoom}
              className="flex items-center gap-3 px-6 py-3.5 rounded-[4px] bg-white/[0.02] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 text-sm font-medium text-white/90 tracking-wide font-sans cursor-pointer select-none"
            >
              <span className="orange-teal-pulse-dot" />
              <span>Selected work</span>
            </button>
          </motion.div>

          {/* Minimalist Tools Stack (Phase 5 stagger) */}
          <motion.div
            variants={badgeContainerVariants}
            initial="hidden"
            animate="visible"
            className="pt-2 flex flex-wrap items-center gap-3 text-xs text-white/50"
          >
            <span className="font-medium font-mono tracking-wider uppercase text-[10px] text-orange-500/80">Stack:</span>
            <div className="flex flex-wrap items-center gap-2">
              <motion.div
                variants={badgeVariants}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-white/80 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
              >
                <Palette className="h-3.5 w-3.5 text-orange-400" />
                <span className="font-mono tracking-tight text-[11px] font-medium">Canva Pro</span>
              </motion.div>
              <motion.div
                variants={badgeVariants}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-white/80 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
              >
                <Film className="h-3.5 w-3.5 text-amber-500" />
                <span className="font-mono tracking-tight text-[11px] font-medium">DaVinci Resolve</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Explore Button (Staged fade-in at Phase 5) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 0.8 }}
        className="absolute bottom-12 left-6 z-10"
      >
        <a
          href="#/work"
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors font-mono tracking-wider text-xs uppercase"
        >
          <ArrowDown className="h-4 w-4 animate-bounce text-orange-500" />
          Scroll to explore
        </a>
      </motion.div>
    </section>
  );
}
