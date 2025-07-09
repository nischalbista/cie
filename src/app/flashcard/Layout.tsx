// app/other-resources/timetable/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CIE Exam Timetables | IGCSE & A-Level Dates",
  description:
    "Find the latest Cambridge IGCSE and A-Level exam timetables. Be prepared and never miss an exam date again.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.ciepastpapers.com/other-resources/timetable/",
  },
  openGraph: {
    title: "CIE Exam Timetables | IGCSE & A-Level Dates",
    description:
      "Stay on top of your exam dates with downloadable CIE timetables.",
    type: "website",
    url: "https://www.ciepastpapers.com/other-resources/timetable/",
    images: [
      {
        url: "https://www.ciepastpapers.com/og.jpg",
        width: 1200,
        height: 630,
        alt: "CIE Timetable Download",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CIE Exam Timetables | IGCSE & A-Level Dates",
    description:
      "Get the official CIE timetable and plan your study efficiently.",
    images: ["https://www.ciepastpapers.com/og.jpg"],
  },
};

export default function FlashcardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
