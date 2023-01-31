import icon from 'url:../../img/icons.svg';

export default class View {
  _parentEl;
  _data;
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';
  _errorMessage = 'No recipes found for your query! Please try again ;)';

  render(data) {
    this._data = data;
    const markUp = this._generateHtml();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    this._data = data;
    const markUp = this._generateHtml();
    const newDom = document.createRange().createContextualFragment(markUp);

    const newElArr = Array.from(newDom.querySelectorAll('*'));
    const curElArr = Array.from(this._parentEl.querySelectorAll('*'));

    newElArr.forEach((newEl, i) => {
      const curEl = curElArr[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        console.log(newEl.firstChild.nodeValue);
        curEl.textContent = newEl.textContent;
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markUp = `
      <div class="spinner__container">
        <div class="spinner animate">
          <svg class="icon--red spinner__icon">
            <use xlink:href="${icon}#icon-spinner"></use>
          </svg>
        </div>
      </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  renderMessage(message = this._message) {
    const markUp = `
        <div class="message__container">
            <div class="message">
            <svg class="icon--red message__icon">
                <use xlink:href="${icon}#icon-smile"></use>
            </svg>
            <p class="paragraphy">
                ${message}
            </p>
            </div>
        </div>
    `;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  renderErrorMessage(errorMessage = this._errorMessage) {
    const markUp = `
        <div class="error-message__container">
            <div class="error-message">
            <svg class="icon--red error-message__icon">
                <use xlink:href="${icon}#icon-alert-triangle"></use>
            </svg>
            <p class="paragraphy">
                ${errorMessage}
            </p>
            </div>
        </div>
    `;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }
}
