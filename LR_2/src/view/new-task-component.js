import {createElement} from '../framework/render.js';

function createNewTaskComponentTemplate() {
  return `
    <section class="new-task">
      <h2>Новая задача</h2>
      <input type="text" placeholder="Название задачи...">
      <button class="add-button">Добавить</button>
    </section>
  `;
}

export default class NewTaskComponent {
  getTemplate() {
    return createNewTaskComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
