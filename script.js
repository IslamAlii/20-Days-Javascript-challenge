const projectsBox = document.querySelector("main .container");
const projectsList = [
  "Form validator",
  "Movie seat booking",
  "Custom video player",
  "Currency exchange rate calculator",
  "DOM array methods",
  "Dashboard structure",
  "Hangman game",
  "Meal finder",
  "Expense tracker",
  "Quran player",
  "On scroll pagination",
  "Speed typer game",
  "Speach text reader",
  "Memory cards",
  "Lyrics search app",
  "Relaxer",
  "Braekout game",
  "New year countdown",
  "Draggable list",
  "Speak number guessing game",
];

projectsBox.innerHTML = `${projectsList
  .map(
    (project, index) => `<div>
    <img src="images/${index + 1}.png" />
    <div class="overlay">
    <h2>${project}</h2>
    ${
      index < 9
        ? `<a href="Projects/0${
            index + 1
          }-${project}/index.html" target="_blank" class="btn">Live Demo</a>`
        : `
        <a href="Projects/${
          index + 1
        }-${project}/index.html" target="_blank" class="btn">Live Demo</a>
          `
    }
    </div>
</div>`
  )
  .join("")}`;
