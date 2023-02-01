import { helperFetchApi } from './helper';
import { API_URL, RES_PER_PAGE, API_KEY } from './config';
import { async } from 'regenerator-runtime';

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

// create object recipe function
const createObjectRecipe = function (recipe) {
  return {
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    cookingTime: recipe.cooking_time,
    publisher: recipe.publisher,
    servings: recipe.servings,
    id: recipe.id,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

// Consuming a recipe view promise
export const fetchRecipe = async function (id) {
  try {
    // Eexecuting helper function for fetching api
    const data = await helperFetchApi(`${API_URL}${id}`);

    // destructing the data
    const { recipe } = data.data;

    // renaming the data
    state.recipe = createObjectRecipe(recipe);
    console.log(createObjectRecipe(recipe));

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
    console.log(data);

    const { recipes } = data.data;
    console.log(recipes);

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

// uploading recipe

export const uploadRecipe = async function (recipeData) {
  try {
    const ingredients = Object.entries(recipeData)
      .filter(el => el[0].startsWith('ingredients') && el[1] !== '')
      .map(el => {
        const ingredientsSplit = el[1].split(',');
        if (ingredientsSplit.length !== 3)
          throw new Error(
            'Please use the correct format, quantity, unit, description must be specifier'
          );
        const [quantity, unit, description] = ingredientsSplit;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    console.log(recipeData);

    const recipeUpload = {
      cooking_time: recipeData.prep_time,
      image_url: recipeData.image_url,
      servings: recipeData.servings,
      title: recipeData.title,
      source_url: recipeData.url,
      publisher: recipeData.publisher,
      ingredients,
    };
    console.log(recipeUpload);
    const recipe = await helperFetchApi(
      `${API_URL}?key=${API_KEY}`,
      recipeUpload
    );
    console.log(recipe);
    state.recipe = createObjectRecipe(recipe);
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  const storageData = localStorage.getItem('bookmark');

  if (!storageData) return;
  state.bookmark = JSON.parse(storageData);
  console.log(state.bookmark);
};

init();
