const postsContainer = document.querySelector(".posts-container"),
  filterInput = document.getElementById("filter"),
  loader = document.querySelector(".loader");

let page = 1,
  limit = 5;

displayInDOM();

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}_limit=${limit}`
  );
  const data = await res.json();
  return data;
}

async function displayInDOM() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
            <span class="post-number" id="post-number">${post.id}</span>
            <h2 class="post-heading">${post.title}</h2>
            <p class="post-content">${post.body}</p>
      `;
    postsContainer.append(postEl);
  });
}

function loadNewPosts() {
  loader.classList.add("active");
  setTimeout(() => {
    loader.classList.remove("active");
    setTimeout(() => {
      page++;
      displayInDOM();
    }, 300);
  });
}

function filter(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  console.log(posts);

  posts.forEach((post) => {
    console.log(post);
    postTitle = post.querySelector(".post-heading").innerText.toUpperCase();
    postBody = post.querySelector(".post-content").innerText.toUpperCase();

    if (postTitle.includes(term) || postBody.includes(term)) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadNewPosts();
  }
});

filterInput.addEventListener("input", filter);
