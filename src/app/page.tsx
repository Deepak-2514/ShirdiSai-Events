"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { LoadingScreen } from "./components/LoadingScreen";
import PinterestEventGrid from "./components/PremiumEventHero";
import Service from "./components/Service";
import DropPhone from "./components/DropPhone";

// EventWibes — Single-file React landing page (TailwindCSS + framer-motion)
// Enhanced styling, video background in hero, improved OurRecentWorks, modal preview.
// Drop into a React app (Vite / CRA) with Tailwind configured.
// Dependencies: framer-motion, lucide-react, tailwindcss

const OurRecentWorks = [
  "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=4",
  "https://images.unsplash.com/photo-1710854897963-d45e8e26f7fc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=2",
  "https://images.unsplash.com/photo-1608655624472-49349f55d220?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
];

export default function EventWibesLanding() {
  const [isLoading, setIsLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, currentIndex: 0 });
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Keep a minimal loading phase before first paint completes.
    const raf = requestAnimationFrame(() => {
      const t = window.setTimeout(() => setIsLoading(false), 250);
      return () => window.clearTimeout(t);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const services = [
    { title: "Full Venue Styling", desc: "End-to-end draping, lighting, centerpieces and ambience.", icon: "🎉" },
    { title: "Themed Packages", desc: "Weddings, birthdays, corporate — curated looks with on-site styling.", icon: "🎈" },
    { title: "Custom Props", desc: "Bespoke signage, neon, backdrops and photo-op installations.", icon: "✨" },
    { title: "Delivery & Setup", desc: "Careful delivery with professional setup and takedown crews.", icon: "🚚" },
  ];

  // Video background moved into <Hero /> (kept ref here for now to avoid unrelated refactors).

  const nextImage = () => {
    setLightbox(prev => ({
      open: prev.open,
      currentIndex: (prev.currentIndex + 1) % OurRecentWorks.length
    }));
  };

  const prevImage = () => {
    setLightbox(prev => ({
      open: prev.open,
      currentIndex: (prev.currentIndex - 1 + OurRecentWorks.length) % OurRecentWorks.length
    }));
  };

  // Auto-advance images every 3 seconds
  useEffect(() => {
    if (lightbox.open) {
      autoAdvanceRef.current = setInterval(() => {
        setLightbox(prev => ({
          open: prev.open,
          currentIndex: (prev.currentIndex + 1) % OurRecentWorks.length
        }));
      }, 5000);
    } else {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
        autoAdvanceRef.current = null;
      }
    }

    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
        autoAdvanceRef.current = null;
      }
    };
  }, [lightbox.open]);

  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <>
    <div className="min-h-screen from-slate-50 to-white text-slate-900 antialiased">
      {/* NAV */}
      <Navbar />
      <Hero onViewWork={() => setLightbox({ open: true, currentIndex: 0 })} />

      <Service />

      <DropPhone />

      <PinterestEventGrid />

      {/* FAQ + CONTACT */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className=" text-5xl
          md:text-7xl
          xl:text-8xl
          font-black
          tracking-[-0.06em]
          leading-[0.9]
          text-zinc-950">Frequently asked</h3>
          <div className="mt-4 space-y-3">
            <details className="bg-white rounded-xl p-4 shadow">
              <summary className="font-medium cursor-pointer">Do you offer same-day setup?</summary>
              <p className="mt-2 text-sm text-slate-600">For small events we can sometimes accommodate same-day setup — contact early to check availability.</p>
            </details>

            <details className="bg-white rounded-xl p-4 shadow">
              <summary className="font-medium cursor-pointer">Can I customize a package?</summary>
              <p className="mt-2 text-sm text-slate-600">Yes — all packages are modular and we provide tailored quotes.</p>
            </details>
          </div>
        </div>

        <div id="contact" className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-2xl font-bold">Contact & Booking</h3>
          <p className="mt-2 text-sm text-slate-600">Tell us date, guest count, venue, and budget — we’ll reply with options.</p>

          <form className="mt-4 grid gap-3">
            <input className="border rounded-md p-3" placeholder="Full name" />
            <input className="border rounded-md p-3" placeholder="Phone or WhatsApp" />
            <input className="border rounded-md p-3" placeholder="Event date (YYYY-MM-DD)" />
            <textarea className="border rounded-md p-3" rows={4} placeholder="Message & requirements" />

            <div className="flex gap-3">
              <button type="button" className="rounded-full bg-rose-600 text-white px-4 py-2">Request quote</button>
              <a className="rounded-full border px-4 py-2" href="mailto:hello@eventwibes.example">Email us</a>
            </div>

          <div className="mt-3 text-xs text-slate-500">By contacting you agree to our terms. We’ll reply in 1–2 business days.</div>
          </form>

          <div className="mt-4 text-sm text-slate-600 flex flex-col gap-2">
            <div className="flex items-center gap-2"><Phone size={14}/> +91 63600 49821</div>
            <div className="flex items-center gap-2"><Mail size={14}/> hello@eventwibes.example</div>
            <div className="flex items-center gap-2"><MapPin size={14}/> Vijayanagara City, KAR</div>
          </div>
        </div>
      </section>

      {/* MAP + FOOTER */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-2xl overflow-hidden shadow">
          <iframe title="map" className="w-full h-64 border-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019171014821!2d-122.4194151846814!3d37.774929279759746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c0f0f0f0f%3A0x0!2sLocal%20City!5e0!3m2!1sen!2sin!4v1610000000000" />
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <Image
              src="/logo.png"
              alt="Shirdi Sai Events logo"
              width={160}
              height={64}
              className="h-8 w-auto mb-2"
            />
            <div className="text-sm text-slate-400">Decor & Styling — Local event specialists</div>
          </div>

          <div className="text-sm text-slate-400">© {new Date().getFullYear()} EventWibes — All rights reserved</div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox.open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-6">
          <div className="relative max-w-4xl w-full">
            <button 
              className="absolute right-2 top-2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white transition" 
              onClick={() => setLightbox({ open: false, currentIndex: 0 })}
            >
              <X size={24} />
            </button>
            
            {/* Previous button */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white transition"
              onClick={prevImage}
            >
              <ChevronLeft size={28} />
            </button>
            
            {/* Next button */}
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white transition"
              onClick={nextImage}
            >
              <ChevronRight size={28} />
            </button>
            
            <img 
              src={OurRecentWorks[lightbox.currentIndex]} 
              alt={`preview-${lightbox.currentIndex}`} 
              className="w-full h-auto rounded-xl shadow-2xl" 
            />
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {lightbox.currentIndex + 1} / {OurRecentWorks.length}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
