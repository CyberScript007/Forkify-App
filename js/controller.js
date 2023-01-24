import RecipeView from './views/recipeView.js';
import { fetchRecipe } from './model.js';
import responsiveView from './views/responsiveView.js';

// Rendering recipe view
const showRecipe = async function () {
  // 1) getting value from url that contain hash
  const id = window.location.hash.slice(1);
  console.log(id);

  // 2) if the url does not contain hash return
  if (!id) return;

  // 3) passing hash value to the recipe promise (fetchRecipe)
  const recipeData = await fetchRecipe(id);

  // 4) Calling recipe handler to pass the recipe promise (fetchRecipe) as an argument
  RecipeView.recipeHandler(recipeData);

  // 5) Rendering recipe view to user interface
  RecipeView.render(recipeData);
};

// initialization function: get call when ever the page load
const init = function () {
  showRecipe();
};
init();
