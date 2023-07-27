import { getFormattedDate } from "./getFormattedDate.js";

export const parseDates = (str, options) => {
  const dateRegex = /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
  const dates = [];

  const matches = str.matchAll(dateRegex);
  for (const match of matches) {
    const [fullMatch, month, day, year] = match;
    const dateObject = new Date(`${year}-${month}-${day}`);
    try {
      const formattedDate = getFormattedDate(dateObject, options);
      dates.push(formattedDate);
    } catch {
      dates.push("unrecognized date");
    }
  }

  return dates.join(", ");
};
