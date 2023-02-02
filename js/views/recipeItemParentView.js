import View from './view';
import icon from 'url:../../img/icons.svg';

class RecipeItemParentView extends View {
  _generateHtml() {
    const id = window.location.hash.slice(1);
    return `
        <a href="#${this._data.id}" class="recipe-item__link link ${
      this._data.id === id ? 'recipe-item__link--active' : ''
    }">
        <li class="recipe-item__details">
            <figure class="recipe-item__container-img">
            <img
                src="${this._data.imageUrl}"
                alt="Recipe item image"
                class="recipe-item__img"
            />
            <div
                class="background-blend recipe-item__background-blend"
            ></div>
            </figure>
            <div class="recipe-item__content">
              <h4 class="heading--4 recipe-item__title">${(this._data.title =
                this._data.title.length > 23
                  ? `${this._data.title.slice(0, 24)}...`
                  : this._data.title)} </h4>
                <div class="recipe-item__info">
                  <p class="recipe-item__text">${this._data.publisher}</p>
                  <div class="recipe-item__user ${
                    this._data.key ? '' : 'hidden'
                  }">
                    <svg class="icon--grey recipe-item__user-icon">
                      <use xlink:href="${icon}#icon-user"></use>
                    </svg>
                  </div>
                </div>
            </div>
        </li>
      </a>
      `;
  }
}

export default new RecipeItemParentView();
