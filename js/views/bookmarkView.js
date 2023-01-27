class BookmarkRecipeView {
  _parentEl = document.querySelector('.recipe__bookmark');

  bookmarkHandler(handler) {
    this._parentEl.addEventListener('click', function () {
      handler();
      console.log('add bookmark');
    });
  }
}

export default new BookmarkRecipeView();
