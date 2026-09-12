import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionLabel, SiteFooter, SiteNav } from "@/components/site-chrome";

export const Route = createFileRoute("/cafe")({
  head: () => ({
    meta: [
      { title: "Café — Tag Along, Gangtok" },
      { name: "description", content: "Slow food, Temi tea and quiet mornings at the Tag Along café in Gangtok, Sikkim." },
      { property: "og:title", content: "The Café at Tag Along" },
      { property: "og:description", content: "Slow food, Temi tea and quiet mornings in Gangtok." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CafePage,
});

const MENU = [
  { section: "Mornings", color: "border-butter", items: [
    { name: "Gorkhey Breakfast", price: "₹250", desc: "Buckwheat crepes, sel roti, alu dum, churpi, achar, salad & chutney." },
    { name: "Shakshouka", price: "₹290", desc: "Eggs in a tangy tomato sauce, served with pita, hummus & salad." },
    { name: "Buckwheat Crepes", price: "₹270 / ₹300", desc: "Creamy spinach & corn, or chicken filling in local buckwheat crepes." },
  ]},
  { section: "Slow plates", color: "border-terracotta", items: [
    { name: "Chicken Schnitzel", price: "₹420", desc: "Golden crumbed chicken served with mashed potatoes and salad." },
    { name: "Mushroom Truffle Spaghetti", price: "₹380", desc: "Creamy spaghetti with mushrooms, truffle and parmesan." },
    { name: "Chicken Keema Hummus", price: "₹320", desc: "Spiced chicken keema, hummus, pita bread and fresh salad." },
  ]},
  { section: "Sweet", color: "border-coral", items: [
    { name: "Mocha Walnut Brownie", price: "₹170", desc: "Fudgy brownie filled with goodness and sweetness." },
    { name: "New York Cheesecake", price: "₹170", desc: "Timeless signature cheesecake." },
    { name: "Orange Almond Cake", price: "₹140", desc: "Made with fresh oranges, part of our menu since 2018." },
  ]},
  { section: "Drinks", color: "border-forest", items: [
    { name: "Hazelnut Latte", price: "₹220", desc: "Espresso, steamed milk and roasted hazelnut." },
    { name: "Rhododendron Cold Brew", price: "₹220", desc: "Our mountain-inspired cold brew." },
    { name: "Ginger Honey Lemon Tea", price: "₹160", desc: "Fresh ginger, honey and lemon, brewed to order." },
  ]},
];

function CafePage() {
  return (
    <div className="bg-paper text-ink font-body">
      <SiteNav />
      <PageHero
        kicker="Kitchen's open"
        title="Slow food for"
        italic="fast minds."
        intro="A café that also happens to be our living room. Come for the sourdough, stay for the second cup."
        bg="bg-butter/50"
        accent="text-burnt"
      />

      {/* Our Café */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel index="01" color="text-burnt">Our café</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-6">More than a café.</h2>
          <div className="space-y-4 text-ink/80 leading-relaxed">
            <p>Travellers, locals, shared tables. Conversations that usually last longer than the coffee.</p>
            <p>Comfort food, made from scratch. Freshly baked, thoughtfully prepared, and served with the kind of warmth that makes you stay a little longer.</p>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] bg-blush rounded-lg -rotate-2 shadow-sm flex items-center justify-center">
            <p className="font-hand text-4xl text-terracotta text-center px-8">Come hungry, leave slowly.</p>
          </div>
          <div className="absolute -bottom-4 right-2 sm:-bottom-6 sm:-right-6 size-20 sm:size-24 bg-mustard rounded-full rotate-6 flex items-center justify-center font-display italic text-sm text-ink">
            open daily
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="bg-mint/40 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionLabel index="02" color="text-forest">Menu</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-12">Today, ish.</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {MENU.map((s) => (
              <div key={s.section}>
                <h3 className="font-hand text-3xl text-terracotta mb-6">{s.section}</h3>
                <ul className="space-y-6">
                  {s.items.map((i) => (
                    <li key={i.name}>
                      <div className={`flex justify-between items-end gap-4 border-b-2 ${s.color} pb-1`}>
                        <h4 className="font-display text-lg font-bold">{i.name}</h4>
                        <span className="font-display text-lg">{i.price}</span>
                      </div>
                      <p className="text-sm text-ink/60 mt-2">{i.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signatures */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="03">Signature food & drinks</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">What we're known for.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Rhododendron Cold Brew", color: "bg-terracotta text-paper", note: "Mountain-inspired, smooth and refreshingly different." },
            { name: "Mocha Walnut Brownie", color: "bg-blush", note: "Everyone's favourite, baked fresh every day." },
            { name: "Gorkhey Breakfast", color: "bg-forest text-paper", note: "A true taste of the Eastern Himalayas." },
          ].map((c) => (
            <div key={c.name} className={`p-8 rounded-lg ${c.color} aspect-square flex flex-col justify-between`}>
              <span className="text-xs uppercase tracking-widest opacity-70">Signature</span>
              <div>
                <h3 className="font-display text-3xl font-bold leading-tight">{c.name}</h3>
                <p className="mt-3 text-sm opacity-90">{c.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Dinners */}
      <section className="bg-lavender/50 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel index="04" color="text-forest">COMMUNITY</SectionLabel>
            <h2 className="font-display text-5xl font-bold mb-6">Pull up a chair.</h2>
            <p className="text-ink/80 leading-relaxed max-w-md">Coffee, conversations and the occasional game night.<br />Come as you are. Leave with a few new stories.</p>
          </div>
          <div className="bg-white p-8 rounded-lg -rotate-1 shadow-sm">
            <p className="font-hand text-3xl mb-2">This week's table</p>
            <ul className="space-y-3 text-sm text-ink/80">
              <li><b>Wed —</b> {"\u00a0"}Films & conversations..</li>
              <li><b>Fri —</b> Karaoke Night</li>
              <li><b>Sat —</b> {"\u00a0"}Live Music, try our cocktails</li>
            </ul>
            <p className="text-[10px] uppercase tracking-widest text-ink/50 mt-6">· GUESTS & NEIGHBOURS WELCOME</p>
          </div>
        </div>
      </section>

      {/* Live sessions */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="05">Live sessions</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Tag Along Sessions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { when: "Thu / 20:00", who: "Chöling brothers", what: "Sikkimese folk" },
            { when: "Sat / 19:30", who: "Marlow Trio", what: "Slow jazz" },
            { when: "Sun / 17:00", who: "Open mic", what: "Bring anything" },
            { when: "Mon / 19:00", who: "Vinyl night", what: "You choose Side B" },
          ].map((s) => (
            <div key={s.who} className="p-6 bg-butter/60 rounded-lg min-h-36 sm:aspect-square flex flex-col justify-between gap-6">
              <span className="text-[10px] uppercase tracking-widest text-ink/60">{s.when}</span>
              <div>
                <p className="font-display text-xl font-bold">{s.who}</p>
                <p className="font-hand text-xl text-terracotta">{s.what}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hours */}
      <section className="bg-forest text-paper py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <span className="font-hand text-2xl text-butter block mb-2">Opening hours</span>
            <h2 className="font-display text-4xl font-bold leading-tight">Come by.</h2>
          </div>
          <ul className="md:col-span-2 grid grid-cols-2 gap-y-4 text-lg">
            <li>Tue – Sun</li><li>10:30 – 22:00</li>
            <li>Saturday</li><li>10:30 – 23:00</li>
            <li>Sunday</li><li>10:30 – 22:00</li>
            <li className="text-paper/60">Kitchen last order</li><li className="text-paper/60">21:00</li>
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
