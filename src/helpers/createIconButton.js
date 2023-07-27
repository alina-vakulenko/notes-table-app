export const createIconButton = (icon, title) => {
  const button = document.createElement("button");
  button.title = title.toLowerCase();
  button.classList.add("btn-action");
  button.dataset.action = title.toLowerCase();
  button.appendChild(icon.cloneNode());

  return button;
};
