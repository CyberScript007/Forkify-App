import { POPUP_CLOSE_SEC } from '../config';

class ResponsiveView {
  #aside = document.querySelector('.recipe-item');
  #bookmark = document.querySelector('.bookmark');
  #popupClose = document.querySelector('.popup__close');
  #popup = document.querySelector('.popup');
  #recipeContainer = document.querySelector('.recipe__container');

  constructor() {
    // Hide recipe container when you click on back arrow
    this.#recipeContainer.addEventListener(
      'click',
      this.#backArrowHandler.bind(this)
    );

    //  Hide recipe-item container when you click on recipe-item__link
    this.#aside.addEventListener('click', this.#asideHandler.bind(this));

    ['load', 'resize'].forEach(i =>
      window.addEventListener(i, this.#windowHandler.bind(this))
    );

    this.#bookmark.addEventListener('click', this.#bookmarHandler.bind(this));

    window.addEventListener('load', this.#popupHandler.bind(this));

    this.#popupClose.addEventListener('click', this.#popupHandler.bind(this));

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
