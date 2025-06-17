import React from "react";
import { FaSun } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSunrise } from "react-icons/lu";

const SessionLegend: React.FC = () => (
  <div className="timetable-filter__session-legend">
    <div className="timetable-filter__session-badge timetable-filter__session-badge--am">
      {/* <FaSun style={{ color: "#e3b73e", width: 14, minWidth: 14 }} /> */}
      <img src="/svgs/am.svg" alt="" />
      Morning (AM)
    </div>
    <div className="timetable-filter__session-badge timetable-filter__session-badge--pm">
      {/* <FaSun style={{ color: "#fb8e33", width: 14, minWidth: 14 }} /> */}
      <img src="/svgs/pm.svg" alt="" />
      Afternoon (PM)
    </div>
    <div className="timetable-filter__session-badge timetable-filter__session-badge--ev">
      {/* <IoMoon style={{ color: "#5445a0", width: 14, minWidth: 14 }} /> */}
      <img src="/svgs/ev.svg" alt="" />
      Evening (EV)
    </div>
  </div>
);

export default SessionLegend;
