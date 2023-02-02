import { POPUP_CLOSE_SEC } from '../config';

class ResponsiveView {
  #aside = document.querySelector('.recipe-item');
  #bookmark = document.querySelector('.bookmark');
  #popupClose = document.querySelector('.popup__close');
  #popup = document.querySelector('.popup');
  #recipeContainer = document.querySelector('.recipe__container');

  constructor() {
    // to invoke back arrow handler
    this.#recipeContainer.addEventListener(
      'click',
      this.#backArrowHandler.bind(this)
    );

    //  to invoke aside handler
    this.#aside.addEventListener('click', this.#asideHandler.bind(this));

    // invoking two events on window handler
    ['load', 'resize'].forEach(i =>
      window.addEventListener(i, this.#windowHandler.bind(this))
    );

    // to invoke bookmark handler
    this.#bookmark.addEventListener('click', this.#bookmarHandler.bind(this));

    // to invoke popup  handler when page load
    window.addEventListener('load', this.#popupHandler.bind(this));

    // to invoke popup  handler when click on popup close button
    this.#popupClose.addEventListener('click', this.#popupHandler.bind(this));

    // to execute popup handler in setimeout function
    this.#popupTimeOutHandler();
  }

  #backArrowHandler(e) {
    const backArrow = e.target.closest('.back-arrow');
    if (!backArrow) return;
    if (backArrow) {
      this.#recipeContainer.classList.add('recipe-hidden');
      this.#recipeContainer.classList.remove('recipe-visible');
      this.#aside.classList.remove('sidebar-hidden');
    }
  }

  #popupHandler() {
    this.#popup.classList.toggle('hidden');
  }

  #popupTimeOutHandler() {
    setTimeout(this.#popupHandler.bind(this), POPUP_CLOSE_SEC * 1000);
  }

  #asideHandler(e) {
    const link = e.target.closest('.link');
    if (!link) return;
    if (link && window.innerWidth <= Number.parseInt('1073px')) {
      this.#recipeContainer.classList.remove('recipe-hidden');
      this.#recipeContainer.classList.add('recipe-visible');
      this.#aside.classList.add('sidebar-hidden');
    }
  }

  #bookmarHandler(e) {
    const link = e.target.closest('.link');
    if (!link) return;
    if (window.innerWidth <= Number.parseInt('1073px')) {
      this.#aside.classList.add('sidebar-hidden');
      this.#recipeContainer.classList.remove('recipe-hidden');
      this.#recipeContainer.classList.add('recipe-visible');
    }
  }

  #windowHandler() {
    if (window.innerWidth <= Number.parseInt('1073px')) {
      this.#recipeContainer.classList.add('recipe-hidden');
      this.#aside.classList.remove('sidebar-hidden');

      if (this.#recipeContainer.classList.contains('recipe-visible')) {
        this.#recipeContainer.classList.remove('recipe-hidden');
        this.#aside.classList.add('sidebar-hidden');
      }
    } else {
      this.#recipeContainer.classList.remove('recipe-hidden');
      this.#recipeContainer.classList.remove('recipe-visible');
      this.#aside.classList.remove('sidebar-hidden');
    }
  }
}
export default new ResponsiveView();
