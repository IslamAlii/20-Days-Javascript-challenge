const draggbleList = document.getElementById("draggable-list");
let draggableListItems;
const btnCheck = document.getElementById("btn-check");
const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

const listItems = [];

let dragStartIndex;

function createList() {
  richestPeople
    .map((person) => ({ sort: Math.random(), value: person }))
    .sort((a, b) => a.sort - b.sort)
    .map((person) => person.value)
    .forEach((person, index) => {
      const li = document.createElement("li");
      li.setAttribute("data-index", index);
      li.innerHTML = `<span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p>${person}</p>
            <span class="btn">
            <i class="fas fa-grip-lines"></i>
            </span>
        </div>
      `;
      draggbleList.appendChild(li);
      listItems.push(li);
    });
  addEventListeners();
}

function dragStart() {
  //   console.log("Event: ", "dragstart");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  //   console.log("Event: ", "dragenter");
  this.classList.add("over");
}

function dragLeave() {
  //   console.log("Event: ", "dragleave");
  this.classList.remove("over");
}

function dragOver(e) {
  //   console.log("Event: ", "dragover");
  e.preventDefault();
}

function dragDrop() {
  //   console.log("Event: ", "drop");
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  draggableListItems = document.querySelectorAll(".draggable-list li");

  const itemOne = draggableListItems[fromIndex].querySelector(".draggable");
  const itemTwo = draggableListItems[toIndex].querySelector(".draggable");

  draggableListItems[fromIndex].appendChild(itemTwo);
  draggableListItems[toIndex].appendChild(itemOne);
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

function checkOrder() {
  const lis = document.querySelectorAll("li");
  lis.forEach((li, index) => {
    if (li.querySelector("p").innerText === richestPeople[index]) {
      li.classList.remove("wrong");
      li.classList.add("right");
    } else {
      li.classList.remove("right");
      li.classList.add("wrong");
    }
  });
}
createList();

btnCheck.addEventListener("click", checkOrder);
