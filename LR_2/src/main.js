import HeaderComponent from './view/header-component.js';
import NewTaskComponent from './view/new-task-component.js';
import TaskAreaComponent from './view/task-area-component.js';
import TaskComponent from './view/task-component.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('.board-app__main .board-app__inner');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

render(new NewTaskComponent(), bodyContainer);

const taskArea = new TaskAreaComponent();
render(taskArea, bodyContainer);

const taskNames = ['Выучить JS', 'Выучить React', 'Сделать домашку', 'Выпить смузи'];

const taskLists = taskArea.getElement().querySelectorAll('.task-list');
taskLists.forEach((list) => {
  taskNames.forEach((name) => {
    render(new TaskComponent(name), list);
  });
});
