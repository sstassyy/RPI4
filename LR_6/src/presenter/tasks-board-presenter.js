import TasksBoardComponent from '../view/tasks-board-component.js';
import TasksListComponent from '../view/tasks-list-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import TaskPresenter from './task-presenter.js';
import FormAddTaskComponent from '../view/form-add-task-component.js';
import { Status, StatusLabel } from '../const.js';
import { render, RenderPosition } from '../framework/render.js';
import EmptyTaskComponent from '../view/empty-task-component.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TasksBoardComponent();
  #clearButtonComponent = new ClearButtonComponent();
  #formAddTaskComponent = null;
  #taskPresenters = new Map();
  #tasksListComponents = new Map();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#renderBoard();
    this.#renderFormAddTask();
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);
    this.#renderTasksList();
    this.#renderClearButton();
  }

  #renderTasksList() {
    Object.values(Status).forEach((status) => {
      const tasksListComponent = new TasksListComponent({
        status: status,
        label: StatusLabel[status],
        onTaskDrop: this.#handleTaskDrop.bind(this)
      });
      this.#tasksListComponents.set(status, tasksListComponent);
      render(tasksListComponent, this.#tasksBoardComponent.element);

      const tasksForStatus = this.#tasksModel.tasks.filter((task) => task.status === status);
      this.#updateTasksList(tasksListComponent, tasksForStatus);
    });
  }

  #updateTasksList(tasksListComponent, tasksForStatus) {
    const tasksListElement = tasksListComponent.element.querySelector('.tasks__list');
    tasksListElement.innerHTML = '';

    if (tasksForStatus.length === 0) {
      const emptyTaskComponent = new EmptyTaskComponent();
      render(emptyTaskComponent, tasksListElement);
    } else {
      tasksForStatus.forEach((task) => {
        this.#renderTask(task, tasksListElement);
      });
    }
  }

  #renderTask(task, container) {
    const taskPresenter = new TaskPresenter({ taskContainer: container });
    taskPresenter.init(task);
    this.#taskPresenters.set(task.id, taskPresenter);
  }

  #renderFormAddTask() {
    this.#formAddTaskComponent = new FormAddTaskComponent({
      onClick: this.#handleNewTaskButtonClick.bind(this),
    });
    render(this.#formAddTaskComponent, this.#boardContainer, RenderPosition.BEFOREBEGIN);
  }

  #renderClearButton() {
    const tasksListComponent = this.#tasksListComponents.get(Status.BASKET);
    if (tasksListComponent) {
      render(this.#clearButtonComponent, tasksListComponent.element, RenderPosition.BEFOREEND);
      this.#clearButtonComponent.setClickHandler(this.#handleClearButtonClick.bind(this));
    }
  }

  #handleClearButtonClick() {
    this.#tasksModel.clearBasketTasks();
    this.#updateBoard();
    this.#updateClearButtonVisibility();
  }

  #handleNewTaskButtonClick() {
    const taskTitle = document.querySelector('input[type="text"]').value.trim();
    if (!taskTitle) return;

    const newTask = this.#tasksModel.addTask(taskTitle);
    document.querySelector('input[type="text"]').value = '';

    const tasksListComponent = this.#tasksListComponents.get(newTask.status);
    const tasksForStatus = this.#tasksModel.tasks.filter(task => task.status === newTask.status);
    this.#updateTasksList(tasksListComponent, tasksForStatus);

    this.#renderClearButton();
    this.#updateClearButtonVisibility();
  }

  #handleTaskDrop(taskId, newStatus, index) {
    this.#tasksModel.moveTask(taskId, newStatus, index);
    this.#updateBoard();
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
  }

  #updateBoard() {
    Object.values(Status).forEach((status) => {
      const tasksListComponent = this.#tasksListComponents.get(status);
      this.#updateTasksList(tasksListComponent, this.#tasksModel.tasks.filter(task => task.status === status));
    });
    this.#updateClearButtonVisibility();
  }

  #updateClearButtonVisibility() {
    const tasksInBasket = this.#tasksModel.getTasksByStatus('basket');
    if (tasksInBasket.length === 0) {
      this.#clearButtonComponent.element.style.display = 'none';
    } else {
      this.#clearButtonComponent.element.style.display = 'block';
    }
  }
}
