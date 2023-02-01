import View from './view';

class ModalView extends View {
  _parent = document.querySelector('.modal');
  _overlay = document.querySelector('.overlay');
  _openModalBtn = document.querySelector('.add-recipe');
  _closeModalBtn = document.querySelector('.btn--close-modal');

  // constructor() {
  //   super();
  //   this._closeModalWindow();
  // }

  _toggle() {
    this._overlay.classList.toggle('hidden');
    this._parent.classList.toggle('hidden');
  }

  openModalWindow() {
    this._openModalBtn.addEventListener('click', this._toggle().bind(this));
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
