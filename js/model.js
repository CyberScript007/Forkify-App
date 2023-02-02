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

    // setting bookmarked to true or false when the recipe data is been fetch
    if (state.bookmark.some(el => el.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

// Consuming search input promise
export const fetchSearchRecipe = async function (query) {
  try {
    // 1) storing user input
    state.search.query = query;

    // 2) using user input to fetch data from api
    const data = await helperFetchApi(
      `${API_URL}?search=${query}&key=${API_KEY}`
    );

    // 3) destructing data
    const { recipes } = data.data;
    console.log(recipes);

    // 4) reformating data recieved from api
    state.search.recipes = recipes.map(i => {
      return {
        id: i.id,
        imageUrl: i.image_url,
        title: i.title,
        publisher: i.publisher,
        ...(i.key && { key: i.key }),
      };
    });

    // 5) setting number of page to 1
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

// pagination page
export const getSearchResultPage = function (page = state.search.page) {
  // 1) storing page value to state.search.page
  state.search.page = page;

  // 2) the number the page will start from
  const start = (page - 1) * RES_PER_PAGE;

  // 3) the number the  page will end at
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
    // 1) formating ingredients Array to the format api will accept to send data
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

    // 2) formating user input to the format api will accept to send data
    const recipeUploadData = {
      cooking_time: +recipeData.prep_time,
      image_url: recipeData.image_url,
      servings: +recipeData.servings,
      title: recipeData.title,
      source_url: recipeData.url,
      publisher: recipeData.publisher,
      ingredients,
    };

    // 3) storing data recieved from api
    const data = await helperFetchApi(
      `${API_URL}?key=${API_KEY}`,
      recipeUploadData
    );

    // 4) destructing the data
    const { recipe } = data.data;

    // 5) receate recipe object to format api will use to fetch the data
    state.recipe = createObjectRecipe(recipe);

    // 6) bookmarking the recipe store in state.recipe object
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

// getting bookamrk data from local storage when the page load
const init = function () {
  // 1) storing bookmark data from local storage
  const storageData = localStorage.getItem('bookmark');

  // 2) checking if the storageData is a falsy value and return immediately
  if (!storageData) return;

  // 3) storing storageData to bookmark array
  state.bookmark = JSON.parse(storageData);
};

init();
