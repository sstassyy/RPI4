import HeaderComponent from './view/header-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/tasks-model.js';
import { render, RenderPosition } from './framework/render.js';
import { tasks } from './mock/task.js';

const bodyContainer = document.querySelector('.board-app');
const tasksBoardContainer = document.querySelector('.taskboard');

const tasksModel = new TasksModel(tasks);
const tasksBoardPresenter = new TasksBoardPresenter({
  boardContainer: tasksBoardContainer,
  tasksModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

tasksBoardPresenter.init();
