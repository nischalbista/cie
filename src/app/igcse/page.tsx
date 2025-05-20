import ImageBanner from "@/src/components/common/ImageBanner";
import FAQSection from "@/src/components/home/FAQSection";
import SearchableSubjects from "@/src/components/levels/SearchableSubjects";
import { gql } from "@apollo/client";
import { createApolloClient } from "@/src/apollo-client";

export const metadata = {
  title: "IGCSE past paper | CIE past paper",
  description:
    "Updated collection of CIE Past Papers for IGCSE subjects like Physics, Chemistry, Biology, Mathematics, and more.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.ciepastpapers.com/igcse/",
  },
  openGraph: {
    title: "IGCSE past paper | CIE past paper",
    description:
      "Updated collection of CIE Past Papers for IGCSE subjects like Physics, Chemistry, Biology, Mathematics, and more.",
    type: "website",
    url: "https://www.ciepastpapers.com/igcse/",
    images: [
      {
        url: "https://www.ciepastpapers.com/og.jpg",
        width: 1200,
        height: 630,
        alt: "IGCSE Past Papers Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IGCSE past paper | CIE past paper",
    description:
      "Updated collection of CIE Past Papers for IGCSE subjects like Physics, Chemistry, Biology, Mathematics, and more.",
    images: ["https://www.ciepastpapers.com/og.jpg"],
  },
};

const faqData = [
  {
    question: "What are IGCSE Past Papers?",
    answer:
      "IGCSE past papers are previous exam papers available for students for practice. Students get familiar with the exam format and identify areas of improvement.",
  },
  {
    question: "Are your IGCSE past papers free to download?",
    answer:
      "Yes, our IGCSE past papers are free to download and can be accessed offline.",
  },
  {
    question: "Do you provide mark schemes with IGCSE past papers?",
    answer:
      "Yes, we provide mark schemes with IGCSE past papers to help students evaluate their work and understand how it is graded.",
  },
  {
    question: "Are your IGCSE past papers organised by session?",
    answer:
      "Yes, our past papers are organised by session. We also provide filters to help you find papers by specific subjects such as Physics, Biology, Chemistry, and Maths.",
  },
  {
    question: "Are the IGCSE past papers organised by subject and year?",
    answer:
      "IGCSE past papers are neatly organised by subject and year, making it super easy for students to find exactly what they need.",
  },
  {
    question: "How can I use IGCSE past papers for exam revision?",
    answer:
      "IGCSE past papers helps students familiarise themselves with the exam format and identify the most repeated questions. Students can view the past papers from our website and practise for their exams.",
  },
  {
    question: "Do you offer IGCSE past papers for all exam boards?",
    answer:
      "Currently, we offer past papers for CIE board only. We are continually working to expand our resources and may include past papers for other exam boards in the future.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are IGCSE Past Papers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IGCSE past papers are previous exam papers available for students for practice. Students get familiar with the exam format and identify areas of improvement.",
      },
    },
    {
      "@type": "Question",
      name: "Are your IGCSE past papers free to download?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our IGCSE past papers are free to download and can be accessed offline.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide mark schemes with IGCSE past papers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide mark schemes with IGCSE past papers to help students evaluate their work and understand how it is graded.",
      },
    },
    {
      "@type": "Question",
      name: "Are your IGCSE past papers organised by session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our past papers are organised by session. We also provide filters to help you find papers by specific subjects such as Physics, Biology, Chemistry, and Maths.",
      },
    },
    {
      "@type": "Question",
      name: "Are the IGCSE past papers organised by subject and year?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IGCSE past papers are neatly organised by subject and year, making it super easy for students to find exactly what they need.",
      },
    },
    {
      "@type": "Question",
      name: "How can I use IGCSE past papers for exam revision?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IGCSE past papers helps students familiarise themselves with the exam format and identify the most repeated questions. Students can view the past papers from our website and practise for their exams.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer IGCSE past papers for all exam boards?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Currently, we offer past papers for CIE board only. We are continually working to expand our resources and may include past papers for other exam boards in the future.",
      },
    },
  ],
};

// GraphQL query to fetch all episodes
const FETCH_SUBJECTS = gql`
  query FetchSubjects {
    subjects {
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

async function fetchSubjectsData() {
  const client = createApolloClient();
  const { data } = await client.query({ query: FETCH_SUBJECTS });
  return data.subjects;
}

export default async function Level() {
  const subjectsData = await fetchSubjectsData();

  // Filter the subjects to include only "IGCSE" grade subjects
  const igcseSubjects = subjectsData.filter(
    (subject) => subject.grade === "IGCSE"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="level">
        <ImageBanner
          src="/images/grade/revision-notes-grade.png"
          mobileSrc="/images/grade/revision-notes-grade-mobile.png"
          link="https://app.homeschool.asia/signup?utm_source=ciepastpaper&utm_medium=igcse_top"
        />

        <div className="level__content">
          <div className="blob-c">
            <div className="shape-blob one"></div>
            <div className="shape-blob two"></div>
          </div>

          <div className="level__container container">
            <div className="level__header">
              <h1 className="level__title">IGCSE Past Papers</h1>

              <p className="level__description">
                Find the latest <strong>IGCSE Past Papers</strong> for subjects
                like Physics, Chemistry, Biology, and Mathematics. Easily browse
                and download these Past Papers for effective exam preparation.
              </p>
            </div>

            {/* Pass the filtered IGCSE subjects data to SearchableSubjects */}
            <SearchableSubjects subjects={igcseSubjects} />

            <p className="level__description">
              These <strong>IGCSE Past Papers</strong> and the marking schemes
              are available from 2020 to the most recent session, organised by
              year and session for each subject. Practicing with past papers
              helps you get familiar with the exam formats and question types of
              the Cambridge syllabus.
            </p>
          </div>
        </div>

        <ImageBanner
          src="/images/grade/ivy-grade.png"
          mobileSrc="/images/grade/ivy-grade-mobile.png"
          link="https://app.homeschool.asia/signup?utm_source=ciepastpaper&utm_medium=igcse_mid"
        />

        <div className="gradient__container">
          <div className="blob-c">
            <div className="shape-blob one"></div>
            <div className="shape-blob two"></div>
          </div>

          <FAQSection faqData={faqData} paddingVertical />

          {/* <div className="live-support__container container">
          <ImageBanner src="/images/live-support-orange.png" />
        </div> */}
        </div>
      </div>
    </>
  );
}
