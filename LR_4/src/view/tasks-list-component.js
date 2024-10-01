import { StatusLabel } from "../const.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTasksListComponentTemplate(status) {
  return `
    <div class="column ${status.toLowerCase()}"> <!-- Класс статус здесь -->
      <h3 class="column-header">${StatusLabel[status]}</h3>
      <ul class="tasks__list tasks__${status} list-reset"></ul>
    </div>`;
}

export default class TasksListComponent extends AbstractComponent {
  constructor(status) {
    super();
    this.status = status;
  }

  get template() {
    return createTasksListComponentTemplate(this.status);
  }
}
