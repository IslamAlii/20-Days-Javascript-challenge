let video = document.getElementById("video"),
  btnPlay = document.getElementById("play"),
  playIcon = document.querySelector(".play-icon"),
  pauseIcon = document.querySelector(".pause-icon"),
  btnStop = document.getElementById("stop"),
  btnscreenResize = document.getElementById("screen-resize"),
  progress = document.getElementById("progress"),
  timestamp = document.getElementById("timestamp");

function togglingVideoStatus() {
  if (video.paused) {
    video.play();
    updatingPlayIcon();
  } else {
    video.pause();
    updatingPlayIcon();
  }
}

function updatingPlayIcon() {
  if (video.paused) {
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
  } else {
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
  }
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  let secs = Math.floor(video.currentTime % 60);

  if (mins < 10) {
    mins = "0" + mins;
  }

  if (secs < 10) {
    secs = "0" + secs;
  }

  timestamp.innerText = mins + ":" + secs;
}

function setProgressValue() {
  video.currentTime = (progress.value * video.duration) / 100;
}

// function enterFullScreen(element) {
//   if (element.requestFullscreen) {
//     element.requestFullscreen();
//   } else if (element.mozRequestFullScreen) {
//     element.mozRequestFullScreen(); // Firefox
//   } else if (element.webkitRequestFullscreen) {
//     element.webkitRequestFullscreen(); // Safari
//   } else if (element.msRequestFullscreen) {
//     element.msRequestFullscreen(); // IE/Edge
//   }
// }

video.addEventListener("click", togglingVideoStatus);
video.addEventListener("timeupdate", updateProgress);
btnPlay.addEventListener("click", togglingVideoStatus);
btnStop.addEventListener("click", () => {
  video.load();
  updatingPlayIcon();
});
progress.addEventListener("click", setProgressValue);
btnscreenResize.addEventListener("click", () => {
  // document.querySelector(".screen").classList.toggle("fullscreen");
  video.classList.toggle("fullscreen");
});
