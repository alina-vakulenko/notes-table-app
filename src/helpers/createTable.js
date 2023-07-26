import { addRow } from "./addRow.js";

const createTableHead = (titles, icons) => {
  const tableHead = document.createElement("thead");
  const headRow = document.createElement("tr");

  titles.forEach((title) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = title;
    headRow.appendChild(headerCell);
  });

  icons.forEach((icon) => {
    const headerCell = document.createElement("th");
    headerCell.appendChild(icon);
    headRow.appendChild(headerCell);
  });

  tableHead.appendChild(headRow);

  return tableHead;
};

const createTable = ({
  id,
  titles,
  records,
  caption,
  recordActions,
  icons,
}) => {
  const table = document.createElement("table");

  if (id) {
    table.id = id;
  }

  if (caption) {
    const tableCaption = table.createCaption();
    tableCaption.textContent = caption;
  }

  const tableHead = createTableHead(titles, icons);
  table.appendChild(tableHead);

  const tableBody = table.createTBody();
  records.forEach((record) => {
    addRow(record, recordActions, tableBody);
  });

  return table;
};

export { createTable };
