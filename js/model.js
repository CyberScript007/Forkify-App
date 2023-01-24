// https://forkify-api.herokuapp.com/api/get?rId=47746

// Building of a reject promise
const rejectPromise = setTimeout(function (sec) {
  return new Promise(function (_, reject) {
    reject('The request take too long time 💥💥💥');
  });
}, 1000 * sec);

// Consuming a recipe promise
export const fetchRecipe = async function (id) {
  try {
    const res = await Promise.race([
      fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`),
      rejectPromise(10),
    ]);
    console.log(res);
    const data = await res.json();
    const { recipe } = data;
    console.log(recipe);
  } catch (e) {
    console.log(e.message);
  }
};
