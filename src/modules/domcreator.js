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

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-task-btn");
  editBtn.textContent = "O";
  editBtn.dataset.taskId = id;

  editBtn.addEventListener("click", (event) => {
    document.getElementById("edit-form").style.display = "block";
    taskTest();
  });
  taskElement.appendChild(editBtn);

  localStorage.setItem("projects", JSON.stringify(projects));

  return taskElement;
}

export function createProjectTabs(name, projectId) {
  const folderElement = document.createElement("li");
  folderElement.classList.add("project");

  folderElement.setAttribute("data-project-id", projectId);
  folderElement.textContent = name;

  return folderElement;
}

export function createProjectElement(name, id) {
  const mainContainer = document.getElementById("main-container");

  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project-container");
  projectContainer.setAttribute("id", name);
  projectContainer.style.display = "none";

  const headerSpan = document.createElement("span");
  headerSpan.classList.add("header-span");

  const header = document.createElement("h2");
  header.textContent = name;

  const rmvBtn = document.createElement("button");
  rmvBtn.setAttribute("id", "project-delete");
  rmvBtn.classList.add("project-delete");

  rmvBtn.addEventListener("click", () => {
    // Remove project element from UI
    projectContainer.remove();

    // Remove project from local storage
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects = projects.filter((project) => project.id !== id);
    localStorage.setItem("projects", JSON.stringify(projects));

    // Remove project tab from UI
    const projectElement = document.getElementById(`project-${id}`);
    projectElement.remove();
  });

  const projectsList = document.getElementById("projects-tabs");
  const projectElement = createProjectTabs(name, id);
  projectsList.appendChild(projectElement);

  headerSpan.appendChild(header);
  headerSpan.appendChild(rmvBtn);
  projectContainer.appendChild(headerSpan);
  mainContainer.appendChild(projectContainer);
}

/* export function editTask(id) {
  const editForm = document.getElementById("edit-form");
  editForm.dataset.taskId = id;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = tasks.findIndex((task) => task.id === id);
  const task = tasks[taskIndex];

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    tasks[taskIndex].title = editForm.elements["edit-title"].value;
    tasks[taskIndex].description = editForm.elements["edit-description"].value;
    tasks[taskIndex].dueDate = editForm.elements["edit-taskDueDate"].value;
    tasks[taskIndex].priority = editForm.elements["edit-task-priority"].value;
    tasks[taskIndex].project = projectInput.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    editForm.style.display = "none";
    renderTasks();
    editForm.dataset.id = null;
  });
}
 */

export function taskTest() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const id = parseInt(event.target.dataset.taskId, 10);

  const taskIndex = tasks.findIndex((task) => task.id === id);
  const task = tasks[taskIndex];
  console.log(task);
}
