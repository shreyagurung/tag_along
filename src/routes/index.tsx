import { createFileRoute, Link } from "@tanstack/react-router";
import heroWindow from "@/assets/hero-window.jpg";
import roomDorm from "@/assets/room-dorm.jpg";
import roomLounge from "@/assets/room-lounge.jpg";
import roomPrivate from "@/assets/room-private.jpg";
import postcardPolaroid from "@/assets/postcard-polaroid.jpg";
import { SiteFooter, SiteNav } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="bg-paper text-ink font-body selection:bg-terracotta/20">
      <SiteNav />


      {/* Hero */}
      <header className="relative pt-12 pb-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 z-10">
            <p className="font-hand text-2xl text-terracotta mb-4">Hello from Gangtok.</p>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.9] font-black max-w-4xl text-balance whitespace-pre-line mb-8">
              Find your corner in{"\n"}
              <span className="italic text-forest">Gangtok</span>
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-ink/70">
              Stay, meet, eat, work, explore. Tag Along is a place where
              travellers become part of Gangtok instead of simply visiting it.
            </p>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="tape-corner rotate-2 shadow-xl ring-8 ring-white overflow-hidden">
              <img
                src={heroWindow}
                alt="The morning view from Room 4, looking out over misty Sikkim hills"
                width={1080}
                height={1350}
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-12 size-48 bg-mustard rounded-full -z-10 opacity-30 blur-3xl" />
          </div>
        </div>
      </header>

      {/* Ticker */}
      <div className="bg-forest py-4 overflow-hidden border-y border-ink/10">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-paper uppercase tracking-[0.3em] font-medium text-xs">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              <span>Chai brewing at 4pm</span>
              <span>•</span>
              <span>Art residency open for August</span>
              <span>•</span>
              <span>Guided hike to Tsomgo Lake Friday</span>
              <span>•</span>
              <span>Film night in the attic tonight</span>
              <span>•</span>
              <span>Sourdough out of the oven at 8am</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* The House */}
      <section id="house" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={roomDorm}
                  alt="Warm hostel dormitory with wooden bunks and colourful woven blankets"
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
                <img
                  src={roomLounge}
                  alt="Shared lounge with bookshelves, warm armchairs and local art"
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4 pt-12">
                <img
                  src={roomPrivate}
                  alt="Private room with a small balcony over the misty Himalayas"
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
                <div className="bg-mustard/90 text-ink p-5 rounded-lg rotate-[-2deg]">
                  <p className="font-hand text-2xl leading-tight">
                    "Mornings smell like cardamom and rain."
                  </p>
                  <p className="text-[10px] uppercase tracking-widest mt-3 opacity-70">
                    — House note, No. 41
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="uppercase tracking-widest text-xs font-bold text-teal block mb-2">
              01 / The House
            </span>
            <h2 className="font-display text-5xl mb-6 font-bold">
              <Link to="/stay" className="hover:text-terracotta transition-colors">
                Built with <span className="italic text-terracotta">soul</span>.
              </Link>
            </h2>
            <div className="space-y-6 text-ink/80 leading-relaxed">
              <p>
                A place that has grown over time. Books left behind by guests,
                plants that arrived as gifts, and conversations that stretch into
                rainy afternoons.
              </p>
              <p>
                The details here are made by hand, not ordered in bulk. Nothing is
                perfect. Everything is warm. And the light still hits just right
                in the afternoons.
              </p>
              <div className="flex gap-8 border-t border-ink/10 pt-8">
                <div>
                  <p className="font-display text-3xl text-terracotta font-bold">24</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">
                    Beds
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl text-terracotta font-bold">04</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">
                    Private Rooms
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl text-terracotta font-bold">∞</p>
                  <p className="text-[10px] uppercase tracking-widest opacity-60">
                    Stories Shared
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Café / Journal Mix */}
      <section id="cafe" className="bg-peach/40 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Postcard */}
            <div className="flex-1 bg-white p-8 shadow-sm -rotate-1 relative">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-hand text-3xl mb-1">Postcard from Leo</h3>
                  <p className="text-xs uppercase opacity-40 tracking-widest">
                    Berlin → Gangtok, June
                  </p>
                </div>
                <div className="size-14 border-2 border-dashed border-ink/20 rounded-full flex items-center justify-center text-[9px] rotate-12 font-bold uppercase tracking-widest text-ink/50">
                  Stamp
                </div>
              </div>
              <p className="font-display italic text-xl leading-relaxed mb-8 text-ink/90">
                "I came for two nights and stayed for two weeks. There's a
                specific kind of magic in the morning fog here, mixed with the
                smell of fresh parathas from the kitchen."
              </p>
              <img
                src={postcardPolaroid}
                alt="Polaroid of two travellers laughing over coffee"
                loading="lazy"
                width={600}
                height={600}
                className="w-36 aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute -top-3 right-10 w-20 h-6 bg-teal/50 rotate-6" />
            </div>

            {/* Specials */}
            <div className="flex-1">
              <span className="font-hand text-2xl text-terracotta">
                Today, from the kitchen
              </span>
              <h3 className="font-display text-4xl mb-8 font-bold mt-2">
                Pull up a chair.
              </h3>
              <p className="text-ink/70 leading-relaxed mb-8 max-w-md">
                The café is a shared space where travellers and locals meet over
                food, coffee and conversation. Come to read, work, sketch, spend
                hours, or simply sit with strangers who slowly become friends.
              </p>
              <div className="space-y-8">
                <MenuItem
                  name="Gorkhey Breakfast"
                  note="Hearty"
                  underline="border-mustard"
                  desc="A full plate of mountain comfort to start a slow morning."
                />
                <MenuItem
                  name="Shakshouka"
                  note="Warm"
                  underline="border-terracotta"
                  desc="Eggs poached in spiced tomato sauce, served with warm bread."
                />
                <MenuItem
                  name="Mocha Walnut Brownie"
                  note="Sweet"
                  underline="border-burnt"
                  desc="Rich, nutty, and best eaten with a second cup of coffee."
                />
                <MenuItem
                  name="Rhododendron Cold Brew"
                  note="Cold"
                  underline="border-lavender"
                  desc="Slow-brewed coffee with a bright floral finish."
                />
              </div>
              <button className="mt-12 bg-ink text-paper px-8 py-3 rounded-full hover:bg-forest transition-colors text-sm font-bold uppercase tracking-widest">
                Visit the Café
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Board */}
      <section id="board" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-hand text-2xl text-teal block mb-2">
            Pinned to the wall
          </span>
          <h2 className="font-display text-5xl font-bold mb-4">
            The Community Board
          </h2>
          <p className="text-ink/60 max-w-md mx-auto">
            Every week looks a little different. Here's what's happening around
            Tag Along.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <EventCard
            when="Tue / 19:00"
            title="Trivia Night"
            desc="Teams form quickly. Facts are questionable. Prizes are real."
            className="bg-mustard text-ink"
          />
          <EventCard
            when="Wed / 20:30"
            title="Movie Night"
            desc="Curated screenings in the attic lounge. Popcorn on us."
            className="bg-forest text-paper"
          />
          <EventCard
            when="Fri / 20:00"
            title="Karaoke Night"
            desc="No experience required. Enthusiasm is the only entry fee."
            className="bg-terracotta text-paper"
          />
          <EventCard
            when="Sat / 19:30"
            title="Live Music Sessions"
            desc="Local musicians, travelling artists, and the occasional surprise."
            className="bg-teal text-paper"
          />
        </div>
      </section>

      {/* Find us */}
      <section className="bg-forest text-paper py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-hand text-2xl text-mustard block mb-4">
              Find us on the map
            </span>
            <h2 className="font-display text-5xl font-bold mb-6 leading-tight">
              A short walk from the monastery bells.
            </h2>
            <p className="text-paper/80 leading-relaxed mb-8 max-w-md">
              Just below the High Court and a short walk from MG Marg, Tag Along
              sits in one of Gangtok's quieter neighbourhoods. Close enough to walk
              everywhere. Far enough to slow down.
            </p>
            <address className="not-italic text-sm leading-relaxed text-paper/70">
              12 Development Area Road,<br />
              Below the High Court,<br />
              Gangtok, Sikkim 737101
            </address>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-peach/10 border border-paper/10 p-6 relative overflow-hidden">
              <svg viewBox="0 0 400 500" className="w-full h-full">
                <defs>
                  <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.8" fill="rgba(253,250,243,0.15)" />
                  </pattern>
                </defs>
                <rect width="400" height="500" fill="url(#dots)" />
                {/* Rivers */}
                <path d="M20 380 Q 120 300 200 340 T 380 260" stroke="#4a7c7a" strokeWidth="3" fill="none" opacity="0.7" />
                <path d="M40 100 Q 140 180 220 140 T 380 200" stroke="#e5a93e" strokeWidth="2" strokeDasharray="6 6" fill="none" opacity="0.6" />
                {/* Contour rings */}
                <ellipse cx="200" cy="260" rx="160" ry="120" fill="none" stroke="#f9dcc4" strokeWidth="1" opacity="0.3" />
                <ellipse cx="200" cy="260" rx="110" ry="80" fill="none" stroke="#f9dcc4" strokeWidth="1" opacity="0.4" />
                <ellipse cx="200" cy="260" rx="60" ry="40" fill="none" stroke="#f9dcc4" strokeWidth="1" opacity="0.5" />
                {/* Pin */}
                <circle cx="200" cy="260" r="10" fill="#c45b41" />
                <circle cx="200" cy="260" r="20" fill="none" stroke="#c45b41" strokeWidth="1.5" />
                <text x="220" y="266" fill="#fdfaf3" fontFamily="Fraunces" fontSize="16" fontStyle="italic">
                  Tag Along
                </text>
                {/* Landmarks */}
                <text x="60" y="90" fill="#fdfaf3" fontSize="10" opacity="0.6" fontFamily="Outfit" letterSpacing="2">
                  ↑ KANCHENJUNGA
                </text>
                <text x="270" y="440" fill="#fdfaf3" fontSize="10" opacity="0.6" fontFamily="Outfit" letterSpacing="2">
                  M.G. MARG ↘
                </text>
                <text x="30" y="470" fill="#fdfaf3" fontSize="10" opacity="0.6" fontFamily="Outfit" letterSpacing="2">
                  RUMTEK →
                </text>
              </svg>
              <div className="absolute top-4 right-4 font-hand text-mustard text-xl rotate-6">
                you are here ↘
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}


function MenuItem({
  name,
  note,
  underline,
  desc,
}: {
  name: string;
  note: string;
  underline: string;
  desc: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-end mb-2 gap-4">
        <h4 className={`text-xl font-bold border-b-2 ${underline} pb-1`}>{name}</h4>
        <span className="font-hand text-xl text-terracotta italic shrink-0">
          {note}
        </span>
      </div>
      <p className="text-sm text-ink/60">{desc}</p>
    </div>
  );
}

function EventCard({
  when,
  title,
  desc,
  className,
}: {
  when: string;
  title: string;
  desc: string;
  className: string;
}) {
  return (
    <article
      className={`p-6 hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between gap-8 min-h-40 sm:aspect-square sm:gap-0 ${className}`}
    >
      <span className="text-xs font-bold uppercase tracking-widest">{when}</span>
      <div>
        <h4 className="font-display text-2xl font-black leading-tight mb-2">
          {title}
        </h4>
        <p className="text-sm leading-tight opacity-80">{desc}</p>
      </div>
    </article>
  );
}

