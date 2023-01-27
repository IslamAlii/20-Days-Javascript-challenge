const difficulty = document.getElementById("difficulty"),
  gameBox = document.querySelector(".game-box"),
  timeEl = document.querySelector(".time-count"),
  scoreEl = document.querySelector(".score-count"),
  word = document.getElementById("word"),
  text = document.getElementById("text"),
  settings = document.querySelector(".settings"),
  btnSettings = document.querySelector(".btn-settings");

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

localStorage.getItem("difficulty") == null
  ? localStorage.setItem("difficulty", +difficulty.value)
  : (difficulty.value = localStorage.getItem("difficulty"));

let timeInterval = setInterval(updateTime, 1000);
let time = +difficulty.value,
  score = 0,
  randomWord = "";
addWordToDOM();

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time;
  if (time == 0) {
    gameOver();
  }
}

function validateWord(e) {
  if (randomWord === e.target.value) {
    addWordToDOM();
    e.target.value = "";
    updateScore();
    time += +difficulty.value;
  }
}

function gameOver() {
  gameBox.innerHTML = `
  <h1>Time is ran out</h1>
  <p>Your score is ${score}</p>
  <button onclick="location.reload()">Play again</button>
  `;
}

function changeDifficulty() {
  localStorage.setItem("difficulty", difficulty.value);
  time = +difficulty.value;
  updateTime();
}

text.addEventListener("input", validateWord);
btnSettings.addEventListener("click", () => settings.classList.toggle("hide"));
difficulty.addEventListener("change", changeDifficulty);
