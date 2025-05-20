import StaticPDFViewer from "@/src/components/StaticPDFViewer/StaticPDFViewer";
import { timetableData } from "@/src/data/timetableData";
import { slugify } from "@/src/utils/slugify";
import { notFound } from "next/navigation";

// ✅ Adjusted for flat data structure
export function generateStaticParams() {
  return timetableData.map((item) => ({
    slug: slugify(item.name),
  }));
}

export default async function TimetablePage({ params }) {
  const { slug: slugParams } = await params;

  const slug = decodeURIComponent(slugParams);

  const matchedFile = timetableData.find(
    (item) => slugify(item.name) === slug.toLowerCase()
  );

  if (!matchedFile) return notFound();

  return <StaticPDFViewer matchedFile={matchedFile} />;
}
