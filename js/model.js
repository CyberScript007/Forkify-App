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
    const data = await res.json();
    console.log(data);
    const { recipe } = data;
    console.log(recipe);
  } catch (e) {
    console.log(e.message);
  }
};
