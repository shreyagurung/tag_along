import { useEffect, useState } from "react";
import { resolveCmsImage } from "@/lib/cms";
import heroWindow from "@/assets/hero-window.jpg";
import postcardPolaroid from "@/assets/postcard-polaroid.jpg";
import roomDorm from "@/assets/room-dorm.jpg";
import roomLounge from "@/assets/room-lounge.jpg";
import roomPrivate from "@/assets/room-private.jpg";
import galleryFood from "@/assets/gallery-food.jpg";
import galleryEvents from "@/assets/gallery-events.jpg";
import galleryCommunity from "@/assets/gallery-community.jpg";
import galleryExperiences from "@/assets/gallery-experiences.jpg";

/** Bundled starter images, referenced from the CMS by key. */
export const ASSET_MAP: Record<string, string> = {
  "hero-window": heroWindow,
  "postcard-polaroid": postcardPolaroid,
  "room-dorm": roomDorm,
  "room-lounge": roomLounge,
  "room-private": roomPrivate,
  "gallery-food": galleryFood,
  "gallery-events": galleryEvents,
  "gallery-community": galleryCommunity,
  "gallery-experiences": galleryExperiences,
};

export const FALLBACK_IMAGE = heroWindow;

/**
 * Resolves a CMS image reference: bundled asset key, absolute URL, or a
 * storage path (signed on demand).
 */
export function useCmsImage(ref?: string | null) {
  const bundled = ref ? ASSET_MAP[ref] : undefined;
  const [src, setSrc] = useState<string>(bundled ?? FALLBACK_IMAGE);

  useEffect(() => {
    let alive = true;
    if (!ref) {
      setSrc(FALLBACK_IMAGE);
      return;
    }
    if (ASSET_MAP[ref]) {
      setSrc(ASSET_MAP[ref]);
      return;
    }
    resolveCmsImage(ref)
      .then((url) => {
        if (alive) setSrc(url ?? FALLBACK_IMAGE);
      })
      .catch(() => {
        if (alive) setSrc(FALLBACK_IMAGE);
      });
    return () => {
      alive = false;
    };
  }, [ref]);

  return src;
}
