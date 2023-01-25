import RecipeView from './views/recipeView.js';
import * as model from './model.js';
import responsiveView from './views/responsiveView.js';

// Rendering recipe view
const showRecipe = async function () {
  // 1) getting value from url that contain hash
  const id = window.location.hash.slice(1);

  // 2) if the url does not contain hash return
  if (!id) return;

  // 3) Rendering spinner to the user interface
  RecipeView.renderSpinner();

  // 4) passing hash value to the recipe promise (fetchRecipe)
  await model.fetchRecipe(id);

  // 5) Rendering recipe view to user interface
  // RecipeView.render(model.state.recipe);
};

// initialization function: get call when ever the page load
const init = function () {
  // 1) Calling recipe handler to pass the recipe promise (fetchRecipe) as an argument
  RecipeView.recipeHandler(showRecipe);
};
init();
