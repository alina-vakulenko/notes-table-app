export const addRow = (tableID, data) => {
  const tableRef = document.getElementById(tableID);
  const newRow = tableRef?.insertRow(-1);

  Object.values(data).forEach((value, index) => {
    const newCell = newRow.insertCell(index);
    const data = document.createTextNode(value);
    newCell.appendChild(data);
  });
};
