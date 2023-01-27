const cardsBox = document.querySelector(".cards-box"),
  btnAdd = document.getElementById("add"),
  btnClear = document.getElementById("clear"),
  btnOpen = document.getElementById("open"),
  btnClose = document.getElementById("close"),
  cardsNumber = document.querySelector(".cards-numbers"),
  btnNext = document.getElementById("next-btn"),
  btnPrev = document.getElementById("prev-btn"),
  modal = document.querySelector(".add-card-modal"),
  questionEl = document.getElementById("question"),
  answerEl = document.getElementById("answer");

let currentActivatedCard = 0,
  cardsEl = [];

const cardsData = getAllCards();

// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

function addAllCardsToDOM() {
  cardsData.forEach((card, index) => createCard(card, index));
}

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
            <div class="card-front">${data.question}</div>
            <div class="card-back">${data.answer}</div>
  `;
  if (index === 0) card.classList.add("active");
  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });
  cardsEl.push(card);
  cardsBox.appendChild(card);
}

function updateCardsNumber() {
  cardsNumber.innerHTML = `${currentActivatedCard + 1} / ${cardsEl.length}`;
}

addAllCardsToDOM();
updateCardsNumber();

btnNext.addEventListener("click", () => {
  cardsEl[currentActivatedCard].className = "card left";
  currentActivatedCard++;
  if (currentActivatedCard > cardsEl.length - 1) {
    currentActivatedCard = cardsEl.length - 1;
  }
  cardsEl[currentActivatedCard].className = "card active";
  updateCardsNumber();
});

btnPrev.addEventListener("click", () => {
  cardsEl[currentActivatedCard].className = "card";
  currentActivatedCard--;
  if (currentActivatedCard < 0) {
    currentActivatedCard = 0;
  }
  cardsEl[currentActivatedCard].className = "card active";
  updateCardsNumber();
});

function getAllCards() {
  let cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

btnOpen.addEventListener("click", () => modal.classList.add("active"));
btnClose.addEventListener("click", () => modal.classList.remove("active"));

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    questionEl.value = "";
    answerEl.value = "";
    modal.classList.remove("active");
    cardsData.push(newCard);
    updateCardsNumber();
    localStorage.setItem("cards", JSON.stringify(cardsData));
    window.location.reload();
  }
});

btnClear.addEventListener("click", () => {
  localStorage.removeItem("cards");
  cardsBox.innerHTML = "";
  window.location.reload();
});
