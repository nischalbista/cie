import Link from "next/link";
import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="error-page">
      <div className="blob-c">
        <div className="shape-blob one"></div>
        <div className="shape-blob two"></div>
      </div>

      <div className=" error-page__container container">
        <img className="error-page__image" src="/images/404.png" alt="404" />

        <Link href="/">
          <button className="primary-btn">Bring Me to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
