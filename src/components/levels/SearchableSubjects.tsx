"use client";

import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSubjectAssets } from "@/src/utils/getSubjectAssets";

export default function SearchableSubjects({ subjects }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = subjects
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const pathname = usePathname();

  const isALevels = pathname.includes("a-levels");

  return (
    <>
      <div className="level__search">
        <h3 className="level__search-name">
          Search {isALevels ? "A Levels" : "IGCSE"} Subjects
        </h3>

        <div className="level__search-input">
          <IoSearchSharp className="level__search-icon" />

          <input
            className="level__search-field"
            type="text"
            placeholder={`Search all ${
              isALevels ? "A Levels" : "IGCSE"
            } subjects ...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="level__subjects">
        {filteredSubjects.length === 0 ? (
          <p className="level__no-results">
            No matching subjects were found for your search.
          </p>
        ) : (
          filteredSubjects.map((subject, index) => {
            const { image, className } = getSubjectAssets(subject.name);

            return (
              <Link
                href={`${
                  subject.grade === "A Levels"
                    ? `/a-levels/${subject.slug}`
                    : `/igcse/${subject.slug}`
                }`}
                key={index}
              >
                <div className="level__subject">
                  <div className="level__subject-info">
                    <img
                      className="level__subject-image"
                      src={image}
                      alt={subject.name}
                    />
                    <h2 className={`level__subject-title ${className}`}>
                      {subject.name}
                    </h2>
                  </div>

                  <button className="level__subject-button">
                    <FaChevronRight />
                  </button>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
}
