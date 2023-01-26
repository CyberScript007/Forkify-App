import { helperFetchRecipe } from './helper';
import { helperFetchSearchRecipe } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    recipes: [],
    page: '',
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

    state.search.recipes = recipes.map(i => {
      return {
        id: i.id,
        imageUrl: i.image_url,
        title: i.title,
        publisher: i.publisher,
      };
    });
  } catch (err) {
    throw err;
  }
};

// pagination page
export const paginationPage = function (page) {
  state.search.page = page;
  const start = (page - 1) * 10;
  const end = page * 10;

  return state.search.recipes.slice(start, end);
};
