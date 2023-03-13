"use strict";
let searchButton = document.getElementById("search-btn");
let inputSearch = document.getElementById("input-name");
let errorName = document.querySelector(".search-panel__error-name");
errorName.style.visibility = "hidden";
searchButton.disabled = true;

let repos = [];

async function getRepos(inputRepo) {
  let response = await fetch(
    `https://api.github.com/search/repositories?q=${inputRepo}`
  );
  try {
    repos = await response.json();
    repos = repos.items.splice(0, 10);
    showRepos();
  } catch (err) {
    console.error("Error", err);
  }
}

function isEmptyForm() {
  if (inputSearch.value.length === 0) {
    return true;
  }
}

function validateForm() {
  if (isEmptyForm()) {
    errorName.style.visibility = "visible";
    inputSearch.classList.add("error-name");
    searchButton.disabled = true;
    return;
  }
  errorName.style.visibility = "hidden";
  inputSearch.classList.remove("error-name");
  searchButton.disabled = false;
}

document.addEventListener("input", validateForm);

function showRepos() {
  let resultBlock = document.getElementById("result-block");
  resultBlock.innerHTML = "";
  let resultSearch = "";
  if (repos.length == 0) {
    resultSearch += `
        <div class="post__not-found">
        Ничего не найдено
    </div>
        `;
  }
  repos.forEach((item) => {
    resultSearch += `
    <div class="result__content" id="result__content">
      <div class="result-list" id="result-list">
          <div class="post" id="comment-field">
              <div class="post__header">
                  <div class="post__name">user: ${item.owner.login}</div>
              </div>
              <div class="post__body">
              <a class="link" href="${item.html_url}" target="_blank">${item.full_name}</a>
               </div>
               <div class="post__subtext">
               <div class="post__id">id:${item.id} 
              </div>
              <div class="post__language">Language: ${item.language} </div>
               </div>
          </div>
      </div>
  </div>
    `;
  });
  resultBlock.innerHTML += resultSearch;
}

function searchAndShowRepositories(e) {
  e.preventDefault();
  getRepos(inputSearch.value);
  e.target.reset();
}

document.addEventListener("submit", searchAndShowRepositories);
document.addEventListener("keydown", (e) => {
  if (e.key === 13) {
    searchAndShowRepositories();
  }
});
