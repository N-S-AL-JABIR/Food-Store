const search = () => {
  const name = document.getElementById("inputType").value;
  document.getElementById("foodDetails").innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((foods) => {
      if (foods.meals) {
        displayFood(foods.meals);
      } else {
        document.getElementById(
          "food-container"
        ).innerHTML = `<h6 class="m-auto">Please enter a valid query!</h6>`;
      }
    });
};

const displayFood = (foods) => {
  const foodContainer = document.getElementById("food-container");

  foodContainer.innerHTML = "";
  foods.forEach((food) => {
    const div = document.createElement("div");
    // console.log(food);
    div.classList.add("food-card");
    div.innerHTML = `
        <div onclick="singleFood(${food.idMeal})">
        <img class="card-img" src=${food.strMealThumb} alt="">
          <h4>${food.strMeal}</h4>
          <h6>${food.strArea}</h6>
          <p>${food.strInstructions.slice(0, 50)}</p>
          </div>
        `;
    foodContainer.appendChild(div);
  });
};
const singleFood = (id) => {
  const Details = document.getElementById("foodDetails");
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((food) => {
      const tFood = food.meals[0];
      // console.log(tFood);

      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const measure = tFood[`strMeasure${i}`];
        const ingredient = tFood[`strIngredient${i}`];
        if (measure && ingredient) {
          ingredients.push(`<li>${measure} - ${ingredient}</li>`);
        }
      }

      Details.innerHTML = `
        <div class="card-details">
          <img class="card-img-details mb-3" src="${tFood.strMealThumb}" alt="">
          <h3>${tFood.strMeal}</h3>
          <h6>Ingredients</h6>
          <ul>
            ${ingredients.join("")}
          </ul>
        </div>
      `;
    });
};

function handleKeyDown(event) {
  if (event.key === "Enter") {
    search();
  }
}
