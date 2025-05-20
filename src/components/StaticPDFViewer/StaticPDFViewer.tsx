"use client";
import React, { useEffect, useState } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";

const StaticPDFViewer = ({ matchedFile }) => {
  const [parentPath, setParentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;

      // Get only the first 3 segments after splitting (which are: '', 'other-resources', 'syllabus')
      const segments = currentPath.split("/").slice(0, 3);

      const computedParentPath = segments.join("/") + "/"; // ensure trailing slash

      setParentPath(computedParentPath);
    }
  }, []);

  return (
    <div className="pdf-viewer">
      <header className="pdf-viewer__header">
        <a className="pdf-viewer__logo" href="/">
          <img src="/images/logo/CIEPastPapers_main_logo.svg" alt="Logo" />
        </a>

        <a href={parentPath} className="pdf-viewer__close-button">
          <IoClose />
        </a>
      </header>

      <main className="pdf-viewer__main">
        <aside className="pdf-viewer__sidebar">
          <a href="https://app.homeschool.asia/signup" target="_blank">
            <img
              src="/images/pdf-ad.png"
              alt="Advertisement"
              className="desktop"
            />

            <img
              src="/images/pdf-viewer-ad-mobile.png"
              alt=""
              className="mobile"
            />
          </a>

          <a href={parentPath} className="pdf-viewer__close-button">
            <IoArrowBack />
          </a>
        </aside>

        <section className="pdf-viewer__iframe-wrapper">
          <iframe
            src={`${matchedFile.url}#view=FitH`}
            title={matchedFile.name}
            className="pdf-viewer__iframe viewdocument viewdocument2"
            frameBorder="0"
            width="100%"
            height="100%"
          ></iframe>
        </section>
      </main>
    </div>
  );
};

export default StaticPDFViewer;
