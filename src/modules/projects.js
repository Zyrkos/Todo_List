import { createProjectElement } from "./domcreator";
import Storage from "./storage";
let projects = [];
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

    const projectsList = document.getElementById("projects-tabs");
    const projectElement = createProjectElement(name);
    projectsList.appendChild(projectElement);

    const newProject = { name: name, tasks: [] };
    projects.push(newProject);

    Storage.saveNewProject(projects);
  });
}

/* export function projectSelection() {
  const tabs = document.getElementById("project-tabs");
} */
