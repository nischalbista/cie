import React from "react";

const PreFooter = () => {
  return (
    <div className="prefooter">
      <div className="prefooter__container container">
        <div className="prefooter__logo">
          <img
            src="/images/logo/homeschool_asia.svg"
            alt="Homeschool Asia Logo"
            className="prefooter__logo-image"
          />
        </div>

        <div className="prefooter__content">
          <h1 className="prefooter__title">
            A Complete Homeschooling Solution
          </h1>

          <p className="prefooter__description">
            Access complete structured content, including Interactive Videos,
            Testpapers, and Revision Notes for Cambridge IGCSE & AS/A Levels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
