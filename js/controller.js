const aside = document.querySelector('.recipe-item');
const link = document.querySelector('.link');
const recipeContainer = document.querySelector('.recipe__container');
const backArrow = document.querySelector('.back-arrow');

backArrow.addEventListener('click', function () {
  recipeContainer.classList.add('recipe-hidden');
  recipeContainer.classList.remove('recipe-visible');
  aside.classList.remove('sidebar-hidden');
});

link.addEventListener('click', function (e) {
  if (window.innerWidth <= Number.parseInt('1073px')) {
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
