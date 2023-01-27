import icon from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  paginationHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = this.closest('.btn--pagination');
      console.log(btn);
      handler();
    });
  }

  _generateHtml() {
    const numPages = Math.ceil(
      this._data.recipes.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;
    console.log(this._data);
    console.log(numPages);

    // 1) if page is 1 and there is other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button class="btn pagination__next btn--change btn--pagination">
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
        <button class="btn pagination__prev btn--change btn--pagination">
          <svg class="icon icon--red">
            <use xlink:href="${icon}#icon-arrow-left"></use>
          </svg>
          page &nbsp; <span class="btn-count">${curPage - 1}</span>
        </button>
        <button class="btn pagination__next btn--change btn--pagination">
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
        <button class="btn pagination__prev btn--change btn--pagination">
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
