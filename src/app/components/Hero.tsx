"use client";

import { motion } from "framer-motion";
import { ChevronDown, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type HeroProps = {
  onViewWork?: () => void;
};

export default function Hero({ onViewWork }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleVideo = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = !el.muted;
    setMuted(el.muted);
  };

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.play().catch(() => {});
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/VID-20251108-WA0024.mp4" type="video/mp4" />
        </video>

        {/* Premium Dark Overlay */}
        <div className="absolute inset-0" />

        {/* Gradient Glow */}
        <div className="absolute inset-0" />
      </div>

      {/* Hero Content */}
<section className="relative h-screen overflow-hidden">
  {/* Background Image / Video */}
  <div className="absolute inset-0">
    {/* <img
      src="/hero-image.jpg"
      alt="Event Decoration"
      className="h-full w-full object-cover"
    /> */}

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/55" />
  </div>

  {/* Hero Content */}
  <div className="absolute inset-x-0 top-[62%] z-10 -translate-y-1/2 px-6">
    <div className="mx-auto max-w-5xl text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Premium Label */}
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-white/60 sm:text-[11px] md:mb-6">
          Crafted Event Experiences
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          Decor that turns
          <span className="block text-white/90">
            moments into memories.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xs text-sm leading-6 text-white/70 sm:max-w-md sm:text-base md:mt-7 md:max-w-2xl md:text-lg md:leading-8">
          Elegant event styling with immersive visuals, luxury aesthetics and
          timeless celebration experiences.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-10">
          <button className="rounded-full bg-[#d9a15b] px-8 py-3 text-sm font-semibold text-black transition hover:scale-105">
            Book Now
          </button>

          <button className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10">
            View Gallery
          </button>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* Zomato Style Scroll Down Indicator */}
      {/* Small Zomato Style Scroll Indicator */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{
    opacity: 1,
    y: [0, 6, 0],
  }}
  transition={{
    duration: 1.8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
>
  <a
    href="#services"
    className="group flex flex-col items-center"
  >
    {/* Small Text */}
    <div className="flex items-center gap-2 text-white/85">
      <span className="text-[25px] font-medium tracking-wide">
        Scroll down
      </span>

      {/* Tiny Animated Arrow */}
      <ChevronDown
        size={16}
        strokeWidth={2.5}
        className="transition-transform duration-300 group-hover:translate-y-1"
      />
    </div>

    {/* Small Premium Line Texture */}
    <div className="mt-3 h-[1px] w-16 overflow-hidden rounded-full bg-white/10">
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="h-full w-8 bg-gradient-to-r from-transparent via-white/80 to-transparent"
      />
    </div>
  </a>
</motion.div>
    </section>
  );
}