import icon from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  paginationHandler(handler) {
    // add event handler on the parent element
    this._parentEl.addEventListener('click', function (e) {
      // using an event delegation to select child element from parent element
      const btn = e.target.closest('.btn--pagination');
      // if btn is a falsy value return
      if (!btn) return;
      // get values from dataset attributes and converting it to number
      const goTopage = +btn.dataset.goTo;
      // passing the values as an argument to function
      handler(goTopage);
    });
  }

  _generateHtml() {
    // getting the number of pages
    const numPages = Math.ceil(
      this._data.recipes.length / this._data.resultsPerPage
    );

    // storing the current page
    const curPage = this._data.page;

    // 1) if page is 1 and there is other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-go-to=${
          curPage + 1
        } class="btn pagination__next btn--change btn--pagination">
          page &nbsp; <span class="btn-count">${curPage + 1}</span>
          <svg class="icon icon--red">
            <use xlink:href="${icon}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    // 2) if there is other page
    if (curPage < numPages) {
      return `
        <button data-go-to=${
          curPage - 1
        } class="btn pagination__prev btn--change btn--pagination">
          <svg class="icon icon--red">
            <use xlink:href="${icon}#icon-arrow-left"></use>
          </svg>
          page &nbsp; <span class="btn-count">${curPage - 1}</span>
        </button>
        <button data-go-to=${
          curPage + 1
        } class="btn pagination__next btn--change btn--pagination">
          page &nbsp; <span class="btn-count">${curPage + 1}</span>
          <svg class="icon icon--red">
            <use xlink:href="${icon}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    // 3) if we are in the last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-go-to=${
          curPage - 1
        } class="btn pagination__prev btn--change btn--pagination">
            <svg class="icon icon--red">
              <use xlink:href="${icon}#icon-arrow-left"></use>
            </svg>
            page &nbsp; <span class="btn-count">${curPage - 1}</span>
        </button>
      `;
    }
    // 4) if we are in page 1 there is no other page
    return '';
  }
}

export default new PaginationView();
