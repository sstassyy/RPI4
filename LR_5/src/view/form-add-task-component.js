import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return `
    <section class="new-task">
      <h2>Новая задача</h2>
      <form>
        <input type="text" id="add-task" placeholder="Название задачи..." required>
        <button type="submit" class="add-button">Добавить</button>
      </form>
    </section>
  `;
}

export default class FormAddTaskComponent extends AbstractComponent {
  constructor({ onClick }) {
    super();
    this._onClick = onClick; // Сохраняем обработчик клика
    this.element.querySelector('form').addEventListener('submit', this._clickHandler.bind(this));
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault(); // Предотвращаем стандартное поведение формы
    this._onClick(); // Вызываем переданный обработчик
  }
}
