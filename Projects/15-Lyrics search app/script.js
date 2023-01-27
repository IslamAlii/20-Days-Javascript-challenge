const form = document.getElementById("form"),
  lyrics = document.getElementById("lyrics"),
  resultsBox = document.getElementById("results-box"),
  more = document.getElementById("more"),
  pagination = document.getElementById("pagination");

const apiURL = `https://api.lyrics.ovh`;

function showData(data) {
  resultsBox.innerHTML = `<ul>${data.data
    .map(
      (song) => `<li>
      <span><strong>${song.artist.name}</strong> -${song.title}</span> <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get lyrics</button>
        </li>`
    )
    .join("")}</ul>`;

  if (data.next || data.prev) {
    pagination.innerHTML = `
       ${
         data.prev
           ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
           : ``
       }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ``
      }
 `;
  } else {
    pagination.innerHTML = ``;
  }
}

async function searchFor(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showData(data);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = lyrics.value;

  if (searchTerm.trim()) {
    searchFor(searchTerm);
  }
});

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  resultsBox.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2> <div>${lyrics}</div>`;
}

resultsBox.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const artist = e.target.dataset.artist;
    const songTitle = e.target.dataset.songtitle;
    getLyrics(artist, songTitle);
  }
});
