import { extractedExamsData } from "@/src/data/extractedExamsData";
import React, { useState, useMemo } from "react";
import {
  FaPrint,
  FaCalendarAlt,
  FaTable,
  FaInfoCircle,
  FaSun,
} from "react-icons/fa";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, startOfMonth } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IoMoon } from "react-icons/io5";
import { TbSunset2 } from "react-icons/tb";
import { LuSunrise } from "react-icons/lu";
import SessionLegend from "./TimetableFilter/SessionLegend";
import CalendarEvent from "./TimetableFilter/CalendarEvent";
import EventDetailsModal from "./TimetableFilter/EventDetailsModal";
import SelectedTags from "./TimetableFilter/SelectedTags";
import SessionTooltip from "./TimetableFilter/SessionTooltip";
import { getZoneFromLocation } from "@/src/utils/getZoneFromLocation";
import TimeTableDropdownData from "@/src/components/OtherResources/TimeTableDropdownData";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const CustomToolbar = (toolbar: any) => {
  return (
    <div className="timetable-filter__calendar-toolbar">
      <div className="timetable-filter__calendar-toolbar-left">
        <button
          onClick={() => toolbar.onNavigate("TODAY")}
          className="timetable-filter__calendar-button"
        >
          Today
        </button>
        <div className="timetable-filter__calendar-navigation">
          <button
            onClick={() => toolbar.onNavigate("PREV")}
            className="timetable-filter__calendar-button"
          >
            &lt;
          </button>
          <span className="timetable-filter__calendar-title">
            {toolbar.label}
          </span>
          <button
            onClick={() => toolbar.onNavigate("NEXT")}
            className="timetable-filter__calendar-button"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Helper to get session icon and color
const getSessionIcon = (session: string) => {
  if (session === "AM") {
    return (
      <LuSunrise style={{ color: "#e3b73e", marginRight: 4 }} title="AM" />
    );
  } else if (session === "PM") {
    return <FaSun style={{ color: "#fb8e33", marginRight: 4 }} title="PM" />;
  } else if (session === "EV") {
    return <IoMoon style={{ color: "#5445a0", marginRight: 4 }} title="EV" />;
  } else {
    return null;
  }
};

const TimetableFilter = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedExamSession, setSelectedExamSession] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [subjectSearch, setSubjectSearch] = useState("");
  const [gradeSearch, setGradeSearch] = useState("");
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const subjectDropdownRef = React.useRef<HTMLDivElement>(null);
  const gradeDropdownRef = React.useRef<HTMLDivElement>(null);
  const [view, setView] = useState(Views.MONTH);
  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfMonth(new Date())
  );
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const examSessions = ["May/June", "Oct/Nov"];
  const years = Object.keys(extractedExamsData["Zone 1"] || {});

  // Handle country selection and map to zone
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedText = e.target.options[e.target.selectedIndex].text;
    const [locationPart] = selectedText.split(" - ");
    const [country, capital] = locationPart
      .split(",")
      .map((str: string) => str.trim());
    const zone = getZoneFromLocation(country, capital);
    setSelectedCountry(e.target.value);
    setSelectedZone(zone);
  };

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

    // Filter subjects based on selected grades
    let filteredExamData = examData;
    if (selectedGrades.length > 0) {
      filteredExamData = examData.filter((item) =>
        selectedGrades.includes(item.Grade)
      );
    }

    // Get unique base subject names (without the part in brackets)
    const subjects = [
      ...new Set(
        filteredExamData.map((item) => {
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
  }, [selectedZone, selectedYear, selectedExamSession, selectedGrades]);

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
    const data = examData
      .filter((item) => {
        const matchesGrade =
          selectedGrades.length === 0 || selectedGrades.includes(item.Grade);
        const matchesSubject =
          selectedSubjects.length === 0 ||
          selectedSubjects.includes(item["Syllabus/Component"].split(" (")[0]);

        return matchesGrade && matchesSubject;
      })
      .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

    return data;
  }, [
    selectedZone,
    selectedYear,
    selectedExamSession,
    selectedGrades,
    selectedSubjects,
  ]);

  // Jump to the month of the first exam in filteredData when filters change
  React.useEffect(() => {
    if (filteredData.length > 0) {
      const firstExam = filteredData[0];
      // Parse the date string properly
      const dateParts = firstExam.Date.split(" ");
      const day = dateParts[0];
      const month = dateParts[1];
      const year = dateParts[2];
      const examDate = new Date(`${month} ${day}, ${year}`);
      setSelectedDate(startOfMonth(examDate));
    }
  }, [selectedExamSession, filteredData.length]);

  // Convert exam data to calendar events
  const calendarEvents = useMemo(() => {
    if (!filteredData.length) return [];

    return filteredData.map((exam, index) => {
      // Parse the date string properly
      const dateParts = exam.Date.split(" ");
      const day = dateParts[0];
      const month = dateParts[1];
      const year = dateParts[2];

      // Create date object with the correct year
      const examDate = new Date(`${month} ${day}, ${year}`);

      // Set the correct time based on session
      const startHour = exam.Session === "AM" ? 9 : 13;
      const durationHours = parseInt(exam.Duration.split(" ")[0]);

      // Ensure start and end are on the same day
      const startDate = new Date(examDate);
      startDate.setHours(startHour, 0, 0, 0);

      let endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + durationHours);
      // Clamp endDate to 23:59:59.999 of the same day if it spills over
      if (
        endDate.getDate() !== startDate.getDate() ||
        endDate.getMonth() !== startDate.getMonth() ||
        endDate.getFullYear() !== startDate.getFullYear()
      ) {
        endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
      }

      return {
        id: `${exam.Code}-${exam.Date}-${exam.Session}-${exam.Paper}-${index}`,
        title: `${exam["Syllabus/Component"]} (${exam.Grade}) - ${exam.Paper}`,
        start: startDate,
        end: endDate,
        resource: exam,
        allDay: false,
        tooltip: `${exam["Syllabus/Component"]} (${exam.Grade}) - ${exam.Paper}\nSubject Code: ${exam["Subject Code"]}\nPaper: ${exam.Paper}\nDuration: ${exam.Duration}\nSession: ${exam.Session}`,
      };
    });
  }, [filteredData]);

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

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleNavigate = (newDate: Date) => {
    setSelectedDate(startOfMonth(newDate));
  };

  const handleViewChange = (newView: string) => {
    setView(newView);
  };

  // Session abbreviation to full name mapping
  const sessionFullName = {
    AM: "Morning",
    PM: "Afternoon",
    EV: "Evening",
  };

  // Tooltip state for mouse position and visibility (move to top-level of component)
  const [tooltip, setTooltip] = React.useState<{
    visible: boolean;
    x: number;
    y: number;
    message: string;
  }>({ visible: false, x: 0, y: 0, message: "" });

  // Hide tooltip on scroll or mouse leave (move to top-level of component)
  React.useEffect(() => {
    const hide = () => setTooltip((t) => ({ ...t, visible: false }));
    window.addEventListener("scroll", hide, true);
    return () => window.removeEventListener("scroll", hide, true);
  }, []);

  // Delay timer ref (move to top-level of component)
  const tooltipTimer = React.useRef<number | null>(null);

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
            <label htmlFor="country" className="timetable-filter__label">
              Country
            </label>
            <select
              id="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="timetable-filter__select"
            >
              <option value="">Select Country</option>
              <TimeTableDropdownData />
            </select>
            {selectedZone && (
              <div className="timetable-filter__zone-display">
                <span className="timetable-filter__zone-label">Zone:</span>
                <span className="timetable-filter__zone-value">
                  {selectedZone}
                </span>
              </div>
            )}
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
              <span className="timetable-filter__step-text">Country</span>
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
            <div className="timetable-filter__view-toggle">
              <button
                className={`timetable-filter__view-button ${
                  viewMode === "table" ? "active" : ""
                }`}
                onClick={() => setViewMode("table")}
              >
                <FaTable />
                <span>Table View</span>
              </button>
              <button
                className={`timetable-filter__view-button ${
                  viewMode === "calendar" ? "active" : ""
                }`}
                onClick={() => setViewMode("calendar")}
              >
                <FaCalendarAlt />
                <span>Calendar View</span>
              </button>
            </div>
            {viewMode === "table" && (
              <button
                onClick={handlePrint}
                className="timetable-filter__print-button"
              >
                <FaPrint className="timetable-filter__print-icon" />
                <span>Print Timetable</span>
              </button>
            )}
          </div>

          {viewMode === "table" ? (
            <div className="timetable-filter__table-wrapper">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: 8,
                }}
              >
                <SessionLegend />
              </div>
              <table id="printable-table" className="timetable-filter__table">
                <thead>
                  <tr className="timetable-filter__table-head-row">
                    <th className="timetable-filter__table-head-cell date-cell">
                      Date
                    </th>
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
                    <th className="timetable-filter__table-head-cell">
                      Session
                    </th>
                    <th className="timetable-filter__table-head-cell">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const groupColorMap = new Map<string, number>();
                    let colorCounter = 1;
                    const maxColors = 7;

                    const duplicateGroupIds: (string | null)[] =
                      filteredData.map((item) => {
                        let duplicateGroupId: string | null = null;
                        let count = 0;
                        for (let j = 0; j < filteredData.length; j++) {
                          if (
                            item.Date === filteredData[j].Date &&
                            item.Day === filteredData[j].Day &&
                            item["Syllabus/Component"] ===
                              filteredData[j]["Syllabus/Component"] &&
                            item["Subject Code"] ===
                              filteredData[j]["Subject Code"] &&
                            item.Session === filteredData[j].Session
                          ) {
                            count++;
                          }
                        }
                        if (count > 1) {
                          duplicateGroupId =
                            item.Date +
                            "|" +
                            item.Day +
                            "|" +
                            item["Syllabus/Component"] +
                            "|" +
                            item["Subject Code"] +
                            "|" +
                            item.Session;
                        }
                        return duplicateGroupId;
                      });

                    return (
                      <>
                        {filteredData.map((item, index) => {
                          const duplicateGroupId = duplicateGroupIds[index];
                          let colorClass = "";
                          if (duplicateGroupId) {
                            if (!groupColorMap.has(duplicateGroupId)) {
                              groupColorMap.set(duplicateGroupId, colorCounter);
                              colorCounter = (colorCounter % maxColors) + 1;
                            }
                            const colorIdx =
                              groupColorMap.get(duplicateGroupId);
                            colorClass = `color-${colorIdx}`;
                          }

                          // Tooltip for duplicate row
                          const duplicateTooltip = duplicateGroupId
                            ? "Similar row detected: This row has the same class as another. Please check for possible confusion."
                            : "";

                          // Mouse event handlers for tooltip
                          const handleMouseEnter = (
                            e: React.MouseEvent<HTMLTableRowElement>
                          ) => {
                            if (!duplicateGroupId) return;
                            if (tooltipTimer.current)
                              window.clearTimeout(tooltipTimer.current);
                            const target = e.currentTarget as HTMLElement;
                            const rect = target.getBoundingClientRect();
                            tooltipTimer.current = window.setTimeout(() => {
                              setTooltip({
                                visible: true,
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                                message: duplicateTooltip,
                              });
                            }, 350);
                          };
                          const handleMouseLeave = () => {
                            if (tooltipTimer.current)
                              window.clearTimeout(tooltipTimer.current);
                            setTooltip((t) => ({ ...t, visible: false }));
                          };

                          return (
                            <tr
                              key={index}
                              className={`timetable-filter__table-body-row${
                                duplicateGroupId
                                  ? " timetable-filter__table-body-row--duplicate " +
                                    colorClass
                                  : ""
                              }`}
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                            >
                              <td className="timetable-filter__table-cell date-cell">
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
                                <SessionTooltip
                                  text={`${
                                    sessionFullName[item.Session] ||
                                    item.Session
                                  } (${item.Session})`}
                                >
                                  {getSessionIcon(item.Session)}
                                  <span
                                    style={{
                                      color:
                                        item.Session === "AM"
                                          ? "#e3b73e"
                                          : item.Session === "PM"
                                          ? "#fb8e33"
                                          : item.Session === "EV"
                                          ? "#5445a0"
                                          : "#e2e8f0",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {sessionFullName[item.Session] ||
                                      item.Session}
                                  </span>
                                </SessionTooltip>
                              </td>
                              <td className="timetable-filter__table-cell">
                                {item.Grade}
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    );
                  })()}
                </tbody>
              </table>
              {/* Tooltip element moved outside of table */}
              {tooltip.visible && (
                <div
                  className="timetable-filter__hover-tooltip timetable-filter__hover-tooltip--custom"
                  style={{
                    position: "fixed",
                    left: tooltip.x,
                    top: tooltip.y - 12,
                    zIndex: 9999,
                    pointerEvents: "none",
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <div className="timetable-filter__hover-tooltip-content">
                    {tooltip.message}
                  </div>
                </div>
              )}
              <div className="timetable-filter__source-line">
                <FaInfoCircle style={{ marginRight: 6, color: "#3182ce" }} />
                <span>
                  Sourced from{" "}
                  <a
                    href="https://www.cambridgeinternational.org/exam-administration/cambridge-exams-officers-guide/phase-1-preparation/timetabling-exams/exam-timetables/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#3182ce", textDecoration: "underline" }}
                  >
                    Cambridge Exam Administration
                  </a>
                </span>
              </div>
            </div>
          ) : (
            <div className="timetable-filter__calendar-wrapper">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: 8,
                }}
              >
                <SessionLegend />
              </div>
              <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 700 }}
                view={view}
                onView={handleViewChange}
                onNavigate={handleNavigate}
                onSelectEvent={handleEventClick}
                views={[Views.MONTH]}
                defaultView={Views.MONTH}
                date={selectedDate}
                eventPropGetter={(event) => {
                  const session = event.resource?.Session;
                  const isAM = session === "AM";
                  const isPM = session === "PM";
                  const isEV = session === "EV";
                  return {
                    className: "",
                    style: {
                      background: isAM
                        ? "#e3b73e" // light yellow for morning
                        : isPM
                        ? "#fb8e33" // warm light tan-orange for afternoon
                        : isEV
                        ? "#5445a0" // dark blue for evening
                        : "#e2e8f0", // default/fallback

                      color: isAM
                        ? "#e3b73e" // bright amber for AM
                        : isPM
                        ? "#fb8e33" // deep amber for PM
                        : isEV
                        ? "#E0E7FF" // pale/light blue for EV text contrast
                        : "#2d3748", // fallback

                      borderRadius: 6,

                      borderLeft: isAM
                        ? "4px solid #a07a1c" // sun yellow border
                        : isPM
                        ? "4px solid #b2540f" // orange border
                        : isEV
                        ? "4px solid #2b226b" // light blue border for contrast
                        : "4px solid #e2e8f0",

                      fontWeight: 600,
                      fontSize: 13,

                      boxShadow: isAM
                        ? "0 1px 4px #FFF9DB55"
                        : isPM
                        ? "0 1px 4px #FFE7C255"
                        : isEV
                        ? "0 1px 4px #2C528255"
                        : "0 1px 4px #e2e8f055",

                      display: "flex",
                      alignItems: "center",
                      padding: "2px 4px",
                    },
                  };
                }}
                tooltipAccessor={(event) =>
                  `${event.resource["Syllabus/Component"]} (${event.resource.Grade}) - ${event.resource.Paper}\nDuration: ${event.resource.Duration}\nSession: ${event.resource.Session}`
                }
                popup
                selectable
                step={60}
                timeslots={1}
                min={new Date(0, 0, 0, 8, 0, 0)}
                max={new Date(0, 0, 0, 18, 0, 0)}
                dayLayoutAlgorithm="no-overlap"
                components={{
                  toolbar: CustomToolbar,
                  event: CalendarEvent,
                }}
              />
              <EventDetailsModal
                show={showEventDetails}
                event={selectedEvent}
                onClose={() => setShowEventDetails(false)}
              />
              <div className="timetable-filter__source-line">
                <FaInfoCircle style={{ marginRight: 6, color: "#3182ce" }} />
                <span>
                  Sourced from{" "}
                  <a
                    href="https://www.cambridgeinternational.org/exam-administration/cambridge-exams-officers-guide/phase-1-preparation/timetabling-exams/exam-timetables/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#3182ce", textDecoration: "underline" }}
                  >
                    Cambridge Exam Administration
                  </a>
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TimetableFilter;
