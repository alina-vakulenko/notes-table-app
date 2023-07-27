import { notesHeaders, notesList } from "./initialData/data.js";
import { createTable } from "./helpers/createTable.js";
import {
  editIcon,
  archiveIcon,
  deleteIcon,
  unarchiveIcon,
} from "./helpers/icons.js";
import { addRow } from "./helpers/addRow.js";
import { resetForm } from "./helpers/resetForm.js";
import { getFormattedDate } from "./helpers/getFormattedDate.js";
import { getNoteFormData, openEditModal, closeModal } from "./noteFormModal.js";
import { updateSummary } from "./summaryTable.js";

let actualNotesList = [...notesList];

const getNoteById = (noteId) => {
  return actualNotesList.find((note) => note.id === noteId);
};

const getNotesCount = (filters) => {
  const { category, archived } = filters;

  return actualNotesList.filter(
    (note) => note.category === category && note.archived === archived
  ).length;
};

const getArchivedNotes = () => {
  return actualNotesList.filter((note) => note.archived);
};

const getActiveNotes = () => {
  return actualNotesList.filter((note) => !note.archived);
};

const validateInputs = (inputs) => {
  const errors = [];

  if (!inputs.name) {
    errors.push({ field: "name", message: "Name should not be empty" });
  }

  if (inputs.category === "-- Select category --") {
    errors.push({
      field: "category",
      message: "Category not selected",
    });
  }

  return errors;
};

const handleAddNote = () => {
  const formData = getNoteFormData();

  const newRecord = {
    ...formData,
    id: Date.now().toString(),
    created: getFormattedDate(new Date(), {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };

  const errors = validateInputs(newRecord);
  const errorField = document.querySelector("#error-msg");

  if (errors.length > 0) {
    const message = errors.map((error) => error.message).join(" & ");
    errorField.textContent = message;
  } else {
    errorField.textContent = "";
    actualNotesList = [...actualNotesList, newRecord];

    const tbody = document.querySelector("#notes-table tbody");
    if (tbody.parentElement.classList.contains("hidden")) {
      tbody.parentElement.classList.remove("hidden");
    }

    addRow(newRecord, notesTableActions, tbody);
    updateSummary(newRecord.category);
    resetForm("note-form");
    closeModal();
  }
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

  const formData = getNoteFormData();
  const { name, category, content } = formData;
  const errors = validateInputs(formData);
  const errorField = document.querySelector("#error-msg");

  if (errors.length > 0) {
    const message = errors.map((error) => error.message).join("\n");
    errorField.textContent = message;
  } else {
    errorField.textContent = "";
    nameField.textContent = name;
    categoryField.textContent = category;
    contentField.textContent = content;
    const currentNote = getNoteById(noteId);
    const updatedNote = {
      ...currentNote,
      name: name,
      category: category,
      content: content,
    };
    const otherNotes = actualNotesList.filter((note) => note.id !== noteId);

    actualNotesList = [...otherNotes, updatedNote];
    updateSummary(currentNote.category);
    resetForm("note-form");
    closeModal();
  }
};

const handleArchiveNote = (rowIndex, noteId) => {
  const currentNote = getNoteById(noteId);

  const archivedNote = { ...currentNote, archived: true };
  const otherNotes = actualNotesList.filter((note) => note.id !== noteId);

  actualNotesList = [...otherNotes, archivedNote];

  const notesTable = document.querySelector("#notes-table");
  notesTable.deleteRow(rowIndex);

  if (notesTable.querySelector("tbody").rows.length === 0) {
    notesTable.classList.add("hidden");
  }

  const archiveTable = document.querySelector("#archive");
  if (archiveTable.classList.contains("hidden")) {
    archiveTable.classList.remove("hidden");
  }

  addRow(
    archivedNote,
    archiveTableActions,
    archiveTable.querySelector("tbody")
  );
  updateSummary(currentNote.category);
};

const handleUnarchiveNote = (rowIndex, noteId) => {
  const currentNote = getNoteById(noteId);
  const unarchivedNote = { ...currentNote, archived: false };
  const otherNotes = actualNotesList.filter((note) => note.id !== noteId);

  actualNotesList = [...otherNotes, unarchivedNote];

  const archiveTable = document.querySelector("#archive");
  archiveTable.deleteRow(rowIndex);

  if (archiveTable.querySelector("tbody").rows.length === 0) {
    archiveTable.classList.add("hidden");
  }

  const tBodyNotes = document.querySelector("#notes-table tbody");
  if (tBodyNotes.parentElement.classList.contains("hidden")) {
    tBodyNotes.parentElement.classList.remove("hidden");
  }

  addRow(unarchivedNote, notesTableActions, tBodyNotes);
  updateSummary(currentNote.category);
};

const handleDeleteNote = (rowIndex, noteId) => {
  if (confirm("Are you sure you want to delete this record ?")) {
    const currentNote = getNoteById(noteId);
    const notesTable = document.querySelector("#notes-table");
    notesTable.deleteRow(rowIndex);

    if (notesTable.querySelector("tbody").rows.length === 0) {
      notesTable.classList.add("hidden");
    }

    actualNotesList = actualNotesList.filter((note) => note.id !== noteId);
    updateSummary(currentNote.category);
  }
};

const handleDeleteArchivedNote = (rowIndex, noteId) => {
  const currentNote = getNoteById(noteId);
  const archiveTable = document.querySelector("#archive");
  archiveTable.deleteRow(rowIndex);

  if (archiveTable.querySelector("tbody").rows.length === 0) {
    archiveTable.classList.add("hidden");
  }

  actualNotesList = actualNotesList.filter((note) => note.id !== noteId);
  updateSummary(currentNote.category);
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
  const activeNotes = getActiveNotes();

  if (activeNotes.length) {
    const notesContainer = document.querySelector("#notes-table-container");

    const notesTable = createTable({
      id: "notes-table",
      titles: notesHeaders,
      records: activeNotes,
      caption: "Active notes",
      recordActions: notesTableActions,
    });

    notesContainer.appendChild(notesTable);
  }
};

export {
  renderNotesTable,
  getNoteById,
  getNotesCount,
  getArchivedNotes,
  handleAddNote,
  handleEditNote,
};
