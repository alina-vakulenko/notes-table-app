import { editIcon, archiveIcon, deleteIcon } from "./icons.js";
import { createIconButton } from "./createIconButton.js";

const addButton = (action, row) => {
  const newCell = row.insertCell(-1);
  switch (action.name.toLowerCase()) {
    case "edit":
      const editButton = createIconButton(editIcon, "Edit");
      editButton.addEventListener("click", () => action.cb(row));
      newCell.appendChild(editButton);
      break;
    case "archive":
      const archiveButton = createIconButton(archiveIcon, "Archive");
      archiveButton.addEventListener("click", () => action.cb(row));
      newCell.appendChild(archiveButton);
      break;
    case "delete":
      const deleteButton = createIconButton(deleteIcon, "Delete");
      deleteButton.addEventListener("click", () => action.cb(row));
      newCell.appendChild(deleteButton);
      break;
    default:
      throw new Error(`Unexpected action name ${action.name}`);
  }
};

const addRow = (data, recordActions, tableElement) => {
  const newRow = tableElement.insertRow(-1);

  Object.entries(data).forEach(([key, value], index) => {
    const newCell = newRow.insertCell(index);
    newCell.dataset.field = key;
    newCell.textContent = value;
  });

  if (recordActions) {
    recordActions.forEach((action) => addButton(action, newRow));
  }
};

export { addRow };
