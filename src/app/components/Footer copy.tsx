import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
} from "lucide-react";

const QUICK_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#packages", label: "Packages" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
] as const;

const CONTACT = {
  phone: "+91 63600 49821",
  phoneRaw: "+916360049821",
  email: "hello@eventwibes.example",
  location: "Vijayanagara City, KAR",
};

const SOCIAL = [
  { href: "#", label: "Instagram", icon: Instagram },
  { href: "#", label: "Facebook", icon: Facebook },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-[#F6F1EC]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-pink-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 py-6 sm:px-6 md:py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-0">
          {/* Brand — top-left on mobile */}
          <div className="col-start-1 row-start-1 lg:col-span-1">
            <a href="#home" className="inline-flex items-center gap-2">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F8C06D] via-[#EEA556] to-[#D9873F] shadow-md shadow-[#D8A06B]/20 lg:h-10 lg:w-10">
                <Sparkles className="h-3.5 w-3.5 text-slate-950 lg:h-4 lg:w-4" />
              </span>
              <span className="font-serif text-sm leading-tight lg:text-lg">
                <span className="text-[#D8A06B]">Shirdi Sai</span>{" "}
                <span className="text-white">Events</span>
              </span>
            </a>
            <p className="mt-3 hidden max-w-xs text-sm leading-relaxed text-slate-400 lg:block">
              Premium decor, styling, and production for weddings, celebrations,
              and corporate events across Karnataka.
            </p>
          </div>

          {/* Quick links — bottom-left on mobile */}
          <div className="col-start-1 row-start-2 lg:col-start-2 lg:row-start-1">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-400/90 lg:text-xs lg:tracking-[0.28em]">
              Quick links
            </h3>
            <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 lg:mt-5 lg:flex lg:flex-col lg:gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-slate-300 transition hover:text-[#E6965A] lg:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — top-right on mobile */}
          <div className="col-start-2 row-start-1 lg:col-start-3 lg:row-start-1">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-400/90 lg:text-xs lg:tracking-[0.28em]">
              Contact
            </h3>
            <ul className="mt-2 flex flex-col gap-2 text-xs text-slate-300 lg:mt-5 lg:gap-4 lg:text-sm">
              <li>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="group flex items-center gap-2 transition hover:text-[#E6965A] lg:items-start lg:gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[#D8A06B] lg:mt-0.5 lg:h-8 lg:w-8 lg:rounded-lg">
                    <Phone className="h-3 w-3 lg:h-4 lg:w-4" />
                  </span>
                  <span className="leading-tight">{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-2 transition hover:text-[#E6965A] lg:items-start lg:gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[#D8A06B] lg:mt-0.5 lg:h-8 lg:w-8 lg:rounded-lg">
                    <Mail className="h-3 w-3 lg:h-4 lg:w-4" />
                  </span>
                  <span className="truncate leading-tight">{CONTACT.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 lg:items-start lg:gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[#D8A06B] lg:mt-0.5 lg:h-8 lg:w-8 lg:rounded-lg">
                  <MapPin className="h-3 w-3 lg:h-4 lg:w-4" />
                </span>
                <span className="leading-tight">{CONTACT.location}</span>
              </li>
            </ul>
          </div>

          {/* Social + CTA — bottom-right on mobile */}
          <div className="col-start-2 row-start-2 lg:col-start-4 lg:row-start-1">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-400/90 lg:text-xs lg:tracking-[0.28em]">
              Follow us
            </h3>
            <div className="mt-2 flex gap-2 lg:mt-5 lg:gap-3">
              {SOCIAL.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-pink-500/40 hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-violet-500/20 hover:text-white lg:h-11 lg:w-11"
                >
                  <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="mt-4 hidden w-full items-center justify-center rounded-full bg-gradient-to-r from-[#F8C06D] via-[#EEA556] to-[#D9873F] px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-[#D9873F]/25 transition hover:opacity-95 sm:inline-flex lg:mt-8 lg:w-auto"
            >
              Book your event
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-center sm:flex-row sm:text-left lg:mt-14 lg:gap-4 lg:pt-8">
          <p className="text-xs text-slate-500 lg:text-sm">
            © {year}{" "}
            <span className="text-slate-400">Shirdi Sai Events</span>
            <span className="hidden sm:inline"> — All rights reserved.</span>
          </p>
          <p className="hidden text-xs text-slate-600 sm:block">
            Crafted with care for unforgettable celebrations.
          </p>
        </div>
      </div>
    </footer>
  );
}
