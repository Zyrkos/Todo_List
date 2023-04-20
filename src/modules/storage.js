import { newTask } from "./tasks";
import { createProjectElement } from "./domcreator";

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
    }
  }
}

window.addEventListener("load", Storage.loadProjects);
