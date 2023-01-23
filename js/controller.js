const aside = document.querySelector('.recipe-item');
const recipeContainer = document.querySelector('.recipe__container');

/**
  Hide recipe container when you click on back arrow
 * 
 */
recipeContainer.addEventListener('click', function (e) {
  const backArrow = e.target.closest('.back-arrow');
  if (!backArrow) return;
  if (backArrow) {
    recipeContainer.classList.add('recipe-hidden');
    recipeContainer.classList.remove('recipe-visible');
    aside.classList.remove('sidebar-hidden');
  }
});

/**
  Hide recipe-item container when you click on recipe-item__link
 * 
 */

aside.addEventListener('click', function (e) {
  const link = e.target.closest('.link');
  if (!link) return;
  if (link && window.innerWidth <= Number.parseInt('1073px')) {
    recipeContainer.classList.remove('recipe-hidden');
    recipeContainer.classList.add('recipe-visible');
    aside.classList.add('sidebar-hidden');
  }
});

['load', 'resize'].forEach(function (i) {
  window.addEventListener(i, function () {
    if (window.innerWidth <= Number.parseInt('1073px')) {
      recipeContainer.classList.add('recipe-hidden');
      aside.classList.remove('sidebar-hidden');

      if (recipeContainer.classList.contains('recipe-visible')) {
        recipeContainer.classList.remove('recipe-hidden');
        aside.classList.add('sidebar-hidden');
      }
    } else {
      recipeContainer.classList.remove('recipe-hidden');
      recipeContainer.classList.remove('recipe-visible');
      aside.classList.remove('sidebar-hidden');
    }
  });
});

// https://forkify-api.herokuapp.com/api/get?rId=47746

const showRecipe = function () {
  const id = window.location.hash;
  if (!id) return;
  console.log(id);
};

showRecipe();
