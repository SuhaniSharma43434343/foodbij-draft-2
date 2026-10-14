import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foodbiz | Catering & hospitality, Mumbai",
  description: "Foodbiz caters weddings, celebrations, brand launches and office dining in Mumbai.",
  // Preview build: keep out of search until the owner approves a launch.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
