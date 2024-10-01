import { AbstractComponent } from '../framework/view/abstract-component.js';

function createEmptyTaskTemplate() {
  return `
    <div class="empty-task" style="
        border: 1px solid gray;
        padding: 20px;
        text-align: center;
        border-radius: 5px;
        color: gray;
      ">
      Перетащите карточку
    </div>
  `;
}

export default class EmptyTaskComponent extends AbstractComponent {
  get template() {
    return createEmptyTaskTemplate();
  }
}
