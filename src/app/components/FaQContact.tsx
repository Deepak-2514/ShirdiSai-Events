import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const FaQContact = () => {
  return (
    <>
      <section className="mx-auto px-3 py-14 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3
            className=" text-5xl
          md:text-7xl
          xl:text-8xl
          font-black
          tracking-[-0.06em]
          leading-[0.9]
          text-zinc-950"
          >
            Frequently asked
          </h3>
          <div className="mt-4 space-y-3">
            <details className="bg-white rounded-xl p-4 shadow">
              <summary className="font-medium cursor-pointer">
                Do you offer same-day setup?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                For small events we can sometimes accommodate same-day setup —
                contact early to check availability.
              </p>
            </details>

            <details className="bg-white rounded-xl p-4 shadow">
              <summary className="font-medium cursor-pointer">
                Can I customize a package?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                Yes — all packages are modular and we provide tailored quotes.
              </p>
            </details>
          </div>
        </div>

        <div id="contact" className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-2xl font-bold">Contact & Booking</h3>
          <p className="mt-2 text-sm text-slate-600">
            Tell us date, guest count, venue, and budget — we’ll reply with
            options.
          </p>

          <form className="mt-4 grid gap-3">
            <input className="border rounded-md p-3" placeholder="Full name" />
            <input
              className="border rounded-md p-3"
              placeholder="Phone or WhatsApp"
            />
            <input
              className="border rounded-md p-3"
              placeholder="Event date (YYYY-MM-DD)"
            />
            <textarea
              className="border rounded-md p-3"
              rows={4}
              placeholder="Message & requirements"
            />

            <div className="flex gap-3">
              <button
                type="button"
                className="rounded-full bg-rose-600 text-white px-4 py-2"
              >
                Request quote
              </button>
              <a
                className="rounded-full border px-4 py-2"
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

          <div className="mt-4 text-sm text-slate-600 flex flex-col gap-2">
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
