import View from './view';
import icon from 'url:../../img/icons.svg';

class RecipeItemView extends View {
  _parentEl = document.querySelector('.recipe-item__list');
  _data;

  #generateHtml() {
    return `
        <a href="#" class="recipe-item__link link">
            <li class="recipe-item__details">
                <figure class="recipe-item__container">
                <img
                    src="img/ronaldo.jpg"
                    alt="Recipe item image"
                    class="recipe-item__img"
                />
                <div
                    class="background-blend recipe-item__background-blend"
                ></div>
                </figure>
                <div class="recipe-item__content">
                <h4 class="heading--4 recipe-item__title">avocado egg salad</h4>
                <p class="recipe-item__text">two peas and their pod</p>
                </div>
            </li>
        </a>
    
    `;
  }
}

export default new RecipeItemView();
