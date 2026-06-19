import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const FaQContact = () => {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2 md:gap-8 lg:px-12">
        <div className="space-y-6">
          <h3
            className=" text-4xl
          sm:text-5xl
          md:text-6xl
          xl:text-7xl
          font-black
          tracking-tight
          leading-[0.95]
          text-zinc-950"
          >
            Frequently asked
          </h3>
          <div className="mt-4 space-y-3">
            <details className="rounded-xl bg-white p-4 shadow">
              <summary className="cursor-pointer text-sm font-semibold text-zinc-900 sm:text-base">
                Do you offer same-day setup?
              </summary>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600 sm:text-sm">
                For small events we can sometimes accommodate same-day setup —
                contact early to check availability.
              </p>
            </details>

            <details className="rounded-xl bg-white p-4 shadow">
              <summary className="cursor-pointer text-sm font-semibold text-zinc-900 sm:text-base">
                Can I customize a package?
              </summary>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600 sm:text-sm">
                Yes — all packages are modular and we provide tailored quotes.
              </p>
            </details>
          </div>
        </div>

        <div id="contact" className="rounded-2xl bg-white p-4 shadow sm:p-6">
          <h3 className="text-xl font-black tracking-tight text-zinc-950 sm:text-2xl">
            Contact & Booking
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-600 sm:text-sm">
            Tell us date, guest count, venue, and budget — we’ll reply with
            options.
          </p>

          <form className="mt-4 grid gap-3">
            <input
              className="rounded-md border p-3 text-sm outline-none focus:border-pink-400"
              placeholder="Full name"
            />
            <input
              className="rounded-md border p-3 text-sm outline-none focus:border-pink-400"
              placeholder="Phone or WhatsApp"
            />
            <input
              className="rounded-md border p-3 text-sm outline-none focus:border-pink-400"
              placeholder="Event date (YYYY-MM-DD)"
            />
            <textarea
              className="rounded-md border p-3 text-sm outline-none focus:border-pink-400"
              rows={4}
              placeholder="Message & requirements"
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Request quote
              </button>
              <a
                className="rounded-full border px-4 py-2 text-center text-sm font-semibold text-zinc-900"
                href="mailto:hello@eventwibes.example"
              >
                Email us
              </a>
            </div>

            <div className="mt-3 text-xs text-slate-500">
              By contacting you agree to our terms. We’ll reply in 1–2 business
              days.
            </div>
          </form>

          <div className="mt-4 flex flex-col gap-2 text-[13px] text-slate-600 sm:text-sm">
            <div className="flex items-center gap-2">
              <Phone size={14} /> +91 63600 49821
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} /> hello@eventwibes.example
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} /> Vijayanagara City, KAR
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaQContact;
