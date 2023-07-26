import { addRow } from "./helpers/addRow.js";
import { resetForm } from "./helpers/resetForm.js";
import { getCurrentFormattedDate } from "./helpers/getFormattedDate.js";

const getNoteFormData = () => {
  const data = {};
  data["name"] = document.querySelector("[data-id='name']").value;
  data["created"] = getCurrentFormattedDate();
  const categorySelect = document.querySelector("[data-id='category']");
  data["category"] = categorySelect.options[categorySelect.selectedIndex].text;
  data["content"] = document.querySelector("[data-id='content']").value;
  data["dates"] = "";
  return data;
};

const handleAddNoteSubmit = () => {
  const newRecord = getNoteFormData();
  addRow("notes-table", newRecord);
  resetForm("note-form");
};

export { handleAddNoteSubmit };
