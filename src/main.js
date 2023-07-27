import { renderNotesTable, renderSummaryTable } from "./notesTable.js";
import { openCreateModal } from "./dialog.js";

renderNotesTable();
renderSummaryTable();

const addNoteBtn = document.querySelector("#btn-add-note");

addNoteBtn.addEventListener("click", openCreateModal);
