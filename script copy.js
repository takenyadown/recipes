function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
 }
 document.getElementById(tabName).style.display = "block";  
}




//Recipe Cards

document.addEventListener("DOMContentLoaded", function () {
  fetch('recipe_cards.json')
    .then(response => response.json())
    .then(data => {
      // Function to create recipe cards
      function createRecipeCard(recipe) {
        const recipeCard = document.createElement("li");
        recipeCard.className = recipe.id;

        const recipeName = document.createElement("h3");
        recipeName.textContent = recipe.name;

        const recipeImage = document.createElement("img");
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.name;

        // Add click event listener to open tab on card click
        recipeCard.addEventListener("click", function () {
          openTab(recipe.tab);
        });
        // Add other recipe details as needed

        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeName);

        return recipeCard;
      }

      // Function to append recipe cards to a specified container
      function appendRecipesToContainer(container, recipes) {
        recipes.forEach(recipe => {
          const recipeCard = createRecipeCard(recipe);
          container.appendChild(recipeCard);
        });
      }

      // Get the containers on each page and populate with recipes
      const savoryContainer = document.getElementById("savory-container");
      const sweetContainer = document.getElementById("sweet-container");
      const beveragesContainer = document.getElementById("beverages-container");

      data.categories.forEach(category => {
        switch (category.name) {
          case "Savory":
            appendRecipesToContainer(savoryContainer, category.recipes);
            break;
          case "Sweet":
            appendRecipesToContainer(sweetContainer, category.recipes);
            break;
          case "Beverages":
            appendRecipesToContainer(beveragesContainer, category.recipes);
            break;
          // Add more cases if you have additional categories
        }
      });
    })
    .catch(error => console.error('Error fetching recipe data:', error));

      // Function to open a specific tab
  function openTab(tabName) {
    // Your openTab implementation here
    console.log(`Opening tab: ${tabName}`);
    // Add your logic to show/hide tabs as needed
  }
});





// mobile device detection

// The viewport is less than 768 pixels wide
if (window.matchMedia("(max-width: 767px)").matches)
{
  // true for desktop device
document.querySelector('.desktop-only').style.display = 'none';
}else{
    // false for mobile device
  document.querySelector('.mobile-only').style.display = 'none';
}











document.addEventListener("DOMContentLoaded", function () {
  // Function to open a specific tab
  function openTab(tabName) {
    // Replace this with your actual implementation to show/hide tabs
    console.log(`Opening tab: ${tabName}`);
  }

  // Function to create recipe cards
  function createRecipeCard(recipe, container) {
    const recipeCard = document.createElement("li");
    recipeCard.className = recipe.id;

    const recipeName = document.createElement("h3");
    recipeName.textContent = recipe.name;

    const recipeImage = document.createElement("img");
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.name;

    // Add click event listener to open tab on card click
    recipeCard.addEventListener("click", function () {
      openTab(recipe.tab);
      renderRecipeContent(recipe);
    });

    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(recipeName);

    container.appendChild(recipeCard);
  }

  // Function to append recipe cards to a specified container
  function appendRecipesToContainer(container, recipes) {
    recipes.forEach(recipe => {
      createRecipeCard(recipe, container);
    });
  }

  // Function to render recipe content in a tab
  function renderRecipeContent(recipe) {
    // Replace this with your actual implementation to render recipe content in the tab
    console.log(`Rendering content for recipe: ${recipe.name}`);
  }

  // Fetch recipe data
  fetch('recipe_cards.json')
    .then(response => response.json())
    .then(data => {
      // Get the containers on each page and populate with recipes
      const savoryContainer = document.getElementById("savory-container");
      const sweetContainer = document.getElementById("sweet-container");
      const beveragesContainer = document.getElementById("beverages-container");

      data.categories.forEach(category => {
        switch (category.name) {
          case "Savory":
            appendRecipesToContainer(savoryContainer, category.recipes);
            break;
          case "Sweet":
            appendRecipesToContainer(sweetContainer, category.recipes);
            break;
          case "Beverages":
            appendRecipesToContainer(beveragesContainer, category.recipes);
            break;
          // Add more cases if you have additional categories
        }
      });
    })
    .catch(error => console.error('Error fetching recipe data:', error));
});