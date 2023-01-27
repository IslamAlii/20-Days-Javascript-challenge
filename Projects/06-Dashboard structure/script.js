let btnMenu = document.querySelector(".btn-menu");
let modal = document.querySelector(".modal");
let openModal = document.getElementById("open-modal");
let closeModal = document.querySelector(".btn-close-modal");

btnMenu.addEventListener("click", () => {
  document.querySelector("body").classList.toggle("show-aside");
  document.querySelector("body").classList.toggle("hide-aside");
});

openModal.addEventListener("click", () => {
  modal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

document.querySelector(".modal-overlay").addEventListener("click", () => {
  modal.classList.remove("active");
});
