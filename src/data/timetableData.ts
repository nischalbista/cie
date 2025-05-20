export const timetableData = [
  "Cambridge Exam Timetable June 2025 (Zone 1).pdf",
  "Cambridge Exam Timetable June 2025 (Zone 2).pdf",
  "Cambridge Exam Timetable June 2025 (Zone 3).pdf",
  "Cambridge Exam Timetable June 2025 (Zone 4).pdf",
  "Cambridge Exam Timetable June 2025 (Zone 5).pdf",
  "Cambridge Exam Timetable June 2025 (Zone 6).pdf",
  "Cambridge Exam Timetable November 2025 (Zone 1).pdf",
  "Cambridge Exam Timetable November 2025 (Zone 2).pdf",
  "Cambridge Exam Timetable November 2025 (Zone 3).pdf",
  "Cambridge Exam Timetable November 2025 (Zone 4).pdf",
  "Cambridge Exam Timetable November 2025 (Zone 5).pdf",
  "Cambridge Exam Timetable November 2025 (Zone 6).pdf",
].map((filename) => ({
  name: filename.replace(".pdf", ""),
  zone: filename.split("(")[1].split(")")[0],
  url: `/pdfs/Timetable/${filename}`,
}));
