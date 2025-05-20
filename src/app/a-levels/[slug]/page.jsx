import { gql } from "@apollo/client";
import { createApolloClient } from "@/src/apollo-client";
import { getSEOMetadata } from "@/src/utils/seoMeta";
import SubjectsPage from "@/src/components/subject/SubjectPage";

// GraphQL query to fetch all subjects (id and slug)
const FETCH_ALL_SUBJECTS = gql`
  query FetchAllSubjects {
    subjects {
      id
      slug
      name
    }
  }
`;

async function fetchAllSubjects() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: FETCH_ALL_SUBJECTS,
  });
  return data.subjects;
}

// Fetch subject by id
const FETCH_SUBJECT_BY_ID = gql`
  query FetchSubjectById($id: ID!) {
    subject(id: $id) {
      id
      name
      slug
      grade
      faq {
        data
        type
      }
    }
  }
`;

async function fetchSubjectById(id) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: FETCH_SUBJECT_BY_ID,
    variables: { id },
  });
  return data.subject;
}

const FETCH_PDFS_BY_SUBJECT_NAME = gql`
  query MyQuery($subject_name: String!) {
    pdfs(subject_name: $subject_name) {
      id
      title
      pdf
      tags
      timeframe {
        id
        year
        session
      }
    }
  }
`;

async function fetchPdfsBySubjectName(name) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: FETCH_PDFS_BY_SUBJECT_NAME,
    variables: { subject_name: name },
  });
  return data.pdfs;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const subjects = await fetchAllSubjects();
  const subject = subjects.find((subject) => subject.slug === slug);

  const { title, description } = await getSEOMetadata(subject.name);

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: ["https://www.ciepastpapers.com/og.jpg"],
    },
    alternates: {
      canonical: `https://www.ciepastpapers.com/a-levels/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["https://www.ciepastpapers.com/og.jpg"],
    },
  };
}

// Dynamic route page component
export default async function SubjectPage({ params }) {
  const { slug } = await params;
  const subjects = await fetchAllSubjects();
  const subject = subjects.find((subject) => subject.slug === slug);

  const subjectData = await fetchSubjectById(subject.id);

  const pdfs = await fetchPdfsBySubjectName(subject.name);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Array.isArray(subjectData.faq)
      ? subjectData.faq.map((faqItem) => ({
          "@type": "Question",
          name: faqItem.data?.question || "",
          acceptedAnswer: {
            "@type": "Answer",
            text: faqItem.data?.answer || "",
          },
        }))
      : [],
  };

  return (
    <div>
      {faqSchema.mainEntity.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <SubjectsPage subjectData={subjectData} pdfs={pdfs} />
    </div>
  );
}

// Function to generate static params (slug values)
export async function generateStaticParams() {
  const subjects = await fetchAllSubjects();

  return subjects.map((subject) => ({
    slug: subject.slug,
  }));
}
