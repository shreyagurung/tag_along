import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero, SectionLabel, SiteFooter, SiteNav } from "@/components/site-chrome";
import { fetchCmsPage, type CmsEntry } from "@/lib/cms";
import { useCmsImage } from "@/lib/cms-images";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Tag Along, Gangtok" },
      {
        name: "description",
        content:
          "Photographs from both Tag Along houses, the Travel Café, our events, walks and the people who keep turning up. Gangtok, Sikkim.",
      },
      { property: "og:title", content: "Gallery — Tag Along" },
      {
        property: "og:description",
        content: "Rooms, food, walks and gatherings — a photo album of Tag Along in Gangtok.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

type CategoryItem = { name: string };
type PhotoItem = { caption: string; category: string; meta?: string };
type Photo = PhotoItem & { id: string; image_url?: string | null };

function GalleryCard({ photo, onOpen }: { photo: Photo; onOpen: () => void }) {
  const src = useCmsImage(photo.image_url);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="mb-4 block w-full text-left break-inside-avoid group"
    >
      <div className="overflow-hidden rounded-lg bg-white p-2 shadow-sm">
        <img
          src={src}
          alt={photo.caption}
          loading="lazy"
          className="w-full object-cover rounded-md transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="px-2 py-3">
          <p className="font-hand text-xl leading-tight">{photo.caption}</p>
          <p className="text-[10px] uppercase tracking-widest text-ink/50 mt-1">
            {photo.category}
            {photo.meta ? ` · ${photo.meta}` : ""}
          </p>
        </div>
      </div>
    </button>
  );
}

function Lightbox({
  photo,
  onPrev,
  onNext,
  onClose,
}: {
  photo: Photo;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const src = useCmsImage(photo.image_url);
  return (
    <div
      className="fixed inset-0 z-[60] bg-ink/90 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="presentation"
    >
      <figure className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={photo.caption}
          className="max-h-[55vh] sm:max-h-[70vh] w-auto max-w-full mx-auto rounded-lg ring-8 ring-paper/10"
        />
        <figcaption className="mt-4 text-center">
          <p className="font-hand text-2xl text-paper">{photo.caption}</p>
          <p className="text-[10px] uppercase tracking-widest text-paper/50 mt-1">
            {photo.category}
            {photo.meta ? ` · ${photo.meta}` : ""}
          </p>
        </figcaption>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={onPrev}
            className="border border-paper/20 text-paper px-5 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            className="border border-paper/20 text-paper px-5 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors"
          >
            Next
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-terracotta text-paper px-5 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-butter hover:text-ink transition-colors"
          >
            Close
          </button>
        </div>
      </figure>
    </div>
  );
}

function GalleryPage() {
  const [active, setActive] = useState<string>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["cms", "gallery"],
    queryFn: () => fetchCmsPage("gallery"),
  });

  const allPhotos: Photo[] = useMemo(
    () =>
      ((data?.photos ?? []) as CmsEntry<PhotoItem>[]).map((r) => ({
        id: r.id,
        image_url: r.image_url,
        ...r.data,
      })),
    [data],
  );

  const categories = useMemo(() => {
    const named = ((data?.categories ?? []) as CmsEntry<CategoryItem>[])
      .map((r) => r.data?.name)
      .filter(Boolean) as string[];
    const fromPhotos = allPhotos.map((p) => p.category).filter(Boolean);
    return ["All", ...Array.from(new Set([...named, ...fromPhotos]))];
  }, [data, allPhotos]);

  const photos = useMemo(
    () => (active === "All" ? allPhotos : allPhotos.filter((p) => p.category === active)),
    [active, allPhotos],
  );

  return (
    <div className="bg-paper text-ink font-body">
      <SiteNav />
      <PageHero
        kicker="Film, mostly"
        title="The album we"
        italic="never edited."
        intro="Photographs from both houses, the café counter, long walks and longer dinners. Taken by guests, neighbours and whoever had a camera."
        bg="bg-lavender/50"
        accent="text-forest"
      />

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <SectionLabel index="01">Browse</SectionLabel>
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setActive(c);
                setLightbox(null);
              }}
              className={`px-5 py-3 rounded-full text-sm font-medium border transition-colors ${
                active === c
                  ? "bg-ink text-paper border-ink"
                  : "bg-white border-ink/10 hover:border-terracotta hover:text-terracotta"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="font-hand text-2xl text-ink/50">developing the film...</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {photos.map((p, i) => (
              <GalleryCard key={p.id} photo={p} onOpen={() => setLightbox(i)} />
            ))}
          </div>
        )}

        {!isLoading && photos.length === 0 && (
          <p className="font-hand text-2xl text-terracotta">
            Nothing here yet — check back after the weekend.
          </p>
        )}
      </section>

      {lightbox !== null && photos[lightbox] && (
        <Lightbox
          photo={photos[lightbox]}
          onPrev={() => setLightbox((lightbox - 1 + photos.length) % photos.length)}
          onNext={() => setLightbox((lightbox + 1) % photos.length)}
          onClose={() => setLightbox(null)}
        />
      )}

      <SiteFooter />
    </div>
  );
}
