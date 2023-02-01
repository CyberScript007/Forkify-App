import View from './view';

class RecipeItemParentView extends View {
  _generateHtml() {
    const id = window.location.hash.slice(1);
    return `
        <a href="#${this._data.id}" class="recipe-item__link link ${
      this._data.id === id ? 'recipe-item__link--active' : ''
    }">
                <li class="recipe-item__details">
                    <figure class="recipe-item__container">
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
                    <p class="recipe-item__text">${this._data.publisher}</p>
                    </div>
                </li>
            </a>
            `;
  }
}

export default new RecipeItemParentView();
