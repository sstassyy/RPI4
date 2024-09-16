import {createElement} from '../framework/render.js';

function createTaskAreaComponentTemplate() {
  return `
    <section class="tasks">
      <article class="column backlog">
        <div class="column-header">
          <h3>Бэклог</h3>
        </div>
        <ul class="task-list"></ul>
      </article>
      <article class="column in-progress">
        <div class="column-header">
          <h3>В процессе</h3>
        </div>
        <ul class="task-list"></ul>
      </article>
      <article class="column done">
        <div class="column-header">
          <h3>Готово</h3>
        </div>
        <ul class="task-list"></ul>
      </article>
      <article class="column trash">
        <div class="column-header">
          <h3>Корзина</h3>
        </div>
        <ul class="task-list"></ul>
      </article>
    </section>
  `;
}

export default class TaskAreaComponent {
  getTemplate() {
    return createTaskAreaComponentTemplate();
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
