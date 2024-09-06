const accordions = document.querySelectorAll(".accordion");
let openAcc = ["1"];

let multiple = false;

document.getElementById("multiple-check").addEventListener("input", (e) => {
  multiple = e.target.checked;
  if (!multiple) {
    openAcc.length = 0;
    toggleAccordions();
  }
});

function toggleAccordions() {
  accordions.forEach((acc) => {
    if (openAcc.indexOf(acc.dataset.id) > -1) {
      acc.getElementsByClassName("accordion-desc")[0].style.display = "block";
      acc.getElementsByClassName("expand-icon")[0].style.display = "none";
      acc.getElementsByClassName("collapse-icon")[0].style.display = "block";
    } else {
      acc.getElementsByClassName("accordion-desc")[0].style.display = "none";
      acc.getElementsByClassName("expand-icon")[0].style.display = "block";
      acc.getElementsByClassName("collapse-icon")[0].style.display = "none";
    }
  });
}

toggleAccordions();

accordions.forEach((acc) => {
  acc.querySelector(".accordion-title").addEventListener("click", (e) => {
    let id = acc.dataset.id;
    let idx = openAcc.indexOf(id);

    if (idx > -1) {
      openAcc.splice(idx, 1);
    } else {
      if (!multiple) {
        openAcc.length = 0;
      }
      openAcc.push(id);
    }
    toggleAccordions();
  });
});
