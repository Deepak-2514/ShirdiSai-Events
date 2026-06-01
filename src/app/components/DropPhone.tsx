"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Lock } from "lucide-react";

/* ─── ImageSwiper ─────────────────────────────────────────────────────────── */
const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
  "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&q=80",
  "https://images.unsplash.com/photo-1543157145-ea07600abd3e?w=600&q=80",
];

function useSwiperDims() {
  const [dims, setDims] = useState({ cardW: 280, cardH: 400, wrapW: 320, wrapH: 440 });

  useEffect(() => {
    const update = () => {
      const narrow = window.innerWidth < 640;
      setDims(
        narrow
          ? { cardW: 168, cardH: 240, wrapW: 200, wrapH: 268 }
          : { cardW: 280, cardH: 400, wrapW: 320, wrapH: 440 }
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}

function ImageSwiper() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef(DEMO_IMAGES.map((_, i) => i));
  const swiping = useRef(false);
  const startX = useRef(0);
  const curX = useRef(0);
  const rafId = useRef<number | null>(null);
  const { cardW, cardH, wrapW, wrapH } = useSwiperDims();

  const buildCards = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.querySelectorAll(".s-card").forEach((c) => c.remove());
    orderRef.current.forEach((origIdx, dispIdx) => {
      const el = document.createElement("article");
      el.className = "s-card";
      Object.assign(el.style, {
        position: "absolute", inset: "0", margin: "auto",
        width: `${cardW}px`, height: `${cardH}px`,
        zIndex: String(DEMO_IMAGES.length - dispIdx),
        borderRadius: "20px",
        border: "1px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
        willChange: "transform",
        boxShadow: `0 ${20 + dispIdx * 4}px ${50 + dispIdx * 10}px rgba(0,0,0,${0.1 + dispIdx * 0.04}),0 1px 0 rgba(255,255,255,0.9) inset`,
        transform: `perspective(800px) translateZ(${-12 * (dispIdx + 1)}px) translateY(${8 * (dispIdx + 1)}px) translateX(0px) rotateY(0deg)`,
        transition: "transform 0.32s cubic-bezier(0.22,1,0.36,1),opacity 0.32s",
        opacity: "1",
      });
      const img = document.createElement("img");
      img.src = DEMO_IMAGES[origIdx];
      img.alt = "";
      img.draggable = false;
      img.style.cssText = "width:100%;height:100%;object-fit:cover;pointer-events:none;display:block";
      const gloss = document.createElement("div");
      gloss.style.cssText = "position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 55%);pointer-events:none";
      el.appendChild(img);
      el.appendChild(gloss);
      wrap.insertBefore(el, wrap.firstChild);
    });
  }, [cardW, cardH]);

  const refreshPos = useCallback(() => {
    const cards = [...(wrapRef.current?.querySelectorAll(".s-card") ?? [])] as HTMLElement[];
    cards.forEach((c, i) => {
      c.style.zIndex = String(DEMO_IMAGES.length - i);
      c.style.transition = "transform 0.32s cubic-bezier(0.22,1,0.36,1),opacity 0.32s";
      c.style.transform = `perspective(800px) translateZ(${-12*(i+1)}px) translateY(${8*(i+1)}px) translateX(0px) rotateY(0deg)`;
      c.style.opacity = "1";
    });
  }, []);

  const top = () => wrapRef.current?.querySelector(".s-card") as HTMLElement | null;

  const doSwipe = useCallback(() => {
    const dx = curX.current - startX.current;
    const c = top();
    if (!c) return;
    const dir = Math.sign(dx);
    c.style.transition = "transform 0.33s cubic-bezier(0.22,1,0.36,1),opacity 0.33s";
    c.style.transform = `perspective(800px) translateZ(0) translateY(0) translateX(${dir * 420}px) rotateY(${dir * 22}deg)`;
    c.style.opacity = "0";
    setTimeout(() => {
      orderRef.current = [...orderRef.current.slice(1), orderRef.current[0]];
      buildCards();
    }, 330);
  }, [buildCards]);

  useEffect(() => {
    buildCards();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onDown = (e: PointerEvent) => {
      swiping.current = true; startX.current = e.clientX; curX.current = e.clientX;
      const c = top(); if (c) c.style.transition = "none";
      wrap.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!swiping.current) return;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        curX.current = e.clientX;
        const dx = curX.current - startX.current;
        const c = top(); if (!c) return;
        c.style.transform = `perspective(800px) translateZ(0) translateY(0) translateX(${dx}px) rotateY(${dx * 0.16}deg)`;
        (c.style as any).opacity = String(Math.max(0.2, 1 - Math.abs(dx) / 150));
        if (Math.abs(dx) > 55) { swiping.current = false; doSwipe(); }
      });
    };
    const onUp = () => {
      if (!swiping.current) return;
      swiping.current = false;
      if (Math.abs(curX.current - startX.current) > 55) doSwipe(); else refreshPos();
    };
    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerup", onUp);
    return () => {
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerup", onUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [buildCards, doSwipe, refreshPos]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-full select-none"
      style={{ width: wrapW, height: wrapH, touchAction: "none", cursor: "grab", flexShrink: 0 }}
    >
      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold tracking-widest text-zinc-400">
        ← swipe to explore →
      </span>
    </div>
  );
}

/* ─── DropPhone ───────────────────────────────────────────────────────────── */
export default function DropPhone() {
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setError("");
    if (phone.replace(/\D/g, "").length < 10) { setError("Please enter a valid 10-digit number."); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="relative w-full overflow-hidden bg-white py-16 sm:py-20">
      {/* Glows matching Service section */}
      <div className="pointer-events-none absolute -top-20 left-0 h-[300px] w-[400px] rounded-full bg-pink-400/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[480px] w-[480px] rounded-full bg-violet-400/18 blur-[140px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="grid w-full min-w-0 grid-cols-2 items-center gap-3 sm:gap-10 md:gap-14 lg:gap-20">

          {/* LEFT: Swiper */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-w-0 items-center justify-center"
          >
            <ImageSwiper />
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="flex min-w-0 flex-col"
          >
            {/* Eyebrow */}
            <div className="mb-2 inline-flex items-center gap-1.5 self-start sm:mb-5 sm:gap-2">
              <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 sm:h-[7px] sm:w-[7px]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-pink-500 sm:text-[11px] sm:tracking-[0.28em]">
                Quick Callback
              </span>
            </div>

            {/* Headline */}
            <h2 className="mb-2 text-[clamp(1.1rem,3.5vw,3.2rem)] font-black leading-[0.95] tracking-[-0.05em] text-zinc-950 sm:mb-3">
              Drop your
              <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">
                phone number
              </span>
            </h2>

            {/* Sub */}
            <p className="mb-3 max-w-sm text-[11px] leading-snug text-zinc-500 sm:mb-6 sm:text-[15px] sm:leading-relaxed">
              We'll reach out within{" "}
              <span className="font-semibold text-zinc-700">5 to 7 hours</span>{" "}
              to plan your perfect celebration.
            </p>

            {/* Trust pills */}
            <div className="mb-3 hidden flex-wrap gap-2 sm:mb-6 sm:flex">
              {[
                { icon: <Clock size={12} />, label: "5–7 hr response", color: "#ec4899" },
                { icon: <ShieldCheck size={12} />, label: "No spam, ever", color: "#a855f7" },
                { icon: <Lock size={12} />, label: "100% private", color: "#8b5cf6" },
              ].map(p => (
                <span key={p.label} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-zinc-600 shadow-sm">
                  <span style={{ color: p.color }}>{p.icon}</span>
                  {p.label}
                </span>
              ))}
            </div>

            {/* Form shell */}
            <div className="rounded-2xl border border-black/[0.07] bg-black/[0.02] p-1 shadow-sm sm:rounded-[20px] sm:p-1.5">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3.5 rounded-2xl border border-fuchsia-200 bg-fuchsia-50 px-5 py-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900">You're on the list!</p>
                      <p className="mt-0.5 text-xs text-zinc-500">Our team will call you within 5–7 hours.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex min-w-0 flex-row items-stretch gap-1 sm:gap-2"
                  >
                    {/* Input */}
                    <div className="flex min-w-0 flex-1 items-center overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm sm:rounded-2xl">
                      <span className="flex h-9 shrink-0 items-center border-r border-zinc-100 px-2 text-[10px] font-bold text-zinc-400 sm:h-12 sm:px-3.5 sm:text-[13px]">
                        +91
                      </span>
                      <input
                        type="tel" inputMode="numeric" autoComplete="tel"
                        placeholder="Mobile number"
                        value={phone}
                        onChange={e => { setPhone(e.target.value.replace(/[^\d+\s-]/g, "")); setError(""); }}
                        className="h-9 min-w-0 w-full bg-transparent px-2 text-[11px] font-medium text-zinc-900 placeholder:text-[10px] placeholder:text-zinc-300 outline-none caret-pink-500 sm:h-12 sm:px-3.5 sm:text-[14px] sm:placeholder:text-sm"
                      />
                    </div>

                    {/* Button */}
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex h-9 shrink-0 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 px-2.5 text-[10px] font-bold leading-none text-white shadow-[0_6px_24px_rgba(168,85,247,0.35)] transition-shadow hover:shadow-[0_8px_32px_rgba(168,85,247,0.45)] disabled:opacity-60 sm:h-12 sm:gap-2 sm:rounded-2xl sm:px-6 sm:text-[14px]"
                    >
                      {submitting ? "…" : <><span className="whitespace-nowrap">Get a callback</span><ArrowRight className="h-3 w-3 shrink-0 sm:h-[15px] sm:w-[15px]" /></>}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-2 text-[12px] font-medium text-pink-500" role="alert"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="mt-2 hidden text-[11px] leading-relaxed text-zinc-400 sm:mt-3 sm:block">
              By submitting, you agree to be contacted about event services. Your number stays private.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}