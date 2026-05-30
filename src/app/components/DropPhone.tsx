"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, ShieldCheck, Sparkles } from "lucide-react";

export default function DropPhone() {
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section
      id="callback"
      aria-label="Request a callback"
      className="relative w-full overflow-hidden bg-zinc-950"
      style={{ aspectRatio: "1200 / 557", maxHeight: "557px", minHeight: "280px" }}
    >
      {/* Background collage — full width, cropped to section height */}
      <div className="absolute inset-0">
        <Image
          src="/drop-phone-collage.png"
          alt="Premium event decorations collage"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Layered overlays for readability + brand tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/92 via-zinc-950/75 to-zinc-950/45" />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-transparent to-pink-900/20" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Ambient glow accents */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-pink-500/15 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-500/20 blur-[80px]" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full items-center px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
                Quick callback
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-black leading-[1.05] tracking-[-0.04em] text-white">
              Drop your
              <span className="block bg-gradient-to-r from-pink-300 via-fuchsia-200 to-violet-300 bg-clip-text text-transparent">
                phone number
              </span>
            </h2>

            {/* Subtext */}
            <p className="mt-3 max-w-md text-[clamp(0.875rem,1.6vw,1.05rem)] leading-relaxed text-white/65">
              We&apos;ll reach out and contact you within{" "}
              <span className="font-semibold text-white/90">5 to 7 hours</span>{" "}
              to plan your perfect celebration.
            </p>

            {/* Trust chips */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
                <Clock className="h-3.5 w-3.5 text-amber-300" />
                5–7 hr response
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                No spam, ever
              </span>
            </div>

            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 rounded-2xl border border-white/12 bg-white/10 p-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:mt-8 sm:rounded-[22px] sm:p-2"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-4 rounded-xl bg-white/95 px-5 py-5 sm:rounded-2xl sm:px-6 sm:py-6"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-lg">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-zinc-900">
                        You&apos;re on the list!
                      </p>
                      <p className="mt-0.5 text-sm text-zinc-500">
                        Our team will call you within 5–7 hours.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2 sm:flex-row sm:items-stretch"
                  >
                    {/* Phone input */}
                    <div className="relative flex flex-1 items-center overflow-hidden rounded-xl bg-white shadow-inner sm:rounded-2xl">
                      <span className="flex shrink-0 items-center gap-1 border-r border-zinc-100 px-3.5 py-3.5 text-sm font-semibold text-zinc-500 sm:px-4 sm:py-4">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/[^\d+\s-]/g, ""));
                          setError("");
                        }}
                        placeholder="Enter your mobile number"
                        className="w-full bg-transparent px-3 py-3.5 text-[15px] font-medium text-zinc-900 placeholder:text-zinc-400 outline-none sm:px-4 sm:py-4 sm:text-base"
                        aria-label="Mobile number"
                        aria-invalid={!!error}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_8px_32px_rgba(168,85,247,0.45)] transition-shadow hover:shadow-[0_12px_40px_rgba(168,85,247,0.55)] disabled:opacity-70 sm:rounded-2xl sm:px-8 sm:py-4 sm:text-base"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? "Sending…" : "Get a callback"}
                      </span>
                      {!isSubmitting && (
                        <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2.5 text-sm font-medium text-pink-300"
                role="alert"
              >
                {error}
              </motion.p>
            )}

            <p className="mt-4 text-[11px] leading-relaxed text-white/35 sm:text-xs">
              By submitting, you agree to be contacted about event services.
              Your number stays private.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
