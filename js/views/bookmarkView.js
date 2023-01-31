import View from './view';

class BookmarkRecipeView extends View {
  _parentEl = document.querySelector('.recipe__bookmark');

  bookmarkHandler(handler) {
    this._parentEl.addEventListener('click', function () {
      handler();
    });
  }
}

// export default new BookmarkRecipeView();
