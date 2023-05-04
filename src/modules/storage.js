import { projectOptions } from "./eventshandler";
import { createTaskElement } from "./domcreator";
import { createProjectElement } from "./domcreator";

export default class Storage {
  static saveNewProject(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  static loadProjects() {
    const projects = JSON.parse(localStorage.getItem("projects"));
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (projects && projects.length > 0) {
      projects.forEach((project) => {
        createProjectElement(project.name, project.id);

        if (tasks && tasks.length > 0) {
          const projectTasks = tasks.filter(
            (task) => task.project === project.name
          );

          projectTasks.forEach((task) => {
            const taskElement = createTaskElement(
              task.title,
              task.description,
              task.dueDate,
              task.priority,
              task.project,
              task.id
            );

            const projectContainer = document.getElementById(task.project);
            projectContainer.appendChild(taskElement);
          });
        }
      });
      localStorage.setItem("projects", JSON.stringify(projects)); //important to save the
      //projects so that it
      //doesnt duplicate the tasks in localstorage each time page is reloaded

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
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const defaultContainer = document.getElementById("inbox");

      for (const task of tasks) {
        const { title, description, dueDate, priority, project, id } = task;

        const existingProject = projects.find((p) => p.name === project);
        if (existingProject && existingProject.tasks.some((t) => t.id === id)) {
          // Check if task with same ID already exists in project, if it does: skip adding it
          continue;
        }

        const taskElement = createTaskElement(
          title,
          description,
          dueDate,
          priority,
          project,
          id
        );
        defaultContainer.appendChild(taskElement);

        if (existingProject) {
          existingProject.tasks.push({
            title,
            description,
            dueDate,
            priority,
            id,
          });
          localStorage.setItem("projects", JSON.stringify(projects));
        }
      }
    }
  }
}

window.addEventListener("load", () => {
  Storage.loadTasks();
  Storage.loadProjects();
});
