import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionLabel, SiteFooter, SiteNav } from "@/components/site-chrome";

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "People — The Tag Along Family" },
      { name: "description", content: "The team, local creatives, volunteers and travellers who make Tag Along a home in Gangtok." },
      { property: "og:title", content: "The People of Tag Along" },
      { property: "og:description", content: "The team, local creatives, volunteers and travellers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PeoplePage,
});

const TEAM = [
  { name: "Dipesh 1&2", role: "Head Chefs", color: "bg-butter" },
  { name: "Shekar", role: "Behind the bar", color: "bg-blush" },
  { name: "Binita", role: "House, keys & things that leak", color: "bg-mint" },
  { name: "Sumiran", role: "Bookings & long conversations", color: "bg-lavender" },
  { name: "Prabat", role: "Music, mischief & mixtapes", color: "bg-seafoam" },
];

const CREATIVES = [
  { name: "Zeyma Studio", craft: "Pottery workshops" },
  { name: "Rachna Books", craft: "Books, conversations & local authors" },
  { name: "Nepali Sahitya Parishad", craft: "Theatre, music & community events" },
  { name: "Tsal Studio", craft: "Visual art, tattooing, design and more.." },
];

function PeoplePage() {
  return (
    <div className="bg-paper text-ink font-body">
      <SiteNav />
      <PageHero
        kicker="Who's around"
        title="A house is"
        italic="its people."
        intro="Some live here, some pass through, some send a postcard from a village whose name we can't spell. All of them belong."
        bg="bg-seafoam/40"
        accent="text-terracotta"
      />

      {/* Team */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="01">Meet the team</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">The daily crew.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TEAM.map((t) => (
            <article key={t.name} className={`p-6 rounded-lg ${t.color} min-h-44 sm:aspect-[3/4] flex flex-col justify-between`}>
              <div className="size-16 rounded-full bg-white/60 flex items-center justify-center font-display text-2xl font-bold">
                {t.name[0]}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold leading-tight">{t.name}</h3>
                <p className="text-xs opacity-80 mt-1">{t.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Local creatives */}
      <section className="bg-blush/60 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="02" color="text-terracotta">Local creatives</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-12">Our Creative Neighbours.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {CREATIVES.map((c) => (
              <article key={c.name} className="bg-white rounded-lg p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                  <p className="text-sm text-ink/60">{c.craft}</p>
                </div>
                <span className="font-hand text-2xl text-terracotta">say hi ↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteers */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionLabel index="03">Volunteers</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-6">Trade skills for a bed.</h2>
          <p className="text-ink/70 leading-relaxed max-w-md">
            Three weeks minimum. Four hours a day at the café, garden or front desk. In exchange: a bunk, meals, and enough afternoons free to wander.
          </p>
          <a href="mailto:hello@tagalong.site" className="inline-block mt-8 bg-ink text-paper px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-terracotta transition-colors">
            Write to us
          </a>
        </div>
        <ul className="space-y-3 text-lg">
          <li className="flex justify-between border-b border-ink/10 pb-3"><span>Creators, Painters, Muralists{"\u00a0"}</span><span className="text-ink/50">Aug – Nov</span></li>
          <li className="flex justify-between border-b border-ink/10 pb-3"><span>Front desk & bookings</span><span className="text-ink/50">Rolling</span></li>
          <li className="flex justify-between border-b border-ink/10 pb-3"><span>Gardener</span><span className="text-ink/50">Sep – Oct</span></li>
          <li className="flex justify-between border-b border-ink/10 pb-3"><span>Hard workers, any discipline</span><span className="text-ink/50">Winter</span></li>
        </ul>
      </section>

      {/* Travellers */}
      <section className="bg-butter/40 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="04" color="text-burnt">Travellers</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-12">The ones who came and stayed too long.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Anaïs", from: "Lyon → Room 2, still here", quote: "I forgot the WiFi password on purpose." },
              { name: "Rohan", from: "Mumbai → left, came back", quote: "The kind of quiet you can hear the kitchen from." },
              { name: "Mika", from: "Kyoto → posted a scarf", quote: "Every corner had a story." },
            ].map((t) => (
              <blockquote key={t.name} className="bg-white p-6 rounded-lg -rotate-1 last:rotate-1">
                <p className="font-display italic text-lg leading-snug mb-4">"{t.quote}"</p>
                <cite className="not-italic text-xs uppercase tracking-widest text-ink/50">— {t.name}, {t.from}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Community stories */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <SectionLabel index="05">Community stories</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Small biographies.</h2>
        <ul className="space-y-10">
          {[
            { title: "How Aunty Rinzin's pickle recipe left home", by: "Neha", read: "6 min" },
            { title: "The season Léa taught us all to bind books", by: "Sonam", read: "4 min" },
            { title: "The night a stranger played the veena", by: "Adi", read: "3 min" },
          ].map((s) => (
            <li key={s.title} className="border-b border-ink/10 pb-8">
              <p className="text-[10px] uppercase tracking-widest text-ink/50 mb-2">{s.read} read · by {s.by}</p>
              <h3 className="font-display text-3xl font-bold hover:text-terracotta transition-colors cursor-pointer">{s.title}</h3>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </div>
  );
}
