"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const messages = [
  "Curating Extraordinary Experiences",
  "Designing Timeless Celebrations",
  "Preparing Your Premium Journey",
  "Crafting Moments That Last Forever",
];

type Particle = {
  id: number;
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
};

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particles ONLY on client
  useEffect(() => {
    const generatedParticles = [...Array(25)].map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 5,
    }));

    setParticles(generatedParticles);
  }, []);

  // Loading animation
  useEffect(() => {
    const TOTAL_DURATION = 3000;
    const start = Date.now();

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;

      const percentage = Math.min(
        (elapsed / TOTAL_DURATION) * 1000,
        1000
      );

      setProgress(percentage);

      if (elapsed >= TOTAL_DURATION) {
        clearInterval(progressTimer);

        setTimeout(() => {
          setIsLoading(false);
        }, 250);
      }
    }, 16);

    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1200);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[999] overflow-hidden bg-[#050505]"
        >
          {/* Background */}
          <div className="absolute inset-0">
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {particles.map((particle) => (
                <motion.span
                  key={particle.id}
                  className="absolute rounded-full bg-gradient-to-r from-amber-200/40 to-amber-500/20"
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Ambient Glow */}
            <motion.div
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,80,0.12),transparent_70%)] blur-3xl"
            />

            {/* Main Glow */}
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 blur-[200px]" />

            {/* Light Rays */}
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-b from-transparent via-amber-300/20 to-transparent blur-md" />

            <div className="absolute left-1/2 top-1/2 h-[500px] w-[2px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gradient-to-b from-transparent via-amber-300/20 to-transparent blur-md" />

            {/* Grid */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                backgroundSize: "120px 120px",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative flex h-full flex-col items-center justify-center px-6">
            {/* Logo */}
            <motion.div
              initial={{
                rotate: 0,
                scale: 0.85,
                opacity: 0,
              }}
              animate={{
                rotate: 720,
                scale: 1,
                opacity: 1,
                y: [0, -10, 0],
              }}
              transition={{
                rotate: {
                  duration: 3,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 0.7,
                },
                opacity: {
                  duration: 0.7,
                },
                y: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative flex h-24 w-24 items-center justify-center rounded-full border border-amber-300/30 bg-gradient-to-br from-[#F8C06D] via-[#EEA556] to-[#D9873F] shadow-[0_0_80px_rgba(248,192,109,0.45)]"
            >
              <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-2xl" />

              <Sparkles className="relative h-10 w-10 text-black" />
            </motion.div>

            {/* Brand */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-10 text-center text-4xl md:text-5xl font-semibold tracking-[0.08em] text-white"
            >
              <span className="text-[#E8A85B]">Shirdi Sai</span> Events
            </motion.h1>

            {/* Messages */}
            <div className="mt-5 h-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="text-center text-sm md:text-base font-light tracking-wide text-zinc-300"
                >
                  {messages[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress */}
            <div className="mt-12 w-full max-w-sm">
              <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-wider text-zinc-400">
                <span>Loading Experience</span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className="h-[6px] overflow-hidden rounded-full bg-white/10 backdrop-blur-xl">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#F8C06D] via-[#EEA556] to-[#D9873F] shadow-[0_0_35px_rgba(248,192,109,0.9)]"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <motion.p
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="mt-4 text-center text-[11px] uppercase tracking-[0.35em] text-zinc-500"
              >
                Loading Premium Experience
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}