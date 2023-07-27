import { archiveTableActions, getArchivedNotes } from "./notesTable.js";
import { addRow } from "./helpers/addRow.js";

const renderArchiveTable = () => {
  const archivedNotes = getArchivedNotes();

  if (archivedNotes.length) {
    const archiveTable = document.querySelector("#archive");
    if (archiveTable.classList.contains("hidden")) {
      archiveTable.classList.remove("hidden");
    }
    archivedNotes.forEach((note) =>
      addRow(note, archiveTableActions, archiveTable.querySelector("tbody"))
    );
  }
};

export { renderArchiveTable };
