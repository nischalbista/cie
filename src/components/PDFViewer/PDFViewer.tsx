"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";

const PDFViewer = ({ pdfData }) => {
  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const pdfUrl = `${baseImageUrl}${pdfData.pdf}`;

  const [parentPath, setParentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const computedParentPath = currentPath.endsWith("/")
        ? currentPath.slice(0, -1).split("/").slice(0, -1).join("/") + "/"
        : currentPath.split("/").slice(0, -1).join("/") + "/";
      setParentPath(computedParentPath);
    }
  }, []);

  return (
    <>
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
              src={`${pdfUrl}#view=FitH`}
              title={pdfData.title}
              className="pdf-viewer__iframe viewdocument viewdocument2"
              frameBorder="0"
              width="100%"
              height="100%"
            ></iframe>
          </section>
        </main>
      </div>
    </>
  );
};

export default PDFViewer;
