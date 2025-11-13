"use client"
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, currentIndex: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  const services = [
    { title: "Full Venue Styling", desc: "End-to-end draping, lighting, centerpieces and ambience.", icon: "🎉" },
    { title: "Themed Packages", desc: "Weddings, birthdays, corporate — curated looks with on-site styling.", icon: "🎈" },
    { title: "Custom Props", desc: "Bespoke signage, neon, backdrops and photo-op installations.", icon: "✨" },
    { title: "Delivery & Setup", desc: "Careful delivery with professional setup and takedown crews.", icon: "🚚" },
  ];

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) videoRef.current.play();
    else videoRef.current.pause();
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 antialiased">
      {/* NAV */}
      <header className="fixed w-full z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between backdrop-blur-md bg-white/40 rounded-b-2xl shadow">
          <div className="flex items-center gap-3">
          <div className="relative h-15 w-90"> {/* adjust h-10 / w-40 as needed */}
  <Image
    src="/logo.png"
    alt="Shirdi Sai Events logo"
    fill
    className="object-contain"
    priority
  />
</div>


          {/* <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-fuchsia-600 to-indigo-600 h-10 "><img src="/Logo.png" alt="EventWibes Logo" className="w-50" /></div>
            <div className="text-sm text-slate-600">Decor | Styling | Production</div> */}
          </div>

          <nav className="hidden md:flex gap-6 items-center text-sm">
            <a href="#services" className="hover:text-rose-600 transition">Services</a>
            <a href="#" className="hover:text-rose-600 transition">Gallery</a>
            <a href="#pricing" className="hover:text-rose-600 transition">Packages</a>
            <a href="#contact" className="hover:text-rose-600 transition">Contact</a>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 py-4 bg-white/90 backdrop-blur-md shadow-lg">
            <div className="flex justify-end mb-2">
              <button onClick={() => setMenuOpen(false)} aria-label="close"><X/></button>
            </div>
            <div className="flex flex-col gap-3 text-lg">
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#OurRecentWorks" onClick={() => setMenuOpen(false)}>OurRecentWorks</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)}>Packages</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO with video background */}
      <section className="relative pt-24">
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover brightness-75"
            autoPlay
            muted
            loop
            playsInline
            // poster="https://images.unsplash.com/photo-1509223197845-458d87318791?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4"
            onError={(e) => {
              // Fallback to poster image if video fails to load
              const target = e.target as HTMLVideoElement;
              target.style.display = 'none';
            }}
          >
            <source src="/VID-20251108-WA0024.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 mix-blend-multiply" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-28 flex flex-col md:flex-row items-center gap-8">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="w-full md:w-1/2 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">Stunning event decor handcrafted for your moment.</h1>
            <p className="mt-4 text-lg text-white/90">We design, build and deliver immersive experiences from intimate birthdays to large-scale productions.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="inline-block rounded-full bg-white/95 text-rose-600 px-6 py-3 font-semibold shadow-lg">Request a quote</a>
              <button onClick={() => setLightbox({ open: true, currentIndex: 0 })} className="inline-block rounded-full bg-white/10 border border-white/30 px-5 py-3 text-white">View work</button>
            </div>

            <div className="mt-6 flex gap-6 text-sm text-white/80 items-center">
              <div className="flex items-center gap-2"><Phone size={14}/> <span>+91 63600 49821</span></div>
              <div className="flex items-center gap-2"><MapPin size={14}/> <span>vijayanagara City,KAR</span></div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button onClick={toggleVideo} className="rounded-md bg-white/10 px-3 py-2 text-white text-sm">Play / Pause background</button>
              <div className="text-xs text-white/70">Muted loop for ambience. Use the button to pause.</div>
            </div>
          </motion.div>

          <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="w-full md:w-1/2">
            {/* <div className="bg-white/90 rounded-3xl p-4 shadow-2xl backdrop-blur-md"> */}
              {/* <img src={OurRecentWorks[1]} alt="event sample" className="w-full h-96 object-cover rounded-2xl" /> */}
            {/* </div> */}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold">What we offer</h2>
        <p className="text-slate-600 mt-2">Curated styling, props, lighting, and full production support.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {services.map((s) => (
            <motion.div key={s.title} whileHover={{ y: -6 }} className="bg-gradient-to-br from-white to-rose-50 rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-4xl">{s.icon}</div>
              <h3 className="mt-3 font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OurRecentWorks */}
      <section id="OurRecentWorks" className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold">OurRecentWorks</h2>
          <p className="text-slate-600 mt-2">Real installs and setups from recent events.</p>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {OurRecentWorks.map((src, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} className="rounded-xl overflow-hidden shadow cursor-pointer" onClick={() => setLightbox({ open: true, currentIndex: i })}>
                <img src={src} alt={`OurRecentWorks-${i}`} className="w-full h-40 object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold">Popular Packages</h2>
        <p className="text-slate-600 mt-2">Transparent baseline pricing — we customize to your needs.</p>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -6 }} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-sm font-semibold">Starter</div>
            <div className="text-3xl font-extrabold mt-3">₹8,999</div>
            <p className="mt-3 text-sm text-slate-600">Backdrop, table styling (up to 3), and lightweight decor.</p>
            <a href="#contact" className="mt-4 inline-block rounded-full bg-rose-600 text-white px-4 py-2">Book starter</a>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="bg-gradient-to-br from-white to-rose-50 rounded-2xl p-6 shadow-lg border-2 border-rose-100">
            <div className="text-sm font-semibold">Signature</div>
            <div className="text-3xl font-extrabold mt-3">₹18,500</div>
            <p className="mt-3 text-sm text-slate-600">Full styling, lighting, props and on-site support for small venues.</p>
            <a href="#contact" className="mt-4 inline-block rounded-full bg-rose-600 text-white px-4 py-2">Book signature</a>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-sm font-semibold">Premium</div>
            <div className="text-3xl font-extrabold mt-3">Custom</div>
            <p className="mt-3 text-sm text-slate-600">Large venues, custom builds and end-to-end production.</p>
            <a href="#contact" className="mt-4 inline-block rounded-full bg-rose-600 text-white px-4 py-2">Get custom quote</a>
          </motion.div>
        </div>
      </section>

      {/* FAQ + CONTACT */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold">Frequently asked</h3>
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

            <div className="mt-3 text-xs text-slate-500">By contacting you agree to our terms. We'll reply in 1–2 business days.</div>
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
  );
}
