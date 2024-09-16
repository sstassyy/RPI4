import {createElement} from '../framework/render.js';

function createTaskComponentTemplate(taskName) {
  return `
    <li class="task">${taskName}</li>
  `;
}

export default class TaskComponent {
  constructor(taskName) {
    this.taskName = taskName;
  }

  getTemplate() {
    return createTaskComponentTemplate(this.taskName);
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
