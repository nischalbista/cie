import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download CIE Syllabuses | IGCSE & A-Level Subjects",
  description:
    "Stay updated with the official CIE syllabuses for IGCSE and A-Level subjects. Get the latest documents directly from trusted sources.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.ciepastpapers.com/other-resources/syllabus/",
  },
  openGraph: {
    title: "Download CIE Syllabuses | IGCSE & A-Level Subjects",
    description:
      "Access current IGCSE and A-Level syllabuses online, organized by subject.",
    type: "website",
    url: "https://www.ciepastpapers.com/other-resources/syllabus/",
    images: [
      {
        url: "https://www.ciepastpapers.com/og.jpg",
        width: 1200,
        height: 630,
        alt: "CIE Syllabus Download",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download CIE Syllabuses | IGCSE & A-Level Subjects",
    description: "Get updated syllabuses for exam success.",
    images: ["https://www.ciepastpapers.com/og.jpg"],
  },
};

export default function SyllabusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
