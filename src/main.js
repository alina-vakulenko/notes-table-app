import { renderNotesTable } from "./notesTable.js";
import { openModal } from "./dialog.js";

renderNotesTable();

const addNoteBtn = document.querySelector("#btn-add-note");
addNoteBtn.addEventListener("click", openModal);
