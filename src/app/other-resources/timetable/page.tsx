"use client";
import ImageBanner from "@/src/components/common/ImageBanner";
import DownloadPopup from "@/src/components/popup/DownloadPopup";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { showDownloadPopupAtom, countdownAtom } from "@/src/atoms/atoms";
import { TbFileSearch } from "react-icons/tb";
import { LuDownload } from "react-icons/lu";
import { FaCopy, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { timetableData } from "@/src/data/timetableData";
import { getZoneFromLocation } from "@/src/utils/getZoneFromLocation";
import { slugify } from "@/src/utils/slugify";
import TimeTableDropdownData from "@/src/components/OtherResources/TimeTableDropdownData";
import TimetableFilter from "@/src/components/OtherResources/TimetableFilter";

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

  const [searchTerm] = useState("");

  const [selectedZone, setSelectedZone] = useState("");

  // Define the default option value for the dropdown
  const defaultOptionValue = "";

  // const handleShare = (platform: string) => {
  //   const encodedUrl = encodeURIComponent(currentUrl);

  //   let shareUrl = "";

  //   switch (platform) {
  //     case "facebook":
  //       shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  //       break;
  //     case "twitter":
  //       shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
  //       break;
  //     case "whatsapp":
  //       shareUrl = `https://api.whatsapp.com/send?text=${encodedUrl}`;
  //       break;
  //     case "copy":
  //       navigator.clipboard.writeText(currentUrl).then(() => {
  //         setCopied(true);

  //         setTimeout(() => {
  //           setCopied(false);
  //         }, 1000);
  //       });
  //       return;
  //     default:
  //       return;
  //   }

  //   window.open(shareUrl, "_blank");
  // };

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

  function handleChange(e) {
    const selectedValue = e.target.value;
    if (selectedValue === "default") {
      setSelectedZone("");
      return;
    }

    const selectedText = e.target.options[e.target.selectedIndex].text;

    // Split on the first hyphen to remove the timezone
    const [locationPart] = selectedText.split(" - ");

    // Split into country and capital
    const [country, capital] = locationPart
      .split(",")
      .map((str: string) => str.trim());

    // Add null/undefined check before calling getZoneFromLocation
    if (!country || !capital) {
      setSelectedZone(""); // or set to a default/fallback value
      return;
    }

    const zone = getZoneFromLocation(country, capital);
    setSelectedZone(zone); // Set the selected zone
  }

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
              <h1 className="title">
                Exam timetables for Cambridge IGCSE, O Level and A Level
              </h1>
              <p className="description">
                View the accurate exam timetables for your Cambridge IGCSE, O
                Level and A Level examinations, tailored to your specific
                country and administrative zone. Download the exam timetable you
                need to plan your study routine, making learning more organised.
              </p>
            </div>

            {/* <div className="past-papers__search">
              <h2 className="level__search-title">
                Please select your location below to check which administrative
                zone you are in.
              </h2>

              <div className="past-papers__dropdown-wrapper">
                <select
                  className="past-papers__mobile-dropdown"
                  onChange={handleChange}
                >
                  <TimeTableDropdownData />
                </select>
              </div>

              {selectedZone && (
                <p className="past-papers__zone-text">
                  <strong>Your Zone:</strong> {selectedZone}
                </p>
              )}
            </div> */}

            <div className="past-papers__paper-section">
              <div className="past-papers__file-options">
                <div className="past-papers__file-list">
                  {(() => {
                    const filteredFiles = timetableData.filter(
                      (file) =>
                        file.zone === selectedZone && // Filter by zone
                        file.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    );

                    return filteredFiles.map((file, idx) => (
                      <div className="past-papers__file-item" key={idx}>
                        <div className="past-papers__file-info">
                          <img
                            src="/svgs/pdf.svg"
                            alt="PDF Icon"
                            className="past-papers__file-icon"
                          />
                          <a
                            href={`/other-resources/timetable/${slugify(
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
                            href={`/other-resources/timetable/${slugify(
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

          {/* Share this page section */}
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

        <TimetableFilter />
      </div>

      <ImageBanner
        src="/images/grade/ivy-grade.png"
        mobileSrc="/images/grade/ivy-grade-mobile.png"
        link="https://app.homeschool.asia/signup?utm_source=ciepastpaper&utm_medium=igcse_mid"
      />
    </div>
  );
}
