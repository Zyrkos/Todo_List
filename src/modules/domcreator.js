

/* export function addNewTask() {
  const mainContainer = document.getElementById("main-container");

  const taskElement = document.createElement("p");
  taskElement.textContent = title;

  mainContainer.appendChild(taskElement);
}
 */

export function createTaskElement(title, description, dueDate, priority, project) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');
  taskElement.innerHTML = `
    <h2>${title}</h2>
    <p>Description: ${description}</p>
    <p>Due Date: ${dueDate}</p>
    <p>Priority: ${priority}</p>
    <p>Project: ${project}</p>
  `;
  return taskElement;
}

