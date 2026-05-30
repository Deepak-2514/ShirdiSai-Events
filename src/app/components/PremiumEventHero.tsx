"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Corporate Summit",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200",
    height: "h-[420px]",
  },
  {
    id: 2,
    title: "Wedding Planning",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    height: "h-[220px]",
  },
  {
    id: 3,
    title: "Music Festival",
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200",
    height: "h-[260px]",
  },
  {
    id: 4,
    title: "Luxury Gala",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200",
    height: "h-[300px]",
  },
  {
    id: 5,
    title: "Networking Event",
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200",
    height: "h-[240px]",
  },
  {
    id: 6,
    title: "Product Launch",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200",
    height: "h-[360px]",
  },
  {
    id: 7,
    title: "Fashion Show",
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1200",
    height: "h-[280px]",
  },
  {
    id: 8,
    title: "Birthday Event",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200",
    height: "h-[230px]",
  },
  {
    id: 9,
    title: "Outdoor Event",
    image:
      "https://images.unsplash.com/photo-1505232070786-2d315f0a974f?q=80&w=1200",
    height: "h-[390px]",
  },
];

export default function PinterestEventGrid() {
  return (
    <section className="min-h-screen bg-white px-4 py-10 md:px-8 mt-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="m-5">
          <h1 className="text-5xl
          md:text-7xl
          xl:text-8xl
          font-black
          tracking-[-0.06em]
          leading-[0.9]
          text-zinc-950">
            Event Inspiration
          </h1>

          {/* <p className="mt-3 max-w-2xl text-neutral-600">
            Discover premium event ideas, venues, celebrations, and experiences
            curated for your next unforgettable moment.
          </p> */}
        </div>

        {/* Masonry Layout */}
        <div className="columns-2 sm:columns-1 md:columns-3 lg:columns-4 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{ y: -6 }}
              className="mb-5 break-inside-avoid"
            >
              <div
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 ${item.height}`}
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 z-10 p-5">
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-300">
                    Premium event experience
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-white/5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}``