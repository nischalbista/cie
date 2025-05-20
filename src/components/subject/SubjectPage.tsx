"use client";
import ImageBanner from "@/src/components/common/ImageBanner";
import DownloadPopup from "@/src/components/popup/DownloadPopup";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { showDownloadPopupAtom, countdownAtom } from "@/src/atoms/atoms";
import { TbFileSearch } from "react-icons/tb";
import { LuDownload } from "react-icons/lu";
import { getSubjectAssets } from "@/src/utils/getSubjectAssets";
import { getSEOMetadata } from "@/src/utils/seoMeta";
import FAQSection from "../home/FAQSection";
import { usePathname } from "next/navigation";

export default function SubjectsPage({ subjectData, pdfs }: any) {
  const [expandedYear, setExpandedYear] = useState(() => {
    const years = pdfs.map((pdf: any) => pdf.timeframe.year);
    const sortedYears = [...new Set(years)].sort(
      (a, b) => Number(b) - Number(a)
    );
    return sortedYears[0];
  });

  const [selectedSession, setSelectedSession] = useState("March");
  const [selectedFileType, setSelectedFileType] = useState("Question Paper");

  const [showDownloadPopup, setShowDownloadPopup] = useAtom(
    showDownloadPopupAtom
  );
  const [downloadFileUrl, setDownloadFileUrl] = useState(null);
  const [countdown, setCountdown] = useAtom(countdownAtom);
  const [downloadInProgress, setDownloadInProgress] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Store the timer ID
  const fetchControllerRef = useRef<AbortController | null>(null); // Store the AbortController

  const pathname = usePathname();
  const [isIGCSE, setIsIGCSE] = useState(false);

  useEffect(() => {
    setIsIGCSE(pathname.toLowerCase().includes("igcse"));
  }, [pathname]);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const handleYearClick = (year: string) => {
    if (expandedYear !== year) {
      setExpandedYear(year);
      setSelectedFileType("Question Paper");
    }
  };

  useEffect(() => {
    if (!showDownloadPopup && downloadInProgress) {
      // Cancel the download if the popup is closed
      if (fetchControllerRef.current) {
        fetchControllerRef.current.abort();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setDownloadInProgress(false);
    }
  }, [showDownloadPopup, downloadInProgress]);

  const handleDownload = (pdf: any) => {
    if (!pdf || downloadInProgress) return; // Prevent duplicate downloads

    setDownloadFileUrl(pdf);
    setCountdown(4);
    setShowDownloadPopup(true);
    setDownloadInProgress(true); // Set download as in progress

    // Create an AbortController to handle download cancellation
    const controller = new AbortController();
    fetchControllerRef.current = controller;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setShowDownloadPopup(false);
          setDownloadInProgress(false); // Mark download as complete

          // Force file download with fetch and AbortController
          fetch(pdf, { signal: controller.signal })
            .then((response) => response.blob())
            .then((blob) => {
              const blobUrl = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = blobUrl;
              link.download = pdf.split("/").pop();
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(blobUrl);
            })
            .catch((error) => {
              if (error.name !== "AbortError") {
                console.error("Download error:", error);
              }
              setDownloadInProgress(false); // Reset download progress on error
            });

          return prev - 1;
        }
        return prev - 1;
      });
    }, 1000);

    // Store the interval timer ID in a ref to clear it later
    timerRef.current = timer;
  };

  const { image, className, topAd, midAd, bottomAd } = getSubjectAssets(
    subjectData.name
  );

  const { heading } = getSEOMetadata(subjectData.name);

  const pdfData = pdfs.map((pdf: any) => ({
    id: pdf.id,
    title: pdf.title,
    pdf: pdf.pdf,
    tags: pdf.tags,
    year: pdf.timeframe.year,
    session: pdf.timeframe.session,
  }));

  const groupedByTimeframe = pdfData.reduce((acc: any, item: any) => {
    const key = `${item.year}-${item.session}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const uniqueTimeframes = Object.keys(groupedByTimeframe).reduce(
    (acc, key) => {
      const [year, session] = key.split("-");
      if (!acc[year]) acc[year] = new Set();
      acc[year].add(session);
      return acc;
    },
    {} as Record<string, Set<string>>
  );

  // Extract unique file types (tags) for the selected year and session
  const fileTypeSet = new Set<string>();

  pdfData
    .filter(
      (pdf: any) => pdf.year === expandedYear && pdf.session === selectedSession
    )
    .forEach((pdf: any) => {
      if (pdf.tags) {
        pdf.tags
          .split(",")
          .map((tag: string) => tag.trim())
          .forEach((tag: string) => fileTypeSet.add(tag));
      }
    });

  const preferredOrder = [
    "Question Paper",
    "Mark Scheme",
    "Grade Threshold",
    "Examiner Report",
    "Insert",
  ];

  const remainingTags = Array.from(fileTypeSet).filter(
    (tag) => !preferredOrder.includes(tag)
  );

  const sortedFileTypes = [
    ...preferredOrder.filter((tag) => fileTypeSet.has(tag)),
    ...remainingTags.sort(),
    "All Files",
  ];

  const fileTypes = sortedFileTypes;

  const faqData =
    subjectData?.faq?.map((faqItem: any) => ({
      question: faqItem.data?.question,
      answer: faqItem.data?.answer,
    })) || [];

  const filteredPapers = pdfData.filter((paper: any) => {
    return (
      paper.year === expandedYear &&
      paper.session === selectedSession &&
      (selectedFileType === "All Files" ||
        paper.tags?.replace(/\s+/g, "") ===
          selectedFileType.replace(/\s+/g, ""))
    );
  });

  const sortedFilteredPapers = filteredPapers.sort((a: any, b: any) => {
    const aIndex = fileTypes.indexOf(a.tags?.replace(/\s+/g, ""));
    const bIndex = fileTypes.indexOf(b.tags?.replace(/\s+/g, ""));
    const typeDiff = aIndex - bIndex;

    if (typeDiff !== 0) return typeDiff;

    // Extract paper number (e.g., 12, 42, etc.) from title
    const getPaperNumber = (title: string) => {
      const match = title.match(/Paper\s*(\d+)/i);
      return match ? parseInt(match[1]) : Infinity;
    };

    const aPaperNum = getPaperNumber(a.title);
    const bPaperNum = getPaperNumber(b.title);

    return aPaperNum - bPaperNum;
  });

  const getAdBannerAssets = (subjectName: string) => {
    // Remove syllabus codes in the form "(9706)" or just "9706" at the end
    const cleanName = subjectName
      .replace(/\s*\(.*?\)\s*/g, "") // Remove anything in parentheses
      .replace(/\s*\d{4}\s*$/, "") // Remove 4-digit code at the end
      .trim();

    const kebabName = cleanName.toLowerCase().replace(/\s+/g, "-");

    const imageName = kebabName;

    const isIGCSE = pathname.toLowerCase().includes("igcse");
    const levelPrefix = isIGCSE ? "igcse" : "alevel";

    // Handle special subject slugs for link only
    const linkNameMap: Record<string, string> = {
      "additional-math": "amath",
      "extended-math": "emath",
      maths: "math",
    };

    const finalSlug = linkNameMap[kebabName] || kebabName;

    const link = `https://www.homeschool.asia/${levelPrefix}-${finalSlug}`;

    return {
      src: `/images/ad/ad-${imageName}-v2.png`,
      mobileSrc: `/images/ad/ad-${imageName}-mobile-v2.png`,
      link,
    };
  };

  const getBottomAdBannerAssets = (subjectName: string) => {
    // Remove syllabus codes in the form "(9706)" or just "9706" at the end
    const cleanName = subjectName
      .replace(/\s*\(.*?\)\s*/g, "") // Remove anything in parentheses
      .replace(/\s*\d{4}\s*$/, "") // Remove 4-digit code at the end (e.g., "9706")
      .trim();

    const kebabName = cleanName.toLowerCase().replace(/\s+/g, "-"); // convert to kebab-case

    return {
      src: `/images/bottom-ad/ad-${kebabName}.png`,
      mobileSrc: `/images/bottom-ad/ad-${kebabName}-mobile.png`,
      cleanName,
    };
  };

  const { src, mobileSrc } = getAdBannerAssets(subjectData.name);

  const { src: bottomSrc, mobileSrc: bottomMobileSrc } =
    getBottomAdBannerAssets(subjectData.name);

  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  return (
    <div className="past-papers">
      <DownloadPopup pdf={downloadFileUrl} countdown={countdown} />

      <ImageBanner
        src={src}
        mobileSrc={mobileSrc}
        alt={`${subjectData.name} Ad Banner`}
        link={topAd}
      />

      <div className="past-papers__content">
        <div className="blob-c">
          <div className="shape-blob one"></div>
          <div className="shape-blob two"></div>
        </div>
        <div className="past-papers__container">
          <div className="past-papers__header">
            <div className="past-papers__header-heading">
              <img
                src={image}
                alt="Additional Maths Icon"
                className="past-papers__header-image-img"
              />
              <h1 className={`past-papers__header-title ${className}`}>
                {heading}
              </h1>
            </div>

            <p className="past-papers__description">
              Browse the most recent past papers of{" "}
              <strong>
                {isIGCSE ? "IGCSE" : "AS and A Level"} {subjectData.name}
              </strong>{" "}
              and its marking schemes, available in an easy-to-view and
              downloadable PDF for free.
            </p>
          </div>

          <div className="past-papers__paper-section">
            {/* Filter Section */}
            <div className="past-papers__filter">
              <h2 className="past-papers__filter-title">Past Paper</h2>

              <div className="past-papers__filter-years">
                {Object.keys(uniqueTimeframes)
                  .sort((a, b) => Number(b) - Number(a))
                  .map((year) => (
                    <div className="past-papers__filter-year" key={year}>
                      <div
                        className="past-papers__filter-year-header"
                        onClick={() => handleYearClick(year)}
                      >
                        {year}
                        <img
                          src="/svgs/right-arrow.svg"
                          alt=""
                          className={`past-papers__filter-arrow ${
                            expandedYear === year ? "rotated" : ""
                          }`}
                        />
                      </div>

                      {expandedYear === year && (
                        <ul className="past-papers__filter-sessions">
                          {Array.from(uniqueTimeframes[year])
                            .sort() // optional: sort sessions alphabetically
                            .map((session) => (
                              <li
                                key={session}
                                className={`past-papers__filter-session ${
                                  session === selectedSession ? "active" : ""
                                }`}
                                onClick={() => {
                                  setSelectedSession(session);
                                  setSelectedFileType("Question Paper");
                                }}
                              >
                                {session}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* File Options Section */}
            <div className="past-papers__file-options">
              <div className="past-papers__mobile-filter">
                <div className="past-papers__dropdown-wrapper">
                  <select
                    className="past-papers__mobile-dropdown"
                    // @ts-expect-error Type '{}' is not assignable to type 'string | number | readonly string[] | undefined'.
                    value={expandedYear || ""}
                    onChange={(e) => setExpandedYear(e.target.value)}
                  >
                    {Object.keys(uniqueTimeframes)
                      .sort((a, b) => Number(b) - Number(a))
                      .map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="past-papers__dropdown-wrapper">
                  <select
                    className="past-papers__mobile-dropdown"
                    value={selectedSession || ""}
                    onChange={(e) => {
                      setSelectedSession(e.target.value);
                      setSelectedFileType("Question Paper");
                    }}
                  >
                    {/* @ts-expect-error Type 'unknown' cannot be used as an index type  */}
                    {Array.from(uniqueTimeframes[expandedYear] || [])
                      .sort()
                      .map((session: string) => (
                        <option key={session} value={session}>
                          {session}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="past-papers__file-buttons">
                {fileTypes.map((fileType) => (
                  <button
                    key={fileType}
                    className={`past-papers__file-button ${
                      fileType === selectedFileType ? "active" : ""
                    }`}
                    onClick={() => setSelectedFileType(fileType)}
                  >
                    {fileType}
                  </button>
                ))}
              </div>

              <div className="past-papers__file-list">
                {sortedFilteredPapers.length > 0 ? (
                  sortedFilteredPapers.map((paper: any, index: any) => (
                    <div key={index} className="past-papers__file-item">
                      <div className="past-papers__file-info">
                        <img
                          src="/svgs/pdf.svg"
                          alt="PDF Icon"
                          className="past-papers__file-icon"
                        />
                        <a
                          href={`${paper.id}`}
                          rel="noopener noreferrer"
                          className="past-papers__file-name"
                        >
                          {paper.title}
                        </a>
                      </div>

                      <div className="past-papers__file-actions">
                        <button
                          onClick={() =>
                            handleDownload(`${baseImageUrl}${paper.pdf}`)
                          }
                          className="past-papers__file-action download"
                        >
                          <LuDownload />
                          <span>Download</span>
                        </button>

                        <a
                          // href={paper.pdf}
                          // href={`${baseImageUrl}${paper.pdf}`}
                          href={`${paper.id}`}
                          rel="noopener noreferrer"
                          className="past-papers__file-action view"
                        >
                          <TbFileSearch />
                          <span>View File</span>
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="message">
                    No papers available for the selected filter.
                  </p>
                )}
              </div>
            </div>
          </div>

          <p className="past-papers__description">
            These{" "}
            {/* <strong>
              {isIGCSE ? "IGCSE Past Papers" : "AS and A Level Past Papers"}
            </strong>{" "} */}
            <strong>
              {isIGCSE ? "IGCSE" : "AS and A Level"}{" "}
              {subjectData.name
                .replace(/\s*\(.*?\)\s*/g, "")
                .replace(/\s*\d{4}\s*$/, "")
                .trim()}{" "}
              Past Papers{" "}
            </strong>
            and the marking schemes are available from 2020 to the most recent
            session, organised by year and session for each subject. Practicing
            with past papers helps you get familiar with the exam formats and
            question types of the Cambridge syllabus.
          </p>
        </div>
      </div>

      <ImageBanner
        src={bottomSrc}
        mobileSrc={bottomMobileSrc}
        alt={`${subjectData.name} Ad Banner`}
        link={midAd}
      />

      <div className="gradient__container">
        <div className="blob-c">
          <div className="shape-blob one"></div>
          <div className="shape-blob two"></div>
        </div>

        {faqData.length > 0 && <FAQSection faqData={faqData} paddingVertical />}
      </div>

      {faqData.length > 0 && (
        <ImageBanner
          src="/images/grade/ivy-grade.png"
          mobileSrc="/images/grade/ivy-grade-mobile.png"
          link={bottomAd}
        />
      )}
    </div>
  );
}
