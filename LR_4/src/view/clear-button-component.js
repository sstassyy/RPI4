import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonTemplate() {
  return `
    <button class="clear-btn" type="button">Очистить корзину</button>
  `;
}

export default class ClearButtonComponent extends AbstractComponent {
  get template() {
    return createClearButtonTemplate();
  }
}
