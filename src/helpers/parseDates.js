import { getFormattedDate } from "./getFormattedDate.js";

export const parseDates = (str, options) => {
  const dateRegex = /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
  const dates = [];

  let match;
  while ((match = dateRegex.exec(str)) !== null) {
    const [fullMatch, month, day, year] = match;
    const dateObject = new Date(`${year}-${month}-${day}`);
    dates.push(getFormattedDate(dateObject, options));
  }

  return dates.join(", ");
};
