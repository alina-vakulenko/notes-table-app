import { handleAddNoteSubmit } from "./addNote.js";

const dialog = document.querySelector("dialog");
const closeBtn = document.querySelector("#btn-close-modal");
const submitBtn = document.querySelector("#btn-submit");

const openModal = function () {
  dialog.showModal();
};

const closeModal = function () {
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

submitBtn.addEventListener("click", handleAddNoteSubmit);
dialog.addEventListener("click", handleClickOutside);
closeBtn.addEventListener("click", closeModal);

export { openModal };
