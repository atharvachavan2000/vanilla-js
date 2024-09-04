const starListContainer = document.querySelector(".star-list");
const num_stars = 5;

let cur_rating = 0;

// instead of ID, data-index can also be given
// This data-index, can later be retrieved as => querySelector(.start[data-index="1"]);
// e.target.dataset.index;

// TODO: Read dataset
// TODO: Read events => click, mouseover, mouseleave

// TODO: read icons
// start => &#9733
// close => &#2716

// Follow Up: How to code for half star
function generateStars() {
  let h = "";
  for (let i = 0; i < num_stars; i++) {
    h += `<div class="star" id="star_${i + 1}">&#9733</div>`;
  }
  starListContainer.innerHTML = h;
}
generateStars();

function updateRatingCount() {
  const span = document.querySelector("#current-rating");
  span.innerHTML = cur_rating;
}

starListContainer.addEventListener("click", (e) => {
  const index = e.target.id.split("_")[1];
  if (index) {
    cur_rating = parseInt(index);
    updateRatingCount();

    for (let i = 1; i <= cur_rating; i++) {
      document.getElementById(`star_${i}`).classList.add("selected");
    }
    for (let i = cur_rating + 1; i <= num_stars; i++) {
      document.getElementById(`star_${i}`).classList.remove("selected");
    }
  }
});

starListContainer.addEventListener("mouseover", (e) => {
  const index = e.target.id.split("_")[1];
  if (index) {
    for (let i = 1; i <= parseInt(index); i++) {
      document.getElementById(`star_${i}`).classList.add("hover");
    }
    for (let i = parseInt(index) + 1; i <= num_stars; i++) {
      document.getElementById(`star_${i}`).classList.remove("hover");
    }
  }
});

starListContainer.addEventListener("mouseleave", (e) => {
  for (let i = 1; i <= num_stars; i++) {
    document.getElementById(`star_${i}`).classList.remove("hover");
  }
});
