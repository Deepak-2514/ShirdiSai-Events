import React from "react";
import { motion } from "framer-motion";
import DropPhone from "./DropPhone";

const Service = () => {
  return (
    <div>
      {/* SERVICES */}
      <section
        id="services"
        className="relative w-full overflow-hidden bg-white pt-20 sm:pt-24 lg:pt-28"
      >
        {/* background glow */}
        <div className="absolute -top-40 left-0 h-[500px] w-[400px] rounded-full bg-pink-400/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-violet-400/20 blur-[140px]" />

        <div className="relative px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          {/* TOP HEADING */}
          <div className="max-w-5xl">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-pink-500 sm:text-xs sm:tracking-[0.3em]">
              Premium Event Production
            </p>

            <h2
              className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          xl:text-7xl
          font-black
          tracking-tight
          leading-[0.95]
          text-zinc-950
        "
            >
              Designed to feel
              <br />
              unforgettable.
            </h2>

            <p
              className="
          mt-5
          max-w-2xl
          text-[13px]
          sm:text-[15px]
          leading-relaxed
          text-zinc-500
        "
            >
              Luxury styling, immersive decor, custom props, cinematic lighting,
              and premium event execution crafted for modern celebrations and
              unforgettable experiences.
            </p>
          </div>

          {/* SERVICES GRID — 2 cols mobile, 4 cols desktop */}
          <div className="mt-10 grid w-full grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {[
              {
                number: "01",
                title: "Venue Styling",
                desc: "Luxury draping, floral arrangements, stage decor, and ambience styling.",
              },
              {
                number: "02",
                title: "Theme Concepts",
                desc: "Pinterest-inspired concepts for weddings, birthdays, and premium celebrations.",
              },
              {
                number: "03",
                title: "Custom Props",
                desc: "Statement backdrops, neon signs, installations, and premium photo zones.",
              },
              {
                number: "04",
                title: "Setup & Delivery",
                desc: "Professional setup crews, logistics, teardown, and complete execution support.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                }}
                className="
            group
            relative
            overflow-hidden
            rounded-2xl
            sm:rounded-[24px]
            border
            border-zinc-200
            bg-white/80
            backdrop-blur-xl
            flex
            h-full
            flex-col
            p-4
            sm:p-5
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            transition-all
            duration-500
          "
              >
                {/* HOVER GLOW */}
                <div
                  className="
              absolute
              inset-0
              opacity-0
              transition-all
              duration-500
              group-hover:opacity-100
            "
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-fuchsia-500/10 to-violet-500/10" />

                  <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-pink-400/30 blur-3xl" />

                  <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-violet-400/30 blur-3xl" />
                </div>

                {/* AMAZON STYLE TOP BAR */}
                <div className="relative flex items-center justify-between">
                  <div
                    className="
                flex
                h-10
                w-10
                sm:h-12
                sm:w-12
                items-center
                justify-center
                rounded-xl
                sm:rounded-2xl
                bg-gradient-to-br
                from-pink-500
                to-violet-500
                text-base
                sm:text-lg
                font-bold
                text-white
                shadow-lg
              "
                  >
                    {item.number}
                  </div>

                  <div
                    className="
                rounded-full
                border
                border-zinc-200
                bg-white
                px-4
                py-2
                text-[10px]
                sm:text-xs
                font-semibold
                uppercase
                tracking-widest
                text-zinc-500
              "
                  >
                    Premium
                  </div>
                </div>

                {/* CONTENT */}
                <div className="relative mt-5 sm:mt-8">
                  <h3
                    className="
                text-lg
                sm:text-xl
                font-black
                tracking-tight
                text-zinc-950
              "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                mt-3
                sm:mt-4
                text-xs
                sm:text-[13px]
                leading-relaxed
                text-zinc-500
              "
                  >
                    {item.desc}
                  </p>
                </div>

                {/* BOTTOM CTA */}
                <div
                  className="
              relative
              mt-auto
              pt-5
              sm:pt-8
              flex
              items-center
              gap-2
              sm:gap-3
              text-xs
              sm:text-sm
              font-semibold
              text-zinc-900
            "
                >
                  Explore service
                  <div
                    className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-zinc-100
                transition-all
                duration-300
                group-hover:bg-gradient-to-br
                group-hover:from-pink-500
                group-hover:to-violet-500
                group-hover:text-white
                group-hover:translate-x-1
              "
                  >
                    →
                  </div>
                </div>

                {/* PREMIUM BORDER GLOW */}
                <div
                  className="
              absolute
              inset-0
              rounded-[24px]
              border
              border-transparent
              transition-all
              duration-500
              group-hover:border-pink-300/50
            "
                />
              </motion.div>
            ))}
          </div>
        </div>
        <DropPhone />
      </section>
    </div>
  );
};

export default Service;
