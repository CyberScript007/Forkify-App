class ResponsiveView {
  #aside = document.querySelector('.recipe-item');
  #recipeContainer = document.querySelector('.recipe__container');
  constructor() {
    /**
    Hide recipe container when you click on back arrow
    * 
    */
    this.#recipeContainer.addEventListener(
      'click',
      this.#backArrowHandler.bind(this)
    );

    /**
     Hide recipe-item container when you click on recipe-item__link
    * 
    */
    this.#aside.addEventListener('click', this.#asideHandler.bind(this));

    ['load', 'resize'].forEach(i =>
      window.addEventListener(i, this.#windowHandler.bind(this))
    );
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

  #asideHandler(e) {
    const link = e.target.closest('.link');
    if (!link) return;
    if (link && window.innerWidth <= Number.parseInt('1073px')) {
      this.#recipeContainer.classList.remove('recipe-hidden');
      this.#recipeContainer.classList.add('recipe-visible');
      this.#aside.classList.add('sidebar-hidden');
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
