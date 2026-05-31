"use client";

import Image from "next/image";

export interface CardItem {
  title: string;
  description: string;
  src: string;
}

interface CardsParallaxProps {
  items: CardItem[];
}

export function CardsParallax({ items }: CardsParallaxProps) {
  return (
    <div>
      {items.map((item, index) => (
        <section
          key={index}
          className="relative h-screen w-full overflow-hidden sticky top-0"
        >
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 " />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-white text-5xl md:text-7xl font-black">
              {item.title}
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-white/90">
              {item.description}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}