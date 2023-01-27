const cinemaHall = document.querySelector(".cinema-hall");
const seatsNumber = document.querySelector(".seats-number");
const errorMessage = document.querySelector(".error-message");
const totalPrice = document.querySelector(".total-price");
const selectedMoviePrice = document.querySelector("select");
const submitBooking = document.getElementById("submit-booking");
const allSeats = document.querySelectorAll(".seats-row .seat");

populateUI();

cinemaHall.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    if (selectedMoviePrice.value !== "") {
      errorMessage.classList.remove("active");
      e.target.classList.toggle("selected");
      updatePriceText();
    } else {
      errorMessage.innerText = "Please select a movie first";
      errorMessage.classList.add("active");
    }
  }
});

selectedMoviePrice.addEventListener("change", () => {
  if (selectedMoviePrice.value !== "") {
    errorMessage.classList.remove("active");
    updatePriceText();
  } else {
    const selectedSeats = document.querySelectorAll(
      ".seats-row .seat.selected"
    );
    selectedSeats.forEach((seat) => seat.classList.remove("selected"));
    seatsNumber.innerText = 0;
    totalPrice.innerText = 0;
  }
});

function updatePriceText() {
  const selectedSeats = document.querySelectorAll(".seats-row .seat.selected");
  seatsNumber.innerText = selectedSeats.length;
  totalPrice.innerText = selectedSeats.length * +selectedMoviePrice.value;
}

submitBooking.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".seats-row .seat.selected");
  if (selectedSeats.length) {
    selectedSeats.forEach((seat) => {
      seat.classList.remove("selected");
      seat.classList.add("occupied");
    });
    const occupiedSeats = document.querySelectorAll(
      ".seats-row .seat.occupied"
    );

    occupiedSeatsIndexes = [...occupiedSeats].map((seat) => {
      return [...allSeats].indexOf(seat);
    });
    localStorage.setItem(
      "occupiedSeasIndexes",
      JSON.stringify(occupiedSeatsIndexes)
    );
  } else {
    errorMessage.innerText = "Please select seats first";
    errorMessage.classList.add("active");
  }
});

function populateUI() {
  if (JSON.parse(localStorage.getItem("occupiedSeasIndexes")) !== null) {
    JSON.parse(localStorage.getItem("occupiedSeasIndexes")).forEach((index) =>
      allSeats[index].classList.add("occupied")
    );
  }
}
