import icon from 'url:../../img/icons.svg';
import { NUM_PAGE } from '../config';
import View from './view';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateHtml() {
    const pageLength = Math.round(this._data.length / NUM_PAGE);

    if (pageLength > this._data.length) {
      return `
        <button class="btn pagination__prev btn--change btn--pagination">
            <svg class="icon icon--red">
            <use xlink:href="${icon}#icon-arrow-left"></use>
            </svg>
            page &nbsp; <span class="btn-count">1</span>
        </button>
        
        `;
    }
  }
}

export default new PaginationView();
