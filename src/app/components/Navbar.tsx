"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#gallery", label: "Gallery" },
    { href: "#packages", label: "Packages" },
    { href: "#reviews", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ];

  const SITE = {
    phone: "+91 9876543210",
    phoneRaw: "+919876543210",
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const newProgress = documentHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100)) : 0;
      setProgress(newProgress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="font-sarif text-[#F6F1EC]">
      <div className="fixed top-0 inset-x-0 z-51 h-1 bg-white/10">
        <div
          className="h-full bg-[#D8A06B] transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <motion.header
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-1 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/95 backdrop-blur-xl shadow-[0_20px_80px_rgba(15,23,42,0.45)] py-2"
            : "bg-transparent py-3"
        }`}
      >
        <div className=" mx-auto flex items-center justify-between px-6">
          <a
            href="#home"
            className="flex items-center gap-3"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#F8C06D] via-[#EEA556] to-[#D9873F] shadow-lg shadow-[#D8A06B]/20">
              <Sparkles className="h-5 w-5 text-black" />
            </span>
            <span className="text-lg font-serif ">
              <span className="text-[#D8A06B]">Shirdi Sai</span> <span className="text-white"> Events</span>
            </span>
          </a>

          <nav className="hidden flex-1 justify-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[#F6F1EC] transition hover:text-[#E6965A]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-[#F8C06D] via-[#EEA556] to-[#D9873F] px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-[#D9873F]/25 transition hover:opacity-95"
            >
              Book Now
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white shadow-sm transition hover:bg-white/10"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-slate-950/95 border-t border-white/10 backdrop-blur-xl overflow-hidden"
            >
              <div className="container mx-auto flex flex-col gap-4 px-6 py-6">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-base text-[#F6F1EC] transition hover:text-[#E6965A]"
                  >
                    {l.label}
                  </a>
                ))}

                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-[#E6965A] px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-[#E6965A]/20"
                >
                  Call {SITE.phone}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}