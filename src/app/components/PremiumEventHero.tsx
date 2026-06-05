"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";

const breakpointColumnsObj = {
  default: 4,
  1200: 4,
  992: 3,
  768: 2,
  576: 2,
  0: 2,
};
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
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12">
          <h2
            className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-8xl
              font-black
              tracking-[-0.06em]
              leading-[0.9]
              text-zinc-950
            "
          >
            Event Inspiration
          </h2>

          <p className="mt-4 max-w-2xl text-neutral-600 text-base md:text-lg">
            Discover premium event ideas, venues, celebrations, and experiences
            curated for your next unforgettable moment.
          </p>
        </div>

        {/* Masonry */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-5 w-auto"
          columnClassName="pl-5 bg-clip-padding"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="mb-5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              whileHover={{ y: -6 }}
            >
              <div
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  bg-neutral-900
                  ${item.height}
                `}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={item.id <= 4}
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 768px) 50vw,
                    (max-width: 1024px) 33vw,
                    25vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 z-10 p-5">
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-300">
                    Premium event experience
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>
    </section>
  );
}
