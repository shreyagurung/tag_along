import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, SectionLabel, SiteFooter, SiteNav } from "@/components/site-chrome";
import { fetchCmsPage, type CmsEntry } from "@/lib/cms";

export const Route = createFileRoute("/gather")({
  head: () => ({
    meta: [
      { title: "Gather — Events & Workshops at Tag Along" },
      { name: "description", content: "Open mics, workshops, movie nights and community dinners at Tag Along, Gangtok." },
      { property: "og:title", content: "Gather at Tag Along" },
      { property: "og:description", content: "Open mics, workshops and movie nights in the Eastern Himalayas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GatherPage,
});

type WeekItem = { day: string; title: string; note: string; color: string };
type UpcomingItem = { title: string; when: string; where: string };
type WorkshopItem = { name: string; by: string; price: string };
type MovieItem = { date: string; title: string };
type CalendarItem = { date: string; month: string; title: string; who: string };

function GatherPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["cms", "gather"],
    queryFn: () => fetchCmsPage("gather"),
  });

  const week = ((data?.week ?? []) as CmsEntry<WeekItem>[]).map((r) => r.data);
  const upcoming = ((data?.upcoming ?? []) as CmsEntry<UpcomingItem>[]).map((r) => r.data);
  const workshops = ((data?.workshops ?? []) as CmsEntry<WorkshopItem>[]).map((r) => r.data);
  const movies = ((data?.movies ?? []) as CmsEntry<MovieItem>[]).map((r) => r.data);
  const cal = ((data?.calendar ?? []) as CmsEntry<CalendarItem>[]).map((r) => r.data);

  return (
    <div className="bg-paper text-ink font-body">
      <SiteNav />
      <PageHero
        kicker="Pinned to the wall"
        title="Show up."
        italic="Or don't."
        intro="The best plans are the ones you didn't make. Here's what's happening in our corner of the Himalayas this month."
        bg="bg-lavender/50"
        accent="text-forest"
      />

      {/* This week */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="01">This week</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Seven small reasons.</h2>
        {isLoading ? (
          <p className="text-ink/50 font-hand text-xl">loading the week...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {week.map((d) => (
              <article key={d.day} className={`p-4 rounded-lg ${d.color} aspect-[3/4] flex flex-col justify-between`}>
                <span className="font-display text-2xl font-bold uppercase">{d.day}</span>
                <div>
                  <p className="font-display font-bold leading-tight">{d.title}</p>
                  <p className="text-xs opacity-80 mt-1">{d.note}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming */}
      <section className="bg-mint/40 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="02" color="text-forest">Upcoming gatherings</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-12">Save these dates, softly.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcoming.map((e) => (
              <article key={e.title} className="bg-white rounded-lg p-6 shadow-sm">
                <p className="font-hand text-terracotta text-2xl">{e.when}</p>
                <h3 className="font-display text-2xl font-bold my-2">{e.title}</h3>
                <p className="text-sm text-ink/60">{e.where}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <SectionLabel index="03">Workshops</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-6">Made with hands.</h2>
          <p className="text-ink/70 leading-relaxed max-w-md">
            Small classes led by people who actually make things. Twelve seats, three hours, and something imperfect to take home.
          </p>
        </div>
        <ul className="space-y-6">
          {workshops.map((w) => (
            <li key={w.name} className="border-b border-ink/10 pb-6 flex justify-between items-end gap-4">
              <div>
                <h4 className="font-display text-2xl font-bold">{w.name}</h4>
                <p className="text-sm text-ink/60">with {w.by}</p>
              </div>
              <span className="font-hand text-2xl text-terracotta">{w.price}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Open Mics */}
      <section className="bg-blush/60 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel index="04" color="text-terracotta">Open mics</SectionLabel>
          <h2 className="font-display text-6xl font-bold mb-6">Every Tuesday, 19:00.</h2>
          <p className="text-lg text-ink/70 leading-relaxed max-w-2xl mx-auto">
            The signup sheet is a real piece of paper. Songs, poems, a strange thing you wrote on the bus. No cover, no expectations — just a room that's paying attention.
          </p>
        </div>
      </section>

      {/* Movie Nights */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-ink text-paper p-10 rounded-lg aspect-video flex flex-col justify-between">
          <span className="font-hand text-3xl text-butter">Attic Cinema</span>
          <div>
            <p className="font-display text-4xl font-bold leading-tight">Fridays · 20:30</p>
            <p className="text-paper/70 mt-2">Popcorn on us. Cushions on the floor.</p>
          </div>
        </div>
        <div>
          <SectionLabel index="05">Movie nights</SectionLabel>
          <h2 className="font-display text-4xl font-bold mb-6">This month's reel.</h2>
          <ul className="space-y-2 text-lg">
            {movies.map((m) => (
              <li key={m.date}><b>{m.date} —</b> <i>{m.title}</i></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Community dinners */}
      <section className="bg-butter/40 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="06" color="text-burnt">Community dinners</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-4">One long table, three nights a week.</h2>
          <p className="max-w-xl text-ink/70 leading-relaxed">
            Wednesdays, Fridays, Sundays. Guests, neighbours, strangers who became friends by dessert. Book by 4pm.
          </p>
        </div>
      </section>

      {/* Monthly calendar */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <SectionLabel index="07">Monthly calendar</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">August at a glance.</h2>
        <ol className="space-y-4">
          {cal.map((c) => (
            <li key={c.date} className="flex gap-6 items-center border-b border-ink/10 pb-4">
              <div className="bg-terracotta text-paper size-16 rounded-lg flex flex-col items-center justify-center shrink-0">
                <span className="font-display text-2xl font-black leading-none">{c.date}</span>
                <span className="text-[10px] uppercase tracking-widest">{c.month}</span>
              </div>
              <div>
                <p className="font-display text-xl font-bold">{c.title}</p>
                <p className="text-sm text-ink/60">{c.who}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <SiteFooter />
    </div>
  );
}
