import TaskComponent from '../view/task-component.js';
import { render, remove } from '../framework/render.js';

export default class TaskPresenter {
  #taskContainer = null;
  #task = null;
  #taskComponent = null;

  constructor({ taskContainer }) {
    this.#taskContainer = taskContainer;
  }

  init(task) {
    this.#task = task;

    this.#taskComponent = new TaskComponent({ task: this.#task });
    
    render(this.#taskComponent, this.#taskContainer);

    // Здесь можно добавить обработчики событий для взаимодействия с задачей
    // Например, обработка клика или перетаскивания
  }

  destroy() {
    remove(this.#taskComponent); // Удаляем компонент задачи
  }

  // Если будет необходимо обновить задачу (например, при изменении ее состояния)
  updateTask(updatedTask) {
    this.#task = updatedTask;
    this.#taskComponent.updateElement({ task: this.#task }); // Обновляем компонент задачи
  }
}
