"use client";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";

const InitialPopup = () => {
  const [showInitialPopup, setShowInitialPopup] = useState(false);

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Lock or unlock body scroll based on popup visibility
  useEffect(() => {
    if (showInitialPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [showInitialPopup]);

  return (
    <div className={`popup ${showInitialPopup ? "show" : ""}`}>
      <div className="popup__content cursor-pointer">
        <button
          className="popup__close-button"
          onClick={() => setShowInitialPopup(false)}
        >
          <IoClose className="popup__close-icon" />
        </button>

        <a
          href="https://app.homeschool.asia/signup?utm_source=ciepastpaper&utm_medium=popup"
          target="_blank"
        >
          <div className="popup__info-container no-background">
            <img
              src="/images/initial-popup-v2.png"
              alt=""
              className="popup__image popup__image-desktop"
            />

            <img
              src="/images/initial-popup-mobile.png"
              alt=""
              className="popup__image popup__image-mobile"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default InitialPopup;
