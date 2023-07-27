import { getFormattedDate } from "./helpers/getFormattedDate.js";
import { parseDates } from "./helpers/parseDates.js";
import { getNoteById, handleAddNote, handleEditNote } from "./notesTable.js";

const dialog = document.querySelector("dialog");
const closeBtn = document.querySelector("#btn-close-modal");
const submitBtn = document.querySelector("#btn-submit");

let currentRowIndex;
let currentNoteId;

const getEditableFormFields = () => {
  const formElements = document.querySelector("#note-form").elements;
  const nameInput = formElements["name"];
  const select = formElements["category"];
  const selectedCategory = select.options[select.selectedIndex];
  const contentInput = formElements["content"];
  const datesInput = formElements["dates"];
  return { nameInput, selectedCategory, contentInput, datesInput };
};

const getNoteFormData = () => {
  const data = {};

  const { nameInput, selectedCategory, contentInput } = getEditableFormFields();
  data["name"] = nameInput.value;
  data["created"] = getFormattedDate(new Date(), {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  data["category"] = selectedCategory.text;
  data["content"] = contentInput.value;
  data["dates"] = parseDates(contentInput.value, {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  return data;
};

const fillNoteEditForm = (noteId) => {
  const { nameInput, selectedCategory, contentInput, datesInput } =
    getEditableFormFields();

  const currentNote = getNoteById(noteId);

  nameInput.value = currentNote.name;
  contentInput.value = currentNote.content;
  datesInput.value = currentNote.dates;
  selectedCategory.text = currentNote.category;
};

const openCreateModal = () => {
  submitBtn.textContent = "Add Note";
  dialog.showModal();
};

const openEditModal = (rowIndex, noteId) => {
  currentRowIndex = rowIndex;
  currentNoteId = noteId;
  fillNoteEditForm(noteId);
  submitBtn.textContent = "Save";
  dialog.showModal();
};

const handleSubmit = () => {
  if (submitBtn.textContent === "Add Note") {
    handleAddNote();
  } else {
    handleEditNote(currentRowIndex, currentNoteId);
  }
};

const closeModal = () => {
  dialog.close();
};

const handleClickOutside = (e) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    closeModal();
  }
};

submitBtn.addEventListener("click", handleSubmit);
closeBtn.addEventListener("click", closeModal);
dialog.addEventListener("click", handleClickOutside);

export { openCreateModal, openEditModal, getNoteFormData };
