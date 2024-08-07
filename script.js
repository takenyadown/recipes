function openTab(tabName) {
  var i;
  var x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  var tabContent = document.getElementById(tabName);
  tabContent.style.display = "block";

  // Remove the fade-in class from all li elements before switching tabs
  const listItems = document.querySelectorAll('.fade-in');
  listItems.forEach(listItem => {
    listItem.classList.remove('fade-in');
  });

  // Set up the Intersection Observer for li elements within the tab content
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      console.log(entry.target.id, 'isIntersecting:', entry.isIntersecting);
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 }); // Adjust threshold as needed

  const listItemsInTab = tabContent.querySelectorAll('li');
  listItemsInTab.forEach(listItem => {
    observer.observe(listItem);
  });
}







//Recipe Cards

document.addEventListener("DOMContentLoaded", function () {
  fetch('recipe_cards.json')
    .then(response => response.json())
    .then(data => {
      // Function to create recipe cards
      function createRecipeCard(recipe) {
        const recipeCard = document.createElement("li");
        recipeCard.classList.add("recipe_card", recipe.id);
        recipeCard.setAttribute("data-recipe-id", recipe.id);

        const recipeName = document.createElement("h3");
        recipeName.textContent = recipe.name;

        const recipeImage = document.createElement("img");
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.name;

        // Add click event to open a new tab
        recipeCard.addEventListener("click", function () {
          const recipeId = this.getAttribute("data-recipe-id");
          openRecipeTab(recipeId);
        });

        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeName);

        return recipeCard;
      }

  // Function to open a new tab with recipe details
  function openRecipeTab(recipeId) {
          // Function to delete div elements with class "burnable" and style "display: none"
    function deleteHiddenBurnableDivs() {
      const burnableDivs = document.querySelectorAll('.burnable[style*="display: none"]');
  
       burnableDivs.forEach(burnableDiv => {
         burnableDiv.parentNode.removeChild(burnableDiv);
    });
  }
        const recipeDetails = document.getElementById(recipeId);
        if (recipeDetails) {
          openTab(recipeId);
          deleteHiddenBurnableDivs();
          window.scrollTo({ top: 0, behavior: 'auto' }); // Scroll to the top
        } else {
          // Fetch recipe details from recipes.json
          fetch('recipes.json')
            .then(response => response.json())
            .then(recipesData => {
              const recipe = recipesData.recipes[recipeId];
              if (recipe) {
                if (recipe.hasOwnProperty("subTab") && recipe.subTab) {
                  // If subTab is true, fetch additional recipes from recipe_cards.json
                  fetch('recipe_cards.json')
                    .then(response => response.json())
                    .then(recipeCardsData => {
                      const subRecipesCategory = recipeCardsData.categories.find(category => category.name === recipe.name);
                      if (subRecipesCategory) {
                        const subRecipes = subRecipesCategory.recipes;

                        // Open a sub-tab with the additional recipes
                        const subTabContent = document.createElement("div");
                        subTabContent.className = "container tab unselectable burnable";
                        subTabContent.id = recipeId;
      
                        const header = document.createElement("Header");
                        header.id = "Header";
                        header.innerHTML = `
                          <nav class="nav fade">
                            <a href="#" class="nav-button nav-button-left unselectable" onclick="openTab('Savory')">Savory</a>
                            <a href="#" class="nav-button nav-button-center unselectable" onclick="openTab('Sweet')">Sweet</a>
                            <a href="#" class="nav-button unselectable" onclick="openTab('Beverages')">Beverages</a>
                          </nav>
                        `;
      
                        const subRecipesContainer = document.createElement("div");
                        subRecipesContainer.className = "the_grid_body";

                        const categoryTitle = document.createElement("h1");
                        categoryTitle.className = "fade";
                        categoryTitle.textContent = subRecipesCategory.name;
                        subRecipesContainer.appendChild(categoryTitle);
      
                        const subRecipesList = document.createElement("ul");
                        subRecipesList.className = "the_grid";

                        subRecipes.forEach(subRecipe => {
                          const subRecipeCard = createRecipeCard(subRecipe);
                          const subRecipeId = subRecipe.id; // Use the ID of the recipe card as the sub-tab name
                          subRecipeCard.addEventListener('click', () => openRecipeTab(subRecipeId));
                          subRecipesList.appendChild(subRecipeCard);
                        });
      
                        subRecipesContainer.appendChild(subRecipesList);

                        subTabContent.appendChild(header);
                        subTabContent.appendChild(subRecipesContainer);
      
                        document.body.appendChild(subTabContent);
                        openTab(recipeId);
                        deleteHiddenBurnableDivs();
                        window.scrollTo({ top: 0, behavior: 'auto' }); // Scroll to the top
                      } else {
                        console.error("Sub-recipes not found for category:", recipe.name);
                      }
                    })
                    .catch(error => console.error('Error fetching sub-recipes data:', error));
                } else {
                // If subTab is false or not present, open a regular recipe tab
                const tabContent = document.createElement("div");
                tabContent.className = "tab recipe_tab fade burnable unselectable";
                tabContent.id = recipeId;

                 // Create and add the header to the tab content
                const header = document.createElement("Header");
                header.id = "Header";
                header.innerHTML = `
                  <nav class="nav">
                    <a href="#" class="nav-button nav-button-left unselectable" onclick="openTab('Savory')">Savory</a>
                    <a href="#" class="nav-button nav-button-center unselectable" onclick="openTab('Sweet')">Sweet</a>
                    <a href="#" class="nav-button unselectable" onclick="openTab('Beverages')">Beverages</a>
                  </nav>
                `;

                const tabTitle = document.createElement("h1");
                tabTitle.textContent = recipe.title;

                const tabSubtitle = document.createElement("h4");
                if (recipe.subtitle) {
                  tabSubtitle.textContent = recipe.subtitle;
                  tabSubtitle.className = "tab_subtitle";
                }

                const recipeContent = document.createElement("div");
                recipeContent.className = "recipe_content";

                const ingredientsColumn = document.createElement("div");
                ingredientsColumn.className = "ingredients-column";

                const ingredientsTitle = document.createElement("h3");
                ingredientsTitle.textContent = "Ingredients:";

                const ingredientsList = document.createElement("ul");
                if (recipe.ingredients) {
                  recipe.ingredients.forEach(ingredient => {
                    const listItem = document.createElement("li");
                    listItem.textContent = ingredient;
                    ingredientsList.appendChild(listItem);
                  });
                }

                const ingredientsOptional = document.createElement("h2");
                if (recipe.optional) {
                  ingredientsOptional.textContent = recipe.optional;
                }

                const ingredientsOptionalList = document.createElement("ul");
                if (recipe.optional_ingredient) {
                  recipe.optional_ingredient.forEach(optional => {
                    const listItem = document.createElement("li");
                    listItem.textContent = optional;
                    ingredientsOptionalList.appendChild(listItem);
                  });
                }

                const ingredientsOptional2 = document.createElement("h2");
                if (recipe.optional2) {
                  ingredientsOptional2.textContent = recipe.optional2;
                }

                const ingredientsOptionalList2 = document.createElement("ul");
                if (recipe.optional_ingredient2) {
                  recipe.optional_ingredient2.forEach(optional2 => {
                    const listItem = document.createElement("li");
                    listItem.textContent = optional2;
                    ingredientsOptionalList2.appendChild(listItem);
                  });
                }

                ingredientsColumn.appendChild(ingredientsTitle);
                ingredientsColumn.appendChild(ingredientsList);

                // Append optional ingredients only if there are any
                if (recipe.optional || (recipe.optional_ingredient && recipe.optional_ingredient.length > 0)) {
                  const ingredientsOptional = document.createElement("h2");
                  ingredientsOptional.textContent = recipe.optional;
                  ingredientsColumn.appendChild(ingredientsOptional);
                
                  const ingredientsOptionalList = document.createElement("ul");
                  if (recipe.optional_ingredient && recipe.optional_ingredient.length > 0) {
                    recipe.optional_ingredient.forEach(optional => {
                      const listItem = document.createElement("li");
                      listItem.textContent = optional;
                      ingredientsOptionalList.appendChild(listItem);
                    });
                  }
                  ingredientsColumn.appendChild(ingredientsOptionalList);
                }
                
                if (recipe.optional2 || (recipe.optional_ingredient2 && recipe.optional_ingredient2.length > 0)) {
                  const ingredientsOptional2 = document.createElement("h2");
                  ingredientsOptional2.textContent = recipe.optional2;
                  ingredientsColumn.appendChild(ingredientsOptional2);
                
                  const ingredientsOptionalList2 = document.createElement("ul");
                  if (recipe.optional_ingredient2 && recipe.optional_ingredient2.length > 0) {
                    recipe.optional_ingredient2.forEach(optional2 => {
                      const listItem = document.createElement("li");
                      listItem.textContent = optional2;
                      ingredientsOptionalList2.appendChild(listItem);
                    });
                  }
                  ingredientsColumn.appendChild(ingredientsOptionalList2);
                }

            // Add click event listener to scroll to the ingredients column
            ingredientsColumn.addEventListener('click', () => {
              ingredientsColumn.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });


                const instructionsColumn = document.createElement("div");
                instructionsColumn.className = "instructions-column";

                const instructionsTitle = document.createElement("h3");
                instructionsTitle.textContent = "Instructions:";

                const instructionsList = document.createElement("ol");
                recipe.instructions.forEach(instruction => {
                  const listItem = document.createElement("li");
                  listItem.textContent = instruction;
                  instructionsList.appendChild(listItem);
                });

                instructionsColumn.appendChild(instructionsTitle);
                instructionsColumn.appendChild(instructionsList);

                recipeContent.appendChild(ingredientsColumn);
                recipeContent.appendChild(instructionsColumn);

                tabContent.appendChild(header);
                tabContent.appendChild(tabTitle);
                tabContent.appendChild(tabSubtitle);
                tabContent.appendChild(recipeContent);

                document.body.appendChild(tabContent);
                openTab(recipeId);
                deleteHiddenBurnableDivs();

            // Add click event listener to scroll to the ingredients column
            instructionsColumn.addEventListener('click', () => {
              instructionsColumn.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

                window.scrollTo({ top: 0, behavior: 'auto' }); // Scroll to the top
              }
            } else {
              console.error("Recipe details not found for id:", recipeId);
            }
          })
          .catch(error => console.error('Error fetching recipe details:', error));
      }
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
});



// Cook mode test
window.TastyRecipes = window.TastyRecipes || {};
window.TastyRecipes.cookMode = {
    wakeLockApi: false,
    wakeLock: false,
    cookModeSelector: '.tasty-recipes-cook-mode',
    init() {
        if ("wakeLock" in navigator && "request" in navigator.wakeLock) {
            this.wakeLockApi = navigator.wakeLock;
            this.enableWakeLock(); // Call the function to enable wake lock
        }

        const cookModes = document.querySelectorAll(this.cookModeSelector);

        if (cookModes.length > 0) {
            for (const cookMode of cookModes) {
                if (!this.wakeLockApi) {
                    cookMode.style.display = "none";
                }
            }
        }
    },
    async enableWakeLock() {
        try {
            this.wakeLock = await this.wakeLockApi.request("screen");
            this.wakeLock.addEventListener("release", () => {
                this.wakeLock = false;
                this.setCheckboxesState(false);
            });
            this.setCheckboxesState(true);
        } catch (error) {
            console.error('Wake lock request failed:', error);
        }
    },
    checkboxChange(checkbox) {
        if (checkbox.checked) {
            this.lock();
        } else {
            this.unlock();
        }
    },
    setCheckboxesState(state) {
        const checkboxes = document.querySelectorAll(this.cookModeSelector + ' input[type="checkbox"]');
        for (const checkbox of checkboxes) {
            checkbox.checked = state;
        }
    },
    async lock() {
        if (!this.wakeLock) {
            try {
                this.wakeLock = await this.wakeLockApi.request("screen");
                this.wakeLock.addEventListener("release", () => {
                    this.wakeLock = false;
                    this.setCheckboxesState(false);
                });
                this.setCheckboxesState(true);
            } catch (error) {
                console.error('Wake lock request failed:', error);
                this.setCheckboxesState(false);
            }
        }
    },
    unlock() {
        if (this.wakeLock) {
            this.wakeLock.release();
            this.wakeLock = false;
        }
        this.setCheckboxesState(false);
    }
};

// Call init function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.TastyRecipes.cookMode.init();
});









// mobile device detection

// The viewport is less than 768 pixels wide
//if (window.matchMedia("(max-width: 767px)").matches)
//{
  // true for desktop device
//document.querySelector('.desktop-only').style.display = 'none';
//}else{
    // false for mobile device
//  document.querySelector('.mobile-only').style.display = 'none';
//}