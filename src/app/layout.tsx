import type { Metadata } from "next";
import "../sass/app.css";
import { Poppins } from "next/font/google";
import LayoutWrapper from "../components/LayoutWrapper/page";

const ENABLE_TRACKING = process.env.NEXT_PUBLIC_ENABLE_TRACKING === "true";

export const metadata: Metadata = {
  title: "CIE Past Paper - Collection of past paper for IGCSE and A Levels",
  description:
    "Free access for IGCSE and A Levels Past Papers with built-in PDF viewer or download for offline reading.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico?v=2",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://www.ciepastpapers.com/",
  },
  openGraph: {
    title: "CIE Past Paper - Collection of past paper for IGCSE and A Levels",
    description:
      "Free access for IGCSE and A Levels Past Papers with built-in PDF viewer or download for offline reading.",
    type: "website",
    url: "https://www.ciepastpapers.com/",
    images: [
      {
        url: "https://www.ciepastpapers.com/og.jpg",
        width: 1200,
        height: 630,
        alt: "A-Level CIE Past Papers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CIE Past Paper - Collection of past paper for IGCSE and A Levels",
    description:
      "Free access for IGCSE and A Levels Past Papers with built-in PDF viewer or download for offline reading.",
    images: ["https://www.ciepastpapers.com/og.jpg"],
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="robots" content="max-snippet:-1, max-image-preview:large" />
        {ENABLE_TRACKING && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-Y0VQRXF4M0"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-Y0VQRXF4M0');
                `,
              }}
            />
            <meta
              name="msvalidate.01"
              content="DD3D53FAAFF1B952DB2F04A54274FFD5"
            />
          </>
        )}
      </head>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
