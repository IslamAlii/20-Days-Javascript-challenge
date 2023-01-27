let audio = document.querySelector("audio");
let audios = [
  "الملك - عبد الباسط عبد الصمد",
  "سورة الفاتحة - محمود الحصري",
  "ما تيسر من سورة الكهف - النقشبندي",
];
let title = document.getElementById("title");
let cover = document.getElementById("cover");
let play = document.getElementById("play-btn");
let next = document.getElementById("next-btn");
let prev = document.getElementById("prev-btn");
let audioContainer = document.getElementById("audio-container");
let audioIndex = 0;

loadAudio(audios[audioIndex]);

function loadAudio(aud) {
  let audioName = aud.slice(0, audios[audioIndex].indexOf("-"));
  let audioCover = aud.slice(audios[audioIndex].indexOf("-") + 2);

  title.innerText = audioName;
  audio.src = `audio/${aud}.mp3`;
  cover.src = `images/${audioCover}.jpg`;
  cover.alt = `صورة الشيخ ${audioCover}`;
}

function playAudio() {
  if (audio.paused) {
    audioContainer.classList.add("play");
    play.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon ">
  <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd" />
</svg>

      `;
    audio.play();
  } else {
    audioContainer.classList.remove("play");
    play.innerHTML = `
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="btn-icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clip-rule="evenodd"
                  />
                </svg>`;
    audio.pause();
  }
}

function moveForward() {
  if (audioIndex < audios.length - 1) {
    loadAudio(audios[++audioIndex]);
    prev.classList.add("active");
    play.innerHTML = `
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="btn-icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clip-rule="evenodd"
                  />
                </svg>`;
  }

  if (audioIndex == audios.length - 1) {
    next.classList.remove("active");
  }
}

function moveBackward() {
  if (audioIndex > 0) {
    loadAudio(audios[--audioIndex]);
    next.classList.add("active");
    play.innerHTML = `
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="btn-icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                    clip-rule="evenodd"
                  />
                </svg>`;
  }

  if (audioIndex == 0) {
    prev.classList.remove("active");
  }
}

play.addEventListener("click", playAudio);
next.addEventListener("click", moveForward);
prev.addEventListener("click", moveBackward);
