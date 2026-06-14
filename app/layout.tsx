import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-condensed" });

export const metadata: Metadata = {
  title: "Shortlist — AI Recruitment CRM",
  description: "An explainable, interactive AI recruitment CRM for reviewing and advancing top candidates.",
  keywords: ["AI recruitment", "ATS", "candidate matching", "recruitment CRM", "Next.js"],
  openGraph: {
    title: "Shortlist — AI Recruitment CRM",
    description: "Review candidate evidence, understand match scores, and move hiring decisions forward.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>{children}</body>
    </html>
  );
}
