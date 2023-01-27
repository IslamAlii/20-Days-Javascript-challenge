const wrongEl = document.querySelector(".wrong-container"),
  wordEl = document.querySelector(".word-container"),
  popup = document.querySelector(".popup-meesage"),
  statusMessage = document.getElementById("message"),
  btnPopup = document.getElementById("popup-btn"),
  alert = document.querySelector(".alert-message"),
  figureParts = document.querySelectorAll(".figure-part"),
  words = ["application", "programming", "wizard", "interface", "bananna"];

let selectedWord = words[Math.floor(Math.random() * words.length)];
// let correctLetters = ["p", "r", "o", "g", "r", "a", "m", "m", "i", "n", "g"];
let correctLetters = [];
let wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            (letter) =>
              `<span class="letter">${
                correctLetters.includes(letter) ? letter : ""
              }</span>`
          )
          .join("")}
    `;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord == selectedWord) {
    statusMessage.innerHTML = "You have won! ☺";
    popup.classList.add("active");
  }
}

btnPopup.addEventListener("click", () => {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  correctLetters = [];
  wrongLetters = [];
  wrongEl.innerHTML = "";
  showWrongLetters();
  displayWord();
  popup.classList.remove("active");
});

displayWord();

window.addEventListener("keyup", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    if (selectedWord.includes(e.key)) {
      if (!correctLetters.includes(e.key)) {
        correctLetters.push(e.key);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(e.key)) {
        wrongLetters.push(e.key);
        showWrongLetters(e);
      } else {
        showNotification();
      }
    }
  }
});

function showNotification() {
  alert.classList.add("show");
  setTimeout(() => {
    alert.classList.remove("show");
  }, 2000);
}

function showWrongLetters() {
  wrongEl.innerHTML = `
            <h2>Wrong letters</h2>
        ${wrongLetters
          .map((letter) => `<span class="letter">${letter}</span>`)
          .join(", ")}
            `;

  figureParts.forEach((part, index) => {
    let errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    statusMessage.innerHTML = "Unfortonaitly you lost! 😟";
    popup.classList.add("active");
  }
}
