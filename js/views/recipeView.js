import icon from 'url:../../img/icons.svg';
import View from './view';

// import { Fraction } from 'fractional';
// console.log(Fraction);

class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _data;
  _errorMessage = 'No recipe found, use a correct recipe Id :) 💥💥💥';

  recipeHandler(handler) {
    ['load', 'hashchange'].forEach(i => window.addEventListener(i, handler));
  }

  updateServingsHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.recipe__counter');
      if (!btn) return;

      const updateTo = +btn.dataset.updateTo;
      console.log(updateTo);
      if (updateTo > 0) handler(updateTo);
    });
  }

  bookmarkHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--add-bookmark');
      if (!btn) return;
      console.log(btn);
      handler();
    });
  }

  _generateHtml() {
    return ` 
  <figure class="recipe__container-img">
    <button class="back-arrow">
      <svg class="icon--white back-arrow__icon">
        <use xlink:href="${icon}#icon-arrow-left"></use>
      </svg>
    </button>
    <img src= "${this._data.imageUrl}" alt="recipe image" class="recipe__img" />
    <div class="background-blend"></div>
    <figcaption class="recipe__caption">
      <h1 class="heading--1 recipe__title">
        <span class="recipe__title--skew">
          ${this._data.title}
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
        this._data.cookingTime
      }</strong> minutes</p>
    </div>
    <div class="recipe__update">
      <div class="recipe__time">
        <svg class="icon--red icon">
          <use xlink:href="${icon}#icon-users"></use>
        </svg>
        <p class="recipe__text">
          <span class="recipe__servings">${this._data.servings}</span>
          servings
        </p>
      </div>
      <div class="recipe__counter-container">
        <button data-update-to = ${
          this._data.servings - 1
        } class="btn btn--recipe recipe__counter">
          <svg class="recipe__icon icon--red icon">
            <use xlink:href="${icon}#icon-minus-outline"></use>
          </svg>
        </button>
        <button data-update-to = ${
          this._data.servings + 1
        } class="btn btn--recipe recipe__counter">
          <svg class="recipe__icon icon--red icon">
            <use xlink:href="${icon}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
      <button class="btn recipe__bookmark btn--add-bookmark">
        <svg class="icon--white icon">
          <use xlink:href="${icon}#icon-bookmark${
      this.data.bookmark ? '1' : ''
    }"></use>
        </svg>
      </button>
    </div>
  </div>
  <div class="recipe__ingredients">
    <h2 class="heading--2 recipe__heading-title">recipe ingredients</h2>
    <ul class="recipe__ingredients-list">
    ${this._data.ingredients
      .map(i => this._generateHtmlIngredients(i))
      .join('')} 
    </ul>
  </div>
  <div class="recipe__cook">
    <h2 class="heading--2 recipe__heading-title">how to cook it</h2>
    <p class="recipe__cook-text">
      This recipe was carefully designed and tested by
      <strong> ${this._data.publisher}</strong>. Please check out directions at
      their website.
    </p>
    <div class="recipe__cook-direction">
      <a
        href="${this._data.sourceUrl}"
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

  _generateHtmlIngredients(i) {
    return `
      <li class="recipe__ingredients-item">
        <svg class="icon icon--red">
          <use xlink:href="${icon}#icon-check"></use>
        </svg>
        <p class="recipe__ingredients-item__text">
          <span class="recipe__ingredients-item__text--quantity">${
            i.quantity ? i.quantity : ''
          }</span>
          <span class="recipe__ingredients-item__text--unit">${i.unit}</span>
          <span class="recipe__ingredients-item__text--description">${
            i.description
          }</span>
        </p>
      </li>
    `;
  }
}

export default new RecipeView();
