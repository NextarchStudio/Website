import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { studioInfo } from "@/data/sample";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: studioInfo.name,
    template: `%s | ${studioInfo.name}`,
  },
  description: studioInfo.mission,
  keywords: ["game studio", "indie games", "gaming", "game development", "nextarch"],
  authors: [{ name: studioInfo.name }],
  creator: studioInfo.name,
  publisher: studioInfo.name,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: studioInfo.domain,
    siteName: studioInfo.name,
    title: studioInfo.name,
    description: studioInfo.mission,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: studioInfo.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: studioInfo.name,
    description: studioInfo.mission,
    images: ["/og-image.jpg"],
    creator: "@nextarchstudio",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
