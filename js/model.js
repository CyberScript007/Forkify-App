import helperFetchApi from './helper';
import { API_URL } from './config';
import { RES_PER_PAGE } from './config';

export const state = {
  recipe: {},
  search: {
    query: '',
    recipes: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

// Consuming a recipe view promise
export const fetchRecipe = async function (id) {
  try {
    // Eexecuting helper function for fetching api
    const data = await helperFetchApi(`${API_URL}${id}`);

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
    const data = await helperFetchApi(`${API_URL}?search=${query}`);

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
export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RES_PER_PAGE;
  const end = page * RES_PER_PAGE;

  return state.search.recipes.slice(start, end);
};
