import React from "react";
import Navbar from "../components/Navbar";
import PinterestEventGrid from "../components/PremiumEventHero";
import Footer from "../components/Footer";

export default function GalleryPage() {
  return (
    <div className="bg-[#FBF9F6] text-zinc-850 min-h-screen">
      <Navbar />
      <div className="pt-20">
        <PinterestEventGrid />
      </div>
      <Footer />
    </div>
  );
}
