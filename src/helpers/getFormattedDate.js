export const getCurrentFormattedDate = () => {
  const currentDate = new Date();
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

  return formattedDate;
};
