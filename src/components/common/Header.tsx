"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoTriangleRight } from "react-icons/go";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const toggleMenuIcon = () => {
      setMenuOpen(!menuOpen);
    };

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

    const handleOverlayClick = () => {
      setSidebarOpen(false);
      setMenuOpen(false);
    };

    const menuToggleElement = document.querySelector(".menu-toggle");
    const mobileToggleElement = document.querySelector(".mobile-toggle");
    const navOverlayElement = document.querySelector(".nav-overlay");

    if (menuToggleElement && mobileToggleElement && navOverlayElement) {
      menuToggleElement.addEventListener("click", toggleMenuIcon);
      mobileToggleElement.addEventListener("click", toggleSidebar);
      navOverlayElement.addEventListener("click", handleOverlayClick);
    }

    return () => {
      if (menuToggleElement && mobileToggleElement && navOverlayElement) {
        menuToggleElement.removeEventListener("click", toggleMenuIcon);
        mobileToggleElement.removeEventListener("click", toggleSidebar);
        navOverlayElement.removeEventListener("click", handleOverlayClick);
      }
    };
  }, [menuOpen, sidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1200);
      if (!isMobileView) {
        setMenuOpen(false);
        setSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileView]);

  useEffect(() => {
    if (sidebarOpen || menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
  }, [sidebarOpen, menuOpen]);

  const navWrapperClassName = `nav-wrapper ${
    isMobileView ? "active-sidebar" : ""
  } ${sidebarOpen ? "open" : ""}`;
  const navOverlayClassName = `nav-overlay ${sidebarOpen ? "open" : ""}`;

  return (
    <>
      <header id="header-wrapper" className="fixed-header">
        <div className="container remove-padding-vertical">
          <div className="nav-container">
            <div className="mobile-logo-wrapper">
              <Link
                href="/"
                className="logo"
                aria-label="Go to CIE Past Papers homepage"
              >
                <img
                  src="/images/logo/CIEPastPapers_main_logo.svg"
                  alt="CIE Past Papers Home"
                />
              </Link>
            </div>
            <div className="nav-bar">
              <div className={navWrapperClassName}>
                <div className="nav-wrapper-inner">
                  <div className="menu-menu-container">
                    <div className="logo-wrapper">
                      <Link
                        href="/"
                        className="logo"
                        aria-label="Go to CIE Past Papers homepage"
                      >
                        <img
                          src="/images/logo/CIEPastPapers_main_logo.svg"
                          alt="CIE Past Papers Home"
                        />
                      </Link>
                    </div>

                    <ul className="menu">
                      <li
                        onClick={() => {
                          setMenuOpen(false);
                          setSidebarOpen(false);
                        }}
                      >
                        <Link
                          href="/"
                          className={`nav-link ${
                            pathname === "/" ? "active" : ""
                          }`}
                        >
                          Home
                        </Link>
                      </li>

                      <li
                        onClick={() => {
                          setMenuOpen(false);
                          setSidebarOpen(false);
                        }}
                      >
                        <Link
                          href="/igcse"
                          className={`nav-link ${
                            pathname === "/igcse" ||
                            pathname.startsWith("/igcse/")
                              ? "active"
                              : ""
                          }`}
                        >
                          IGCSE
                        </Link>
                      </li>

                      <li
                        onClick={() => {
                          setMenuOpen(false);
                          setSidebarOpen(false);
                        }}
                      >
                        <Link
                          href="/a-levels"
                          className={`nav-link ${
                            pathname === "/a-levels" ||
                            pathname.startsWith("/a-levels/")
                              ? "active"
                              : ""
                          }`}
                        >
                          A Levels
                        </Link>
                      </li>

                      <li
                        onMouseEnter={() => setHoveredMenu("other-resources")}
                        onMouseLeave={() => setHoveredMenu(null)}
                        className={
                          hoveredMenu === "other-resources" ? "open" : ""
                        }
                      >
                        <div
                          className={`nav-link ${
                            pathname === "/other-resources" ||
                            pathname.startsWith("/other-resources/")
                              ? "active"
                              : ""
                          }`}
                        >
                          Other Resources
                          <GoTriangleRight
                            className={
                              isMobileView || hoveredMenu === "other-resources"
                                ? "rotate"
                                : ""
                            }
                          />
                        </div>
                        <div
                          className={`sub-menu ${
                            isMobileView || hoveredMenu === "other-resources"
                              ? "open"
                              : ""
                          }`}
                        >
                          <ul className="sub-menu-list">
                            <Link href={"/other-resources/syllabus"}>
                              <li
                                onClick={() => {
                                  setMenuOpen(false);
                                  setSidebarOpen(false);
                                }}
                                className={
                                  pathname === "/other-resources/syllabus"
                                    ? "active"
                                    : ""
                                }
                              >
                                Syllabus
                              </li>
                            </Link>
                            <Link href={"/other-resources/timetable"}>
                              <li
                                onClick={() => {
                                  setMenuOpen(false);
                                  setSidebarOpen(false);
                                }}
                                className={
                                  pathname === "/other-resources/timetable"
                                    ? "active"
                                    : ""
                                }
                              >
                                Timetable
                              </li>
                            </Link>
                          </ul>
                        </div>
                      </li>

                      <li
                        onClick={() => {
                          setMenuOpen(false);
                          setSidebarOpen(false);
                        }}
                      >
                        <Link
                          href="/knowledge-hub"
                          className={`nav-link ${
                            pathname === "/knowledge-hub" ||
                            pathname.startsWith("/knowledge-hub/")
                              ? "active"
                              : ""
                          }`}
                        >
                          Knowledge Hub
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={navOverlayClassName}></div>
            </div>

            <div className="mobile-toggle">
              <div className={`menu-toggle ${menuOpen ? "change" : ""}`}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
