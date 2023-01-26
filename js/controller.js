import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import RecipeItemView from './views/recipeItemView.js';
import * as model from './model.js';
import responsiveView from './views/responsiveView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Rendering recipe view
const showRecipe = async function () {
  try {
    // 1) getting value from url that contain hash
    const id = window.location.hash.slice(1);

    // 2) if the url does not contain hash return
    if (!id) return;

    // 3) Rendering spinner to the user interface
    RecipeView.renderSpinner();

    // 4) passing hash value to the recipe promise (fetchRecipe)
    await model.fetchRecipe(id);

    // 5) Rendering recipe view to user interface
    RecipeView.render(model.state.recipe);
  } catch (e) {
    RecipeView.renderErrorMessage(e.message);
  }
};

// Rendering recipeItem view
const showRecipeItem = async function (query) {
  try {
    // 1) Rendering spinner
    RecipeItemView.renderSpinner();

    // 2) fetch the recipe item from an api
    await model.fetchSearchRecipe(query);

    // 3) Rendering recipe item to user interface
    RecipeItemView.render(model.paginationPage(1));
  } catch (err) {
    console.log(err.message);
  }
};

// initialization function: get call when ever the page load
const init = function () {
  // 1) Calling recipe handler to pass the recipe promise (fetchRecipe) as an argument
  RecipeView.recipeHandler(showRecipe);
  SearchView.searchHandler(showRecipeItem);
};
init();
