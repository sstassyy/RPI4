import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(task) {
  const { title } = task;
  return `
    <div class="task"> <!-- Применяем класс для задачи -->
      <p>${title}</p> <!-- Текст задачи -->
    </div>`;
}

export default class TaskComponent extends AbstractComponent {
  constructor({ task }) {
    super();
    this.task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.task);
  }
}
