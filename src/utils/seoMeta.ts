// Define SEO title, description, and h1 heading for each subject
const seoMetaMap: Record<
  string,
  { title: string; description: string; heading: string }
> = {
  // A-Level Subjects
  "Biology 9700": {
    title: "AS and A Level Biology Past Papers | CIE Biology 9700",
    description:
      "Our resources include the most recent AS and A Level Biology 9700 Past Papers and their Marking Schemes, available as free downloadable PDFs.",
    heading: "A Level Biology 9700 Past Papers",
  },
  "Chemistry 9701": {
    title: "AS and A Level Chemistry Past Papers | CIE Chemistry 9701",
    description:
      "Our resources include the most recent AS and A Level Chemistry 9701 Past Papers and their Marking Schemes, available as free downloadable PDFs.",
    heading: "A Level Chemistry 9701 Past Papers",
  },
  "Physics 9702": {
    title: "AS and A Level Physics Past Papers | CIE Physics 9702",
    description:
      "Updated collection of AS and A Level Physics 9702 Past Papers with their marking schemes, available to download for free.",
    heading: "A Level Physics 9702 Past Papers",
  },
  "Maths 9709": {
    title: "AS and A Level Mathematics Past Papers | CIE Math 9709",
    description:
      "Updated collection of AS and A Levels Mathematics 9709 Past Papers with their respective marking schemes, available to download for free.",
    heading: "A Level Mathematics 9709 Past Papers",
  },
  "Accounting 9706": {
    title: "AS and A Level Accounting Past Papers | CIE Accounting 9706",
    description:
      "Download the updated AS and A Level Accounting 9706 Past Papers and their marking schemes for free. Effective for practice for the upcoming exams.",
    heading: "A Level Accounting 9706 Past Papers",
  },
  "Economics 9708": {
    title: "AS and A Level Economics Past Papers | CIE Economics 9708",
    description:
      "Download the updated AS and A Level Economics 9708 Past Papers with their marking schemes for free. Effective for practice for the upcoming examination!",
    heading: "A Level Economics 9708 Past Papers",
  },

  // IGCSE Subjects
  "Biology 0610": {
    title: "IGCSE Biology Past Papers | CIE Biology 0610",
    description:
      "Updated collection of IGCSE Biology 0610 Past Papers with their marking schemes, available to download for free.",
    heading: "IGCSE Biology 0610 Past Papers",
  },
  "Chemistry 0620": {
    title: "IGCSE Chemistry Past Papers | CIE Chemistry 0620",
    description:
      "Free access to PDFs of the IGCSE Chemistry 0620 Past Papers with their marking schemes, organised by year and session.",
    heading: "IGCSE Chemistry 0620 Past Papers",
  },
  "Physics 0625": {
    title: "IGCSE Physics Past Papers | CIE Physics 0625",
    description:
      "Free access to PDFs of the IGCSE Physics 0625 Past Papers with their marking schemes, organised by year and session.",
    heading: "IGCSE Physics 0625 Past Papers",
  },
  "Additional Math 0606": {
    title: "IGCSE Additional Math Past Papers | CIE Additional Math 0606",
    description:
      "Updated collection of IGCSE Additional Math 0606 Past Papers with their marking schemes, available to download for free.",
    heading: "IGCSE Additional Math 0606 Past Papers",
  },
  "Extended Math 0580": {
    title: "IGCSE Mathematics Past Papers | CIE Extended Math 0580",
    description:
      "Access IGCSE Mathematics 0580 Past Papers along with their marking schemes, updated annually. Download these Past Papers for free for offline reading.",
    heading: "IGCSE Mathematics 0580 Past Papers",
  },
};

// Function to get SEO metadata for a given subject
export function getSEOMetadata(subject: string) {
  return (
    seoMetaMap[subject] || {
      title: "Past Papers | CIE",
      description:
        "Download the latest Cambridge CIE Past Papers and Marking Schemes for IGCSE and A-Level subjects. All PDFs are available for free.",
      heading: "Cambridge Past Papers",
    }
  );
}
