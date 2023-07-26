import { notesHeaders, notesList } from "./data.js";
import { createTable } from "./helpers/createTable.js";
import { editIcon, archiveIcon, deleteIcon } from "./helpers/icons.js";
import { resetForm } from "./helpers/resetForm.js";
import { openEditModal } from "./dialog.js";

const handleDeleteNote = (row) => {
  if (confirm("Are you sure to delete this record ?")) {
    document.querySelector("#notes-table").deleteRow(row.rowIndex);
    resetForm("note-form");
  }
};

const handleArchiveNote = (row) => {
  console.log(row);
};

export const recordActions = [
  { name: "Edit", cb: openEditModal },
  { name: "Archive", cb: handleArchiveNote },
  { name: "Delete", cb: handleDeleteNote },
];

export const actionIcons = [editIcon, archiveIcon, deleteIcon];

export const renderNotesTable = () => {
  const notesContainer = document.querySelector("#notes-table-container");

  const notesTable = createTable({
    id: "notes-table",
    titles: notesHeaders,
    records: notesList,
    caption: "My notes",
    recordActions: recordActions,
    icons: actionIcons,
  });

  notesContainer.appendChild(notesTable);
};
