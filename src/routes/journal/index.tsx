import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, SectionLabel, SiteFooter, SiteNav } from "@/components/site-chrome";
import { fetchCmsPage, type CmsEntry } from "@/lib/cms";
import { useCmsImage } from "@/lib/cms-images";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — Field notes from Tag Along" },
      { name: "description", content: "Photo essays, field notes and guest diaries from the Tag Along house in Gangtok." },
      { property: "og:title", content: "The Tag Along Journal" },
      { property: "og:description", content: "Photo essays, field notes and guest diaries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalPage,
});

type FeaturedItem = { kicker: string; title: string; excerpt: string; link?: string };
type NoteItem = { date: string; title: string; by: string; read: string };
type PhotoItem = { title: string; by: string; img?: string };
type VoiceItem = { title: string; by: string };

type Row<T> = { slug: string | null; image_url?: string | null; data: T };

function toRows<T>(entries: CmsEntry<T>[] | undefined): Row<T>[] {
  return (entries ?? []).map((r) => ({
    slug: r.slug ?? null,
    image_url: r.image_url ?? null,
    data: r.data,
  }));
}

function FeaturedImage({ image, alt }: { image?: string | null; alt: string }) {
  const src = useCmsImage(image);
  return <img src={src} alt={alt} className="w-full aspect-[4/5] object-cover" />;
}

function EssayCard({ row, offset }: { row: Row<PhotoItem>; offset: boolean }) {
  const src = useCmsImage(row.image_url ?? row.data.img);
  const inner = (
    <>
      <img
        src={src}
        alt={row.data.title}
        className="w-full aspect-[3/4] object-cover rounded-lg mb-4"
        loading="lazy"
      />
      <h3 className="font-display text-2xl font-bold">{row.data.title}</h3>
      <p className="text-xs uppercase tracking-widest text-ink/50 mt-1">
        photographs by {row.data.by}
      </p>
    </>
  );
  return (
    <article className={offset ? "mt-12" : ""}>
      {row.slug ? (
        <Link to="/journal/$slug" params={{ slug: row.slug }} className="block group">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </article>
  );
}

function JournalPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["cms", "journal"],
    queryFn: () => fetchCmsPage("journal"),
  });

  const featuredRow = toRows(data?.featured as CmsEntry<FeaturedItem>[] | undefined)[0];
  const featured = featuredRow?.data;
  const notes = toRows(data?.notes as CmsEntry<NoteItem>[] | undefined);
  const photos = toRows(data?.photo_essays as CmsEntry<PhotoItem>[] | undefined);
  const voices = toRows(data?.local_voices as CmsEntry<VoiceItem>[] | undefined);

  return (
    <div className="bg-paper text-ink font-body">
      <SiteNav />
      <PageHero
        kicker="Since the beginning"
        title="Notes from"
        italic="the house."
        intro="Small pieces of writing, occasional photographs and a few things overheard at the kitchen table."
        bg="bg-lavender/50"
        accent="text-forest"
      />

      {/* Featured story */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="01">Featured story</SectionLabel>
        {featured && (
          <article className="grid md:grid-cols-2 gap-12 items-center">
            <div className="tape-corner rotate-1 shadow-xl ring-8 ring-white overflow-hidden">
              <FeaturedImage image={featuredRow?.image_url} alt={featured.title} />
            </div>
            <div>
              <p className="font-hand text-2xl text-terracotta mb-3">{featured.kicker}</p>
              <h2 className="font-display text-5xl font-bold leading-tight mb-6">{featured.title}</h2>
              <p className="text-ink/70 leading-relaxed mb-6">{featured.excerpt}</p>
              {featuredRow?.slug ? (
                <Link
                  to="/journal/$slug"
                  params={{ slug: featuredRow.slug }}
                  className="text-terracotta font-bold uppercase tracking-widest text-xs"
                >
                  Read the piece ↗
                </Link>
              ) : (
                <a href={featured.link ?? "#"} className="text-terracotta font-bold uppercase tracking-widest text-xs">
                  Read the piece ↗
                </a>
              )}
            </div>
          </article>
        )}
      </section>

      {/* Field notes */}
      <section className="bg-mint/40 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionLabel index="02" color="text-forest">Field notes</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-12">Short entries.</h2>
          {isLoading ? (
            <p className="text-ink/50 font-hand text-xl">loading notes...</p>
          ) : (
            <ul className="space-y-8">
              {notes.map((n) => (
                <li key={n.data.title} className="flex gap-8 border-b border-ink/10 pb-8">
                  <span className="font-display text-2xl font-bold text-terracotta w-20 shrink-0">{n.data.date}</span>
                  <div>
                    {n.slug ? (
                      <Link to="/journal/$slug" params={{ slug: n.slug }}>
                        <h3 className="font-display text-2xl font-bold hover:text-terracotta transition-colors cursor-pointer">{n.data.title}</h3>
                      </Link>
                    ) : (
                      <h3 className="font-display text-2xl font-bold">{n.data.title}</h3>
                    )}
                    <p className="text-xs uppercase tracking-widest text-ink/50 mt-2">by {n.data.by} · {n.data.read}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Photo essays */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="03">Photo essays</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Rooms of light.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {photos.map((p, i) => (
            <EssayCard key={p.data.title} row={p} offset={i === 1} />
          ))}
        </div>
      </section>

      {/* Local voices */}
      <section className="bg-blush/60 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="04" color="text-terracotta">Local voices</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-12">Not our story to tell.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {voices.map((v) =>
              v.slug ? (
                <Link
                  key={v.data.title}
                  to="/journal/$slug"
                  params={{ slug: v.slug }}
                  className="bg-white p-6 rounded-lg hover:text-terracotta transition-colors"
                >
                  <h3 className="font-display text-xl font-bold mb-2">{v.data.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-ink/50">by {v.data.by}</p>
                </Link>
              ) : (
                <article key={v.data.title} className="bg-white p-6 rounded-lg">
                  <h3 className="font-display text-xl font-bold mb-2">{v.data.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-ink/50">by {v.data.by}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Guest diaries */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <SectionLabel index="05">Guest diaries</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-6">Pages we didn't write.</h2>
          <p className="text-ink/70 leading-relaxed max-w-md">
            A slow, unedited archive of things guests have left in the guestbook, the kitchen or on the fridge.
          </p>
        </div>
        <div className="bg-butter/60 p-8 rounded-lg -rotate-1">
          <p className="font-hand text-3xl leading-tight mb-4">
            "Day 9. I've stopped counting. Made bread today. Terrible. Ate it anyway."
          </p>
          <p className="text-xs uppercase tracking-widest text-ink/50">— Guestbook, page 41</p>
        </div>
      </section>

      {/* Archive */}
      <section className="bg-forest text-paper py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="font-hand text-2xl text-butter block mb-2">Archive</span>
          <h2 className="font-display text-5xl font-bold mb-12">Everything, by year.</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019].map((y) => (
              <a key={y} href="#" className="p-6 rounded-lg border border-paper/20 text-center hover:bg-paper hover:text-ink transition-colors">
                <p className="font-display text-3xl font-bold">{y}</p>
                <p className="text-[10px] uppercase tracking-widest opacity-70 mt-1">Read the year</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

