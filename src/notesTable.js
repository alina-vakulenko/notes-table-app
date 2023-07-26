import { notesHeaders, notesList } from "./data.js";
import { createTable } from "./helpers/createTable.js";

export const renderNotesTable = () => {
  const notesContainer = document.querySelector("#notes-table-container");
  const notesTable = createTable(
    notesHeaders,
    notesList,
    "My notes",
    "notes-table"
  );
  notesContainer.appendChild(notesTable);
};
