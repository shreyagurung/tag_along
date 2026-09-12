import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionLabel, SiteFooter, SiteNav } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The story of Tag Along" },
      { name: "description", content: "Why we built Tag Along in Gangtok — a small hostel, café and creative space in the Eastern Himalayas." },
      { property: "og:title", content: "About Tag Along" },
      { property: "og:description", content: "A small hostel, café and creative space in the Eastern Himalayas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { t: "Slow over slick", d: "We take longer than we should. It's usually worth it.", c: "bg-butter" },
  { t: "Local first", d: "Neighbours before suppliers. Recipes before menus.", c: "bg-mint" },
  { t: "Rooms with no doors", d: "The living room belongs to whoever's in it.", c: "bg-blush" },
  { t: "Small on purpose", d: "Nine beds. We know your name by dinner.", c: "bg-lavender" },
];

const EVOLUTION = [
  { phase: "Where it began", note: "Tag Along started as a tourism consulting firm, with the simple wish to help people experience Sikkim differently from the standard package route." },
  { phase: "Ride the Silk", note: "The first experiential travel product. A way to see the region through stories, people and roads less mapped." },
  { phase: "A gap in Gangtok", note: "Around 2016, we noticed travellers needed a place that was affordable, clean, transparent and less formal than a hotel." },
  { phase: "More than a bed", note: "What began as accommodation became a shared space where travellers, locals, artists and new Gangtok residents could meet, learn and connect." },
  { phase: "Gigs, workshops, events", note: "These grew organically from the relationships in the room — not from a marketing plan." },
  { phase: "An urban community space", note: "Today Tag Along is a place of sharing, learning, connecting and growing. Long stays and Tag Along 2.0 are a growing part of that story." },
];

function AboutPage() {
  return (
    <div className="bg-paper text-ink font-body">
      <SiteNav />
      <PageHero
        kicker="The long story"
        title="A place built"
        italic="on real travel."
        intro="Tag Along didn't start with a business plan. It started with a wish: to help people experience Sikkim beyond the package-tour route."
        bg="bg-blush/50"
        accent="text-terracotta"
      />

      {/* Why */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel index="01">Why we built it</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-6">From consulting to a corner in Gangtok.</h2>
          <div className="space-y-4 text-ink/80 leading-relaxed">
            <p>We began as a tourism consulting firm, trying to nudge travel in Sikkim away from the usual package circuit. Our first experiment was Ride the Silk — a product built around experience, not itinerary.</p>
            <p>Around 2016, we kept meeting travellers in Gangtok who wanted something simple: a place that was affordable, clean, transparent and less formal than a hotel. We also wanted a space where the connections built on the road could keep going after check-in.</p>
            <p>That small need became Tag Along.</p>
          </div>
        </div>
        <div className="bg-butter/60 p-10 rounded-lg -rotate-1 shadow-sm">
          <p className="font-hand text-4xl leading-tight text-ink">
            "The best parts of travel are never planned."
          </p>
          <p className="text-xs uppercase tracking-widest text-ink/50 mt-6">— House motto, painted somewhere by the stairs</p>
        </div>
      </section>

      {/* Evolution */}
      <section className="bg-mint/40 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionLabel index="02" color="text-forest">How it grew</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-12">A simple evolution.</h2>
          <ol className="space-y-8 border-l-2 border-terracotta/30 pl-8">
            {EVOLUTION.map((e) => (
              <li key={e.phase} className="relative">
                <span className="absolute -left-[41px] top-1 size-4 rounded-full bg-terracotta" />
                <p className="font-display text-3xl font-bold text-terracotta">{e.phase}</p>
                <p className="text-ink/80 mt-1">{e.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="03">Meet the founders</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">The two of us.</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "Manisha", role: "Co-founder", color: "bg-lavender" },
            { name: "Bhavana", role: "Co-founder", color: "bg-seafoam" },
          ].map((p) => (
            <article key={p.name} className={`${p.color} p-10 rounded-lg`}>
              <div className="size-24 rounded-full bg-white/60 flex items-center justify-center font-display text-4xl font-bold mb-6">
                {p.name[0]}
              </div>
              <h3 className="font-display text-3xl font-bold">{p.name}</h3>
              <p className="text-sm text-ink/80 mt-2 leading-relaxed">{p.role}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="04">Values</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Four things we mean.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((v) => (
            <div key={v.t} className={`p-6 rounded-lg ${v.c} aspect-square flex flex-col justify-between`}>
              <span className="font-display text-2xl font-bold leading-tight">{v.t}</span>
              <p className="text-sm text-ink/80">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our home in Gangtok */}
      <section className="bg-forest text-paper py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-hand text-2xl text-butter block mb-4">Our home in Gangtok</span>
            <h2 className="font-display text-5xl font-bold mb-6 leading-tight">A short walk from the monastery bells.</h2>
            <p className="text-paper/80 leading-relaxed mb-8 max-w-md">
              We're on the quiet side of Development Area, below the High Court. Follow the smell of roasting coffee — or ask anyone in the neighbourhood.
            </p>
            <address className="not-italic text-sm leading-relaxed text-paper/70">
              12 Development Area Road,<br />
              Below the High Court,<br />
              Gangtok, Sikkim 737101
            </address>
          </div>
          <div className="aspect-square bg-paper/5 border border-paper/10 rounded-lg p-6 relative overflow-hidden">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <path d="M20 300 Q120 220 200 260 T380 180" stroke="#f2c94c" strokeWidth="2" fill="none" opacity="0.7" />
              <ellipse cx="200" cy="200" rx="150" ry="110" fill="none" stroke="#f5cfc9" strokeWidth="1" opacity="0.4" />
              <ellipse cx="200" cy="200" rx="90" ry="60" fill="none" stroke="#f5cfc9" strokeWidth="1" opacity="0.5" />
              <circle cx="200" cy="200" r="10" fill="#d94f3d" />
              <circle cx="200" cy="200" r="22" fill="none" stroke="#d94f3d" strokeWidth="1.5" />
              <text x="220" y="205" fill="#fbf5e8" fontFamily="Fraunces" fontSize="14" fontStyle="italic">Tag Along</text>
            </svg>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
