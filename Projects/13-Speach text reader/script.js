const boxesContainer = document.querySelector(".boxes-container"),
  btnToggleTextarea = document.getElementById("btn-toggle"),
  btnClose = document.getElementById("btn-close"),
  btnRead = document.getElementById("btn-read"),
  textarea = document.querySelector(".text-box"),
  voiceSelect = document.getElementById("voice");

const data = [
  {
    image: "./images/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./images/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./images/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./images/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./images/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./images/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./images/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./images/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./images/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./images/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./images/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./images/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

let voices = [];

data.forEach(createBox);
getVoices();

function createBox(item) {
  const { image, text } = item;
  const box = document.createElement("div");
  box.classList.add("box");
  box.innerHTML = `
        <img src="${image}" alt="${text} image" class="box-image" />
        <p class="box-info">${text}</p>
        `;

  box.addEventListener("click", () => {
    setMessage(text);
    speakMessage();

    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 1000);
  });
  boxesContainer.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerHTML = `${voice.name} ${voice.lang}`;
    voiceSelect.append(option);
  });
}

function setMessage(text) {
  message.text = text;
}

function speakMessage() {
  speechSynthesis.speak(message);
}

function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

btnToggleTextarea.addEventListener("click", () =>
  textarea.classList.toggle("active")
);

btnClose.addEventListener("click", () => textarea.classList.remove("active"));

speechSynthesis.addEventListener("voiceschanged", getVoices);

voiceSelect.addEventListener("change", setVoice);

btnRead.addEventListener("click", (e) => {
  e.preventDefault();
  setMessage(document.getElementById("textarea").value);
  speakMessage();
});
