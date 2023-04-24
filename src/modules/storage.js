import { createProjectElement } from "./domcreator";
import { projectOptions } from "./eventshandler";
import { createTaskElement } from "./domcreator";

export default class Storage {
  static saveNewProject(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  static loadProjects() {
    const projects = JSON.parse(localStorage.getItem("projects"));
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (projects && projects.length > 0) {
      const projectsList = document.getElementById("projects-tabs");
      projects.forEach((project) => {
        const projectElement = createProjectElement(project.name);
        projectElement.dataset.projectId = project.id;
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
}

window.addEventListener("load", () => {
  Storage.loadProjects();
  Storage.loadTasks();
});
