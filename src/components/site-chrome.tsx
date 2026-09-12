import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/tag-along-icon.png.asset.json";

const NAV_LINKS = [
  { to: "/stay", label: "Stay" },
  { to: "/cafe", label: "Café" },
  { to: "/gather", label: "Gather" },
  { to: "/explore", label: "Explore" },
  { to: "/people", label: "People" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-ink/5 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center gap-3">
      <Link to="/" className="shrink-0 flex items-center gap-2.5 min-w-0" aria-label="Tag Along home">
        <img
          src={logoAsset.url}
          alt=""
          aria-hidden="true"
          width={440}
          height={440}
          className="h-8 w-8 sm:h-9 sm:w-9 object-contain shrink-0"
        />
        <span className="font-display text-xl sm:text-2xl font-bold tracking-tight leading-none truncate">
          Tag Along
        </span>
      </Link>
      <div className="hidden lg:flex gap-6 text-xs font-medium uppercase tracking-widest">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="hover:text-terracotta transition-colors"
            activeProps={{
              className:
                "text-terracotta font-bold underline decoration-2 underline-offset-4",
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <Link
        to="/stay"
        className="hidden sm:inline-block bg-ink text-paper px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-terracotta transition-colors shrink-0"
      >
        Book a bed
      </Link>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="lg:hidden shrink-0 -mr-1 grid size-11 place-items-center rounded-full text-ink hover:bg-ink/5 transition-colors"
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {open && (
        <div className="lg:hidden absolute left-0 right-0 top-full z-40 max-h-[calc(100dvh-3.5rem)] overflow-y-auto bg-paper border-t border-ink/5 shadow-lg">
          <ul className="px-6 py-6 flex flex-col">
            {NAV_LINKS.map((l) => (
              <li key={l.to} className="border-b border-ink/5 last:border-0">
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-2xl font-bold hover:text-terracotta transition-colors"
                  activeProps={{ className: "text-terracotta" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pb-10">
            <Link
              to="/stay"
              onClick={() => setOpen(false)}
              className="block text-center bg-ink text-paper px-6 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-terracotta transition-colors"
            >
              Book a bed
            </Link>
            <p className="mt-6 text-sm text-ink/60">
              hello@tagalong.site · +91 987 654 3210
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}


export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper/60 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="font-display text-5xl text-paper mb-6 font-bold leading-tight">
              Stay with us for a while.
            </h2>
            <p className="max-w-sm mb-8 text-paper/70 leading-relaxed">
              Whether you're staying for a night, a month or simply dropping by
              for coffee, we'd love to welcome you.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="mailto:hello@tagalong.site"
                className="bg-terracotta text-paper px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-butter hover:text-ink transition-colors"
              >
                Write to us
              </a>
              <Link
                to="/stay"
                className="border border-paper/20 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-paper hover:bg-paper hover:text-ink transition-colors"
              >
                Book a bed
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-paper uppercase tracking-widest text-xs font-bold mb-6">
              Wander through
            </h4>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-block py-1.5 hover:text-terracotta transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-paper uppercase tracking-widest text-xs font-bold mb-6">
              Say hello
            </h4>
            <ul className="space-y-2 text-sm">
              <li>hello@tagalong.site</li>
              <li>+91 987 654 3210</li>
              <li className="text-paper/40">Gangtok, Sikkim 737101</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-paper/10 flex flex-col md:flex-row justify-between gap-4 text-[10px] uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Tag Along Hostel & Café. Built for wanderers.</p>
          <p>Handmade in the Eastern Himalayas</p>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  kicker,
  title,
  italic,
  intro,
  bg = "bg-blush/50",
  accent = "text-terracotta",
}: {
  kicker: string;
  title: string;
  italic?: string;
  intro: string;
  bg?: string;
  accent?: string;
}) {
  return (
    <header className={`${bg} px-6 pt-20 pb-28 border-b border-ink/5`}>
      <div className="max-w-7xl mx-auto">
        <p className={`font-hand text-2xl ${accent} mb-4`}>{kicker}</p>
        <h1 className="font-display text-6xl md:text-8xl font-black leading-[0.9] max-w-4xl text-balance whitespace-pre-line">
          {title}{" "}
          {italic && <span className="italic text-forest">{"\n"}{italic}</span>}
        </h1>
        <p className="mt-8 max-w-xl text-lg text-ink/70 leading-relaxed">{intro}</p>
      </div>
    </header>
  );
}

export function SectionLabel({
  index,
  color = "text-teal",
  children,
}: {
  index: string;
  color?: string;
  children: ReactNode;
}) {
  return (
    <span className={`uppercase tracking-widest text-xs font-bold ${color} block mb-2`}>
      {index} / {children}
    </span>
  );
}
