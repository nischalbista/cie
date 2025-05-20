"use client";
import ImageBanner from "@/src/components/common/ImageBanner";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const articles = [
  {
    id: 1,
    title: "How to Pass Your A-Level Chemistry: A Simple Guide to Success",
    slug: "how-to-pass-a-level-chemistry-guide",
    date: "30 April, 2025",
    category: "Exam Guides",
    image: "/images/knowledge-hub/how-to-pass-a-level-chemistry-guide.jpg",
  },
  {
    id: 2,
    title: "Understanding Grade Thresholds in A Levels",
    slug: "understanding-grade-thresholds-a-levels",
    date: "30 April, 2025",
    category: "Useful Resources",
    image: "/images/knowledge-hub/understanding-grade-thresholds-a-levels.png",
  },
];

// Add "All" to the beginning of the tag list
const uniqueTags = [
  "All",
  ...new Set(articles.map((article) => article.category)),
];

const KnowledgeHub = () => {
  const articlesPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");

  const filteredArticles =
    filter === "All"
      ? articles
      : articles.filter((article) => article.category === filter);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="knowledge-hub">
        <div className="blob-c">
          <div className="shape-blob one"></div>
          <div className="shape-blob two"></div>
          <div className="shape-blob three"></div>
        </div>

        <div className="container">
          <div className="knowledge-hub__intro">
            <h1 className="knowledge-hub__title">Knowledge Hub</h1>
            <p className="knowledge-hub__description">
              Whether you’re a student striving for academic excellence or an
              educator committed to empowering students, explore valuable
              insights, tips, and resources through our blogs and newsletters.
            </p>
          </div>

          <div className="knowledge-hub__content">
            <div className="knowledge-hub__filters">
              {uniqueTags.map((tag) => (
                <button
                  key={tag}
                  className={`knowledge-hub__filter-btn ${
                    filter === tag ? "active" : ""
                  }`}
                  onClick={() => {
                    setFilter(tag);
                    setCurrentPage(1);
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="archive__list">
              {currentArticles.map((article) => (
                <div key={article.id} className="item">
                  <a
                    href={`/knowledge-hub/${article.slug}`}
                    className="link"
                  ></a>
                  <div className="item__image">
                    <img src={article.image} alt={article.title} />
                  </div>
                  <div className="content">
                    <p className="date">
                      <span className="post__type">{article.category}</span>{" "}
                      {article.date}
                    </p>
                    <h3 className="title">{article.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                className="knowledge-hub__pagination"
                aria-label="Page navigation"
              >
                <ul className="knowledge-hub__pagination-list">
                  <li className="knowledge-hub__pagination-item">
                    <button
                      className="knowledge-hub__pagination-btn knowledge-hub__pagination-btn--prev"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <FaChevronLeft />
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <li className="knowledge-hub__pagination-item" key={index}>
                      <button
                        className={`knowledge-hub__pagination-btn ${
                          currentPage === index + 1
                            ? "knowledge-hub__pagination-btn--active"
                            : ""
                        }`}
                        onClick={() => goToPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}

                  <li className="knowledge-hub__pagination-item">
                    <button
                      className="knowledge-hub__pagination-btn knowledge-hub__pagination-btn--next"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <FaChevronRight />
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>

      <ImageBanner
        src="/images/homeschool-asia-ad-v3.png"
        mobileSrc="/images/homeschool-asia-ad-mobile.svg"
        alt="Ad Banner"
      />
    </>
  );
};

export default KnowledgeHub;
