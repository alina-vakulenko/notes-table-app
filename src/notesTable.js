import { notesHeaders, notesList } from "./data.js";
import { createTable } from "./helpers/createTable.js";
import {
  editIcon,
  archiveIcon,
  deleteIcon,
  unarchiveIcon,
} from "./helpers/icons.js";
import { addRow } from "./helpers/addRow.js";
import { resetForm } from "./helpers/resetForm.js";
import { getNoteFormData, openEditModal } from "./dialog.js";

let actualNotesList = [...notesList];

const getNoteById = (noteId) => {
  return actualNotesList.find((note) => note.id === noteId);
};

const getArchivedNotes = () => {
  return actualNotesList.filter((note) => note.archived === true);
};

const handleAddNote = () => {
  const newRecord = getNoteFormData();
  actualNotesList = [...actualNotesList, newRecord];
  const tbody = document.querySelector("#notes-table tbody");
  addRow(newRecord, notesTableActions, tbody);
  resetForm("note-form");
};

const handleEditNote = (rowIndex, noteId) => {
  const notesTable = document.querySelector("#notes-table");
  const currentRow = notesTable.rows[rowIndex];

  const nameField = currentRow.querySelector(
    '#notes-table [data-field="name"]'
  );
  const categoryField = currentRow.querySelector(
    '#notes-table [data-field="category"]'
  );
  const contentField = currentRow.querySelector(
    '#notes-table [data-field="content"]'
  );
  const datesField = currentRow.querySelector(
    '#notes-table [data-field="dates"]'
  );

  const { name, category, content, dates } = getNoteFormData();

  nameField.textContent = name;
  categoryField.textContent = category;
  contentField.textContent = content;
  datesField.textContent = dates;

  const currentNote = getNoteById(noteId);
  const updatedNote = {
    ...currentNote,
    name: name,
    category: category,
    content: content,
    dates: dates,
  };
  const otherNotes = actualNotesList.filter((note) => note.id !== noteId);

  actualNotesList = [...otherNotes, updatedNote];

  resetForm("note-form");
};

const handleArchiveNote = (rowIndex, noteId) => {
  const currentNote = getNoteById(noteId);
  const archivedNote = { ...currentNote, archived: true };
  const otherNotes = actualNotesList.filter((note) => note.id !== noteId);

  actualNotesList = [...otherNotes, archivedNote];

  document.querySelector("#notes-table").deleteRow(rowIndex);
  const tBodyArchive = document.querySelector("#archive tbody");
  addRow(archivedNote, archiveTableActions, tBodyArchive);
};

const handleUnarchiveNote = (rowIndex, noteId) => {
  const currentNote = getNoteById(noteId);
  const unarchivedNote = { ...currentNote, archived: false };
  const otherNotes = actualNotesList.filter((note) => note.id !== noteId);

  actualNotesList = [...otherNotes, unarchivedNote];

  document.querySelector("#archive").deleteRow(rowIndex);
  const tBodyNotes = document.querySelector("#notes-table tbody");
  addRow(unarchivedNote, notesTableActions, tBodyNotes);
};

const handleDeleteNote = (rowIndex, noteId) => {
  if (confirm("Are you sure you want to delete this record ?")) {
    document.querySelector("#notes-table").deleteRow(rowIndex);

    actualNotesList = actualNotesList.filter((note) => note.id !== noteId);
  }
};

const handleDeleteArchivedNote = (rowIndex, noteId) => {
  document.querySelector("#archive").deleteRow(rowIndex);
  actualNotesList = actualNotesList.filter((note) => note.id !== noteId);
};

const notesTableActions = [
  { name: "Edit", cb: openEditModal, icon: editIcon },
  { name: "Archive", cb: handleArchiveNote, icon: archiveIcon },
  { name: "Delete", cb: handleDeleteNote, icon: deleteIcon },
];

export const archiveTableActions = [
  { name: "Unarchive", cb: handleUnarchiveNote, icon: unarchiveIcon },
  { name: "Delete", cb: handleDeleteArchivedNote, icon: deleteIcon },
];

const renderNotesTable = () => {
  const notesContainer = document.querySelector("#notes-table-container");

  const notesTable = createTable({
    id: "notes-table",
    titles: notesHeaders,
    records: notesList,
    caption: "My notes",
    recordActions: notesTableActions,
  });

  notesContainer.appendChild(notesTable);
};

export { renderNotesTable, getNoteById, handleAddNote, handleEditNote };
