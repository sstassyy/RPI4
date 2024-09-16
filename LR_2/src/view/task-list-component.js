import { createElement } from 'src/framework/render.js';


function createListTaskTemplate() {
    return (
        `<div class="task-columns">
        <div class="column backlog">
            <h3>Бэклог</h3>
            <div class="tasks-container"></div>
        </div>
        <div class="column in-progress">
            <h3>В процессе</h3>
            <div class="tasks-container"></div>
        </div>
        <div class="column done">
            <h3>Готово</h3>
            <div class="tasks-container"></div>
        </div>
        <div class="column trash">
            <h3>Корзина</h3>
            <div class="tasks-container"></div>
            <button class="clear-btn">Очистить</button>
        </div>
    </div>`
      );
}


export default class ListTask {
  getTemplate() {
    return createListTaskTemplate();
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