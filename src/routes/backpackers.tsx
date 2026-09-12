import { createFileRoute } from "@tanstack/react-router";
import { PropertyPage, type PropertyContent } from "@/components/property-page";
import roomDorm from "@/assets/room-dorm.jpg";
import roomLounge from "@/assets/room-lounge.jpg";
import roomPrivate from "@/assets/room-private.jpg";
import heroWindow from "@/assets/hero-window.jpg";
import galleryCommunity from "@/assets/gallery-community.jpg";
import galleryEvents from "@/assets/gallery-events.jpg";

export const Route = createFileRoute("/backpackers")({
  head: () => ({
    meta: [
      { title: "Tag Along Backpackers — Social Hostel in Gangtok" },
      {
        name: "description",
        content:
          "The original Tag Along house: bunk rooms, shared kitchens and a common room that rarely empties. Built for backpackers and solo travellers in Gangtok.",
      },
      { property: "og:title", content: "Tag Along Backpackers" },
      {
        property: "og:description",
        content: "The original social hostel in Gangtok — bunks, long tables and easy company.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PropertyPage content={CONTENT} />,
});

const CONTENT: PropertyContent = {
  kicker: "The original house",
  title: "Tag Along",
  italic: "Backpackers",
  intro:
    "The first house. Bunks, long tables, a kettle that never really cools down and a common room where plans get made at midnight.",
  heroBg: "bg-blush/60",
  accent: "text-terracotta",
  story: {
    label: "The story",
    heading: "Where it all started.",
    paragraphs: [
      "Tag Along began as one rented house with six bunks, a borrowed guitar and a whiteboard for the day's plans. Most of it is still true.",
      "This is the social side of the family — easy to arrive alone, hard to stay alone. Doors stay open, dinners are shared, and the map on the wall keeps growing pins.",
      "Short stays, spontaneous plans, and the kind of company you didn't book in advance.",
    ],
    note: "\"Came for two nights. Left on a Thursday, three weeks later.\"",
  },
  gallery: [
    { src: roomDorm, alt: "Handmade wooden bunks with reading lights" },
    { src: galleryCommunity, alt: "Long-table dinner in the common room" },
    { src: roomLounge, alt: "The lounge, late afternoon" },
    { src: galleryEvents, alt: "Live music night in the common room" },
    { src: heroWindow, alt: "Morning fog from the window seat" },
    { src: roomPrivate, alt: "A small private room upstairs" },
  ],
  rooms: [
    {
      name: "The Bunk Room",
      tag: "6 beds",
      price: "₹700 / night",
      desc: "Handmade wooden bunks, private curtains, reading lights and a wardrobe each.",
      color: "bg-blush",
    },
    {
      name: "The Small Dorm",
      tag: "4 beds",
      price: "₹850 / night",
      desc: "A quieter room at the back for people who like an early night and an early walk.",
      color: "bg-mint",
    },
    {
      name: "The Twin Nook",
      tag: "2 people",
      price: "₹1,800 / night",
      desc: "Two low beds, a shared window seat and space for one more bag than you planned.",
      color: "bg-butter",
    },
  ],
  shared: [
    { name: "The Common Room", note: "Where the evenings happen." },
    { name: "The Kitchen", note: "Yours to use, at your own risk." },
    { name: "Sun Terrace", note: "Best in the late afternoon." },
    { name: "Boot Rack", note: "Wet socks welcome." },
    { name: "The Garden", note: "Tulsi, a wobbly bench, one confident cat." },
    { name: "Board Game Shelf", note: "Two pieces missing. Improvise." },
  ],
  amenities: [
    "Fast Wi-Fi",
    "Hot showers",
    "Laundry",
    "Storage lockers",
    "Book library",
    "Board games",
    "Bike loans",
    "Rain gear",
    "Airport pickup",
  ],
  faq: [
    { q: "Do you take walk-ins?", a: "Almost always. We keep a couple of bunks free for people who arrive without a plan." },
    { q: "Is there an age limit?", a: "No, but the house is loud and social by nature. If you want quiet, look at Tag Along 2.0." },
    { q: "Can I keep my bag after checkout?", a: "Yes — lockers and a luggage corner, free on your last day." },
    { q: "Is the café open to guests only?", a: "No. Half the joy is meeting the neighbourhood over a cup of coffee." },
  ],
  cta: {
    heading: "There's a bunk free tonight.",
    body: "Write to us with your dates and we'll hold a bed. No deposits, no forms, no upsells — just a note back from someone who lives here.",
    button: "Book a bed",
  },
};
