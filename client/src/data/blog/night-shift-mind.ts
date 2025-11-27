import type { BlogPost } from './types';
import nightShiftMindContent from './posts/night-shift-mind-late-evening-focus-creativity.md?raw';
import nightShiftMindContentDe from './posts/night-shift-mind-late-evening-focus-creativity-de.md?raw';

export const nightShiftMind: BlogPost = {
  title: "The Night Shift Mind: Why Late Evening Hours Unlock Deeper Focus and Creativity",
  titleDe: "Der Nachtschicht-Geist: Warum späte Abendstunden tiefere Konzentration und Kreativität freisetzen",
  slug: "night-shift-mind-late-evening-focus-creativity",
  description: "Discover why the late evening hours create optimal conditions for deep focus, creative thinking, and productivity. Explore the psychology of nighttime work and how darkness enhances concentration.",
  descriptionDe: "Entdecke, warum die späten Abendstunden optimale Bedingungen für tiefe Konzentration, kreatives Denken und Produktivität schaffen. Erforsche die Psychologie der Nachtarbeit und wie Dunkelheit die Konzentration verstärkt.",
  publishDate: "2025-11-27",
  author: "Joachim Gassmann",
  category: "focus",
  tags: ["focus music", "productivity", "creativity", "night work", "deep focus", "concentration"],
  tagsDe: ["Fokusmusik", "Produktivität", "Kreativität", "Nachtarbeit", "Tiefe Konzentration", "Konzentration"],
  readingTime: 7,
  heroImage: "/blog-night-shift-mind.webp",
  content: nightShiftMindContent,
  contentDe: nightShiftMindContentDe
};
