import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return `
    <section class="new-task">
      <h2>Новая задача</h2>
      <input type="text" placeholder="Название задачи...">
      <button class="add-button">Добавить</button>
    </section>
  `;
}

export default class FormAddTaskComponent extends AbstractComponent {
  get template() {
    return createFormAddTaskComponentTemplate();
  }
}
