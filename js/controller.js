import * as model from './model.js';

import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import RecipeItemView from './views/recipeItemView.js';
import PaginationView from './views/PaginationView.js';
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
const showUpdateRecipe = function (updateNum) {
  // 1) Updating serving
  model.updateServings(updateNum);
  // 2) Re-rendering recipe view
  RecipeView.update(model.state.recipe);
};

// Bookmarking recipe
const showBookmarkRecipe = function () {
  // 1) add or deleting bookmark from view
  if (model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.recipe);
  // 2) updating recipe view
  RecipeView.update(model.state.recipe);
};

// initialization function: get call when ever the page load
const init = function () {
  // 1) Calling recipe handler to pass the recipe promise (fetchRecipe) as an argument
  RecipeView.recipeHandler(showRecipe);

  // 2) Executing update serving handler to be able to increase or decrease the update serving and ingredients quantity
  RecipeView.updateServingsHandler(showUpdateRecipe);

  // 3) Executing bookmark handler to bookmark recipe
  RecipeView.bookmarkHandler(showBookmarkRecipe);

  // 3) Calling search handler to get user input
  SearchView.searchHandler(showRecipeItem);

  // 4) Executing pagination handler to render the extract recipe item and changing pagination button
  PaginationView.paginationHandler(showPaginationView);
};
init();
