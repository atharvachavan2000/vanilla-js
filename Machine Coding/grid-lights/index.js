const BOX_DATA = [
  [1, 1, 1, 1],
  [1, 0, 0, 1],
  [1, 1, 1, 1],
];
const shapesDiv = document.getElementsByClassName("shapes")[0];

h = "";

let idx = 0;
for (let i = 0; i < BOX_DATA.length; i++) {
  for (let j = 0; j < BOX_DATA[0].length; j++) {
    h +=
      `<div class="${BOX_DATA[i][j] ? "box" : "empty"}" ` +
      (BOX_DATA[i][j] ? `data-id="${idx}"` : "") +
      `></div>`;
    idx += BOX_DATA[i][j];
  }
  h += `<br/>`;
}
shapesDiv.innerHTML = h;

shapesDiv.addEventListener("click", handleBoxClick);

const totalBoxes = parseInt(idx);
let activeBoxIds = [];
let removalOngoing = false;

function handleBoxClick(e) {
  const element = e.target;

  if (element.dataset.id && !removalOngoing) {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
      activeBoxIds = activeBoxIds.filter((id) => id !== element.dataset.id);
    } else {
      element.classList.add("active");
      activeBoxIds.push(element.dataset.id);

      if (activeBoxIds.length === totalBoxes) {
        handleRemoval();
      }
    }
  }
}

function handleRemoval() {
  if (removalOngoing) {
    return;
  }

  function removeLastBox() {
    if (activeBoxIds.length === 0) {
      removalOngoing = false;
      return;
    }
    const id = activeBoxIds.pop();
    document
      .querySelector(`.box[data-id="${id}"]`)
      .classList.remove("active");
    setTimeout(removeLastBox, 300);
  }

  removalOngoing = true;
  setTimeout(removeLastBox, 300);
}
