import { createApolloClient } from "@/src/apollo-client";
import PDFViewer from "@/src/components/PDFViewer/PDFViewer";
import { gql } from "@apollo/client";
import { notFound } from "next/navigation";

const FETCH_PDF_BY_ID = gql`
  query FetchPdfById($id: ID!) {
    pdf(id: $id) {
      id
      title
      pdf
      tags
      timeframe {
        id
        year
        session
        subject {
          id
          name
          slug
          grade
        }
      }
    }
  }
`;

async function fetchPdfById(id) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: FETCH_PDF_BY_ID,
    variables: { id },
  });
  return data.pdf;
}

export async function generateMetadata({ params }) {
  const { pdfId } = await params;
  const pdf = await fetchPdfById(pdfId);

  if (!pdf) {
    return {
      title: "PDF Not Found",
      description: "The requested PDF could not be found.",
      openGraph: {
        title: "PDF Not Found",
        description: "The requested PDF could not be found.",
        images: ["https://www.ciepastpapers.com/og.jpg"],
      },
      twitter: {
        card: "summary_large_image",
        title: "PDF Not Found",
        description: "The requested PDF could not be found.",
        images: ["https://www.ciepastpapers.com/og.jpg"],
      },
    };
  }

  const title = `${pdf.timeframe.subject.grade} ${pdf.timeframe.subject.name} - ${pdf.title}`;
  const description = `Download or view the ${pdf.timeframe.subject.grade} ${pdf.timeframe.subject.name} paper: "${pdf.title}". Ideal for A-Level exam preparation.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["https://www.ciepastpapers.com/og.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.ciepastpapers.com/og.jpg"],
    },
  };
}

export default async function PdfPage({ params }) {
  const { pdfId } = await params;

  const pdf = await fetchPdfById(pdfId);

  if (!pdf) {
    notFound();
  }

  return <PDFViewer pdfData={pdf} />;
}
