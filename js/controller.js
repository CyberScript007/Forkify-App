import icon from 'url:../img/icons.svg';

const aside = document.querySelector('.recipe-item');
const recipeContainer = document.querySelector('.recipe__container');
const recipeEl = document.querySelector('.recipe');

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

const fetchRecipe = async function (id = '47746') {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=47746`
  );
  const data = await res.json();

  console.log(data);

  const html = `
  <figure class="recipe__container-img">
    <button class="back-arrow">
      <svg class="icon--white back-arrow__icon">
        <use xlink:href="${icon}#icon-arrow-left"></use>
      </svg>
    </button>
    <img src= "${data.image_url}" alt="recipe image" class="recipe__img" />
    <div class="background-blend"></div>
    <figcaption class="recipe__caption">
      <h1 class="heading--1 recipe__title">
        <span class="recipe__title--skew">
          ${data.title}
        </span>
      </h1>
    </figcaption>
  </figure>
  <div class="recipe__details">
    <div class="recipe__time">
      <svg class="icon icon--red">
        <use xlink:href="${icon}#icon-clock"></use>
      </svg>
      <p class="recipe__text"><strong>75</strong> minutes</p>
    </div>
    <div class="recipe__update">
      <div class="recipe__time">
        <svg class="icon--red icon">
          <use xlink:href="${icon}#icon-users"></use>
        </svg>
        <p class="recipe__text">
          <strong><span class="recipe__servings">4</span></strong>
          servings
        </p>
      </div>
      <div class="recipe__counter-container">
        <button class="btn btn--recipe recipe__counter">
          <svg class="recipe__icon icon--red icon">
            <use xlink:href="${icon}#icon-minus-outline"></use>
          </svg>
        </button>
        <button class="btn btn--recipe recipe__counter">
          <svg class="recipe__icon icon--red icon">
            <use xlink:href="${icon}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
      <button class="btn recipe__bookmark btn--add-bookmark">
        <svg class="icon--white icon">
          <use xlink:href="${icon}#icon-bookmark"></use>
        </svg>
      </button>
    </div>
  </div>
  <div class="recipe__ingredients">
    <h2 class="heading--2 recipe__heading-title">recipe ingredients</h2>
    <ul class="recipe__ingredients-list">
      <li class="recipe__ingredients-item">
        <svg class="icon icon--red">
          <use xlink:href="${icon}#icon-check"></use>
        </svg>
        <p class="recipe__ingredients-item__text">
          4 oz cream cheese room temperature
        </p>
      </li>
      <li class="recipe__ingredients-item">
        <svg class="icon icon--red">
          <use xlink:href="${icon}#icon-check"></use>
        </svg>
        <p class="recipe__ingredients-item__text">1/4 cup mayonnaise</p>
      </li>
      <li class="recipe__ingredients-item">
        <svg class="icon icon--red">
          <use xlink:href="${icon}#icon-check"></use>
        </svg>
        <p class="recipe__ingredients-item__text">
          1/4 cup parmigiano reggiano grated
        </p>
      </li>
      <li class="recipe__ingredients-item">
        <svg class="icon icon--red">
          <use xlink:href="${icon}#icon-check"></use>
        </svg>
        <p class="recipe__ingredients-item__text">
          1/2 cup mozzarella shredded/grated
        </p>
      </li>
      <li class="recipe__ingredients-item">
        <svg class="icon icon--red">
          <use xlink:href="${icon}#icon-check"></use>
        </svg>
        <p class="recipe__ingredients-item__text">
          1/4 cup parmigiano reggiano grated
        </p>
      </li>
      <li class="recipe__ingredients-item">
        <svg class="icon icon--red">
          <use xlink:href="${icon}#icon-check"></use>
        </svg>
        <p class="recipe__ingredients-item__text">
          2 tbsps black olives sliced
        </p>
      </li>
    </ul>
  </div>
  <div class="recipe__cook">
    <h2 class="heading--2 recipe__heading-title">how to cook it</h2>
    <p class="recipe__cook-text">
      This recipe was carefully designed and tested by
      <strong> ${data.publisher}</strong>. Please check out directions at
      their website.
    </p>
    <div class="recipe__cook-direction">
      <a
        href="${data.source_url}"
        target="_blank"
        class="btn btn--link btn--direction"
      >
        directions &nbsp;
        <svg class="icon icon--white">
          <use xlink:href="${icon}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  </div>`;
  recipeEl.innerHTML = '';
  const markUp = recipeEl.insertAdjacentHTML('afterend', html);
  return markUp;
};

// fetchRecipe();

// window.addEventListener('hashchange', function () {
//   const id = window.location.hash.slice(1);
//   if (!id) return;

//   fetchRecipe(id);
//   console.log(id);
// });

// const showRecipe = function () {
//   const id = window.location.hash;
//   if (!id) return;
//   console.log(id);

// };

// showRecipe();
