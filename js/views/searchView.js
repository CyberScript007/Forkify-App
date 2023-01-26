import View from './view';

class SearchView extends View {
  _parentEl = document.querySelector('.search');

  constructor() {
    super();
    this._clearInput();
  }

  searchHandler(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      // preventing form from reloading page
      e.preventDefault();

      // getting user input from search__input class
      const query = document.querySelector('.search__input').value;

      // if the query is  false retunr
      if (!query) return;

      // passing an event handler to store the query to our model
      handler(query);
    });
  }
  _clearInput() {
    // set the input field to empty when the form have been submit
    document.querySelector('.search__input').textContent = '';

    //  removes keyboard focus from the form element
    document.querySelector('.search__input').blur();
  }
}

export default new SearchView();
