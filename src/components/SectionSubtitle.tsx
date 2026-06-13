import React from "react";
import { motion } from "framer-motion";

interface SectionSubtitleProps {
  number: string;
  text: string;
  className?: string;
}

const slideInFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a snappy, high-end creative agency feel
    },
  },
};

export function SectionSubtitle({ number, text, className = "" }: SectionSubtitleProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={slideInFromRight}
      className={`flex items-center gap-4 text-xs font-mono font-medium tracking-[0.25em] text-orange-500 uppercase select-none ${className}`}
    >
      <span className="opacity-90">————</span>
      <span className="bg-orange-500/10 px-2 py-0.5 rounded text-[11px] font-bold tracking-normal">{`[${number}]`}</span>
      <span className="font-semibold text-orange-500/90">{text}</span>
    </motion.div>
  );
}
