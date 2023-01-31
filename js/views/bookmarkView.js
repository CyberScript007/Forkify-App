import View from './view';
import icon from 'url:../../img/icons.svg';

class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmark');

  _generateHtml() {
    return `
        ${this._data.map(i => this._generateRecipeItemMarkup(i)).join('')}
    `;
  }

  _generateRecipeItemMarkup(i) {
    const id = window.location.hash.slice(1);
    return `
        <a href="#${i.id}" class="recipe-item__link ${
      i.id === id ? 'recipe-item__link--active' : ''
    }">
            <li class="recipe-item__details">
                <figure class="recipe-item__container">
                <img
                    src="${i.imageUrl}"
                    alt="Recipe item image"
                    class="recipe-item__img"
                />
                <div
                    class="background-blend recipe-item__background-blend"
                ></div>
                </figure>
                <div class="recipe-item__content">
                <h4 class="heading--4 recipe-item__title">${(i.title =
                  i.title.length > 23
                    ? `${i.title.slice(0, 24)}...`
                    : i.title)} </h4>
                <p class="recipe-item__text">${i.publisher}</p>
                </div>
            </li>
        </a>
        `;
  }
}

export default new BookmarkView();
