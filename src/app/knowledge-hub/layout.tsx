import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Hub | CIE Exam Tips, Updates & Study Guides",
  description:
    "Dive into expert insights, CIE exam strategies, and study guides for IGCSE and A-Level students. Stay ahead with our knowledge hub.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.ciepastpapers.com/knowledge-hub/",
  },
  openGraph: {
    title: "Knowledge Hub | CIE Exam Tips, Updates & Study Guides",
    description: "Get tips, strategies, and guides for Cambridge exam success.",
    type: "website",
    url: "https://www.ciepastpapers.com/knowledge-hub/",
    images: [
      {
        url: "https://www.ciepastpapers.com/og.jpg",
        width: 1200,
        height: 630,
        alt: "CIE Knowledge Hub Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Hub | CIE Exam Tips, Updates & Study Guides",
    description: "Study smarter with guides and tips from the Knowledge Hub.",
    images: ["https://www.ciepastpapers.com/og.jpg"],
  },
};

export default function KnowledgeHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
