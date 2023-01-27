const searchInput = document.getElementById("search-input"),
  searchBtn = document.getElementById("search-btn"),
  randomBtn = document.getElementById("random-btn"),
  mealsHeading = document.getElementById("meals-heading"),
  mealsContainer = document.getElementById("meals-container"),
  mealDescription = document.getElementById("meal-description");

searchBtn.addEventListener("click", () => {
  let term = searchInput.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.meals === null) {
        mealsHeading.innerHTML = `There are no search results for '${term}!' Please try again.`;
        mealsContainer.innerHTML = "";
      } else {
        mealsHeading.innerHTML = `Search results for '${term}':`;
        mealsContainer.innerHTML = data.meals
          .map(
            (meal) =>
              `<div class="meal">
                <img src="${meal.strMealThumb}" class="meal-image" alt="${meal.strMeal}" />
                <p class="meal-info" data-mealID="${meal.idMeal}">${meal.strMeal}</p>
            </div>`
          )
          .join("");
      }
    });
});

randomBtn.addEventListener("click", () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      mealsHeading.innerHTML = `'${data.meals[0].strMeal}':`;
      mealsContainer.innerHTML = `<div class="meal">
                <img src="${data.meals[0].strMealThumb}" class="meal-image" alt="${data.meals[0].strMeal}" />
                <p class="meal-info" data-mealID="${data.meals[0].idMeal}">${data.meals[0].strMeal}</p>
            </div>`;
    });
});

mealsContainer.addEventListener("click", (e) => {
  const mealInfo = e.target.classList.contains("meal-info") ? e.target : false;

  if (mealInfo) {
    let mealID = mealInfo.getAttribute("data-mealID");
    getMealByID(mealID);
  }
});

function getMealByID(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      let meal = data.meals[0];
      let ingredients = [];
      for (let i = 0; i < 20; i++) {
        if (meal[`strIngredient${i}`] != "") {
          ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        } else {
          break;
        }
      }
      mealDescription.innerHTML = `
            <h2 class=".meal-description-heading">${data.meals[0].strMeal}</h2>
        <img src="${data.meals[0].strMealThumb}"  alt="${
        data.meals[0].strMeal
      } image"/>
      <div class="cat-box">
        <p>${data.meals[0].strCategory}</p>
        <p>${data.meals[0].strArea}</p>
      </div>
        <p>${meal.strInstructions}</p>
        <h3>Ingredients</h3>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
            `;
    });
}
