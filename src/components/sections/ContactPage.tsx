import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Youtube, Sparkles } from "lucide-react";

export function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 4000);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!headingRef.current) return;
    const rect = headingRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <span className="text-sm font-semibold text-orange-500 uppercase tracking-widest block mb-4">
              Get in Touch
            </span>
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-white select-none relative overflow-visible cursor-default pb-2"
              style={{
                textShadow: `
                  ${(cursorPos.x - 150) * 0.08}px 
                  ${(cursorPos.y - 40) * 0.08}px 
                  35px rgba(249, 115, 22, 0.4)
                `,
              }}
            >
              Let&apos;s build something.
            </h1>
            <p className="text-neutral-400 mt-6 max-w-md leading-relaxed">
              Have an idea, project, or brand growth target in mind? Drop me a line, and let&apos;s map out a content system built to convert.
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-4 text-neutral-300">
              <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                <Mail size={18} />
              </div>
              <a href="mailto:contact@mckinly.com" className="hover:text-orange-400 transition-colors font-semibold">
                contact@mckinly.com
              </a>
            </div>

            <div className="flex items-center gap-4 text-neutral-300">
              <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                <Phone size={18} />
              </div>
              <a href="tel:+63900000000" className="hover:text-orange-400 transition-colors font-semibold font-mono">
                +63 900 000 0000
              </a>
            </div>

            <div className="flex items-center gap-4 text-neutral-300">
              <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                <MapPin size={18} />
              </div>
              <span className="font-semibold">Manila, Philippines</span>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:border-orange-500/30 hover:bg-orange-500/10 transition-colors text-neutral-400 hover:text-orange-400"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:border-orange-500/30 hover:bg-orange-500/10 transition-colors text-neutral-400 hover:text-orange-400"
            >
              <Youtube size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm shadow-xl relative overflow-hidden"
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-16 text-center space-y-4"
            >
              <div className="h-12 w-12 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto">
                <Sparkles size={24} className="animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-white">Message Transmitted!</h3>
              <p className="text-sm text-neutral-400 max-w-xs mx-auto">
                Thank you for reaching out. I will review your inquiry and connect with you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white focus:border-orange-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-neutral-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white focus:border-orange-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-neutral-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Project Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="How can I help you grow your brand presence?"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white focus:border-orange-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-neutral-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-orange-500 hover:bg-orange-600 py-3.5 text-sm font-semibold text-white transition-all duration-200 cursor-pointer shadow-lg shadow-orange-500/25"
              >
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
