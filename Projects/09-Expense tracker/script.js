const totalBalance = document.getElementById("total-balance"),
  income = document.getElementById("income"),
  expense = document.getElementById("expense"),
  historyList = document.getElementById("history-list"),
  transactionForm = document.getElementById("transaction-form"),
  text = document.getElementById("text"),
  amount = document.getElementById("amount");

let deleteBtns;

let transactions =
  localStorage.getItem("transactions") !== null
    ? JSON.parse(localStorage.getItem("transactions"))
    : [];

function addNewTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter a value for text and amount");
  } else {
    transactions.push({ text: text.value, amount: +amount.value });
    init();
  }
}

function addTransactionToDOM() {
  if (transactions.length > 0) {
    historyList.innerHTML = `
        ${transactions
          .map((item, index) => {
            if (item.amount > 0) {
              return `
          <li class="income" data-index="${index}" >
                ${item.text} <span>${item.amount} </span><button class="delete-btn">X</button>
              </li>
        `;
            } else {
              return `
          <li class="expense" data-index="${index}">
                ${item.text} <span>${item.amount} </span><button class="delete-btn">X</button>
              </li>
        `;
            }
          })
          .join("")}
    `;
    deleteBtns = document.querySelectorAll(".delete-btn");
  } else {
    historyList.innerHTML = `<li class="empty">There is no elements added to the list</li>`;
  }
}

function updateTheBalance() {
  totalBalance.innerHTML =
    "$" + transactions.reduce((acc, item) => acc + item.amount, 0).toFixed(2);
  income.innerHTML =
    "$" +
    transactions
      .filter((item) => item.amount > 0)
      .reduce((acc, item) => acc + item.amount, 0)
      .toFixed(2);
  expense.innerHTML =
    "$" +
    transactions
      .filter((item) => item.amount < 0)
      .reduce((acc, item) => acc + item.amount, 0)
      .toFixed(2);
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function deleteTransation(index) {
  transactions.splice(index, 1);
  init();
}

function init() {
  addTransactionToDOM();
  updateTheBalance();
  updateLocalStorage();
}

init();

transactionForm.addEventListener("submit", addNewTransaction);
historyList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    console.log(e.target.parentElement.getAttribute("data-index"));
    deleteTransation(e.target.parentElement.getAttribute("data-index"));
  }
});
