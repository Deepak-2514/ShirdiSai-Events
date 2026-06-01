"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { CardsParallax }from "./components/Hero";
import { LoadingScreen } from "./components/LoadingScreen";
import PinterestEventGrid from "./components/PremiumEventHero";
import Service from "./components/Service";
import DropPhone from "./components/DropPhone";
import Footer from "./components/Footer";
import FaQContact from "./components/FaQContact";
import Map from "./components/Map";

// EventWibes — Single-file React landing page (TailwindCSS + framer-motion)
// Enhanced styling, video background in hero, improved OurRecentWorks, modal preview.
// Drop into a React app (Vite / CRA) with Tailwind configured.
// Dependencies: framer-motion, lucide-react, tailwindcss

const OurRecentWorks = [
  {
    title: "Entrance Decor",
    description: "Luxury entrance decoration for weddings",
    src: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1400&auto=format&fit=crop",
    tag: "Wedding",
    link: "#",
    color: "#000000",
    textColor: "#ffffff",
  },
  {
    title: "Table Styling",
    description: "Premium table arrangements",
    src: "https://images.unsplash.com/photo-1710854897963-d45e8e26f7fc?auto=format&fit=crop&q=80&w=687",
    tag: "Reception",
    link: "#",
    color: "#000000",
    textColor: "#ffffff",
  },
  {
    title: "Ceremony Backdrop",
    description: "Elegant floral backdrop designs",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1400&auto=format&fit=crop",
    tag: "Wedding",
    link: "#",
    color: "#000000",
    textColor: "#ffffff",
  },
  {
    title: "Reception Lounge",
    description: "Comfortable and stylish seating",
    src: "https://images.unsplash.com/photo-1608655624472-49349f55d220?auto=format&fit=crop&q=80&w=1170",
    tag: "Reception",
    link: "#",
    color: "#000000",
    textColor: "#ffffff",
  },
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
      {/* <Hero onViewWork={() => setLightbox({ open: true, currentIndex: 0 })} /> */}
      <CardsParallax items={OurRecentWorks} />

      <Service />

      {/* <DropPhone /> */}

      <PinterestEventGrid />

      {/* FAQ + CONTACT */}
      <FaQContact />

      {/* MAP + FOOTER */}
      <Map/>

      <Footer />

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
              src={OurRecentWorks[lightbox.currentIndex].src} 
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
