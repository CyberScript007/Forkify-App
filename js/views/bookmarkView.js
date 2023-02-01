import View from './view';
import RecipeItemParentView from './recipeItemParentView';

class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmark');
  _errorMessage = 'No recipes found for your query! Please try again ;)';

  bookmarkLocalStorageHandler(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }

  _generateHtml() {
    return `
        ${this._data
          .map(bookmark => RecipeItemParentView.render(bookmark, true))
          .join('')}
    `;
  }
}

export default new BookmarkView();
