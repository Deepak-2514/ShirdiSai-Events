"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type FormEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Lock,
} from "lucide-react";

/* ─── ImageSwiper ─────────────────────────────────────────────────────────── */
const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
  "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&q=80",
  "https://images.unsplash.com/photo-1543157145-ea07600abd3e?w=600&q=80",
];

const VISIBLE_STACK = 3;

function useSwiperDims() {
  const [dims, setDims] = useState({
    cardW: 1200,
    cardH: 800,
    wrapW: 220,
    wrapH: 280,
    stackZ: 4,
    stackY: 3,
    swipeOut: 420,
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      // Mobile
      if (w < 768) {
        setDims({
          cardW: 1200,
          cardH: 800,
          wrapW: 220,
          wrapH: 280, // was 280
          stackZ: 4,
          stackY: 3,
          swipeOut: 250,
        });
      }
      // Desktop
      else {
        setDims({
          cardW: 1200,
          cardH: 800,
          wrapW: 304,
          wrapH: 424,
          stackZ: 14,
          stackY: 10,
          swipeOut: 400,
        });
      }
    };

    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}

function stackTransform(
  dispIdx: number,
  stackZ: number,
  stackY: number,
  translateX = 0,
  rotateY = 0,
) {
  const scale = 1 - dispIdx * 0.04;

  return `
    perspective(1200px)
    translateZ(${-stackZ * dispIdx}px)
    translateY(${stackY * dispIdx}px)
    scale(${scale})
    translateX(${translateX}px)
    rotateY(${rotateY}deg)
  `;
}

function ImageSwiper({ hintClassName = "" }: { hintClassName?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef(DEMO_IMAGES.map((_, i) => i));
  const swiping = useRef(false);
  const startX = useRef(0);
  const curX = useRef(0);
  const rafId = useRef<number | null>(null);
  const dims = useSwiperDims();
  const dimsRef = useRef(dims);
  dimsRef.current = dims;
  const { cardW, cardH, wrapW, wrapH, stackZ, stackY } = dims;

  const buildCards = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const { cardW: w, cardH: h, stackZ: z, stackY: y } = dimsRef.current;
    wrap.querySelectorAll(".s-card").forEach((c) => c.remove());
    orderRef.current.slice(0, VISIBLE_STACK).forEach((origIdx, dispIdx) => {
      const el = document.createElement("article");
      el.className = "s-card";
      Object.assign(el.style, {
        position: "absolute",
        inset: "0",
        margin: "auto",
        width: `${w}px`,
        height: `${h}px`,
        zIndex: String(VISIBLE_STACK - dispIdx),
        borderRadius: "30px",
        border: "1px solid rgba(255,255,255,0.15)",
        overflow: "hidden",
        willChange: "transform",
        transform: stackTransform(dispIdx, z, y),
        transition: "transform 0.32s cubic-bezier(0.22,1,0.36,1),opacity 0.32s",
        opacity: dispIdx === 0 ? "1" : dispIdx === 1 ? "0.35" : "0.15",
      });
      const img = document.createElement("img");
      img.src = DEMO_IMAGES[origIdx];
      img.alt = "";
      img.draggable = false;
      img.style.cssText =
        "width:100%;height:100%;object-fit:cover;object-position:center;pointer-events:none;display:block;transform:scale(1.03)";

      el.appendChild(img);

      wrap.insertBefore(el, wrap.firstChild);
    });
  }, []);

  const refreshPos = useCallback(() => {
    const { stackZ: z, stackY: y } = dimsRef.current;
    const cards = [
      ...(wrapRef.current?.querySelectorAll(".s-card") ?? []),
    ] as HTMLElement[];
    cards.forEach((c, i) => {
      c.style.zIndex = String(VISIBLE_STACK - i);
      c.style.transition =
        "transform 0.32s cubic-bezier(0.22,1,0.36,1),opacity 0.32s";
      c.style.transform = stackTransform(i, z, y);
      c.style.opacity = i === 0 ? "1" : String(1 - i * 0.06);
    });
  }, []);

  const top = () => {
    const cards = [
      ...(wrapRef.current?.querySelectorAll(".s-card") ?? []),
    ] as HTMLElement[];
    if (!cards.length) return null;
    return cards.reduce((front, c) =>
      parseInt(c.style.zIndex, 10) > parseInt(front.style.zIndex, 10)
        ? c
        : front,
    );
  };

  const doSwipe = useCallback(() => {
    const dx = curX.current - startX.current;
    const c = top();
    if (!c) return;
    const dir = Math.sign(dx);
    const { swipeOut: out, stackZ: z, stackY: y } = dimsRef.current;
    c.style.transition =
      "transform 0.33s cubic-bezier(0.22,1,0.36,1),opacity 0.33s";
    c.style.transform = stackTransform(0, z, y, dir * out, dir * 22);
    c.style.opacity = "0";
    setTimeout(() => {
      orderRef.current = [...orderRef.current.slice(1), orderRef.current[0]];
      buildCards();
    }, 330);
  }, [buildCards]);

  useEffect(() => {
    buildCards();
  }, [buildCards, cardW, cardH, stackZ, stackY]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onDown = (e: PointerEvent) => {
      swiping.current = true;
      startX.current = e.clientX;
      curX.current = e.clientX;
      const c = top();
      if (c) c.style.transition = "none";
      wrap.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!swiping.current) return;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        curX.current = e.clientX;
        const dx = curX.current - startX.current;
        const c = top();
        if (!c) return;
        const { stackZ: z, stackY: y } = dimsRef.current;
        c.style.transform = stackTransform(0, z, y, dx, dx * 0.16);
        c.style.opacity = String(Math.max(0.2, 1 - Math.abs(dx) / 150));
        if (Math.abs(dx) > 55) {
          swiping.current = false;
          doSwipe();
        }
      });
    };
    const onUp = () => {
      if (!swiping.current) return;
      swiping.current = false;
      if (Math.abs(curX.current - startX.current) > 55) doSwipe();
      else refreshPos();
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
    <div className="flex shrink-0 flex-col items-center">
      <div
        ref={wrapRef}
        className="relative isolate mx-auto overflow-hidden rounded-2xl select-none border-2 border-black/[0.08] bg-white/80 backdrop-blur-sm"
        style={{
          width: wrapW,
          height: wrapH,
          maxWidth: "100%",
          touchAction: "none",
          cursor: "grab",
        }}
      />
      <p
        className={`mt-2 whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.18em] text-fuchsia-600 sm:mt-3 sm:text-[11px] sm:tracking-widest ${hintClassName}`}
      >
        ← swipe to explore →
      </p>
    </div>
  );
}

/* ─── Shared form ─────────────────────────────────────────────────────────── */
type PhoneFormProps = {
  phone: string;
  setPhone: (v: string) => void;
  submitting: boolean;
  submitted: boolean;
  error: string;
  setError: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
  compact?: boolean;
};

function PhoneCallbackForm({
  phone,
  setPhone,
  submitting,
  submitted,
  error,
  setError,
  onSubmit,
  compact = false,
}: PhoneFormProps) {
  return (
    <>
      <div
        className={
          compact
            ? "w-full min-w-0 rounded-lg bg-black/[0.02] p-0.5"
            : "rounded-2xl border border-black/[0.06] bg-black/[0.02] p-1 shadow-sm sm:rounded-[20px] sm:p-1.5"
        }
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex items-center gap-3 rounded-2xl border border-fuchsia-200 bg-fuchsia-50 px-4 py-3 ${compact ? "gap-2 rounded-lg px-2.5 py-2" : "sm:gap-3.5 sm:px-5 sm:py-4"}`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow sm:h-9 sm:w-9">
                <CheckCircle2 size={compact ? 16 : 18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-zinc-900 sm:text-sm">
                  You&apos;re on the list!
                </p>
                <p className="mt-0.5 text-[10px] text-zinc-500 sm:text-xs">
                  Our team will call you within 5–7 hours.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              className={
                compact
                  ? "flex min-w-0 flex-col gap-1"
                  : "flex min-w-0 flex-row items-stretch gap-1 sm:gap-2"
              }
            >
              <div
                className={`flex min-w-0 items-center overflow-hidden rounded-lg border border-zinc-200/90 bg-white ${compact ? "flex-1 shadow-none" : "flex-1 shadow-sm sm:rounded-2xl"}`}
              >
                <span
                  className={`flex shrink-0 items-center border-r border-zinc-100 font-bold text-zinc-400 ${compact ? "h-8 px-1.5 text-[9px]" : "h-9 border-r px-2 text-[10px] sm:h-12 sm:px-3.5 sm:text-[13px]"}`}
                >
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="Mobile number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/[^\d+\s-]/g, ""));
                    setError("");
                  }}
                  className={
                    compact
                      ? "h-8 min-w-0 w-full bg-transparent px-1.5 text-[10px] font-medium text-zinc-900 placeholder:text-[9px] placeholder:text-zinc-300 outline-none caret-pink-500"
                      : "h-9 min-w-0 w-full bg-transparent px-2 text-[11px] font-medium text-zinc-900 placeholder:text-[10px] placeholder:text-zinc-300 outline-none caret-pink-500 sm:h-12 sm:px-3.5 sm:text-[14px] sm:placeholder:text-sm"
                  }
                />
              </div>
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={
                  compact
                    ? "flex h-8 w-full shrink-0 items-center justify-center gap-0.5 rounded-lg bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 px-2 text-[9px] font-bold leading-none text-white shadow-[0_4px_14px_rgba(168,85,247,0.28)] transition-shadow hover:shadow-[0_6px_20px_rgba(168,85,247,0.38)] disabled:opacity-60"
                    : "flex h-9 shrink-0 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-600 px-2.5 text-[10px] font-bold leading-none text-white shadow-[0_6px_24px_rgba(168,85,247,0.35)] transition-shadow hover:shadow-[0_8px_32px_rgba(168,85,247,0.45)] disabled:opacity-60 sm:h-12 sm:gap-2 sm:rounded-2xl sm:px-6 sm:text-[14px]"
                }
              >
                {submitting ? (
                  "…"
                ) : (
                  <>
                    <span className="whitespace-nowrap">Get a callback</span>
                    <ArrowRight
                      className={`shrink-0 ${compact ? "h-2.5 w-2.5" : "h-3 w-3 sm:h-[20px] sm:w-[20px]"}`}
                    />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`font-medium text-pink-500 ${compact ? "mt-1 text-[10px]" : "mt-2 text-[12px]"}`}
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}

const TRUST_BADGES = [
  { icon: Clock, label: "5–7 hr response", color: "#ec4899" },
  { icon: ShieldCheck, label: "No spam, ever", color: "#a855f7" },
  { icon: Lock, label: "100% private", color: "#8b5cf6" },
] as const;

function TrustBadges({ compact = false }: { compact?: boolean }) {
  const iconSize = compact ? 10 : 12;
  return (
    <div
      className={
        compact
          ? "mt-4 flex w-full flex-wrap justify-center gap-1.5"
          : "mb-6 mt-6 flex flex-wrap gap-2"
      }
    >
      {TRUST_BADGES.map(({ icon: Icon, label, color }) => (
        <span
          key={label}
          className={
            compact
              ? "inline-flex items-center gap-1 rounded-full border border-zinc-200/90 bg-white px-2 py-1 text-[10px] font-semibold text-zinc-600 shadow-sm"
              : "inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-zinc-600 shadow-sm"
          }
        >
          <span style={{ color }}>
            <Icon size={iconSize} />
          </span>
          {label}
        </span>
      ))}
    </div>
  );
}

function HeroCopy() {
  return (
    <>
      <div className="mb-3 inline-flex items-center gap-1.5 self-start sm:mb-5 md:px-10 sm:gap-2">
        <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 sm:h-[7px] sm:w-[7px]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500 sm:text-[11px] sm:tracking-[0.28em]">
          Quick Callback
        </span>
      </div>
      <h2
        className="mb-3 text-5xl
          md:text-7xl
          xl:text-8xl
          font-black
          tracking-[-0.06em]
          leading-[0.9] text-zinc-950 "
      >
        Drop your
        <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">
          phone number
        </span>
      </h2>
      <p className="mb-0 max-w-none text-[13px] leading-snug text-zinc-500 sm:mb-6 sm:max-w-sm sm:text-[15px] sm:leading-relaxed">
        We&apos;ll reach out within{" "}
        <span className="font-semibold text-zinc-700">5 to 7 hours</span> to
        plan your perfect celebration.
      </p>
    </>
  );
}

/* ─── DropPhone ───────────────────────────────────────────────────────────── */
export default function DropPhone() {
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit number.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  const formProps: PhoneFormProps = {
    phone,
    setPhone,
    submitting,
    submitted,
    error,
    setError,
    onSubmit: handleSubmit,
  };

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-20">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-6 md:px-10 lg:px-16">
        {/* Mobile */}
        <div className="flex flex-col gap-4 md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <HeroCopy />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="flex w-full flex-col items-center gap-4"
          >
            <div className="flex justify-center overflow-visible px-1 py-2">
              <ImageSwiper hintClassName="text-center" />
            </div>

            <div className="w-full">
              <div className="mx-auto max-w-md">
                <PhoneCallbackForm {...formProps} />
                <TrustBadges compact />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="shrink-0"
          >
            <ImageSwiper />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="flex min-w-0 flex-1 flex-col"
          >
            <HeroCopy />

            <TrustBadges />

            <PhoneCallbackForm {...formProps} />

            <p className="mt-3 text-[11px] leading-relaxed text-zinc-400">
              By submitting, you agree to be contacted about event services.
              Your number stays private.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
