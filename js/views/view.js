import icon from 'url:../../img/icons.svg';

export default class View {
  #parentEl;
  #data;
  #message = 'Start by searching for a recipe or an ingredient. Have fun!';
  #errorMessage = 'No recipes found for your query! Please try again ;)';
  render(data) {
    this.#data = data;
    const markUp = this.#generateHtml();
    this.#clear();
    this.#parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  #clear() {
    this.#parentEl.innerHTML = '';
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

    this.#clear();
    this.#parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  renderMessage(message = this.#message) {
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
    this.#parentEl.innerHTML = '';
    this.#parentEl.insertAdjacentHTML('afterbegin', markUp);
  }

  renderErrorMessage(errorMessage = this.#errorMessage) {
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
  }
}
