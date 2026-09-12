import { useState } from "react";
import { PageHero, SectionLabel, SiteFooter, SiteNav } from "@/components/site-chrome";

export type PropertyContent = {
  kicker: string;
  title: string;
  italic: string;
  intro: string;
  heroBg: string;
  accent: string;
  story: { label: string; heading: string; paragraphs: string[]; note: string };
  gallery: { src: string; alt: string }[];
  rooms: { name: string; tag: string; price: string; desc: string; color: string }[];
  shared: { name: string; note: string }[];
  amenities: string[];
  faq: { q: string; a: string }[];
  cta: { heading: string; body: string; button: string };
};

export function PropertyPage({ content }: { content: PropertyContent }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="bg-paper text-ink font-body">
      <SiteNav />
      <PageHero
        kicker={content.kicker}
        title={content.title}
        italic={content.italic}
        intro={content.intro}
        bg={content.heroBg}
        accent={content.accent}
      />

      {/* Story */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <SectionLabel index="01">{content.story.label}</SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-6">{content.story.heading}</h2>
          <div className="space-y-5 text-ink/80 leading-relaxed">
            {content.story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="bg-butter/60 p-8 rounded-lg rotate-1">
          <p className="font-hand text-3xl leading-snug">{content.story.note}</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-mint/40 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="02" color="text-forest">
            Gallery
          </SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-12">A look around.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.gallery.map((g, i) => (
              <button
                key={g.src + i}
                type="button"
                onClick={() => setLightbox(i)}
                className="overflow-hidden rounded-lg group"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] bg-ink/90 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
          role="presentation"
        >
          <figure className="max-w-4xl">
            <img
              src={content.gallery[lightbox].src}
              alt={content.gallery[lightbox].alt}
              className="max-h-[75vh] w-auto rounded-lg ring-8 ring-paper/10"
            />
            <figcaption className="font-hand text-2xl text-paper mt-4">
              {content.gallery[lightbox].alt}
            </figcaption>
          </figure>
        </div>
      )}

      {/* Rooms */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="03">Room options</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Ways to sleep.</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {content.rooms.map((r) => (
            <article key={r.name} className={`${r.color} p-6 rounded-lg flex flex-col`}>
              <span className="text-[10px] uppercase tracking-widest opacity-70 mb-1">{r.tag}</span>
              <h3 className="font-display text-2xl font-bold mb-2">{r.name}</h3>
              <p className="text-sm text-ink/80 leading-relaxed flex-1">{r.desc}</p>
              <p className="font-hand text-2xl text-terracotta mt-6">{r.price}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Shared spaces */}
      <section className="bg-lavender/40 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel index="04" color="text-forest">
            Shared spaces
          </SectionLabel>
          <h2 className="font-display text-5xl font-bold mb-12">Rooms with no doors.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.shared.map((s, i) => (
              <div
                key={s.name}
                className={`p-6 border border-ink/10 rounded-lg ${i % 2 === 0 ? "bg-white" : "bg-butter/40"}`}
              >
                <h3 className="font-display text-2xl font-bold">{s.name}</h3>
                <p className="font-hand text-xl text-terracotta mt-1">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <SectionLabel index="05">Amenities</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Small comforts.</h2>
        <div className="flex flex-wrap gap-3">
          {content.amenities.map((a) => (
            <span
              key={a}
              className="px-5 py-3 rounded-full bg-white border border-ink/10 text-sm font-medium"
            >
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 pb-24 px-6 max-w-3xl mx-auto">
        <SectionLabel index="06">FAQ</SectionLabel>
        <h2 className="font-display text-5xl font-bold mb-12">Small questions.</h2>
        <dl className="space-y-8">
          {content.faq.map((f) => (
            <div key={f.q} className="border-b border-ink/10 pb-6">
              <dt className="font-display text-2xl font-bold mb-2">{f.q}</dt>
              <dd className="text-ink/70 leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Book now */}
      <section className="bg-forest text-paper py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <h2 className="font-display text-5xl font-bold leading-tight">{content.cta.heading}</h2>
          <div>
            <p className="text-paper/80 leading-relaxed mb-8">{content.cta.body}</p>
            <a
              href="mailto:hello@tagalong.site"
              className="inline-block bg-butter text-ink px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-terracotta hover:text-paper transition-colors"
            >
              {content.cta.button}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
