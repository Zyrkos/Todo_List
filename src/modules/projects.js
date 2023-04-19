import { createProjectElement } from "./domcreator";

export function newProject() {
  const nameInput = document.getElementById("project-name");
  const form = document.getElementById("project-form");
  const formWindow = document.getElementById("project-popup-form");

  let name;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    name = nameInput.value;
    console.log(name);
    form.reset();
    formWindow.style.display = "none";

    const projectsList = document.getElementById("projects-tabs");
    const projectElement = createProjectElement(
      name
    );
    projectsList.appendChild(projectElement);
  });
}

/* export function projectSelection() {
  const tabs = document.getElementById("project-tabs");
} */
