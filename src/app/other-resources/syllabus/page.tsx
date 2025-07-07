"use client";
import ImageBanner from "@/src/components/common/ImageBanner";
import DownloadPopup from "@/src/components/popup/DownloadPopup";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { showDownloadPopupAtom, countdownAtom } from "@/src/atoms/atoms";
import { TbFileSearch } from "react-icons/tb";
import { LuDownload } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { FaCopy, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { syllabusData } from "@/src/data/syllabusData";
import { slugify } from "@/src/utils/slugify";

type SyllabusLevel = keyof typeof syllabusData;

export default function PastPapers() {
  const [showDownloadPopup, setShowDownloadPopup] = useAtom(
    showDownloadPopupAtom
  );
  const [downloadFileUrl, setDownloadFileUrl] = useState(null);
  const [countdown, setCountdown] = useAtom(countdownAtom);
  const [downloadInProgress, setDownloadInProgress] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Store the timer ID
  const fetchControllerRef = useRef<AbortController | null>(null); // Store the AbortController

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const [copied, setCopied] = useState(false);

  const [activeLevel, setActiveLevel] = useState<SyllabusLevel>("IGCSE");

  const [searchTerm, setSearchTerm] = useState("");

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(currentUrl);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodedUrl}`;
        break;
      case "copy":
        navigator.clipboard.writeText(currentUrl).then(() => {
          setCopied(true);

          setTimeout(() => {
            setCopied(false);
          }, 1000);
        });
        return;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
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

  const handleDownload = (fileUrl) => {
    if (!fileUrl || downloadInProgress) return; // Prevent duplicate downloads

    setDownloadFileUrl(fileUrl);
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
          fetch(fileUrl, { signal: controller.signal })
            .then((response) => response.blob())
            .then((blob) => {
              const blobUrl = window.URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = blobUrl;
              link.download = fileUrl.split("/").pop();
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

  return (
    <div className="past-papers-syllabus">
      <DownloadPopup fileUrl={downloadFileUrl} countdown={countdown} />

      <ImageBanner
        src="/images/homeschool-asia-ad-v3.png"
        mobileSrc="/images/homeschool-asia-ad-mobile.svg"
        alt="Ad Banner"
      />
      <div className="past-papers__content">
        <div className="blob-c">
          <div className="shape-blob one"></div>
          <div className="shape-blob two"></div>
        </div>

        <div className="past-papers__container">
          <div className="past-papers__syllabus-container">
            <div className="past-papers__syllabus">
              <h1 className="title">Syllabus</h1>

              <p className="description">
                Find the latest syllabus for Cambridge IGCSE and AS/A Levels.
                Browse a comprehensive library, organised by subject and year,
                and download the exact syllabus you need—quickly and easily.
              </p>

              <div className="past-papers__button-group">
                <button
                  className={activeLevel === "IGCSE" ? "active" : ""}
                  onClick={() => setActiveLevel("IGCSE")}
                >
                  IGCSE
                </button>
                <button
                  className={activeLevel === "ALevels" ? "active" : ""}
                  onClick={() => setActiveLevel("ALevels")}
                >
                  A Levels
                </button>
              </div>
            </div>

            <div className="past-papers__search">
              <h2 className="level__search-title">{activeLevel} Syllabus</h2>

              <div className="level__search-input">
                <IoSearchSharp className="level__search-icon" />

                <input
                  className="level__search-field"
                  type="text"
                  placeholder={`Search all ${activeLevel} syllabus ...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="past-papers__paper-section">
              <div className="past-papers__file-options">
                <div className="past-papers__file-list">
                  {(() => {
                    const filteredFiles = syllabusData[activeLevel].filter(
                      (file) =>
                        file.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    );

                    if (filteredFiles.length === 0) {
                      return (
                        <div className="past-papers__no-results">
                          No results found for &quot;{searchTerm}&quot;
                        </div>
                      );
                    }

                    return filteredFiles.map((file, idx) => (
                      <div className="past-papers__file-item" key={idx}>
                        <div className="past-papers__file-info">
                          <img
                            src="/svgs/pdf.svg"
                            alt="PDF Icon"
                            className="past-papers__file-icon"
                          />
                          <a
                            href={`/other-resources/syllabus/${activeLevel}/${slugify(
                              file.name
                            )}`}
                            rel="noopener noreferrer"
                            className="past-papers__file-name"
                          >
                            {file.name}
                          </a>
                        </div>

                        <div className="past-papers__file-actions">
                          <button
                            onClick={() => handleDownload(file.url)}
                            className="past-papers__file-action download"
                          >
                            <LuDownload />
                            <span>Download</span>
                          </button>

                          <a
                            href={`/other-resources/syllabus/${activeLevel}/${slugify(
                              file.name
                            )}`}
                            rel="noopener noreferrer"
                            className="past-papers__file-action view"
                          >
                            <TbFileSearch />
                            <span>View File</span>
                          </a>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="past-papers__share-section">
            <div className="past-papers__share-box">
              <h3 className="past-papers__share-title">Share this page</h3>

              <div className="past-papers__share-buttons">
                <button
                  onClick={() => handleShare("facebook")}
                  className="past-papers__share-button facebook"
                >
                  <FaFacebookF />
                  Share
                </button>

                <button
                  onClick={() => handleShare("twitter")}
                  className="past-papers__share-button twitter"
                >
                  <FaTwitter />
                  Share
                </button>

                <button
                  onClick={() => handleShare("whatsapp")}
                  className="past-papers__share-button whatsapp"
                >
                  <FaWhatsapp />
                  Share
                </button>

                <button
                  onClick={() => handleShare("copy")}
                  className="past-papers__share-button copy"
                >
                  {copied ? (
                    "Copied"
                  ) : (
                    <>
                      <FaCopy />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="past-papers__share-image">
              <img src="/images/video-for-all.png" alt="" />
            </div>
          </div> */}
        </div>
      </div>

      <ImageBanner
        src="/images/grade/ivy-grade.png"
        mobileSrc="/images/grade/ivy-grade-mobile.png"
        link="https://app.homeschool.asia/signup?utm_source=ciepastpaper&utm_medium=igcse_mid"
      />

      {/* <div className="gradient__container">
        <div className="blob-c">
          <div className="shape-blob one"></div>
          <div className="shape-blob two"></div>
        </div>

        <div className="live-support__container container add-margin-top">
          <ImageBanner src="/images/live-support-green.png" />
        </div>
      </div> */}
    </div>
  );
}
