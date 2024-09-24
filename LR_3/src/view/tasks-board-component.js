import { createElement } from '../framework/render.js';
import { Status } from '../const.js'; 

function createTasksBoardComponentTemplate() {
  return `
    <section class="tasks">
      <article class="column backlog">
        <div class="column-header">
          <h3>Бэклог</h3>
        </div>
        <ul class="task-list" data-status="${Status.BACKLOG}"></ul>
      </article>
      <article class="column in-progress">
        <div class="column-header">
          <h3>В процессе</h3>
        </div>
        <ul class="task-list" data-status="${Status.PROCESSING}"></ul>
      </article>
      <article class="column done">
        <div class="column-header">
          <h3>Готово</h3>
        </div>
        <ul class="task-list" data-status="${Status.DONE}"></ul>
      </article>
      <article class="column trash">
        <div class="column-header">
          <h3>Корзина</h3>
        </div>
        <ul class="task-list" data-status="${Status.BASKET}"></ul>
        <button class="clear-btn">Очистить</button>
      </article>
    </section>
  `;
}

export default class TasksBoardComponent {
  getTemplate() {
    return createTasksBoardComponentTemplate();
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

