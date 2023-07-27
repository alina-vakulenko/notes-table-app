import { createIconButton } from "./createIconButton.js";

const addButton = (action, row, noteId) => {
  const newCell = row.insertCell(-1);
  const button = createIconButton(action.icon, action.name);
  button.addEventListener("click", () => action.cb(row.rowIndex, noteId));
  newCell.appendChild(button);
};

const addRow = (data, recordActions, tableElement) => {
  const newRow = tableElement.insertRow(-1);

  const { id: noteId, name, created, category, content, dates } = data;

  const rowName = newRow.insertCell();
  rowName.textContent = name;
  rowName.dataset.field = "name";

  const rowCreated = newRow.insertCell();
  rowCreated.textContent = created;
  rowCreated.dataset.field = "created";

  const rowCategory = newRow.insertCell();
  rowCategory.textContent = category;
  rowCategory.dataset.field = "category";

  const rowContent = newRow.insertCell();
  rowContent.textContent = content;
  rowContent.dataset.field = "content";

  const rowDates = newRow.insertCell();
  rowDates.textContent = dates;
  rowDates.dataset.field = "dates";

  if (recordActions) {
    recordActions.forEach((action) => addButton(action, newRow, noteId));
  }
};

export { addRow };
