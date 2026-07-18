import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apple Gadget — Temukan iPhone yang Terasa Kamu",
  description:
    "Belanja iPhone original dengan konsultasi personal, trade in mudah, cicilan, bantuan setup, dan layanan purnajual Apple Gadget.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const imageFallbackScript = `
(() => {
  const brokenSources = new Set([
    "https://www.apple.com/v/iphone/home/cj/images/overview/consider/designed-to_last__f60bwgep88ya_large.jpg",
    "https://www.apple.com/v/iphone/home/cj/images/overview/consider/designed_to_last__f60bwgep88ya_large.jpg"
  ]);
  const replacement = "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-geo-240909_inline.jpg.large.jpg";

  const repairImage = (image) => {
    const source = image.getAttribute("src") || "";
    if (brokenSources.has(source)) image.src = replacement;
  };

  window.addEventListener("error", (event) => {
    const target = event.target;
    if (target instanceof HTMLImageElement) repairImage(target);
  }, true);

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("img").forEach(repairImage);
  });
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script dangerouslySetInnerHTML={{ __html: imageFallbackScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
