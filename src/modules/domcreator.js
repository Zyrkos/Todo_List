import { newProject } from "./projects";

export function createTaskElement(
  title,
  description,
  dueDate,
  priority,
  project
) {
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
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
  taskElement.appendChild(rmvTaskBtn)
  rmvTaskBtn.addEventListener("click", () => {
    taskElement.remove();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.title !== title);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Remove the task from the corresponding project's tasks array
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].name === project) {
        projects[i].tasks = projects[i].tasks.filter(
          (task) => task.title !== title
        );
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
      });
      break;
    }
  }

  // Save the updated projects array to local storage
  localStorage.setItem("projects", JSON.stringify(projects));

  return taskElement;
}

export function createProjectElement(name) {
  const folderElement = document.createElement("li");
  folderElement.classList.add("project");
  folderElement.textContent = name;

  return folderElement;
}
