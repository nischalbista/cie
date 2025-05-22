import React from "react";

interface EventDetailsModalProps {
  show: boolean;
  event: any;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  show,
  event,
  onClose,
}) => {
  if (!show || !event) return null;
  const exam = event.resource;
  return (
    <div className="timetable-filter__event-modal">
      <div className="timetable-filter__event-modal-content">
        <button
          className="timetable-filter__event-modal-close"
          onClick={onClose}
        >
          ×
        </button>
        <h3 className="timetable-filter__event-modal-title">
          {exam["Syllabus/Component"]}
        </h3>
        <div className="timetable-filter__event-modal-details">
          <div className="timetable-filter__event-modal-row">
            <span className="timetable-filter__event-modal-label">Grade:</span>
            <span className="timetable-filter__event-modal-value">
              {exam.Grade}
            </span>
          </div>
          <div className="timetable-filter__event-modal-row">
            <span className="timetable-filter__event-modal-label">Date:</span>
            <span className="timetable-filter__event-modal-value">
              {exam.Date}
            </span>
          </div>
          <div className="timetable-filter__event-modal-row">
            <span className="timetable-filter__event-modal-label">Time:</span>
            <span className="timetable-filter__event-modal-value">
              {exam.Session}
            </span>
          </div>
          <div className="timetable-filter__event-modal-row">
            <span className="timetable-filter__event-modal-label">
              Duration:
            </span>
            <span className="timetable-filter__event-modal-value">
              {exam.Duration}
            </span>
          </div>
          <div className="timetable-filter__event-modal-row">
            <span className="timetable-filter__event-modal-label">
              Subject Code:
            </span>
            <span className="timetable-filter__event-modal-value">
              {exam["Subject Code"]}
            </span>
          </div>
          <div className="timetable-filter__event-modal-row">
            <span className="timetable-filter__event-modal-label">Paper:</span>
            <span className="timetable-filter__event-modal-value">
              {exam.Paper}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
