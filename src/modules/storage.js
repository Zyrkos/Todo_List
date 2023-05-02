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
      const mainContainer = document.getElementById("main-container");

      projects.forEach((project) => {
        const projectElement = createProjectElement(project.name);
        projectElement.dataset.projectId = project.id;
        projectsList.appendChild(projectElement);

        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        projectContainer.setAttribute("id", project.name);
        projectContainer.style.display = "none";
        const headerSpan = document.createElement("span");
        const header = document.createElement("h2");
        header.textContent = project.name;

        header.textContent = project.name;

        const rmvBtn = document.createElement("button");
        rmvBtn.setAttribute("id", "project-delete");
        rmvBtn.classList.add("project-delete");
        headerSpan.appendChild(header);
        headerSpan.appendChild(rmvBtn);
        projectContainer.appendChild(headerSpan);
        mainContainer.appendChild(projectContainer);

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

            projectContainer.appendChild(taskElement);
          });
        }
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
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const mainContainer = document.getElementById("main-container");

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
        mainContainer.appendChild(taskElement);

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
