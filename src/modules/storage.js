import { newTask } from "./tasks";
import { createProjectElement } from "./domcreator";
import { projectOptions } from "./eventshandler";

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

  /* static saveNewTask(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } */
}

window.addEventListener("load", Storage.loadProjects);
