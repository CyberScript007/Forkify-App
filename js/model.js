import { helperFetchRecipe } from './helper';
import { helperFetchSearchRecipe } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    recipes: {},
  },
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

// Consuming search input promise

export const fetchSearchRecipe = async function (query) {
  try {
    state.search.query = query;
    const data = await helperFetchSearchRecipe(query);

    const { recipes } = data.data;

    console.log(recipes);

    state.search.recipes = recipes.forEach(i => {
      console.log('agba');
      return {
        id: i.id,
        imageUrl: i.image_url,
        title: i.title,
        publisher: i.publisher,
      };
    });
    console.log(state.search.recipes);
  } catch (err) {
    throw err;
  }
};
