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


export function createProjectElement(name) {
  const folderElement = document.createElement('li');
  folderElement.classList.add('project');
  folderElement.textContent = name;

  return folderElement;
}


/* export function create */
