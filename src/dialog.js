import { addRow } from "./helpers/addRow.js";
import { getFormattedDate } from "./helpers/getFormattedDate.js";
import { resetForm } from "./helpers/resetForm.js";
import { recordActions } from "./notesTable.js";

const dialog = document.querySelector("dialog");
const closeBtn = document.querySelector("#btn-close-modal");
const submitBtn = document.querySelector("#btn-submit");

let currentRow;

const getEditableFormFields = () => {
  const formElements = document.querySelector("#note-form").elements;
  const nameInput = formElements["name"];
  const select = formElements["category"];
  const selectedCategory = select.options[select.selectedIndex];
  const contentInput = formElements["content"];
  const datesInput = formElements["dates"];
  return { nameInput, selectedCategory, contentInput, datesInput };
};

const parseDates = (str) => {
  const dateRegex = /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g;
  const dates = [];

  let match;
  while ((match = dateRegex.exec(str)) !== null) {
    const [fullMatch, month, day, year] = match;
    const dateObject = new Date(`${year}-${month}-${day}`);
    dates.push(
      getFormattedDate(dateObject, {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })
    );
  }

  return dates.join(", ");
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
  data["dates"] = parseDates(contentInput.value);

  return data;
};

const getTableRowFields = () => {
  const nameField = currentRow.querySelector('[data-field="name"]');
  const categoryField = currentRow.querySelector('[data-field="category"]');
  const contentField = currentRow.querySelector('[data-field="content"]');
  const datesField = currentRow.querySelector('[data-field="dates"]');

  return { nameField, categoryField, contentField, datesField };
};

const fillFormWithTableData = () => {
  const { nameInput, selectedCategory, contentInput, datesInput } =
    getEditableFormFields();

  const { nameField, categoryField, contentField, datesField } =
    getTableRowFields(currentRow);

  nameInput.value = nameField.textContent;
  contentInput.value = contentField.textContent;
  datesInput.value = datesField.textContent;
  selectedCategory.text = categoryField.textContent;
};

const handleAddNote = () => {
  const newRecord = getNoteFormData();
  const tbody = document.querySelector("#notes-table tbody");
  addRow(newRecord, recordActions, tbody);
  resetForm("note-form");
};

const handleEditNote = () => {
  const { nameField, categoryField, contentField, datesField } =
    getTableRowFields(currentRow);

  const { name, category, content, dates } = getNoteFormData();

  nameField.textContent = name;
  categoryField.textContent = category;
  contentField.textContent = content;
  datesField.textContent = dates;

  resetForm("note-form");
};

const openCreateModal = () => {
  submitBtn.textContent = "Add Note";
  dialog.showModal();
};

const openEditModal = (row) => {
  currentRow = row;
  fillFormWithTableData();
  submitBtn.textContent = "Save";
  dialog.showModal();
};

const handleSubmit = () => {
  if (submitBtn.textContent === "Add Note") {
    handleAddNote();
  } else {
    handleEditNote();
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

export { openCreateModal, openEditModal };
