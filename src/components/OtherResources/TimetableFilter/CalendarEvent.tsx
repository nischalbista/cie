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
    ? "#e3b73e"
    : isPM
    ? "#fb8e33"
    : isEV
    ? "#5445a0"
    : "#2d3748";
  // const icon = isAM ? (
  //   <LuSunrise style={{ color: "#a07a1c", width: 14, minWidth: 14 }} />
  // ) : isPM ? (
  //   <FaSun style={{ color: "#fb8e33", width: 14, minWidth: 14 }} />
  // ) : isEV ? (
  //   <IoMoon style={{ color: "#5445a0", width: 14, minWidth: 14 }} />
  // ) : null;
  return (
    <div className={badgeClass}>
      {/* {icon} */}
      <span
        style={{
          // color: textColor,
          fontWeight: 400,
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
