import { createApolloClient } from "@/src/apollo-client";
import { gql } from "@apollo/client";

const FETCH_ALL_SUBJECTS = gql`
  query FetchAllSubjects {
    subjects {
      id
      name
      slug
      grade
    }
  }
`;

const FETCH_PDFS_BY_SUBJECT_NAME = gql`
  query MyQuery($subject_name: String!) {
    pdfs(subject_name: $subject_name) {
      id
      title
      pdf
    }
  }
`;

export async function GET(_, { params }) {
  const { slug } = await params;
  const baseUrl = "https://www.ciepastpapers.com"; // Use your prod URL

  const client = createApolloClient();

  // Get subject by slug
  const { data: subjectData } = await client.query({
    query: FETCH_ALL_SUBJECTS,
  });
  const subject = subjectData.subjects.find((s) => s.slug === slug);

  if (!subject) {
    return new Response("Not found", { status: 404 });
  }

  const { data: pdfData } = await client.query({
    query: FETCH_PDFS_BY_SUBJECT_NAME,
    variables: { subject_name: subject.name },
  });

  const urls = pdfData.pdfs.map((pdf) => {
    return `
      <url>
        <loc>${baseUrl}/a-levels/${slug}/${pdf.id}</loc>
        <lastmod>2025-05-07T11:37:13+00:00</lastmod>
        <priority>0.90</priority>
      </url>
    `;
  });

  urls.unshift(`
      <url>
        <loc>${baseUrl}/a-levels/${slug}</loc>
        <lastmod>2025-05-07T11:37:13+00:00</lastmod>
        <priority>0.90</priority>
      </url>
    `);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
