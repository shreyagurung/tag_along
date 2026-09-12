import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { fetchCmsEntryBySlug, type CmsEntry } from "@/lib/cms";
import { useCmsImage } from "@/lib/cms-images";

export const Route = createFileRoute("/journal/$slug")({
  head: ({ params }) => {
    const title = params.slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      meta: [
        { title: `${title} — Tag Along Journal` },
        {
          name: "description",
          content: `${title} — a field note from the Tag Along house in Gangtok, Sikkim.`,
        },
        { property: "og:title", content: `${title} — Tag Along Journal` },
        {
          property: "og:description",
          content: `${title} — a field note from the Tag Along house in Gangtok, Sikkim.`,
        },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArticlePage,
  errorComponent: ({ error }) => (
    <div className="bg-paper text-ink font-body min-h-screen">
      <SiteNav />
      <div className="max-w-3xl mx-auto px-6 py-32">
        <p className="font-hand text-3xl text-terracotta mb-4">Something went sideways.</p>
        <p className="text-ink/70" role="alert">{error.message}</p>
      </div>
      <SiteFooter />
    </div>
  ),
  notFoundComponent: () => (
    <div className="bg-paper text-ink font-body min-h-screen">
      <SiteNav />
      <div className="max-w-3xl mx-auto px-6 py-32">
        <p className="font-hand text-3xl text-terracotta mb-4">This page isn't in the book.</p>
        <Link to="/journal" className="text-xs uppercase tracking-widest font-bold">
          ← Back to the journal
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
});

type ArticleData = {
  title?: string;
  kicker?: string;
  excerpt?: string;
  by?: string;
  date?: string;
  read?: string;
  body?: string;
  img?: string;
};

function ArticlePage() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["cms", "journal", slug],
    queryFn: () => fetchCmsEntryBySlug<ArticleData>("journal", slug),
  });

  const entry = data as CmsEntry<ArticleData> | null | undefined;
  const d = entry?.data ?? {};
  const cover = useCmsImage(entry?.image_url ?? d.img);
  const paragraphs = (d.body ?? d.excerpt ?? "").split("\n").filter(Boolean);

  return (
    <div className="bg-paper text-ink font-body">
      <SiteNav />

      <article className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/journal"
            className="text-[11px] uppercase tracking-widest text-ink/50 hover:text-terracotta transition-colors"
          >
            ← The journal
          </Link>

          {isLoading ? (
            <p className="font-hand text-2xl text-ink/50 mt-12">turning the page...</p>
          ) : !entry ? (
            <div className="mt-12">
              <p className="font-hand text-3xl text-terracotta mb-4">
                We couldn't find that page.
              </p>
              <p className="text-ink/70">It may have been unpublished, or the link mistyped.</p>
            </div>
          ) : (
            <>
              <p className="font-hand text-2xl text-terracotta mt-8 mb-3">
                {d.kicker ?? "From the house"}
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold leading-[0.95] mb-6">
                {d.title ?? entry.seo_title ?? slug}
              </h1>
              <p className="text-[11px] uppercase tracking-widest text-ink/50 mb-10">
                {[d.by ? `by ${d.by}` : null, d.date, d.read].filter(Boolean).join(" · ")}
              </p>

              <div className="tape-corner rotate-1 shadow-xl ring-8 ring-white overflow-hidden mb-12">
                <img
                  src={cover}
                  alt={d.title ?? "Journal cover"}
                  className="w-full aspect-[16/10] object-cover"
                />
              </div>

              {d.excerpt && (
                <p className="font-display text-2xl leading-snug text-ink/80 mb-8">{d.excerpt}</p>
              )}

              <div className="space-y-6">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-ink/75 leading-relaxed text-lg">
                    {p}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      </article>

      <section className="bg-mint/40 py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <p className="font-hand text-3xl">More from the kitchen table.</p>
          <Link
            to="/journal"
            className="bg-ink text-paper px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-terracotta transition-colors"
          >
            Read the journal
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
