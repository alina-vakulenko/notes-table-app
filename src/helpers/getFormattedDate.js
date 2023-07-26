export const getFormattedDate = (dateObject, options) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObject
  );

  return formattedDate;
};
