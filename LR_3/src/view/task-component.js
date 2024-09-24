import { createElement } from '../framework/render.js'; 

function createTaskComponentTemplate(task) {
  const { title, status } = task;
  return (
    `<div class="taskboard__item task">
      <p class="task--view">${title}</p> <!-- Отображаем только название задачи -->
    </div>`
  );
}

export default class TaskComponent {
  constructor({ task }) {
    this.task = task;
  }

  getTemplate() {
    return createTaskComponentTemplate(this.task);
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
