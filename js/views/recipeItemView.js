import View from './view';
import RecipeItemParentView from './recipeItemParentView';
import icon from 'url:../../img/icons.svg';

class RecipeItemView extends View {
  _parentEl = document.querySelector('.recipe-item__list');
  _errorMessage = 'Your query is not found in query list';

  _generateHtml() {
    return `
        ${this._data
          .map(recipeItemArr =>
            RecipeItemParentView.render(recipeItemArr, true)
          )
          .join('')}
    `;
  }
}

export default new RecipeItemView();
