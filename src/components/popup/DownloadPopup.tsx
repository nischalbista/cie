"use client";
import { useAtom } from "jotai";
import { showDownloadPopupAtom } from "@/src/atoms/atoms";
import { IoClose } from "react-icons/io5";

/* eslint-disable  @typescript-eslint/no-explicit-any */
const DownloadPopup = ({ fileUrl, countdown }: any) => {
  const [showDownloadPopup, setShowDownloadPopup] = useAtom(
    showDownloadPopupAtom
  );

  const handleManualDownload = () => {
    // Trigger the download manually when "click here" is clicked
    if (fileUrl) {
      fetch(fileUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = fileUrl.split("/").pop()!;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        })
        .catch((error) => {
          console.error("Download error:", error);
        });
    }
  };

  return (
    <div className={`popup ${showDownloadPopup ? "show" : ""}`}>
      <div className="popup__content">
        <button
          className="popup__close-button"
          onClick={() => setShowDownloadPopup(false)}
        >
          <IoClose className="popup__close-icon" />
        </button>

        <div className="popup__info-container">
          <a href="https://app.homeschool.asia/signup" target="_blank">
            <img
              src="/images/download-popup-image.png"
              alt=""
              className="popup__image popup__image-desktop"
            />
          </a>

          <a href="https://app.homeschool.asia/signup" target="_blank">
            <img
              src="/images/download-popup-image-mobile.png"
              alt=""
              className="popup__image popup__image-mobile"
            />
          </a>

          <div className="popup__info">
            <h2 className="popup__message">
              Your download will start in{" "}
              <span className="popup__countdown">{countdown}</span> seconds.
            </h2>
            <p className="popup__instructions">
              If your download doesn&apos;t start automatically,{" "}
              <span onClick={handleManualDownload}>click here</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPopup;
