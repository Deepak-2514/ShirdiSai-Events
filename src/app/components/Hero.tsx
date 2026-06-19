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
        <div key={index} className="sticky top-0">
          <section className="relative h-screen w-full overflow-hidden">
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0" />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center sm:px-6">
              <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {item.title}
              </h2>

              <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-white/90 sm:text-base md:text-lg">
                {item.description}
              </p>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
