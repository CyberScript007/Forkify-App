// https://forkify-api.herokuapp.com/api/get?rId=47746

// Building of a reject promise
const rejectPromise = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('The request took too long 💥💥💥'));
    }, 1000 * sec);
  });
};

// Consuming a recipe promise
export const fetchRecipe = async function (id) {
  try {
    const res = await Promise.race([
      fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`),
      rejectPromise(30),
    ]);

    console.log(res);
    if (!res.ok) throw new Error(`${res.status} bad request 💥💥💥`);
    const data = await res.json();

    const { recipe } = data;

    const recipeData = {
      imageUrl: recipe.imgage_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      publisherUrl: recipe.publisher_url,
      recipeId: recipe.recipe_id,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    console.log(recipeData);
  } catch (e) {
    console.log(e.message);
  }
};
