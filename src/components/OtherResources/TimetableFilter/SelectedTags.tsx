import React from "react";

interface SelectedTagsProps {
  items: string[];
  onRemove: (item: string) => void;
}

const SelectedTags: React.FC<SelectedTagsProps> = ({ items, onRemove }) => (
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

export default SelectedTags;
