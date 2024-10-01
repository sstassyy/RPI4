import TaskComponent from '../view/task-component.js';
import TasksBoardComponent from '../view/tasks-board-component.js';
import TasksListComponent from '../view/tasks-list-component.js';
import EmptyTaskComponent from '../view/empty-task-component.js';
import { Status } from '../const.js';
import { render } from '../framework/render.js';

export default class TasksBoardPresenter {
  #boardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TasksBoardComponent();
  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    this.#boardTasks = [...this.#tasksModel.tasks]; 
    render(this.#tasksBoardComponent, this.#boardContainer); 
    
    Object.values(Status).forEach((status) => {
      const tasksListComponent = new TasksListComponent(status); 
      render(tasksListComponent, this.#tasksBoardComponent.element); 

      const tasksForStatus = this.#boardTasks.filter((task) => task.status === status);
      const tasksListElement = tasksListComponent.element.querySelector('.tasks__list'); 

      if (tasksForStatus.length === 0) {
        const emptyTaskComponent = new EmptyTaskComponent(); 
        render(emptyTaskComponent, tasksListElement);
      } else {
       
        tasksForStatus.forEach((task) => {
          this.#renderTask(task, tasksListElement);
        });
      }
    });
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
  }
}
