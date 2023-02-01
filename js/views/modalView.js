import View from './view';

class ModalView extends View {
  _parentEl = document.querySelector('.modal');
  _overlay = document.querySelector('.overlay');
  _openModalBtn = document.querySelector('.add-recipe');
  _closeModalBtn = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._openModalWindow();
    this._closeModalWindow();
  }

  _toggle() {
    this._overlay.classList.toggle('hidden');
    this._parentEl.classList.toggle('hidden');
  }

  _openModalWindow() {
    console.log(this);
    this._openModalBtn.addEventListener('click', this._toggle());
  }

  _closeModalWindow() {
    this._overlay.addEventListener('click', this._toggle());
    this._closeModalBtn.addEventListener('click', this._toggle());
  }

  getInputValueHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();

      console.log('hello');
      handler();
    });
  }
}

export default new ModalView();
