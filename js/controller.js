import * as model from './model.js';

import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import RecipeItemView from './views/recipeItemView.js';
import PaginationView from './views/PaginationView.js';
import BookmarkRecipeView from './views/bookmarkView.js';
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

    showUpdateRecipe();
  } catch (err) {
    RecipeView.renderErrorMessage();
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
    RecipeItemView.render(model.getSearchResultPage());

    // 4) Rendring pagination button to user interface
    PaginationView.render(model.state.search);

    // // 5)
    // BookmarkRecipeView.render(model.addBookmark(model.state.recipe));
  } catch (err) {
    console.log(err.message);
  }
};

// Rendering pagination view
const showPaginationView = function (goTopage) {
  // 1) Rendering recipe item when event happens
  RecipeItemView.render(model.getSearchResultPage(goTopage));

  // 2) Re-rendering pagination button
  PaginationView.render(model.state.search);
};

// Updating servings
const showUpdateRecipe = function () {
  model.updateServings(6);
};

// initialization function: get call when ever the page load
const init = function () {
  // 1) Calling recipe handler to pass the recipe promise (fetchRecipe) as an argument
  RecipeView.recipeHandler(showRecipe);
  // 2) Calling search handler to get user input
  SearchView.searchHandler(showRecipeItem);
  // 3) Executing pagination handler to render the extract recipe item and changing pagination button
  PaginationView.paginationHandler(showPaginationView);
};
init();
