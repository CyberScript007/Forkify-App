import View from './view';

class SearchView extends View {
  _parentEl = document.querySelector('.search');

  searchHandler(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      // preventing form from reloading page
      e.preventDefault();

      // getting user input from search__input class
      let query = document.querySelector('.search__input').value;

      // if the query is  false retunr
      if (!query) return;

      // passing an event handler to store the query to our model
      handler(query);

      // set the input field to empty when the form have been submit
      query.textContent = '';
      //  removes keyboard focus from the form element
      query.blur();

      console.log('agba');
    });
  }
}

export default SearchView();
