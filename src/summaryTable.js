import { getNotesCount } from "./notesTable.js";

const getAllCategories = () => {
  const categories = [];
  const select = document.querySelector('select[name="category"]');
  [...select.options]
    .slice(1)
    .forEach((option) => categories.push(option.text));

  return categories;
};

const addRowToSummary = (category, activeNotesCount, archivedNotesCount) => {
  const tBodySummary = document.querySelector("#summary tbody");
  const newRow = tBodySummary.insertRow(-1);
  newRow.dataset.category = category;
  const categoryName = newRow.insertCell();
  const activeNotes = newRow.insertCell();
  const archivedNotes = newRow.insertCell();

  categoryName.textContent = category;
  categoryName.style.fontWeight = "bold";
  activeNotes.textContent = activeNotesCount;
  activeNotes.style.textAlign = "center";
  archivedNotes.textContent = archivedNotesCount;
  archivedNotes.style.textAlign = "center";
};

const renderSummaryTable = () => {
  const categories = getAllCategories();

  categories.forEach((category) => {
    const activeNotesCount = getNotesCount({
      category: category,
      archived: false,
    });

    const archivedNotesCount = getNotesCount({
      category: category,
      archived: true,
    });

    if (activeNotesCount || archivedNotesCount) {
      addRowToSummary(category, activeNotesCount, archivedNotesCount);
    }
  });
};

const updateSummary = (category) => {
  const categoryRow = document.querySelector(
    `#summary [data-category="${category}"]`
  );

  const activeNotesCount = getNotesCount({
    category: category,
    archived: false,
  });
  const archivedNotesCount = getNotesCount({
    category: category,
    archived: true,
  });

  if (categoryRow) {
    categoryRow.cells[1].textContent = activeNotesCount;
    categoryRow.cells[2].textContent = archivedNotesCount;
  } else {
    addRowToSummary(category, activeNotesCount, archivedNotesCount);
  }
};

export { renderSummaryTable, updateSummary };
