import { createFileRoute } from "@tanstack/react-router";
import { PropertyPage, type PropertyContent } from "@/components/property-page";
import roomPrivate from "@/assets/room-private.jpg";
import roomLounge from "@/assets/room-lounge.jpg";
import roomDorm from "@/assets/room-dorm.jpg";
import heroWindow from "@/assets/hero-window.jpg";
import galleryFood from "@/assets/gallery-food.jpg";
import galleryExperiences from "@/assets/gallery-experiences.jpg";

export const Route = createFileRoute("/tag-along-2")({
  head: () => ({
    meta: [
      { title: "Tag Along 2.0 — Slow Travel & Workation Stays in Gangtok" },
      {
        name: "description",
        content:
          "A quieter Tag Along house built for slow travel, workations and long stays: private rooms, small dorms, desks and unhurried mornings in Gangtok.",
      },
      { property: "og:title", content: "Tag Along 2.0" },
      {
        property: "og:description",
        content: "Private rooms, small dorms and desks — built for slow travel and longer stays.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <PropertyPage content={CONTENT} />,
});

const CONTENT: PropertyContent = {
  kicker: "The second house",
  title: "Tag Along",
  italic: "2.0",
  intro:
    "The slower house. Private rooms, small dorms, real desks and mornings that don't ask anything of you until the second coffee.",
  heroBg: "bg-mint/60",
  accent: "text-forest",
  story: {
    label: "The story",
    heading: "Built for staying longer.",
    paragraphs: [
      "We opened the second house because people kept extending. A month became normal, and a bunk stopped being enough.",
      "So this one has thicker walls, better light for working, a laundry rhythm, and a kitchen shelf with your name taped on it.",
      "Still Tag Along — shared dinners, film nights, neighbours dropping by — just with a door you can close when the call starts.",
    ],
    note: "\"By week two you're the one showing people where the good momos are.\"",
  },
  gallery: [
    { src: roomPrivate, alt: "The balcony room, looking over the valley" },
    { src: heroWindow, alt: "Desk by the window on a foggy morning" },
    { src: roomLounge, alt: "The quiet lounge and reading corner" },
    { src: galleryFood, alt: "Slow breakfast in the café downstairs" },
    { src: galleryExperiences, alt: "Pine trail behind the house" },
    { src: roomDorm, alt: "The four-bed slow dorm" },
  ],
  rooms: [
    {
      name: "The Balcony Room",
      tag: "En-suite",
      price: "₹2,400 / night",
      desc: "Our loveliest corner — a private balcony over the valley, a writing desk and cotton sheets.",
      color: "bg-mint",
    },
    {
      name: "The Studio Room",
      tag: "Private · desk",
      price: "₹2,100 / night",
      desc: "A proper desk, a good chair, fast Wi-Fi and a window that makes the workday forgivable.",
      color: "bg-lavender",
    },
    {
      name: "The Slow Dorm",
      tag: "4 beds",
      price: "₹950 / night",
      desc: "Quiet-hours dorm for long-stayers: bigger lockers, a shelf each and blackout curtains.",
      color: "bg-butter",
    },
  ],
  shared: [
    { name: "The Work Room", note: "Quiet until 5pm." },
    { name: "Reading Attic", note: "A small library above the stairs." },
    { name: "The Kitchen", note: "A shelf with your name on it." },
    { name: "Laundry Court", note: "Tuesdays and Fridays." },
    { name: "Studio Corner", note: "Paints, film cameras and a mending kit." },
    { name: "Sun Terrace", note: "Best after the rain." },
  ],
  amenities: [
    "Fast Wi-Fi",
    "Work desks",
    "Weekly laundry",
    "Hot showers",
    "Kitchen shelf",
    "Monthly rates",
    "Book library",
    "Bike loans",
    "Storage",
    "Airport pickup",
  ],
  faq: [
    { q: "Can I stay a month?", a: "That's what this house is for. Ask about weekly and monthly rates — longer stays come with a key of your own." },
    { q: "Is it good for working?", a: "Yes. Desks, quiet hours until 5pm, backup power and a café downstairs when the room gets small." },
    { q: "Is it far from Backpackers?", a: "A seven-minute walk. Dinners and film nights are shared between both houses." },
    { q: "Do you allow pets?", a: "We have a house cat. Small dogs are welcome by prior arrangement." },
  ],
  cta: {
    heading: "Stay a season.",
    body: "Tell us roughly how long you're thinking and we'll suggest the room that fits. Weekly and monthly rates on request.",
    button: "Book a room",
  },
};
