import { createProjectElement } from "./domcreator";
import { projectOptions } from "./eventshandler";
import Storage from "./storage";

export function newProject() {
  const nameInput = document.getElementById("project-name");
  const form = document.getElementById("project-form");
  const formWindow = document.getElementById("project-popup-form");

  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameInput.value;
    form.reset();
    formWindow.style.display = "none";

    // Generate a unique ID for the new project
    const id = Date.now();

    const mainContainer = document.getElementById("main-container");

    
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    projectContainer.setAttribute("id", name );
    projectContainer.style.display = "none";

    const projectsList = document.getElementById("projects-tabs");
    const projectElement = createProjectElement(name, id);
    projectsList.appendChild(projectElement);
    mainContainer.appendChild(projectContainer);

    const newProject = { id: id, name: name, tasks: [] };
    projects.push(newProject);
    Storage.saveNewProject(projects);
    projectOptions();
  });
}