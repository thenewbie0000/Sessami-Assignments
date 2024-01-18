const modal = document.querySelector(".modal");
const openButton = document.querySelector(".btn");
const closeButton = document.querySelector(".close");
function showModal() {
  modal.style.display = "flex";
  modal.classList.remove("slide-out");
}

function hideModal() {
  modal.classList.add("slide-out");
  modal.addEventListener(
    "animationend",
    function () {
      modal.style.display = "none";
      modal.classList.remove("slide-out");
    },
    { once: true }
  );
}

openButton.addEventListener("click", () => {
  showModal();
});


closeButton.addEventListener("click", () => {
  hideModal();
});

document.addEventListener("keydown", (event) => {
  if (
    (event.key === " " ||
      event.key === "Spacebar" ||
      event.key === "Escape" ||
      event.key === "Enter") &&
    modal.style.display === "flex"
  ) {
    hideModal();
  }
});
