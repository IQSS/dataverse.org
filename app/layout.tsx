import type { Metadata } from "next";
import { Montserrat, Questrial } from "next/font/google";
import "./globals.css";
import "./feedback.css";
import "./midcentury.css";
import AccessibilityAudit from "./components/AccessibilityAudit";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://iqss.github.io/dataverse.org/"),
  title: "Dataverse Project — Open Research, Connected",
  description: "The open-source infrastructure connecting research data across a global community.",
  openGraph: {
    title: "Dataverse Project — Open Research, Connected",
    description: "One open-source project. A world of research data repositories.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dataverse Project — Open Research, Connected",
    description: "One open-source project. A world of research data repositories.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/icon-512.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/icon-512.png",
    apple: "/icon-512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${questrial.variable} antialiased midcentury`}
      >
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
        {process.env.NODE_ENV === "development" && <AccessibilityAudit />}
        <script src="/dataverse-motion.js" defer />
      </body>
    </html>
  );
}
