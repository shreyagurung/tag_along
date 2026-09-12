import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionLabel, SiteFooter, SiteNav } from "@/components/site-chrome";
import roomDorm from "@/assets/room-dorm.jpg";
import roomPrivate from "@/assets/room-private.jpg";
import roomLounge from "@/assets/room-lounge.jpg";

export const Route = createFileRoute("/stay")({
  head: () => ({
    meta: [
      { title: "Stay — Tag Along Hostel, Gangtok" },
      { name: "description", content: "Dorm bunks, private nooks and long-stay rooms in a home built for wanderers in Gangtok, Sikkim." },
      { property: "og:title", content: "Stay — Tag Along" },
      { property: "og:description", content: "Bunks, private nooks and long-stay rooms in a home built for wanderers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StayPage,
});

const ROOMS = [
  { name: "The Bunk Room", price: "₹700 / night", tag: "6 beds", color: "bg-blush", img: roomDorm, desc: "Handmade wooden bunks, private curtains, reading lights and a small wardrobe each." },
  { name: "The Twin Nook", price: "₹1,800 / night", tag: "2 people", color: "bg-mint", img: roomLounge, desc: "A pair of low beds, a shared window seat and enough room for one more suitcase than you planned." },
  { name: "The Balcony Room", price: "₹2,400 / night", tag: "En-suite", color: "bg-butter", img: roomPrivate, desc: "Our loveliest corner — a private balcony over the valley, a writing desk, cotton sheets." },
];

const SHARED = [
  { name: "The Living Room", note: "For long conversations." },
  { name: "Reading Attic", note: "A small library above the stairs." },
  { name: "The Kitchen", note: "Yours to use, at your own risk." },
  { name: "Sun Terrace", note: "Best in the late afternoon." },
  { name: "Studio Corner", note: "Paints, film cameras and a mending kit." },
  { name: "The Garden", note: "Tulsi, a wobbly bench, one confident cat." },
];

const DAY = [
  { time: "07:00", note: "Kettle on. First birds. Someone's writing." },
  { time: "08:30", note: "Sourdough out of the oven. Curd, honey, plum." },
  { time: "11:00", note: "A slow walk to the monastery, if you want." },
  { time: "16:00", note: "Chai and small biscuits on the terrace." },
  { time: "19:30", note: "Community dinner three nights a week." },
  { time: "22:00", note: "Someone opens a book. Someone else, a bottle." },
];

const AMENITIES = ["Fast Wi-Fi", "Hot showers", "Laundry", "Bike loans", "Book library", "Board games", "Airport pickup", "Storage lockers", "Boot rack", "Rain gear"];

const FAQ = [
  { q: "Do you take walk-ins?", a: "Almost always. We keep a couple of bunks free for people who arrive without a plan." },
  { q: "Can I stay a month?", a: "Yes — ask about our weekly and monthly rates. Longer stays mean a small key of your own." },
  { q: "Is the café open to guests only?", a: "No. Half the joy is meeting the neighbourhood over a cup of coffee." },
  { q: "Do you allow pets?", a: "We have a house cat. Small dogs are welcome by prior arrangement." },
];

const PROPERTIES = [
  {
    key: "backpackers" as const,
    tab: "Tag Along Backpackers",
    heading: "The original social hostel.",
    desc: "The first house. Bunks, long tables and a common room where plans get made at midnight — easy to arrive alone, hard to stay alone.",
    bestFor: ["Backpackers", "Solo travellers", "Short stays", "Meeting people fast"],
    highlights: ["6- and 4-bed dorms", "Shared kitchen", "Nightly common-room hangs", "Walk-ins usually welcome"],
    cta: "Explore Backpackers",
    to: "/backpackers" as const,
    bg: "bg-blush/60",
    img: roomDorm,
  },
  {
    key: "two" as const,
    tab: "Tag Along 2.0",
    heading: "Designed for slow travel.",
    desc: "The quieter house — private rooms, small dorms, real desks and a kitchen shelf with your name taped on it.",
    bestFor: ["Slow travel", "Workations", "Longer stays", "Couples"],
    highlights: ["Private rooms & small dorms", "Work desks and quiet hours", "Weekly & monthly rates", "Seven minutes from the first house"],
    cta: "Explore Tag Along 2.0",
    to: "/tag-along-2" as const,
    bg: "bg-mint/60",
    img: roomPrivate,
  },
];

function StayPage() {
  const [tab, setTab] = useState(0);
  const p = PROPERTIES[tab];

  return (
    <div className="bg-paper text-ink font-body">
      <SiteNav />
      <PageHero
        kicker="Room 4 is free tonight"
        title="Stay a night."
        italic="Stay a season."
        intro="Nine beds and three private rooms in a house that grew slowly. Come for one thing, leave with another."
        bg="bg-blush/60"
      />

      {/* Choose your stay */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="01">Choose your stay</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-10">Two houses, one family.</h2>

        <div className="flex flex-wrap gap-3 mb-10">
          {PROPERTIES.map((item, i) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(i)}
              aria-pressed={tab === i}
              className={`px-6 py-3 rounded-full text-sm font-medium border transition-colors ${
                tab === i
                  ? "bg-ink text-paper border-ink"
                  : "bg-white border-ink/10 hover:border-terracotta hover:text-terracotta"
              }`}
            >
              {item.tab}
            </button>
          ))}
        </div>

        <div className={`${p.bg} rounded-lg p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center`}>
          <div>
            <h3 className="font-display text-4xl font-bold mb-4">{p.heading}</h3>
            <p className="text-ink/80 leading-relaxed mb-8">{p.desc}</p>

            <p className="text-[10px] uppercase tracking-widest text-ink/50 mb-2">Best for</p>
            <ul className="flex flex-wrap gap-2 mb-8">
              {p.bestFor.map((b) => (
                <li key={b} className="px-4 py-2 rounded-full bg-white/70 border border-ink/10 text-sm">
                  {b}
                </li>
              ))}
            </ul>

            <p className="text-[10px] uppercase tracking-widest text-ink/50 mb-2">Highlights</p>
            <ul className="space-y-2 text-ink/80 mb-10">
              {p.highlights.map((h) => (
                <li key={h}>— {h}</li>
              ))}
            </ul>

            <Link
              to={p.to}
              className="inline-block bg-ink text-paper px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-terracotta transition-colors"
            >
              {p.cta}
            </Link>
          </div>
          <img src={p.img} alt={p.tab} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-lg" />
        </div>
      </section>

      {/* Inside the rooms */}
      <section className="bg-mint/50 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel index="02" color="text-forest">Inside the rooms</SectionLabel>
            <h2 className="font-display text-5xl font-bold mb-6">The details we sweat.</h2>
            <ul className="space-y-4 text-ink/80 leading-relaxed">
              <li>— Cotton sheets, changed weekly, ironed by someone humming.</li>
              <li>— Reading lights that don't wake your bunkmate.</li>
              <li>— Blackout curtains for the traveller who slept badly on the train.</li>
              <li>— A small dish for keys, coins, a stone you picked up somewhere.</li>
              <li>— One good book per bed. Take it, leave one behind.</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={roomPrivate} alt="Private room" className="w-full aspect-[3/4] object-cover rounded-lg" loading="lazy" />
            <img src={roomDorm} alt="Dorm" className="w-full aspect-[3/4] object-cover rounded-lg mt-12" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Shared Spaces */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="03">Shared spaces</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Rooms with no doors.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SHARED.map((s, i) => (
            <div key={s.name} className={`p-6 border border-ink/10 rounded-lg ${i % 2 === 0 ? "bg-lavender/40" : "bg-butter/40"}`}>
              <h3 className="font-display text-2xl font-bold">{s.name}</h3>
              <p className="font-hand text-xl text-terracotta mt-1">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why longer */}
      <section className="bg-forest text-paper py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <span className="font-hand text-2xl text-butter block mb-2">Why stay longer</span>
            <h2 className="font-display text-5xl font-bold leading-tight">Two weeks and the place starts feeling like yours.</h2>
          </div>
          <div className="space-y-6 text-paper/80 leading-relaxed">
            <p>By day three you'll know the barista's dog. By week two you'll be the one showing new arrivals where to find the good momos.</p>
            <p>We keep a small desk free for people who work with their hands or their laptops. Come, plant something, cook a Wednesday dinner, teach us a song.</p>
          </div>
        </div>
      </section>

      {/* Weekly / Monthly */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="04">Weekly & monthly</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">The long game.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "The Week", price: "₹4,200", note: "7 nights in a bunk, laundry included." },
            { name: "The Fortnight", price: "₹7,800", note: "14 nights, a shelf in the pantry, a slower morning." },
            { name: "The Month", price: "₹14,000", note: "30 nights, a key of your own, one Sunday dinner on us." },
          ].map((p) => (
            <div key={p.name} className="border border-ink/15 rounded-lg p-8 bg-white">
              <p className="text-[10px] uppercase tracking-widest text-ink/50">{p.name}</p>
              <p className="font-display text-4xl font-bold my-3">{p.price}</p>
              <p className="text-sm text-ink/70">{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* A day at Tag Along */}
      <section className="bg-blush/50 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionLabel index="05" color="text-terracotta">A day at Tag Along</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-12">From kettle to kettle.</h2>
          <ul className="space-y-6">
            {DAY.map((d) => (
              <li key={d.time} className="flex gap-8 border-b border-ink/10 pb-6 last:border-0">
                <span className="font-display text-3xl font-bold text-terracotta w-24 shrink-0">{d.time}</span>
                <span className="text-lg text-ink/80 leading-relaxed pt-2">{d.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="06">Amenities</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Small comforts.</h2>
        <div className="flex flex-wrap gap-3">
          {AMENITIES.map((a) => (
            <span key={a} className="px-5 py-3 rounded-full bg-white border border-ink/10 text-sm font-medium">
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-butter/40 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="07" color="text-burnt">Guest reviews</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-12">Words we didn't write.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { by: "Anaïs, Lyon", text: "I forgot the WiFi password on purpose after day four." },
              { by: "Rohan, Mumbai", text: "The kind of quiet you can hear the kitchen from." },
              { by: "Mika, Kyoto", text: "Every corner had a story from a stranger who felt like an old friend." },
            ].map((r) => (
              <blockquote key={r.by} className="bg-white p-8 rounded-lg -rotate-1 last:rotate-1 shadow-sm">
                <p className="font-display italic text-xl leading-snug mb-6">"{r.text}"</p>
                <cite className="text-xs uppercase tracking-widest text-ink/50 not-italic">— {r.by}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <SectionLabel index="08">FAQ</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Small questions.</h2>
        <dl className="space-y-8">
          {FAQ.map((f) => (
            <div key={f.q} className="border-b border-ink/10 pb-6">
              <dt className="font-display text-2xl font-bold mb-2">{f.q}</dt>
              <dd className="text-ink/70 leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <SiteFooter />
    </div>
  );
}
