import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/tasks-board-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js'; 

export default class TasksBoardPresenter {
  tasksBoardComponent = new TaskBoardComponent();
  
  constructor({ boardContainer, tasksModel }) {
    this.boardContainer = boardContainer;
    this.tasksModel = tasksModel;
  }

  init() {
    this.boardTasks = [...this.tasksModel.getTasks()];

    render(this.tasksBoardComponent, this.boardContainer);
    this.renderTasks();
    
    this.tasksBoardComponent.getElement().querySelector('.clear-btn').addEventListener('click', this.handleClearTrash.bind(this));
  }

  renderTasks() {
    this.boardTasks.forEach(task => {
      const taskComponent = new TaskComponent({ task });
      const taskList = this.tasksBoardComponent.getElement().querySelector(`.task-list[data-status="${task.status}"]`);
      render(taskComponent, taskList);
    });
  }

  handleClearTrash() {
    this.boardTasks = this.boardTasks.filter(task => task.status !== Status.BASKET);
    this.tasksBoardComponent.getElement().querySelector(`.task-list[data-status="${Status.BASKET}"]`).innerHTML = '';
    this.renderTasks(); 
  }
}
