import icon from 'url:../../img/icons.svg';
import { NUM_PAGE } from '../config';
import View from './view';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateHtml() {
    const pageLength = Math.round(this._data.length / NUM_PAGE);
    console.log(this._data);
    console.log(pageLength);
    if (pageLength < this._data.length) {
      return `
            <button class="btn pagination__next btn--change btn--pagination">
                page &nbsp; <span class="btn-count">2</span>
                <svg class="icon icon--red">
                    <use xlink:href="${icon}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    }
  }
}

export default new PaginationView();
