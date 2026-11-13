import type { StaticImageData } from "next/image";

import avatar1 from "@/app/_assets/images/avatar-1.jpg";
import avatar2 from "@/app/_assets/images/avatar-2.jpg";
import avatar3 from "@/app/_assets/images/avatar-3.jpg";
import avatar4 from "@/app/_assets/images/avatar-4.jpg";
import peopleBooks from "@/app/_assets/images/people-books.jpg";
import peopleCoffee from "@/app/_assets/images/people-coffee.jpg";
import peopleDesk from "@/app/_assets/images/people-desk.jpg";
import peopleGraduate from "@/app/_assets/images/people-graduate.jpg";
import peopleGroupLaptop from "@/app/_assets/images/people-group-laptop.jpg";
import peopleMusic from "@/app/_assets/images/people-music.jpg";
import peopleNotes from "@/app/_assets/images/people-notes.jpg";
import peopleRaisingHand from "@/app/_assets/images/people-raising-hand.jpg";
import peopleReading from "@/app/_assets/images/people-reading.jpg";
import peopleVideoCall from "@/app/_assets/images/people-video-call.jpg";

export type LinkItem = { label: string; href: string };

/**
 * Destinations that are outside the scope of this single-page challenge.
 * They are real routes on purpose: every one of them renders `app/not-found.tsx`,
 * which explains that the page is not part of the demo (see README).
 */
export const outOfScope = {
  login: "/login",
  signup: "/signup",
  community: "/community",
  featuredCourse: "/courses/designing-products-people-understand",
  category: (slug: string) => `/courses?category=${slug}`,
  careers: "/careers",
  journal: "/journal",
  help: "/help",
  terms: "/terms",
  privacy: "/privacy",
} as const;

export const sectionIds = {
  categories: "categories",
  featured: "featured",
  howItWorks: "how-it-works",
  testimonial: "testimonial",
  people: "people",
  contact: "contact",
} as const;

export const primaryNav: LinkItem[] = [
  { label: "Courses", href: `#${sectionIds.categories}` },
  { label: "For Teams", href: `#${sectionIds.contact}` },
  { label: "Community", href: `#${sectionIds.people}` },
  { label: "About", href: `#${sectionIds.howItWorks}` },
];

export const headerActions = {
  login: { label: "Log in", href: outOfScope.login },
  start: { label: "Start learning", href: `#${sectionIds.categories}` },
} satisfies Record<string, LinkItem>;

export type Avatar = { src: StaticImageData };
export const learnerAvatars: Avatar[] = [
  { src: avatar1 },
  { src: avatar2 },
  { src: avatar3 },
  { src: avatar4 },
];

export type Category = {
  slug: string;
  title: string;
  description: string;
  /**
   * When a category has content on this page, the card links to it instead of
   * the demo fallback. Only Product Design has one: the featured course.
   */
  onPageDetail?: { href: string; label: string };
};

export const categories: Category[] = [
  {
    slug: "product-design",
    title: "Product Design",
    description: "Turn complex problems into clear, useful experiences.",
    onPageDetail: {
      href: `#${sectionIds.featured}`,
      label: "View featured course",
    },
  },
  {
    slug: "technology",
    title: "Technology",
    description:
      "Build a stronger understanding of the tools shaping digital products.",
  },
  {
    slug: "business",
    title: "Business",
    description:
      "Develop practical skills for better decisions and stronger teams.",
  },
  {
    slug: "creative",
    title: "Creative",
    description: "Explore new ways to communicate, create and tell stories.",
  },
];

export const featuredCourse = {
  eyebrow: "Most popular this month",
  title: "Designing products people understand.",
  description:
    "Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.",
  instructor: "with Maya Chen · Senior Product Designer",
  details: ["8 lessons", "2h 40min", "Intermediate"],
  href: outOfScope.featuredCourse,
};

export type StepIcon = "focus" | "experience" | "practice";
export type Step = { title: string; description: string; icon: StepIcon };

export const steps: Step[] = [
  {
    title: "Choose your focus",
    description:
      "Find courses based on the skill you want to build, not endless content categories.",
    icon: "focus",
  },
  {
    title: "Learn from experience",
    description:
      "Follow concise lessons created by professionals who use these skills.",
    icon: "experience",
  },
  {
    title: "Put it into practice",
    description:
      "Every course includes practical exercises designed to turn knowledge into action.",
    icon: "practice",
  },
];

export type Stat = { value: string; label: string };
export const stats: Stat[] = [
  { value: "24K+", label: "active learners" },
  { value: "120+", label: "expert-led courses" },
  { value: "92%", label: "complete their first course" },
];

export type Box = { x: number; y: number; w: number; h: number };

export type CollagePhoto = {
  src: StaticImageData;
  alt: string;
  /** Box in px inside the 530×523 desktop collage (Figma node 4:1137). */
  box: Box;
  /** Box in px inside the 362×310 mobile collage (Figma node 4:1236). */
  mobileBox: Box;
};

export const collage: CollagePhoto[] = [
  {
    src: peopleRaisingHand,
    alt: "Young student raising her hand at a desk",
    box: { x: 35, y: 107, w: 103, h: 154 },
    mobileBox: { x: 22, y: 63, w: 72, h: 96 },
  },
  {
    src: peopleGroupLaptop,
    alt: "Students learning together around a laptop",
    box: { x: 0, y: 274, w: 138, h: 207 },
    mobileBox: { x: 0, y: 167, w: 94, h: 129 },
  },
  {
    src: peopleReading,
    alt: "Student in a hoodie reading a book",
    box: { x: 154, y: 26, w: 103, h: 170 },
    mobileBox: { x: 106, y: 0, w: 72, h: 106 },
  },
  {
    src: peopleMusic,
    alt: "Two women practicing music at a stand",
    box: { x: 154, y: 209, w: 103, h: 173 },
    mobileBox: { x: 106, y: 114, w: 72, h: 108 },
  },
  {
    src: peopleNotes,
    alt: "Student taking notes next to a laptop",
    box: { x: 154, y: 395, w: 103, h: 128 },
    mobileBox: { x: 106, y: 230, w: 72, h: 80 },
  },
  {
    src: peopleGraduate,
    alt: "Graduate in cap and gown holding a diploma",
    box: { x: 273, y: 34, w: 103, h: 137 },
    mobileBox: { x: 190, y: 13, w: 72, h: 86 },
  },
  {
    src: peopleDesk,
    alt: "Woman studying at a desk with a laptop",
    box: { x: 273, y: 184, w: 103, h: 138 },
    mobileBox: { x: 190, y: 107, w: 72, h: 86 },
  },
  {
    src: peopleVideoCall,
    alt: "Teacher on a video call shown on a desktop monitor",
    box: { x: 273, y: 335, w: 103, h: 154 },
    mobileBox: { x: 190, y: 201, w: 72, h: 96 },
  },
  {
    src: peopleBooks,
    alt: "Student in a yellow shirt carrying books",
    box: { x: 391, y: 87, w: 128, h: 205 },
    mobileBox: { x: 274, y: 46, w: 88, h: 128 },
  },
  {
    src: peopleCoffee,
    alt: "Student in a hijab holding a coffee cup",
    box: { x: 391, y: 304, w: 103, h: 132 },
    mobileBox: { x: 274, y: 182, w: 72, h: 82 },
  },
];

export type ContactMethod = {
  icon: "chat" | "clock";
  title: string;
  detail: string;
  href?: string;
};

export const contactMethods: ContactMethod[] = [
  {
    icon: "chat",
    title: "Email",
    detail: "contact@luma.com",
    href: "mailto:contact@luma.com",
  },
  {
    icon: "clock",
    title: "Response Time",
    detail: "Up to 24 hours on business days",
  },
];

export type FooterColumn = { title: string; links: LinkItem[] };
export const footerColumns: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "Courses", href: `#${sectionIds.categories}` },
      { label: "Categories", href: `#${sectionIds.categories}` },
      { label: "Instructors", href: `#${sectionIds.people}` },
      { label: "For Teams", href: `#${sectionIds.contact}` },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: `#${sectionIds.howItWorks}` },
      { label: "Careers", href: outOfScope.careers },
      { label: "Journal", href: outOfScope.journal },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: outOfScope.help },
      { label: "Contact", href: `#${sectionIds.contact}` },
      { label: "Terms", href: outOfScope.terms },
      { label: "Privacy", href: outOfScope.privacy },
    ],
  },
];
