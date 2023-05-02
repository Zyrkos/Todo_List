import { projectOptions } from "./eventshandler";
import Storage from "./storage";
import { createProjectElement } from "./domcreator";

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
  
    const id = Date.now();
  
    createProjectElement(name, id);
  
    const newProject = { id: id, name: name, tasks: [] };
    projects.push(newProject);
    Storage.saveNewProject(projects);
    projectOptions();
  });
}
