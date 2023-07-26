const createIcon = (iconClass) => {
  const icon = document.createElement("i");
  const classList = iconClass.split(" ");

  for (const className of classList) {
    icon.classList.add(className);
  }

  return icon;
};

const editIcon = createIcon("fa-solid fa-pen");
const archiveIcon = createIcon("fa-solid fa-file-zipper");
const deleteIcon = createIcon("fa-solid fa-trash");

export { editIcon, archiveIcon, deleteIcon };
