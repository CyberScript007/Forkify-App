import RecipeView from './views/recipeView.js';
import { fetchRecipe } from './model.js';
import responsiveView from './views/responsiveView.js';

window.addEventListener('hashchange', function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  fetchRecipe(id);
  console.log(id);
});

const showRecipe = async function () {
  // 1) getting value from url that contain hash
  const id = window.location.hash;
  console.log(id);

  // 2) if the url does not contain hash return
  if (!id) return;

  // 3) passing hash value to the recipe promise (fetchRecipe)
  const recipeData = await fetchRecipe(id);

  // 4) Calling recipe handler to pass the recipe promise (fetchRecipe) as an argument
  RecipeView.recipeHandler(recipeData);
};

// initialization function: get call when ever the page load
const init = function () {
  showRecipe();
};
init();
