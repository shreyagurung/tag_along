import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionLabel, SiteFooter, SiteNav } from "@/components/site-chrome";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Sikkim beyond the guidebook" },
      { name: "description", content: "Hidden gems, favourite cafés, walks and day trips from Tag Along in Gangtok, Sikkim." },
      { property: "og:title", content: "Explore Sikkim with Tag Along" },
      { property: "og:description", content: "Walks, villages, cafés and quiet corners we love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

const GEMS = [
  { name: "Cooking Workshop", tag: "HALF DAY", desc: "Learn a local recipe, then sit down and eat together." },
  { name: "A local's loop", tag: "HALF DAY", desc: "A day in Gangtok, a route that locals know.\u00a0" },
  { name: "Pottery Studio", tag: "HALF DAY", desc: "An afternoon with clay, conversation and hands that don't need to check their phone." },
];

const CAFES = [
  { name: "Cafe Fiction", note: "For the timeless stories." },
  { name: "The Local Cafe", note: "For the third glass, always." },
  { name: "Gangtok Bisauni Cafe", note: "For Jhol Momos." },
  { name: "Baker's Cafe\u00a0", note: "For the cheesecake." },
];

const WALKS = [
  { name: "Ridge Park & White Hall", time: "45 min", level: "Easy" },
  { name: "Enchey monastery loop", time: "1.5 hr", level: "Easy" },
  { name: "Radio Dara", time: "2.5 hr", level: "Moderate" },
  { name: "Ganesh Tok → Tashi View Point", time: "3 hr", level: "Moderate" },
];

const VILLAGES = [
  { name: "Daarapari, Bermoik", hrs: "5 HRS AWAY", note: "A mud house, long breakfasts, and nowhere to be." },
  { name: "Dhuni, Yang Yang", hrs: "2 HR AWAY", note: "Pick herbs, light the fire, stay for lunch" },
  { name: "Rumlyang, Dzongu", hrs: "4 hr away", note: "The Lepcha heartland. Ask us before you go." },
];

const SEASONS = [
  { season: "Spring", color: "bg-mint", note: "Rhododendrons, first strawberries, quiet trails." },
  { season: "Monsoon", color: "bg-seafoam", note: "The valley disappears into mist. Read a lot." },
  { season: "Autumn", color: "bg-butter", note: "Clearest skies, Kanchenjunga at breakfast." },
  { season: "Winter", color: "bg-lavender", note: "Wood stoves, orange season, snowline visible." },
];

function ExplorePage() {
  return (
    <div className="bg-paper text-ink font-body">
      <SiteNav />
      <PageHero
        kicker="From our notebook"
        title="See Sikkim"
        italic="the Tag Along way."
        intro="No package tours. No rushed checklists. Just the places, people and experiences we'd recommend to a friend."
        bg="bg-seafoam/50"
        accent="text-burnt"
      />

      {/* Hidden gems */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="01">OUR PICKS</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Skip the Guidebook</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {GEMS.map((g, i) => (
            <article key={g.name} className={`p-6 rounded-lg ${i % 2 === 0 ? "bg-blush" : "bg-butter/70"} ${i === 0 ? "-rotate-1" : i === 2 ? "rotate-1" : ""}`}>
              <span className="text-[10px] uppercase tracking-widest text-ink/60">{g.tag}</span>
              <h3 className="font-display text-2xl font-bold mt-2 mb-3">{g.name}</h3>
              <p className="text-sm text-ink/80 leading-relaxed">{g.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Cafés */}
      <section className="bg-blush/60 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionLabel index="02" color="text-terracotta">Favourite cafés</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-12">We love the competition.</h2>
          <ul className="space-y-4">
            {CAFES.map((c) => (
              <li key={c.name} className="flex justify-between items-baseline border-b border-dashed border-ink/20 pb-4">
                <span className="font-display text-2xl font-bold">{c.name}</span>
                <span className="font-hand text-xl text-terracotta">{c.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Walks */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="03">Walks</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Two feet, no hurry.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WALKS.map((w) => (
            <div key={w.name} className="p-6 bg-mint/60 rounded-lg aspect-square flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-widest">{w.level}</span>
              <div>
                <p className="font-display text-xl font-bold leading-tight">{w.name}</p>
                <p className="font-hand text-xl text-terracotta mt-1">{w.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Villages */}
      <section className="bg-lavender/40 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="04" color="text-forest">Villages</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-12">Bayul Sikkim (Hidden Valleys)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {VILLAGES.map((v) => (
              <article key={v.name} className="bg-white p-6 rounded-lg">
                <p className="text-[10px] uppercase tracking-widest text-ink/50">{v.hrs}</p>
                <h3 className="font-display text-2xl font-bold my-2">{v.name}</h3>
                <p className="text-sm text-ink/70">{v.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Day trips */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <SectionLabel index="05">Day trips</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-6">Leave at sunrise, back for dinner.</h2>
          <p className="text-ink/70 leading-relaxed max-w-md">
            We can arrange a shared taxi or a driver we trust. Pack layers, snacks, a book you don't mind losing.
          </p>
        </div>
        <ul className="space-y-4 text-lg">
          <li className="flex justify-between border-b border-ink/10 pb-3"><span>Tsomgo Lake & Baba Mandir</span><span className="text-ink/50">~4 hr</span></li>
          <li className="flex justify-between border-b border-ink/10 pb-3"><span>Nathula Pass</span><span className="text-ink/50">~5 hr</span></li>
          <li className="flex justify-between border-b border-ink/10 pb-3"><span>Rumtek monastery</span><span className="text-ink/50">~1 hr</span></li>
          <li className="flex justify-between border-b border-ink/10 pb-3"><span>Temi tea gardens</span><span className="text-ink/50">~2.5 hr</span></li>
        </ul>
      </section>

      {/* Seasons */}
      <section className="bg-paper py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="06">Seasonal notes</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Four kinds of light.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SEASONS.map((s) => (
            <div key={s.season} className={`p-6 rounded-lg ${s.color} aspect-square flex flex-col justify-between`}>
              <span className="font-display text-3xl font-bold">{s.season}</span>
              <p className="text-sm text-ink/80">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Local map */}
      <section className="bg-forest text-paper py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-hand text-2xl text-butter block mb-4">Local map</span>
            <h2 className="font-display text-5xl font-bold mb-6 leading-tight">A hand-drawn key to the neighbourhood.</h2>
            <p className="text-paper/80 leading-relaxed">Print it, fold it wrong, spill chai on it. That's how a map earns its keep.</p>
          </div>
          <div className="aspect-square bg-paper/5 border border-paper/10 rounded-lg p-6 relative overflow-hidden">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <path d="M40 340 Q160 260 240 300 T380 220" stroke="#f2c94c" strokeWidth="2" fill="none" opacity="0.7" />
              <path d="M60 80 Q160 160 240 120 T380 180" stroke="#f5cfc9" strokeWidth="2" strokeDasharray="6 6" fill="none" opacity="0.7" />
              <circle cx="200" cy="200" r="12" fill="#d94f3d" />
              <circle cx="200" cy="200" r="24" fill="none" stroke="#d94f3d" strokeWidth="1.5" />
              <text x="220" y="205" fill="#fbf5e8" fontFamily="Fraunces" fontSize="14" fontStyle="italic">Tag Along</text>
              <text x="70" y="70" fill="#fbf5e8" fontSize="9" letterSpacing="2" opacity="0.6">↑ KANCHENJUNGA</text>
              <text x="260" y="360" fill="#fbf5e8" fontSize="9" letterSpacing="2" opacity="0.6">M.G. MARG ↘</text>
              <text x="30" y="380" fill="#fbf5e8" fontSize="9" letterSpacing="2" opacity="0.6">RUMTEK →</text>
            </svg>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
