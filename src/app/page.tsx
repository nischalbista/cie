import ImageBanner from "@/src/components/common/ImageBanner";
import FAQSection from "@/src/components/home/FAQSection";
import Link from "next/link";

const faqData = [
  {
    question: "Why are past papers important?",
    answer:
      "Past papers are important because they help students understand exam formats, identify knowledge gaps, practice time management, and build confidence by practicing real exam questions.",
  },
  {
    question: "How many past papers should i do?",
    answer:
      "When you are preparing for A Levels, try to solve as many past paper as you can and for more effective exam preparation aim to complete past papers from at least 4 years.",
  },
  {
    question:
      "Are the past papers on your website organized by subject and year?",
    answer:
      "Yes, the past papers on our website are organized by subject, year and session.",
  },
  {
    question:
      "How often do you update the A-Level past papers on your website?",
    answer:
      "We update our collection with the latest past papers as they become available.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://www.ciepastpapers.com/#educationalOrganization",
  name: "CIE Past Papers",
  legalName: "CIE Past Papers Ltd.",
  description:
    "CIE Past Papers is an online platform providing Cambridge International Examination past papers and resources for students and teachers.",
  url: "https://www.ciepastpapers.com/",
  logo: "https://www.ciepastpapers.com/favicon.ico?v=2",
  email: "support@ciepastpapers.com",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why are past papers important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Past papers are important because they help students understand exam formats, identify knowledge gaps, practice time management, and build confidence by practicing real exam questions.",
      },
    },
    {
      "@type": "Question",
      name: "How many past papers should I do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you are preparing for A Levels, try to solve as many past papers as you can and for more effective exam preparation aim to complete past papers from at least 4 years.",
      },
    },
    {
      "@type": "Question",
      name: "Are the past papers on your website organized by subject and year?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the past papers on our website are organized by subject, year, and session.",
      },
    },
    {
      "@type": "Question",
      name: "How often do you update the A-Level past papers on your website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We update our collection with the latest past papers as they become available.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="home">
        <div className="home__content">
          <div className="blob-c">
            <div className="shape-blob one"></div>
            <div className="shape-blob two"></div>
          </div>

          <div className="home__collection container">
            <div className="home__collection-text">
              <div className="home__collection-title-container">
                <h1 className="home__collection-title">
                  Collection of Yearly{" "}
                  <span className="home__collection-highlight">
                    CIE Past Papers
                  </span>
                </h1>

                <img src="/images/homepage/line.svg" alt="" className="line" />
              </div>
              <p className="home__collection-description">
                Our collection of CIE Past Papers for IGCSE and AS/A Levels
                offers a complete set of yearly compiled past papers and their
                marking schemes, ready to download for FREE.
              </p>
            </div>

            <div className="home__collection-buttons">
              <Link href="/a-levels">
                <button className="primary-btn">AS/A Levels</button>
              </Link>
              <Link href="/igcse">
                <button className="primary-btn">IGCSE</button>
              </Link>
            </div>
          </div>

          <div className="home__subjects container">
            <h2 className="home__subjects-title">
              Find Past Papers by Subject
            </h2>

            <div className="home__subjects-container">
              <div className="home__subjects-category">
                <h3 className="home__subjects-heading">AS/A Levels</h3>

                <div className="home__subjects-list">
                  <ul className="home__subjects-items">
                    <li className="home__subjects-item">
                      <img src="/images/tick.svg" alt="" aria-hidden="true" />
                      Accounting
                    </li>
                    <li className="home__subjects-item">
                      <img src="/images/tick.svg" alt="" aria-hidden="true" />
                      Biology
                    </li>
                    <li className="home__subjects-item">
                      <img src="/images/tick.svg" alt="" aria-hidden="true" />
                      Chemistry
                    </li>
                    <li className="home__subjects-item">
                      <img src="/images/tick.svg" alt="" aria-hidden="true" />
                      Economics
                    </li>
                    <li className="home__subjects-item">
                      <img src="/images/tick.svg" alt="" aria-hidden="true" />
                      Mathematics
                    </li>
                    <li className="home__subjects-item">
                      <img src="/images/tick.svg" alt="" aria-hidden="true" />
                      Physics
                    </li>
                  </ul>
                </div>
              </div>

              <div className="home__subjects-category igcse">
                <h3 className="home__subjects-heading">IGCSE</h3>

                <div className="home__subjects-list">
                  <ul className="home__subjects-items">
                    <li className="home__subjects-item">
                      <img src="/images/tick.svg" alt="" aria-hidden="true" />
                      Additional Maths
                    </li>
                    <li className="home__subjects-item">
                      <img src="/images/tick.svg" alt="" aria-hidden="true" />
                      Biology
                    </li>
                    <li className="home__subjects-item">
                      <img src="/images/tick.svg" alt="" aria-hidden="true" />
                      Chemistry
                    </li>
                    <li className="home__subjects-item">
                      <img src="/images/tick.svg" alt="" aria-hidden="true" />
                      Extended Maths
                    </li>
                    <li className="home__subjects-item">
                      <img src="/images/tick.svg" alt="" aria-hidden="true" />
                      Physics
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="home__pdf-access container">
            <div className="home__pdf-access-content">
              <div className="home__pdf-access-title-container">
                <h2 className="home__pdf-access-title">
                  Seamless PDF Access & Offline Reading
                </h2>

                <img src="/images/homepage/line.svg" alt="" className="line" />
              </div>
              <p className="home__pdf-access-description">
                Easily access and navigate the Past Papers with our built-in PDF
                reader or download it for offline reading.
              </p>
            </div>
            <div className="home__pdf-access-image">
              <img
                src="/images/homepage/free-download-view-v2.png"
                alt="PDF Access"
              />
            </div>
          </div>
        </div>

        <ImageBanner
          src="/images/homepage/ivy-homepage.png"
          mobileSrc="/images/homepage/ivy-homepage-mobile.png"
          alt="Ad Banner"
          link="https://app.homeschool.asia/signup?utm_source=ciepastpaper&utm_medium=homepage_top"
        />

        <div className="gradient__container">
          <div className="blob-c">
            <div className="shape-blob one"></div>
            <div className="shape-blob two"></div>
            <div className="shape-blob three"></div>
          </div>

          {/* Features Section */}
          <section className="home__features container">
            <h2 className="home__features-title">
              Everything You Need for Exam Practice
            </h2>

            <div className="home__features-list">
              <article className="home__feature home__feature--first">
                <div className="home__feature-icon">
                  <img
                    src="/images/homepage/illustration1.png"
                    alt="Free Access Icon"
                  />
                </div>

                <div className="home__feature-content">
                  <span className="home__feature-number">1</span>
                  <div className="home__feature-description">
                    <h4 className="home__feature-heading">Free Access</h4>
                    <p className="home__feature-subheading">
                      for self-learning
                    </p>
                  </div>
                </div>

                <p className="home__feature-text">
                  Access our collection of Past Papers with their marking
                  schemes and examiner’s solutions completely free!
                </p>
              </article>

              <article className="home__feature home__feature--second">
                <div className="home__feature-icon">
                  <img
                    src="/images/homepage/illustration2.png"
                    alt="Easy Interface Icon"
                  />
                </div>

                <div className="home__feature-content">
                  <span className="home__feature-number">2</span>
                  <div className="home__feature-description">
                    <h4 className="home__feature-heading">Easy Interface</h4>
                    <p className="home__feature-subheading">
                      for seamless navigation
                    </p>
                  </div>
                </div>

                <p className="home__feature-text">
                  Search by subject, year, or paper type and get exactly what
                  you want to practice in just a few clicks!
                </p>
              </article>

              <article className="home__feature home__feature--third">
                <div className="home__feature-icon">
                  <img
                    src="/images/homepage/illustration3.png"
                    alt="Updated Resources Icon"
                  />
                </div>

                <div className="home__feature-content">
                  <span className="home__feature-number">3</span>
                  <div className="home__feature-description">
                    <h4 className="home__feature-heading">Updated Resources</h4>
                    <p className="home__feature-subheading">
                      for effective practice
                    </p>
                  </div>
                </div>

                <p className="home__feature-text">
                  Stay updated with the most recent collection of CIE Past
                  Papers including their marking schemes and examiner’s
                  solutions.
                </p>
              </article>
            </div>
          </section>

          <FAQSection paddingTop faqData={faqData} />
        </div>

        <ImageBanner
          src="/images/homepage/revision-notes-homepage.png"
          mobileSrc="/images/homepage/revision-notes-homepage-mobile.png"
          alt="Ad Banner"
          link="https://app.homeschool.asia/signup?utm_source=ciepastpaper&utm_medium=homepage_mid"
        />
      </div>
    </>
  );
}
