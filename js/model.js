import { helperFetchRecipe } from './helper';

export const state = {
  recipe: {},
};

// Consuming a recipe view promise
export const fetchRecipe = async function (id) {
  try {
    // Eexecuting helper function for fetching api
    const data = await helperFetchRecipe(id);

    // destructing the data
    const { recipe } = data.data;

    // renaming the data
    state.recipe = {
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
      publisher: recipe.publisher,
      servings: recipe.servings,
      recipeId: recipe.id,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};
