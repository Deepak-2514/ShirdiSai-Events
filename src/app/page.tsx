"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { CardsParallax } from "./components/Hero";
import { LoadingScreen } from "./components/LoadingScreen";
import PinterestEventGrid from "./components/PremiumEventHero";
import Service from "./components/Service";
import DropPhone from "./components/DropPhone";
import Footer from "./components/Footer";
import FaQContact from "./components/FaQContact";
import Map from "./components/Map";
import { ExpandingCards } from "./components/Expanding_card";
import { cn } from "../lib/utils";

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
    {
      title: "Full Venue Styling",
      desc: "End-to-end draping, lighting, centerpieces and ambience.",
      icon: "🎉",
      imgSrc:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      linkHref: "#contact",
    },
    {
      title: "Themed Packages",
      desc: "Weddings, birthdays, corporate — curated looks with on-site styling.",
      icon: "🎈",
      imgSrc:
        "https://images.unsplash.com/photo-1515169067865-5387ec356754?q=80&w=1200&auto=format&fit=crop",
      linkHref: "#contact",
    },
    {
      title: "Custom Props",
      desc: "Bespoke signage, neon, backdrops and photo-op installations.",
      icon: "✨",
      imgSrc:
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
      linkHref: "#contact",
    },
    {
      title: "Delivery & Setup",
      desc: "Careful delivery with professional setup and takedown crews.",
      icon: "🚚",
      imgSrc:
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1200&auto=format&fit=crop",
      linkHref: "#contact",
    },
  ];

  // Video background moved into <Hero /> (kept ref here for now to avoid unrelated refactors).

  const nextImage = () => {
    setLightbox((prev) => ({
      open: prev.open,
      currentIndex: (prev.currentIndex + 1) % OurRecentWorks.length,
    }));
  };

  const prevImage = () => {
    setLightbox((prev) => ({
      open: prev.open,
      currentIndex:
        (prev.currentIndex - 1 + OurRecentWorks.length) % OurRecentWorks.length,
    }));
  };

  // Auto-advance images every 3 seconds
  useEffect(() => {
    if (lightbox.open) {
      autoAdvanceRef.current = setInterval(() => {
        setLightbox((prev) => ({
          open: prev.open,
          currentIndex: (prev.currentIndex + 1) % OurRecentWorks.length,
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
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="">
        <Navbar />
        <CardsParallax items={OurRecentWorks} />
        <Service />
        <section
          id="packages"
          className="py-24 bg-transparent border-t border-zinc-200/50"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-16 text-center">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-[#B28859] mb-4">
              Core Expertise
            </p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-zinc-950">
              Visual Service{" "}
              <span className="font-serif italic text-[#B28859]">Showcase</span>
            </h2>
            <p className="mt-4 text-xs md:text-sm text-zinc-650 font-light max-w-lg mx-auto">
              Hover or click on the cards to explore the detailed offerings for
              each premium production package.
            </p>
          </div>
          <ExpandingCards
            items={services.map((s) => ({
              id: s.title,
              title: s.title,
              description: s.desc,
              imgSrc: s.imgSrc,
              icon: s.icon,
              linkHref: s.linkHref,
            }))}
          />
        </section>
        <FaQContact />
        <Map />
        <Footer />
      </div>
    </>
  );
}
