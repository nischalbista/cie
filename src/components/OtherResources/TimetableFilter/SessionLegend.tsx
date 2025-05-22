import React from "react";
import { FaSun } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSunrise } from "react-icons/lu";

const SessionLegend: React.FC = () => (
  <div className="timetable-filter__session-legend">
    <div className="timetable-filter__session-badge timetable-filter__session-badge--am">
      <FaSun style={{ color: "#ffc107", width: 14, minWidth: 14 }} />
      Morning (AM)
    </div>
    <div className="timetable-filter__session-badge timetable-filter__session-badge--pm">
      <FaSun style={{ color: "#ff8f00", width: 14, minWidth: 14 }} />
      Afternoon (PM)
    </div>
    <div className="timetable-filter__session-badge timetable-filter__session-badge--ev">
      <IoMoon style={{ color: "#e0e7ff", width: 14, minWidth: 14 }} />
      Evening (EV)
    </div>
  </div>
);

export default SessionLegend;
