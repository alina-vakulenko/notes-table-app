export const createTable = (
  headers = [],
  records = [],
  caption = "",
  id = ""
) => {
  const table = document.createElement("table");

  if (id) {
    table.id = id;
  }

  if (caption) {
    const tableTitle = document.createElement("caption");
    const captionText = document.createTextNode(caption);
    tableTitle.appendChild(captionText);
    table.appendChild(tableTitle);
  }

  if (headers.length > 0) {
    const tableHead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    headers.forEach((header) => {
      const columnHeader = document.createElement("th");
      const title = document.createTextNode(header);
      columnHeader.appendChild(title);
      headerRow.appendChild(columnHeader);
    });

    tableHead.appendChild(headerRow);
    table.appendChild(tableHead);
  }

  const tableBody = document.createElement("tbody");
  records.forEach((record) => {
    const row = document.createElement("tr");
    Object.values(record).forEach((value) => {
      const cell = document.createElement("td");
      const cellContent = document.createTextNode(value);
      cell.appendChild(cellContent);
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
  table.appendChild(tableBody);

  return table;
};
