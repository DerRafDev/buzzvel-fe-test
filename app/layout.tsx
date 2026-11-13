import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Both families are variable fonts, so one file per family covers every weight
// the design uses (Inter 400/600/700, Plus Jakarta Sans 600/700/800).
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const description =
  "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.";

export const metadata: Metadata = {
  title: "Luma — Practical courses taught by people who do the work",
  description,
  openGraph: {
    title: "Luma — Build skills that actually move you forward",
    description,
    type: "website",
    siteName: "Luma",
  },
};

export const viewport: Viewport = {
  themeColor: "#f9f8f3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} antialiased`}
    >
      <body>
        <a
          href="#main"
          className="sr-only rounded-lg bg-ink px-4 py-3 text-small font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
