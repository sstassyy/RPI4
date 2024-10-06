import { generateId } from '../utils/utils.js'; // Импортируем из папки utils

export default class TasksModel {
  #boardtasks = []; // Храним задачи
  #observers = []; // Список подписчиков

  constructor(initialTasks = []) {
    this.#boardtasks = initialTasks; // Инициализация задач
  }

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter(task => task.status === status);
  }

  addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateId(),
    };
    this.#boardtasks.push(newTask);
    this._notifyObservers(); // Уведомляем всех подписчиков об изменении
    return newTask;
  }

  clearBasketTasks() {
    this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'basket'); // Очищаем только корзину
    this._notifyObservers(); // Уведомляем об изменении
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach(observer => observer());
  }
}
