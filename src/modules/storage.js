import { createProjectElement } from "./domcreator";
import { projectOptions } from "./eventshandler";
import { createTaskElement } from "./domcreator";

export default class Storage {
  static saveNewProject(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  static loadProjects() {
    const projects = JSON.parse(localStorage.getItem("projects"));

    if (projects && projects.length > 0) {
      const projectsList = document.getElementById("projects-tabs");
      projects.forEach((project) => {
        const projectElement = createProjectElement(project.name);
        projectsList.appendChild(projectElement);
      });
      projectOptions();
    }
  }

  /* static removeProject() {} */

  static saveNewTask(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks && tasks.length > 0) {
      const mainContainer = document.getElementById("main-container");
      for (const task of tasks) {
        const taskElement = createTaskElement(
          task.title,
          task.description,
          task.dueDate,
          task.priority,
          task.project
        );
        mainContainer.appendChild(taskElement);
      }
    }
  }

  static removeTask() {
    const delBtns = document.querySelectorAll(".rmv-task-btn");
    delBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const taskToRemove = btn.parentNode;
        taskToRemove.remove();

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(
          (task) => task.title !== taskToRemove.querySelector("h2").textContent
          //compares the task that was just deleted to the tasks in the array,
          //if the names match then the deleted task in not returned
        );
        localStorage.setItem("tasks", JSON.stringify(tasks));
      });
    });
  }
}

window.addEventListener("load", () => {
  Storage.loadProjects();
  Storage.loadTasks();
});
