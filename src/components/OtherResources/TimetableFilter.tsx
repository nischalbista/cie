import { extractedExamsData } from "@/src/data/extractedExamsData";
import React, { useState, useMemo } from "react";
import { FaPrint } from "react-icons/fa";

interface ExamData {
  Grade: string;
  "Syllabus/Component": string;
  Code: string;
  Duration: string;
  Session: string;
  Date: string;
  Page: string;
}

const TimetableFilter = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedExamSession, setSelectedExamSession] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [subjectSearch, setSubjectSearch] = useState("");
  const [gradeSearch, setGradeSearch] = useState("");
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);
  const subjectDropdownRef = React.useRef<HTMLDivElement>(null);
  const gradeDropdownRef = React.useRef<HTMLDivElement>(null);

  const examSessions = ["May/June", "Oct/Nov"];
  const zones = ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5", "Zone 6"];
  const years = Object.keys(extractedExamsData["Zone 1"] || {});

  // Handle click outside for both dropdowns
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subjectDropdownRef.current &&
        !subjectDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSubjectDropdownOpen(false);
      }
      if (
        gradeDropdownRef.current &&
        !gradeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsGradeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    if (!selectedZone || !selectedYear || !selectedExamSession) {
      return { dates: [], grades: [], subjects: [] };
    }

    const examData =
      extractedExamsData[selectedZone]?.[selectedYear]?.[selectedExamSession] ||
      [];
    const dates = [...new Set(examData.map((item) => item.Date))];
    const grades = [...new Set(examData.map((item) => item.Grade))];

    // Get unique base subject names (without the part in brackets)
    const subjects = [
      ...new Set(
        examData.map((item) => {
          const subject = item["Syllabus/Component"];
          return subject.split(" (")[0];
        })
      ),
    ];

    return {
      dates,
      grades,
      subjects,
    };
  }, [selectedZone, selectedYear, selectedExamSession]);

  // Filter subjects based on search
  const filteredSubjects = useMemo(() => {
    if (!subjectSearch) return filterOptions.subjects;
    return filterOptions.subjects.filter((subject: string) =>
      subject.toLowerCase().includes(subjectSearch.toLowerCase())
    );
  }, [filterOptions.subjects, subjectSearch]);

  // Filter grades based on search
  const filteredGrades = useMemo(() => {
    if (!gradeSearch) return filterOptions.grades;
    return filterOptions.grades.filter((grade: string) =>
      grade.toLowerCase().includes(gradeSearch.toLowerCase())
    );
  }, [filterOptions.grades, gradeSearch]);

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    if (!selectedZone || !selectedYear || !selectedExamSession) {
      return [];
    }

    const examData =
      extractedExamsData[selectedZone]?.[selectedYear]?.[selectedExamSession] ||
      [];
    return examData
      .filter((item) => {
        const matchesGrade =
          selectedGrades.length === 0 || selectedGrades.includes(item.Grade);
        const matchesSubject =
          selectedSubjects.length === 0 ||
          selectedSubjects.includes(item["Syllabus/Component"].split(" (")[0]);

        return matchesGrade && matchesSubject;
      })
      .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
  }, [
    selectedZone,
    selectedYear,
    selectedExamSession,
    selectedGrades,
    selectedSubjects,
  ]);

  // Handle subject selection
  const handleSubjectSelect = (subject: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) {
        return prev.filter((s) => s !== subject);
      }
      return [...prev, subject];
    });
    setSubjectSearch("");
  };

  // Handle grade selection
  const handleGradeSelect = (grade: string) => {
    setSelectedGrades((prev) => {
      if (prev.includes(grade)) {
        return prev.filter((g) => g !== grade);
      }
      return [...prev, grade];
    });
  };

  const handlePrint = () => {
    const printContent = document.getElementById("printable-table");
    const originalContents = document.body.innerHTML;

    if (printContent) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Examination Timetable</title>
              <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background-color: #f7fafc; font-weight: 600; }
                .date-cell, .day-cell { background-color: #f7fafc; font-weight: 600; }
                @media print {
                  body { padding: 20px; }
                  table { page-break-inside: auto; }
                  tr { page-break-inside: avoid; page-break-after: auto; }
                }
              </style>
            </head>
            <body>
              <h1>Examination Timetable</h1>
              <p>Year: ${selectedYear} | Session: ${selectedExamSession} | Zone: ${selectedZone}</p>
              ${printContent.outerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  const showTable = selectedYear && selectedExamSession && selectedZone;

  // Add new component for selected tags
  const SelectedTags = ({
    items,
    onRemove,
  }: {
    items: string[];
    onRemove: (item: string) => void;
  }) => (
    <div className="timetable-filter__selected-tags">
      {items.map((item) => (
        <div key={item} className="timetable-filter__selected-tag">
          <span>{item}</span>
          <button
            className="timetable-filter__remove-tag"
            onClick={() => onRemove(item)}
            aria-label={`Remove ${item}`}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="timetable-filter">
      <div className="timetable-filter__header">
        <h1 className="timetable-filter__title">Examination Timetable</h1>
        <p className="timetable-filter__subtitle">
          View and filter examination schedules for different subjects and
          grades
        </p>
      </div>

      <div className="timetable-filter__filters">
        <div className="timetable-filter__filters-grid">
          <div className="timetable-filter__form-group">
            <label htmlFor="year" className="timetable-filter__label">
              Year
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="timetable-filter__select"
            >
              <option value="">Select Year</option>
              {years.map((year: string) => (
                <option key={`year-${year}`} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="timetable-filter__form-group">
            <label htmlFor="examSession" className="timetable-filter__label">
              Exam Session
            </label>
            <select
              id="examSession"
              value={selectedExamSession}
              onChange={(e) => setSelectedExamSession(e.target.value)}
              className="timetable-filter__select"
            >
              <option value="">Select Session</option>
              {examSessions.map((session: string) => (
                <option key={`exam-session-${session}`} value={session}>
                  {session}
                </option>
              ))}
            </select>
          </div>

          <div className="timetable-filter__form-group">
            <label htmlFor="zone" className="timetable-filter__label">
              Zone
            </label>
            <select
              id="zone"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="timetable-filter__select"
            >
              <option value="">Select Zone</option>
              {zones.map((zone: string) => (
                <option key={`zone-${zone}`} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>

          <div className="timetable-filter__form-group">
            <label htmlFor="grade" className="timetable-filter__label">
              Grade
            </label>
            <div
              className="timetable-filter__searchable-select"
              ref={gradeDropdownRef}
            >
              <input
                type="text"
                value={gradeSearch}
                onChange={(e) => {
                  setGradeSearch(e.target.value);
                  setIsGradeDropdownOpen(true);
                }}
                onFocus={() => setIsGradeDropdownOpen(true)}
                placeholder={
                  selectedGrades.length > 0
                    ? `${selectedGrades.length} grade${
                        selectedGrades.length > 1 ? "s" : ""
                      } selected`
                    : "Search grades..."
                }
                className="timetable-filter__search-input"
                disabled={!showTable}
              />
              {selectedGrades.length > 0 && (
                <SelectedTags
                  items={selectedGrades}
                  onRemove={(grade) => handleGradeSelect(grade)}
                />
              )}
              {isGradeDropdownOpen && showTable && (
                <div className="timetable-filter__dropdown">
                  {filteredGrades.map((grade: string) => (
                    <div
                      key={`grade-${grade}`}
                      className={`timetable-filter__dropdown-option ${
                        selectedGrades.includes(grade)
                          ? "timetable-filter__dropdown-option--selected"
                          : ""
                      }`}
                      onClick={() => handleGradeSelect(grade)}
                    >
                      {grade}
                      {selectedGrades.includes(grade) && (
                        <span className="timetable-filter__check-mark">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="timetable-filter__form-group">
            <label htmlFor="subject" className="timetable-filter__label">
              Subject
            </label>
            <div
              className="timetable-filter__searchable-select"
              ref={subjectDropdownRef}
            >
              <input
                type="text"
                value={subjectSearch}
                onChange={(e) => {
                  setSubjectSearch(e.target.value);
                  setIsSubjectDropdownOpen(true);
                }}
                onFocus={() => setIsSubjectDropdownOpen(true)}
                placeholder={
                  selectedSubjects.length > 0
                    ? `${selectedSubjects.length} subject${
                        selectedSubjects.length > 1 ? "s" : ""
                      } selected`
                    : "Search subjects..."
                }
                className="timetable-filter__search-input"
                disabled={!showTable}
              />
              {selectedSubjects.length > 0 && (
                <SelectedTags
                  items={selectedSubjects}
                  onRemove={(subject) => handleSubjectSelect(subject)}
                />
              )}
              {isSubjectDropdownOpen && showTable && (
                <div className="timetable-filter__dropdown">
                  {filteredSubjects.map((subject: string) => (
                    <div
                      key={`subject-${subject}`}
                      className={`timetable-filter__dropdown-option ${
                        selectedSubjects.includes(subject)
                          ? "timetable-filter__dropdown-option--selected"
                          : ""
                      }`}
                      onClick={() => handleSubjectSelect(subject)}
                    >
                      {subject}
                      {selectedSubjects.includes(subject) && (
                        <span className="timetable-filter__check-mark">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!showTable ? (
        <div className="timetable-filter__message">
          <div className="timetable-filter__message-title">
            Welcome to the Examination Timetable
          </div>
          <p className="timetable-filter__message-text">
            To view the examination schedule, please select:
          </p>
          <div className="timetable-filter__message-steps">
            <div className="timetable-filter__message-step">
              <span className="timetable-filter__step-number">1.</span>
              <span className="timetable-filter__step-text">Year</span>
            </div>
            <div className="timetable-filter__message-step">
              <span className="timetable-filter__step-number">2.</span>
              <span className="timetable-filter__step-text">Exam Session</span>
            </div>
            <div className="timetable-filter__message-step">
              <span className="timetable-filter__step-number">3.</span>
              <span className="timetable-filter__step-text">Zone</span>
            </div>
          </div>
          <p className="timetable-filter__message-footer">
            After selecting these, you can further filter by Grade and Subject
            to find specific examination schedules.
          </p>
        </div>
      ) : (
        <>
          <div className="timetable-filter__actions">
            <button
              onClick={handlePrint}
              className="timetable-filter__print-button"
            >
              <FaPrint className="timetable-filter__print-icon" />
              <span>Print Timetable</span>
            </button>
          </div>

          <div className="timetable-filter__table-wrapper">
            <table id="printable-table" className="timetable-filter__table">
              <thead>
                <tr className="timetable-filter__table-head-row">
                  <th className="timetable-filter__table-head-cell">Date</th>
                  <th className="timetable-filter__table-head-cell">Day</th>
                  <th className="timetable-filter__table-head-cell">
                    Syllabus/Component
                  </th>
                  <th className="timetable-filter__table-head-cell">
                    Subject Code
                  </th>
                  <th className="timetable-filter__table-head-cell">Paper</th>
                  <th className="timetable-filter__table-head-cell">
                    Duration
                  </th>
                  <th className="timetable-filter__table-head-cell">Session</th>
                  <th className="timetable-filter__table-head-cell">Grade</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => {
                  const [day, ...dateParts] = item.Date.split(" ");
                  const date = dateParts.join(" ");
                  return (
                    <tr
                      key={index}
                      className="timetable-filter__table-body-row"
                    >
                      <td className="timetable-filter__table-cell">
                        {item.Date}
                      </td>
                      <td className="timetable-filter__table-cell">
                        {item.Day}
                      </td>
                      <td className="timetable-filter__table-cell">
                        {item["Syllabus/Component"]}
                      </td>
                      <td className="timetable-filter__table-cell">
                        {item["Subject Code"]}
                      </td>
                      <td className="timetable-filter__table-cell">
                        {item.Paper}
                      </td>
                      <td className="timetable-filter__table-cell">
                        {item.Duration}
                      </td>
                      <td className="timetable-filter__table-cell">
                        {item.Session}
                      </td>
                      <td className="timetable-filter__table-cell">
                        {item.Grade}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default TimetableFilter;
