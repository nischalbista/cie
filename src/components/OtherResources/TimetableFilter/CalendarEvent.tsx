import React from "react";
import { FaSun } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSunrise } from "react-icons/lu";

interface CalendarEventProps {
  event: any;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
  const session = event.resource.Session;
  const isAM = session === "AM";
  const isPM = session === "PM";
  const isEV = session === "EV";
  let badgeClass = "timetable-filter__calendar-event";
  if (isAM) badgeClass += " timetable-filter__calendar-event--am";
  else if (isPM) badgeClass += " timetable-filter__calendar-event--pm";
  else if (isEV) badgeClass += " timetable-filter__calendar-event--ev";
  const textColor = isAM
    ? "#ffc107"
    : isPM
    ? "#ff8f00"
    : isEV
    ? "#C05621"
    : "#2d3748";
  const icon = isAM ? (
    <LuSunrise style={{ color: "#ffc107", width: 14, minWidth: 14 }} />
  ) : isPM ? (
    <FaSun style={{ color: "#ff8f00", width: 14, minWidth: 14 }} />
  ) : isEV ? (
    <IoMoon style={{ color: "#e0e7ff", width: 14, minWidth: 14 }} />
  ) : null;
  return (
    <div className={badgeClass}>
      {icon}
      <span
        style={{
          color: textColor,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {event.title}
      </span>
    </div>
  );
};

export default CalendarEvent;
