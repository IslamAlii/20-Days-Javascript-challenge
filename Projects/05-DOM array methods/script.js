const main = document.querySelector("main");
const addPersonBtn = document.getElementById("add-person-btn");
const doubleMonetBtn = document.getElementById("double-money-btn");
const filterMillionaresBtn = document.getElementById("filter-millionares-btn");
const sortBtn = document.getElementById("sort-btn");
const calculateBtn = document.getElementById("calculate-btn");
let users = [];

createUser();
createUser();
createUser();

addPersonBtn.addEventListener("click", createUser);
doubleMonetBtn.addEventListener("click", doubleWealth);
filterMillionaresBtn.addEventListener("click", filterMillionares);
sortBtn.addEventListener("click", sortByRichest);
calculateBtn.addEventListener("click", calculateTotalWealth);

async function createUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  0;
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    wealth: Math.floor(Math.random() * 100000),
  };
  users.push(newUser);
  updateDOM();
}

function doubleWealth() {
  users = users.map((user) => {
    return { name: user.name, wealth: user.wealth * 2 };
  });
  updateDOM(users);
}

function filterMillionares() {
  users = users.filter((user) => +user.wealth >= 1000000);
  updateDOM(users);
}

function sortByRichest() {
  users = users.sort((a, b) => b.wealth - a.wealth);
  updateDOM(users);
}

function calculateTotalWealth() {
  if (users.length > 0) {
    const totalWealth = users.reduce((acc, user) => (acc += user.wealth), 0);
    let element = document.createElement("div");
    element.classList.add("total-wealth");
    element.innerHTML = `<h3 class="person-name">Total wealth</h3> <strong class="person-wealth">${formatMoney(
      totalWealth
    )}</strong>`;
    main.appendChild(element);
  }
}

function updateDOM(addedUsers = users) {
  main.innerHTML = `
        <h2><strong>Person</strong> Wealth</h2>
  `;
  addedUsers.forEach((user) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<h3 class="person-name">${
      user.name
    }</h3> <strong class="person-wealth"> ${formatMoney(user.wealth)}</strong>`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
