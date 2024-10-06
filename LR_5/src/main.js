import HeaderComponent from './view/header-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/tasks-model.js';
import { render, RenderPosition } from './framework/render.js';
import { tasks } from './mock/task.js'; // Импортируйте массив задач

const bodyContainer = document.querySelector('.board-app');
const tasksBoardContainer = document.querySelector('.taskboard');

const tasksModel = new TasksModel(tasks); // Инициализируем модель с задачами
const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: tasksBoardContainer,
  tasksModel,
});

// Рендерим только хедер
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

// Инициализируем презентер доски задач
tasksBoardPresenter.init();
