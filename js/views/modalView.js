import View from './view';

class ModalView {
  _parent = document.querySelector('.modal');
  _overlay = document.querySelector('.overlay');
  _openModaBtn = document.querySelector('.add-recipe');
  _closeModalBtn = document.querySelector('.btn--close-modal');

  constructor() {
    this._openModalWindow();
    this._closeModalWindow();
  }

  _toggle() {
    this._overlay.classList.toggle('hidden');
    this._parent.classList.toggle('hidden');
  }

  _openModalWindow() {
    this._openModaBtn.addEventListener('click', this._toggle().bind(this));
  }

  _closeModalWindow() {
    this._overlay.addEventListener('click', this._toggle().bind(this));
    this._closeModalBtn.addEventListener('click', this._toggle().bind(this));
  }

  getInputValueHandler(handler) {
    this._parent.addEventListener('click', function (e) {
      e.preventDefault();

      console.log('hello');
      handler();
    });
  }
}

export default new ModalView();
