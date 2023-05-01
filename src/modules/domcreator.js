export function createTaskElement(
  title,
  description,
  dueDate,
  priority,
  project,
  id
) {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.setAttribute("data-task-id", id); // Set the id as a data attribute
  taskElement.innerHTML = `
    <h2 class="title">${title}</h2>
    <p class="task-element">Description: ${description}</p>
    <p class="task-element">Due Date: ${dueDate}</p>
    <p class="task-element">Priority: ${priority}</p>
    <p>Project: ${project}</p>
  `;

  const rmvTaskBtn = document.createElement("button");
  rmvTaskBtn.classList.add("rmv-task-btn");
  rmvTaskBtn.textContent = "X";
  taskElement.appendChild(rmvTaskBtn);
  rmvTaskBtn.addEventListener("click", () => {
    taskElement.remove();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].name === project) {
        projects[i].tasks = projects[i].tasks.filter((task) => task.id !== id);
        localStorage.setItem("projects", JSON.stringify(projects));
        break;
      }
    }
  });
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === project) {
      projects[i].tasks.push({
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        id: id,
      });
      break;
    }
  }

  localStorage.setItem("projects", JSON.stringify(projects));

  return taskElement;
}

export function createProjectElement(name, projectId) {
  const folderElement = document.createElement("li");
  folderElement.classList.add("project");

  folderElement.setAttribute("data-project-id", projectId);
  folderElement.textContent = name;

  return folderElement;
}



