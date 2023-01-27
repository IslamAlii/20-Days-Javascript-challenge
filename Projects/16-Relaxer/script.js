const circleContainer = document.querySelector(".circle-container"),
  circle = document.querySelector(".circle"),
  circleGradient = document.querySelector(".circle-gradient"),
  totalTime = 7500,
  hold = 1500,
  braeth = 3000;

braethAnimation();
function braethAnimation() {
  circle.innerText = "Breath in!";
  circleContainer.className = "circle-container grow";
  setTimeout(() => {
    circle.innerText = "Hold!";
    setTimeout(() => {
      circle.innerText = "Breath out!";
      circleContainer.className = "circle-container shrink";
    }, hold);
  }, braeth);
}

setInterval(braethAnimation, totalTime);
