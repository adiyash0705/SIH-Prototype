import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Synapse — Academia × Industry",
    template: "%s | Synapse",
  },
  description:
    "A unified platform for discovering talent, building partnerships and turning academic potential into real-world opportunity.",
  keywords: [
    "academia",
    "industry",
    "internships",
    "research collaboration",
    "talent discovery",
    "SIH",
  ],
  authors: [{ name: "Synapse Team" }],
  creator: "Synapse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
