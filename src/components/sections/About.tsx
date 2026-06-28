import React from "react";
import { motion } from "framer-motion";
import { Award, Compass, ShieldCheck, Zap, MapPin } from "lucide-react";
import { SectionSubtitle } from "../SectionSubtitle";
// @ts-ignore
import profileImage from "../../assets/images/about_profile.png";

export function About() {
  const trustPoints = [
    {
      icon: Award,
      title: "4+ Years of Craftsmanship",
      description: "Dedicated years mastering DaVinci Resolve to deliver flawless pacing, perfect color grading, and crisp studio-quality sound design.",
    },
    {
      icon: ShieldCheck,
      title: "Built on Trust & Integrity",
      description: "A collaborative partner invested in your long-term brand authority, offering direct and clear communication every step of the way.",
    },
    {
      icon: Compass,
      title: "Lead-Driven Strategy",
      description: "Prioritizing psychological hooks and retention over empty vanity metrics. Creating video assets that convert viewers into high-intent leads.",
    },
    {
      icon: MapPin,
      title: "Based in the Philippines",
      description: "Providing world-class, timezone-flexible remote collaboration to creators and brands globally.",
    },
  ];

  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-left"
      >
        <SectionSubtitle number="06" text="ABOUT ME / THE STRATEGIST" className="mb-4" />
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Behind the Storyteller.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Polished Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group max-w-sm w-full">
            {/* Outer soft orange ambient glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-orange-500/20 to-amber-500/20 opacity-70 blur-2xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            
            <div className="relative rounded-3xl border border-white/10 overflow-hidden bg-zinc-950 aspect-[3/4] shadow-2xl">
              <img
                src={profileImage}
                alt="Mc Kinly Bongadillo Portrait"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
              />
              
              {/* Bottom tag overlays */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-2">
                <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-[10px] font-mono text-white/90 uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  Remote Active
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Narrative & Key Trust Metrics */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-orange-400">
              Why content strategy matters more than cinematics.
            </h3>
            
            <p className="text-white/70 text-base leading-relaxed font-sans">
              Hi, I’m Mc Kinly. Based in the Philippines, I’ve spent the last 4 years perfecting the art of video editing and strategic content creation. I don’t believe in editing for editing's sake.
            </p>
            
            <p className="text-white/50 text-sm leading-relaxed">
              If you’re only chasing flashy cinematic transitions or over-the-top visual tricks, you might gain quick, fleeting views. But views don't pay the bills. A deeply researched, strategically executed, and clear content structure is what builds actual connection, holds high-retention attention, and converts passive viewers into high-value leads.
            </p>
            
            <p className="text-white/50 text-sm leading-relaxed">
              When you work with me, you’re not just hiring someone to put clips together. You are partnering with a dedicated creative director who understands your message, refines your delivery, and translates your value directly to your ideal client's trust.
            </p>
          </motion.div>

          {/* Minimalist Grid of Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
            {trustPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.05 }}
                className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                  <point.icon className="w-5 h-5 text-orange-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors">
                    {point.title}
                  </h4>
                  <p className="text-xs text-white/40 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
