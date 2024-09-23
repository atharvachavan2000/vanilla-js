const openBtn = document.getElementById("open-modal");
const closeBtn = document.getElementById("close-modal");

const backdrop = document.getElementsByClassName("backdrop")[0];
const modal = document.getElementsByClassName("modal")[0];

openBtn.addEventListener("click", () => {
  backdrop.style.display = "block";
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  backdrop.style.display = "none";
  modal.style.display = "none";
});
