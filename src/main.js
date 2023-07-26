import { renderNotesTable } from "./notesTable.js";
import { openCreateModal } from "./dialog.js";

renderNotesTable();

const addNoteBtn = document.querySelector("#btn-add-note");

addNoteBtn.addEventListener("click", openCreateModal);
