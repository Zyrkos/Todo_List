export function createTaskElement(
  title,
  description,
  dueDate,
  priority,
  project
) {
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
  rmvTaskBtn.addEventListener("click", () => {
    taskElement.remove();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.title !== title);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  taskElement.appendChild(rmvTaskBtn);

  return taskElement;
}

export function createProjectElement(name) {
  const folderElement = document.createElement("li");
  folderElement.classList.add("project");
  folderElement.textContent = name;

  return folderElement;
}
