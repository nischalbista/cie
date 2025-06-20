import React, { useEffect, useState } from "react";

interface SelectedTagsProps {
  items: string[];
  section: string;
  onRemove: (item: string) => void;
}

const SelectedTags: React.FC<SelectedTagsProps> = ({
  items,
  onRemove,
  section,
}) => {
  const [additionalSubjectLength, setAdditionalSubjectLength] = useState(0);

  useEffect(() => {
    if (section === "subjects") {
      setAdditionalSubjectLength(items.length > 8 ? items.length - 8 : 0);
    }
  }, [items, section]);

  return (
    <div className="timetable-filter__selected-tags">
      {items.slice(0, 8).map((item) => (
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
      {additionalSubjectLength > 0 && (
        <>
          {section === "subjects" && items.length > 8 && (
            <p className="additional-subject-info">
              +{additionalSubjectLength} Subject
              {additionalSubjectLength > 1 ? "s" : null}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default SelectedTags;
