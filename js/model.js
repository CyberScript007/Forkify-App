// https://forkify-api.herokuapp.com/api/get?rId=47746

// Building of a reject promise
const rejectPromise = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('The request took too long 💥💥💥'));
    }, 1000 * sec);
  });
};

export const state = {
  recipe: {},
};

// Consuming a recipe promise
export const fetchRecipe = async function (id) {
  try {
    const res = await Promise.race([
      fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`),
      rejectPromise(30),
    ]);

    // rejecting the promise if response.ok is not true
    if (!res.ok) throw new Error(`${res.status} bad request 💥💥💥`);

    // storing data
    const data = await res.json();

    // destructing the data
    const { recipe } = data;

    // renaming the data
    state.recipe = {
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      publisherUrl: recipe.publisher_url,
      recipeId: recipe.recipe_id,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    console.log(state.recipe);
  } catch (e) {
    console.log(e.message);
  }
};
