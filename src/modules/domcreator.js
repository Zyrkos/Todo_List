export function addNewTask() {
  const mainContainer = document.getElementById("main-container");

  const taskElement = document.createElement("p");
  taskElement.textContent = title;

  mainContainer.appendChild(taskElement);
}

/*     title = titleInput.value;
    description = descriptionInput.value;
    dueDate = dueDateInput.value;
    priority = priorityInput.value;
    project = projectInput.value; */
