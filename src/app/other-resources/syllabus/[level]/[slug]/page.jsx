import StaticPDFViewer from "@/src/components/StaticPDFViewer/StaticPDFViewer";
import { syllabusData } from "@/src/data/syllabusData";
import { slugify } from "@/src/utils/slugify";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const levels = Object.keys(syllabusData);
  const paths = [];

  for (const level of levels) {
    for (const item of syllabusData[level]) {
      paths.push({
        level,
        slug: slugify(item.name),
      });
    }
  }

  return paths;
}

export default async function SyllabusPage({ params }) {
  const { level, slug: slugParams } = await params;

  const slug = decodeURIComponent(slugParams);

  const syllabusList = syllabusData[level];

  if (!syllabusList) return notFound();

  const matchedFile = syllabusList.find(
    (item) => slugify(item.name) === slug.toLowerCase()
  );

  if (!matchedFile) return notFound();

  return <StaticPDFViewer matchedFile={matchedFile} />;
}
