import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__container">
          <div className="footer__logo">
            <img
              src="/images/logo/CIEPastPapers_white_logo.png"
              alt="CIE Past Papers Logo"
              className="footer__logo-image"
            />
          </div>

          <div className="footer__content">
            <div className="footer__resources">
              <ul className="footer__list">
                <li className="footer__item">
                  <Link href="/igcse" className="footer__link">
                    IGCSE
                  </Link>
                </li>

                <li className="footer__item">
                  <Link href="/knowledge-hub" className="footer__link">
                    Knowledge Hub
                  </Link>
                </li>

                <li className="footer__item">
                  <Link href="/a-levels" className="footer__link">
                    A Levels
                  </Link>
                </li>

                <li className="footer__item">
                  <Link
                    href="/other-resources/syllabus"
                    className="footer__link"
                  >
                    Other Resources
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__contact container">
        <p className="footer__copyright">
          Copyright © {new Date().getFullYear()} | CIE Past Papers | All rights
          reserved.
        </p>

        <ul className="social__icons">
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=61575303358243"
              target="_blank"
            >
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/cie.pastpapers/" target="_blank">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@cie.pastpapers" target="_blank">
              <FaTiktok />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
