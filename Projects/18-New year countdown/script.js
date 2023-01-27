let spinner = document.getElementById("spinner"),
  countdown = document.getElementById("countdown"),
  year = document.getElementById("year"),
  days = document.getElementById("days"),
  hours = document.getElementById("hours"),
  minutes = document.getElementById("minutes"),
  seconds = document.getElementById("seconds");

const currnetYear = new Date().getFullYear();
const nextYear = new Date(`january 01 ${currnetYear + 1} 00:00:00`);

function updateTime() {
  const currentTime = new Date();
  const variance = nextYear - currentTime;
  const daysCount = Math.floor(variance / 1000 / 60 / 60 / 24);
  const hoursCount = Math.floor((variance / 1000 / 60 / 60) % 24);
  const minutesCount = Math.floor((variance / 1000 / 60) % 60);
  const secondsCount = Math.floor((variance / 1000) % 60);

  year.innerHTML = currnetYear + 1;
  if (daysCount < 100) {
    days.innerHTML = `0${daysCount}`;
  } else if (daysCount < 10) {
    days.innerHTML = `00${daysCount}`;
  } else {
    days.innerHTML = daysCount;
  }
  hours.innerHTML = hoursCount < 10 ? `0${hoursCount}` : hoursCount;
  minutes.innerHTML = minutesCount < 10 ? `0${minutesCount}` : minutesCount;
  seconds.innerHTML = secondsCount < 10 ? `0${secondsCount}` : secondsCount;
}

setInterval(updateTime, 1000);
setTimeout(() => {
  spinner.style.display = "none";
  countdown.style.display = "flex";
}, 1000);
