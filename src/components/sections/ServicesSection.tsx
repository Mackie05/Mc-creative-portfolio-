import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Film, Clapperboard, Palette, BarChart3 } from "lucide-react";
import { SectionSubtitle } from "../SectionSubtitle";

// ============================================
// CONFIGURATION
// ============================================

const SHOW_BRAND_IDENTITY = true;
const SHOW_ANALYTICS = true;
const SHOW_PRICES = false;

// ============================================
// ANIMATED BACKGROUND ILLUSTRATIONS
// ============================================

function SocialGrowthAnimation() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full opacity-[0.14]"
      preserveAspectRatio="xMidYMid slice"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.line
          key={`h-${i}`}
          x1="0"
          y1={60 + i * 50}
          x2="400"
          y2={60 + i * 50}
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}
      <motion.path
        d="M 40 240 Q 100 200 160 180 T 280 120 T 360 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
      />
      {[
        { cx: 40, cy: 240 },
        { cx: 160, cy: 180 },
        { cx: 280, cy: 120 },
        { cx: 360, cy: 60 },
      ].map((point, i) => (
        <motion.circle
          key={i}
          cx={point.cx}
          cy={point.cy}
          r="4.5"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.4, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

function VideoEditingAnimation() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full opacity-[0.14]"
      preserveAspectRatio="xMidYMid slice"
    >
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={40 + i * 120}
          y={80 + i * 30}
          width="80"
          height="120"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 0.8, delay: i * 0.3 }}
        />
      ))}
      <motion.line
        x1="40"
        y1="220"
        x2="360"
        y2="220"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.circle
        cx="40"
        cy="220"
        r="6"
        fill="currentColor"
        animate={{ cx: [40, 360, 40] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />
    </svg>
  );
}

function LongFormAnimation() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full opacity-[0.14]"
      preserveAspectRatio="xMidYMid slice"
    >
      <motion.rect
        x="100"
        y="60"
        width="200"
        height="140"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 0.5, pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.circle
        cx="280"
        cy="80"
        r="6"
        fill="#ef4444"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
        <motion.rect
          key={i}
          x={120 + i * 14}
          y={150}
          width="7"
          rx="3.5"
          fill="currentColor"
          initial={{ height: 10, opacity: 0 }}
          animate={{
            height: [10, 30 + Math.random() * 40, 10],
            opacity: 0.4,
          }}
          transition={{
            duration: 1.2,
            delay: i * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

function CreativeDirectionAnimation() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full opacity-[0.14]"
      preserveAspectRatio="xMidYMid slice"
    >
      {[
        { x: 60, y: 50, w: 100, h: 80 },
        { x: 180, y: 50, w: 70, h: 80 },
        { x: 270, y: 50, w: 70, h: 80 },
        { x: 60, y: 150, w: 130, h: 100 },
        { x: 210, y: 150, w: 130, h: 100 },
      ].map((rect, i) => (
        <motion.rect
          key={i}
          x={rect.x}
          y={rect.y}
          width={rect.w}
          height={rect.h}
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
        />
      ))}
    </svg>
  );
}

function BrandIdentityAnimation() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full opacity-[0.14]"
      preserveAspectRatio="xMidYMid slice"
    >
      <motion.circle
        cx="200"
        cy="120"
        r="50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, rotate: -90 }}
        animate={{ pathLength: 1, rotate: 0 }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
        style={{ transformOrigin: "200px 120px" }}
      />
      {[0, 1, 2, 3].map((i) => (
        <motion.line
          key={i}
          x1="120"
          y1={200 + i * 18}
          x2={280 - i * 20}
          y2={200 + i * 18}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 + i * 0.2, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

function AnalyticsAnimation() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full opacity-[0.14]"
      preserveAspectRatio="xMidYMid slice"
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.rect
          key={i}
          x={60 + i * 55}
          y={200}
          width="35"
          rx="3"
          fill="currentColor"
          initial={{ height: 0, y: 200, opacity: 0 }}
          animate={{
            height: [0, 40 + i * 25, 30 + i * 20],
            y: [200, 200 - (40 + i * 25), 200 - (30 + i * 20)],
            opacity: 0.4,
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

const animationMap: Record<string, React.FC> = {
  "social-media-growth": SocialGrowthAnimation,
  "short-form-video": VideoEditingAnimation,
  "long-form-video": LongFormAnimation,
  "creative-direction": CreativeDirectionAnimation,
  "brand-identity": BrandIdentityAnimation,
  "content-analytics": AnalyticsAnimation,
};

// ============================================
// SERVICES DATA
// ============================================

const services = [
  {
    id: "social-media-growth",
    number: "01",
    title: "Social Media Growth Strategy",
    price: "$3,500/mo",
    description:
      "Data-driven content systems designed to scale your brand presence across TikTok, Instagram, and YouTube.",
    features: [
      "Content strategy & calendar",
      "Platform-specific optimization",
      "Performance analytics & reporting",
      "Monthly strategy sessions",
    ],
    icon: Sparkles,
    featured: false,
  },
  {
    id: "short-form-video",
    number: "02",
    title: "Short-Form Video Editing",
    price: "$150/video",
    description:
      "High-retention edits optimized for the algorithm. Hooks, pacing, and visual storytelling that stops the scroll.",
    features: [
      "Hook-optimized edits",
      "Caption & sound design",
      "Thumbnail frames",
      "Platform-specific exports",
    ],
    icon: Film,
    featured: false,
  },
  {
    id: "long-form-video",
    number: "03",
    title: "Long-Form Content Production",
    price: "$5,000/project",
    description:
      "Documentaries, brand films, and interview series with cinematic production value and narrative structure.",
    features: [
      "Full production planning",
      "Cinematic editing & color",
      "Motion graphics & titles",
      "Multi-platform distribution cuts",
    ],
    icon: Clapperboard,
    featured: false,
  },
  {
    id: "creative-direction",
    number: "04",
    title: "Creative Direction",
    price: "$8,000/project",
    description:
      "End-to-end creative leadership from concept to final delivery. Building cohesive visual worlds for brands.",
    features: [
      "Creative concept development",
      "Visual direction & mood boards",
      "Team oversight & feedback",
      "Final delivery & handoff",
    ],
    icon: Palette,
    featured: true,
  },
  {
    id: "brand-identity",
    number: "05",
    title: "Brand Identity & Visual Systems",
    price: "$4,500",
    description:
      "Developing distinctive visual languages that make brands instantly recognizable across all touchpoints.",
    features: [
      "Visual identity system",
      "Content templates",
      "Brand guidelines",
      "Asset library",
    ],
    icon: Palette,
    featured: false,
    disabled: !SHOW_BRAND_IDENTITY,
  },
  {
    id: "content-analytics",
    number: "06",
    title: "Content Analytics & Optimization",
    price: "$2,000/mo",
    description:
      "Performance analysis and iterative optimization to maximize reach, engagement, and conversion.",
    features: [
      "Weekly performance reports",
      "A/B testing framework",
      "Content audit & recommendations",
      "Quarterly strategy reviews",
    ],
    icon: BarChart3,
    featured: false,
    disabled: !SHOW_ANALYTICS,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function ServicesSection() {
  const [mousePos, setMousePos] = useState<Record<string, { x: number; y: number }>>({});
  const activeServices = services.filter((s) => !s.disabled);

  const handleMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [id]: {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      },
    }));
  };

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <SectionSubtitle number="02" text="SERVICES / WHAT I DO" className="mb-4" />
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          What I do.
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
          End-to-end creative services for brands that want to stand out,
          engage audiences deeply, and scale their reach.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {activeServices.map((service) => {
          const Icon = service.icon;
          const Animation = animationMap[service.id];
          const pos = mousePos[service.id] || { x: 50, y: 50 };

          return (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onMouseMove={(e) => handleMouseMove(service.id, e)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/30 hover:bg-white/[0.06] flex flex-col justify-between"
            >
              {Animation && (
                <div className="pointer-events-none absolute inset-0 text-orange-500">
                  <Animation />
                </div>
              )}

              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(400px circle at ${pos.x}% ${pos.y}%, rgba(249, 115, 22, 0.12), transparent 50%)`,
                }}
              />

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-sm font-semibold font-mono text-neutral-500">
                    {service.number}
                  </span>
                  <div className="rounded-xl bg-orange-500/10 p-2.5 text-orange-400 transition-colors duration-300 group-hover:bg-orange-500/20 group-hover:text-orange-300">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-orange-100">
                  {service.title}
                </h3>

                {SHOW_PRICES && (
                  <p className="mb-4 text-sm font-semibold text-orange-400 font-mono">
                    {service.price}
                  </p>
                )}

                <p className="mb-6 text-sm leading-relaxed text-neutral-400">
                  {service.description}
                </p>

                <ul className="mb-8 space-y-2.5">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-neutral-400"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/5">
                <Link
                  to="/contact"
                  className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 transition-colors duration-300 hover:text-orange-400"
                >
                  Get in touch
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-20 text-center"
      >
        <p className="mb-4 text-neutral-400">
          Have a unique scenario or need custom consulting? Let&apos;s map it out.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-6 py-3 text-sm font-semibold text-orange-400 ring-1 ring-orange-500/20 transition-all duration-300 hover:bg-orange-500/20 hover:ring-orange-500/40"
        >
          Book dynamic setup
          <ArrowRight size={14} />
        </Link>
      </motion.div>
    </div>
  );
}
