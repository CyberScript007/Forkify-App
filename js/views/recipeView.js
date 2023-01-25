import icon from 'url:../../img/icons.svg';

class RecipeView {
  #parentEl = document.querySelector('.recipe');
  #data;

  render(data) {
    this.#data = data;
    const markUp = this.#generateHtml();
    this.#clear();
    this.#parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  recipeHandler(handler) {
    ['load', 'hashchange'].forEach(i => window.addEventListener(i, handler));
  }

  #clear() {
    this.#parentEl.innerHTML = '';
  }

  #generateHtml() {
    return ` 
  <figure class="recipe__container-img">
    <button class="back-arrow">
      <svg class="icon--white back-arrow__icon">
        <use xlink:href="${icon}#icon-arrow-left"></use>
      </svg>
    </button>
    <img src= "${this.#data.imageUrl}" alt="recipe image" class="recipe__img" />
    <div class="background-blend"></div>
    <figcaption class="recipe__caption">
      <h1 class="heading--1 recipe__title">
        <span class="recipe__title--skew">
          ${this.#data.title}
        </span>
      </h1>
    </figcaption>
  </figure>
  <div class="recipe__details">
    <div class="recipe__time">
      <svg class="icon icon--red">
        <use xlink:href="${icon}#icon-clock"></use>
      </svg>
      <p class="recipe__text"><strong>${
        this.#data.cookingTime
      }</strong> minutes</p>
    </div>
    <div class="recipe__update">
      <div class="recipe__time">
        <svg class="icon--red icon">
          <use xlink:href="${icon}#icon-users"></use>
        </svg>
        <p class="recipe__text">
          <strong><span class="recipe__servings">${
            this.#data.servings
          }</span></strong>
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
          <span class="recipe__ingredients-item__text--quantity">4</span>
          span class="recipe__ingredients-item__text--unit">cup</span>
          span class="recipe__ingredients-item__text--description">cream cheese room temperature</span>
        </p>
      </li>
    </ul>
  </div>
  <div class="recipe__cook">
    <h2 class="heading--2 recipe__heading-title">how to cook it</h2>
    <p class="recipe__cook-text">
      This recipe was carefully designed and tested by
      <strong> ${this.#data.publisher}</strong>. Please check out directions at
      their website.
    </p>
    <div class="recipe__cook-direction">
      <a
        href="${this.#data.sourceUrl}"
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
  }
}

export default new RecipeView();
