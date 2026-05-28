"use client";

import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { useRef } from "react";

type HeroProps = {
  onViewWork?: () => void;
};

export default function Hero({ onViewWork }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  };

  return (
    <section className="relative pt-[72px]">
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover brightness-75"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => {
            const target = e.target as HTMLVideoElement;
            target.style.display = "none";
          }}
        >
          <source src="/VID-20251108-WA0024.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 mix-blend-multiply" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-28 md:flex-row">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full text-white md:w-1/2"
        >
          <h1 className="text-4xl font-extrabold leading-tight drop-shadow-lg md:text-5xl">
            Stunning event decor handcrafted for your moment.
          </h1>
          <p className="mt-4 text-lg text-white/90">
            We design, build and deliver immersive experiences from intimate
            birthdays to large-scale productions.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-block rounded-full bg-white/95 px-6 py-3 font-semibold text-rose-600 shadow-lg"
            >
              Request a quote
            </a>
            <button
              type="button"
              onClick={onViewWork}
              className="inline-block rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white"
            >
              View work
            </button>
          </div>

          <div className="mt-6 flex items-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Phone size={14} /> <span>+91 63600 49821</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} /> <span>vijayanagara City,KAR</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={toggleVideo}
              className="rounded-md bg-white/10 px-3 py-2 text-sm text-white"
            >
              Play / Pause background
            </button>
            <div className="text-xs text-white/70">
              Muted loop for ambience. Use the button to pause.
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2"
        />
      </div>
    </section>
  );
}