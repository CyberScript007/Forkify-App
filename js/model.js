import { helperFetchApi } from './helper';
import { API_URL, RES_PER_PAGE } from './config';

export const state = {
  recipe: {},
  search: {
    query: '',
    recipes: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmark: [],
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
      id: recipe.id,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };

    // setting bookmarked to true or false when the recipe data is been fetch
    if (state.bookmark.some(el => el.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    console.log(state.recipe);
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
    state.search.page = 1;
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

// Update recipe servings

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // old qty * new servings / old servings
  });
  state.recipe.servings = newServings;
};

// storing recipe data to local recipe
const storeAndRemoveRecipe = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmark));
};

// add bookmark to the view
export const addBookmark = function (recipe) {
  // 1) storing recipe we received to bookmark array
  state.bookmark.push(recipe);

  // 2) Setting bookmark property in recipe object to mark it as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  // 3) exceuting storeAndRemoveRecipe
  storeAndRemoveRecipe();
};

// delete bookmark from the view
export const deleteBookmark = function (id) {
  // 1) getting the index of the recipe we want to delete
  const index = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(index, 1);

  // 2) Setting bookmark property in recipe object to false to mark it as unbookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  // 3) exceuting storeAndRemoveRecipe
  storeAndRemoveRecipe();
};

const init = function () {
  const storageData = localStorage.getItem('bookmark');

  if (!storageData) return;
  debugger;
  state.bookmark = JSON.parse(storageData);
};

init();
