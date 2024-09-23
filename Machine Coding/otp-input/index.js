const inputs = document.getElementById("inputs");

inputs.addEventListener("input", (e) => {
  const target = e.target;
  const value = target.value;

  if (isNaN(value)) {
    target.value = "";
    return;
  }

  if (value != "") {
    const next = target.nextElementSibling;
    if (next) {
      next.focus();
    }
  }
});

inputs.addEventListener("keyup", (e) => {
  const key = e.key.toLowerCase();

  if (key == "backspace" || key == "delete") {
    e.target.value = "";
    const prev = e.target.previousElementSibling;
    if (prev) {
      prev.focus();
    }
  }
});
