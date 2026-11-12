import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buzzvel Front-End Challenge",
  description: "Landing page built for the Buzzvel Front-End Engineer challenge.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
