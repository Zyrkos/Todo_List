/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/domcreator.js":
/*!***********************************!*\
  !*** ./src/modules/domcreator.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProjectElement": () => (/* binding */ createProjectElement),
/* harmony export */   "createProjectTabs": () => (/* binding */ createProjectTabs),
/* harmony export */   "createTaskElement": () => (/* binding */ createTaskElement),
/* harmony export */   "editTask": () => (/* binding */ editTask)
/* harmony export */ });
function createTaskElement(
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
    <p class="description">Description: ${description}</p>
    <p class="dueDate">Due Date: ${dueDate}</p>
    <p class="priority">Priority: ${priority}</p>
    <p class="task-element-project">Project: ${project}</p>
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
    editTask();
  });
  taskElement.appendChild(editBtn);

  localStorage.setItem("projects", JSON.stringify(projects));

  return taskElement;
}

function createProjectTabs(name, projectId) {
  const folderElement = document.createElement("li");
  folderElement.classList.add("project");

  folderElement.setAttribute("data-project-id", projectId);
  folderElement.textContent = name;

  return folderElement;
}

function createProjectElement(name, id) {
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
    projectContainer.remove();

    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects = projects.filter((project) => project.id !== id);
    localStorage.setItem("projects", JSON.stringify(projects));

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.project !== name);
    localStorage.setItem("tasks", JSON.stringify(tasks));

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

function editTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const id = parseInt(event.target.dataset.taskId, 10);
  const editForm = document.getElementById("edit-form");
  const titleEdit = document.getElementById("edit-title");
  const descriptionEdit = document.getElementById("edit-description");
  const dueDateEdit = document.getElementById("edit-taskDueDate");
  const priorityEdit = document.getElementById("edit-task-priority");
  const projectEdit = document.getElementById("edit-project-select");

  const taskIndex = tasks.findIndex((task) => task.id === id);
  const task = tasks[taskIndex];

  const oldProject = projects.find((project) => project.name === task.project);

  oldProject.tasks = oldProject.tasks.filter((t) => t.id !== task.id);

  titleEdit.value = task.title;
  descriptionEdit.value = task.description;
  dueDateEdit.value = task.dueDate;
  priorityEdit.value = task.priority;
  projectEdit.value = task.project;

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    tasks[taskIndex].title = titleEdit.value;
    tasks[taskIndex].description = descriptionEdit.value;
    tasks[taskIndex].dueDate = dueDateEdit.value;
    tasks[taskIndex].priority = priorityEdit.value;

    const newProject = projects.find(
      (project) => project.name === projectEdit.value
    );

    newProject.tasks.push(task);

    tasks[taskIndex].project = projectEdit.value;

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("projects", JSON.stringify(projects));

    editForm.style.display = "none";
    editForm.dataset.id = null;

    updateUi(id, tasks[taskIndex]);
    location.reload();
  });
}

function updateUi(id, task) {
  const taskElement = document.querySelector(`[data-task-id="${id}"]`);
  taskElement.querySelector(".title").textContent = task.title;
  taskElement.querySelector(
    ".description"
  ).textContent = `Description: ${task.description}`;
  taskElement.querySelector(
    ".dueDate"
  ).textContent = `Due Date: ${task.dueDate}`;
  taskElement.querySelector(
    ".priority"
  ).textContent = `Priority: ${task.priority}`;
  taskElement.querySelector(
    ".task-element-project"
  ).textContent = `Project: ${task.project}`;
}


/***/ }),

/***/ "./src/modules/eventshandler.js":
/*!**************************************!*\
  !*** ./src/modules/eventshandler.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeTheForm": () => (/* binding */ closeTheForm),
/* harmony export */   "collapsibleTabs": () => (/* binding */ collapsibleTabs),
/* harmony export */   "openTheForm": () => (/* binding */ openTheForm),
/* harmony export */   "projectOptions": () => (/* binding */ projectOptions),
/* harmony export */   "tabSwitch": () => (/* binding */ tabSwitch)
/* harmony export */ });
function collapsibleTabs() {
  const collapsibles = document.querySelectorAll(".collapsible");

  collapsibles.forEach((collapsible) => {
    collapsible.addEventListener("click", (event) => {
      const content = collapsible.querySelector(".collap-content");
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
      event.stopPropagation();
    });

    const content = collapsible.querySelector(".collap-content");
    content.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
}
function projectOptions() {
  const select = document.getElementById("project-select");
  const editSel = document.getElementById("edit-project-select");
  const list = document.getElementById("projects-tabs");
  const items = list.getElementsByClassName("project");

  for (let i = 0; i < items.length; i++) {
    const option = document.createElement("option");
    option.value = items[i].textContent;
    option.text = items[i].textContent;
    
    // check if option already exists in select element
    if (!select.querySelector(`[value="${option.value}"]`)) {
      select.appendChild(option);
    }
    
    // create a new option element for the edit form
    const editOption = option.cloneNode(true);
    if (!editSel.querySelector(`[value="${editOption.value}"]`)) {
      editSel.appendChild(editOption);
    }
  }
}

function openTheForm() {
  const addNewTask = document.getElementById("add-new-btn");
  addNewTask.addEventListener("click", () => {
    document.getElementById("popup-form").style.display = "block";
  });

  const addNewProject = document.getElementById("add-project-btn");
  addNewProject.addEventListener("click", () => {
    document.getElementById("project-popup-form").style.display = "block";
  });
}

function closeTheForm() {
  const closeForm = document.getElementById("close-form");
  closeForm.addEventListener("click", () => {
    document.getElementById("popup-form").style.display = "none";
  });
  const closeProjectForm = document.getElementById("close-project-form");
  closeProjectForm.addEventListener("click", () => {
    document.getElementById("project-popup-form").style.display = "none";
  });

  const closeEditProjectForm = document.getElementById("edit-form-close")
  closeEditProjectForm.addEventListener("click", () => {
    document.getElementById("edit-form").style.display = "none";
  });

  window.onclick = function (event) {
    if (
      event.target.className === "project-popup-form" ||
      event.target.className === "popup-form"
    ) {
      event.target.style.display = "none";
    }
  };
}

function tabSwitch() {
  const tabs = document.getElementById("projects-tabs");
  const defaultTab = document.getElementById("inbox");
  let currentTab = defaultTab;

  tabs.addEventListener("click", function (event) {
    const clickedTab = event.target;
    const projectName = clickedTab.innerText;
    const projectDiv = document.getElementById(projectName);

    if (projectDiv && currentTab !== projectDiv) {
      if (currentTab) {
        currentTab.style.display = "none";
      }
      projectDiv.style.display = "block";
      currentTab = projectDiv;
    }
  });
}


/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newProject": () => (/* binding */ newProject)
/* harmony export */ });
/* harmony import */ var _eventshandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventshandler */ "./src/modules/eventshandler.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/modules/storage.js");
/* harmony import */ var _domcreator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domcreator */ "./src/modules/domcreator.js");




function newProject() {
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

    (0,_domcreator__WEBPACK_IMPORTED_MODULE_2__.createProjectElement)(name, id);

    const newProject = { id: id, name: name, tasks: [] };
    projects.push(newProject);

    _storage__WEBPACK_IMPORTED_MODULE_1__["default"].saveNewProject(projects);

    (0,_eventshandler__WEBPACK_IMPORTED_MODULE_0__.projectOptions)();
  });
}


/***/ }),

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
/* harmony import */ var _eventshandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventshandler */ "./src/modules/eventshandler.js");
/* harmony import */ var _domcreator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domcreator */ "./src/modules/domcreator.js");




class Storage {
  static saveNewProject(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  static loadProjects() {
    const projects = JSON.parse(localStorage.getItem("projects"));
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (projects && projects.length > 0) {
      projects.forEach((project) => {
        (0,_domcreator__WEBPACK_IMPORTED_MODULE_1__.createProjectElement)(project.name, project.id);

        if (tasks && tasks.length > 0) {
          const projectTasks = tasks.filter(
            (task) => task.project === project.name
          );

          projectTasks.forEach((task) => {
            const taskElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_1__.createTaskElement)(
              task.title,
              task.description,
              task.dueDate,
              task.priority,
              task.project,
              task.id
            );

            const projectContainer = document.getElementById(task.project);
            projectContainer.appendChild(taskElement);
          });
        }
      });
      localStorage.setItem("projects", JSON.stringify(projects)); //important to save the
      //projects so that it
      //doesnt duplicate the tasks in localstorage each time page is reloaded

      (0,_eventshandler__WEBPACK_IMPORTED_MODULE_0__.projectOptions)();
    }
  }

  static saveNewTask(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks && tasks.length > 0) {
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const defaultContainer = document.getElementById("inbox");

      for (const task of tasks) {
        const { title, description, dueDate, priority, project, id } = task;

        const existingProject = projects.find((p) => p.name === project);
        if (existingProject && existingProject.tasks.some((t) => t.id === id)) {
          // Check if task with same ID already exists in project, if it does: skip adding it
          continue;
        }

        /*   const taskElement = createTaskElement(
          title,
          description,
          dueDate,
          priority,
          project,
          id
        ); */
        /*         defaultContainer.appendChild(taskElement);
         */
        if (existingProject) {
          existingProject.tasks.push({
            title,
            description,
            dueDate,
            priority,
            id,
          });
          localStorage.setItem("projects", JSON.stringify(projects));
        }
      }
    }
  }
}

window.addEventListener("load", () => {
  Storage.loadTasks();
  Storage.loadProjects();
});


/***/ }),

/***/ "./src/modules/tasks.js":
/*!******************************!*\
  !*** ./src/modules/tasks.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newTask": () => (/* binding */ newTask)
/* harmony export */ });
/* harmony import */ var _domcreator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domcreator */ "./src/modules/domcreator.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/modules/storage.js");



const newTask = () => {
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const dueDateInput = document.getElementById("taskDueDate");
  const priorityInput = document.getElementById("task-priority");
  const projectInput = document.getElementById("project-select");
  const form = document.getElementById("task-form");
  const formWindow = document.getElementById("popup-form");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const id = Date.now();
    const title = titleInput.value;
    const description = descriptionInput.value;
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    let project = projectInput.value;
    if (!project) {
      project = "Inbox";
    }

    form.reset();
    formWindow.style.display = "none";

    const projectContainer = document.getElementById(project);
    const taskElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_0__.createTaskElement)(
      title,
      description,
      dueDate,
      priority,
      project,
      id
    );
    projectContainer.appendChild(taskElement);

    const newTask = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      project: project,
      id: id,
    };
    tasks.push(newTask);
    console.log(id);
    _storage__WEBPACK_IMPORTED_MODULE_1__["default"].saveNewTask(tasks);
  });

  return {
    getTitle: () => titleInput.value,
    getDescription: () => descriptionInput.value,
    getDueDate: () => dueDateInput.value,
    getPriority: () => priorityInput.value,
    getProject: () => projectInput.value,
  };
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tasks */ "./src/modules/tasks.js");
/* harmony import */ var _modules_projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/projects */ "./src/modules/projects.js");
/* harmony import */ var _modules_eventshandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/eventshandler */ "./src/modules/eventshandler.js");





(0,_modules_tasks__WEBPACK_IMPORTED_MODULE_0__.newTask)();
(0,_modules_eventshandler__WEBPACK_IMPORTED_MODULE_2__.collapsibleTabs)();
(0,_modules_eventshandler__WEBPACK_IMPORTED_MODULE_2__.openTheForm)();
(0,_modules_eventshandler__WEBPACK_IMPORTED_MODULE_2__.closeTheForm)();
(0,_modules_projects__WEBPACK_IMPORTED_MODULE_1__.newProject)();
(0,_modules_eventshandler__WEBPACK_IMPORTED_MODULE_2__.tabSwitch)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSx3QkFBd0IsOERBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSw0REFBbUI7QUFDdkIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzVEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOMEM7QUFDTTtBQU1mO0FBQ2pDO0FBQ0E7QUFDQSx1REFBTztBQUNQLHVFQUFlO0FBQ2YsbUVBQVc7QUFDWCxvRUFBWTtBQUNaLDZEQUFVO0FBQ1YsaUVBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvbW9kdWxlcy9kb21jcmVhdG9yLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9tb2R1bGVzL2V2ZW50c2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvbW9kdWxlcy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRhc2tFbGVtZW50KFxyXG4gIHRpdGxlLFxyXG4gIGRlc2NyaXB0aW9uLFxyXG4gIGR1ZURhdGUsXHJcbiAgcHJpb3JpdHksXHJcbiAgcHJvamVjdCxcclxuICBpZFxyXG4pIHtcclxuICBsZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IFtdO1xyXG5cclxuICBjb25zdCB0YXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgdGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XHJcbiAgdGFza0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS10YXNrLWlkXCIsIGlkKTsgLy8gU2V0IHRoZSBpZCBhcyBhIGRhdGEgYXR0cmlidXRlXHJcbiAgdGFza0VsZW1lbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgPGgyIGNsYXNzPVwidGl0bGVcIj4ke3RpdGxlfTwvaDI+XHJcbiAgICA8cCBjbGFzcz1cImRlc2NyaXB0aW9uXCI+RGVzY3JpcHRpb246ICR7ZGVzY3JpcHRpb259PC9wPlxyXG4gICAgPHAgY2xhc3M9XCJkdWVEYXRlXCI+RHVlIERhdGU6ICR7ZHVlRGF0ZX08L3A+XHJcbiAgICA8cCBjbGFzcz1cInByaW9yaXR5XCI+UHJpb3JpdHk6ICR7cHJpb3JpdHl9PC9wPlxyXG4gICAgPHAgY2xhc3M9XCJ0YXNrLWVsZW1lbnQtcHJvamVjdFwiPlByb2plY3Q6ICR7cHJvamVjdH08L3A+XHJcbiAgYDtcclxuXHJcbiAgY29uc3Qgcm12VGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgcm12VGFza0J0bi5jbGFzc0xpc3QuYWRkKFwicm12LXRhc2stYnRuXCIpO1xyXG4gIHJtdlRhc2tCdG4udGV4dENvbnRlbnQgPSBcIlhcIjtcclxuICB0YXNrRWxlbWVudC5hcHBlbmRDaGlsZChybXZUYXNrQnRuKTtcclxuICBybXZUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICB0YXNrRWxlbWVudC5yZW1vdmUoKTtcclxuXHJcbiAgICBsZXQgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpIHx8IFtdO1xyXG4gICAgdGFza3MgPSB0YXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2suaWQgIT09IGlkKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza3NcIiwgSlNPTi5zdHJpbmdpZnkodGFza3MpKTtcclxuXHJcbiAgICBsZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAocHJvamVjdHNbaV0ubmFtZSA9PT0gcHJvamVjdCkge1xyXG4gICAgICAgIHByb2plY3RzW2ldLnRhc2tzID0gcHJvamVjdHNbaV0udGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmlkICE9PSBpZCk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKHByb2plY3RzW2ldLm5hbWUgPT09IHByb2plY3QpIHtcclxuICAgICAgcHJvamVjdHNbaV0udGFza3MucHVzaCh7XHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuICAgICAgICBkdWVEYXRlOiBkdWVEYXRlLFxyXG4gICAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcclxuICAgICAgICBpZDogaWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGVkaXRCdG4uY2xhc3NMaXN0LmFkZChcImVkaXQtdGFzay1idG5cIik7XHJcbiAgZWRpdEJ0bi50ZXh0Q29udGVudCA9IFwiT1wiO1xyXG4gIGVkaXRCdG4uZGF0YXNldC50YXNrSWQgPSBpZDtcclxuXHJcbiAgZWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtZm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgZWRpdFRhc2soKTtcclxuICB9KTtcclxuICB0YXNrRWxlbWVudC5hcHBlbmRDaGlsZChlZGl0QnRuKTtcclxuXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG5cclxuICByZXR1cm4gdGFza0VsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0VGFicyhuYW1lLCBwcm9qZWN0SWQpIHtcclxuICBjb25zdCBmb2xkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIGZvbGRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XHJcblxyXG4gIGZvbGRlckVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0LWlkXCIsIHByb2plY3RJZCk7XHJcbiAgZm9sZGVyRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XHJcblxyXG4gIHJldHVybiBmb2xkZXJFbGVtZW50O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJvamVjdEVsZW1lbnQobmFtZSwgaWQpIHtcclxuICBjb25zdCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLWNvbnRhaW5lclwiKTtcclxuXHJcbiAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgcHJvamVjdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1jb250YWluZXJcIik7XHJcbiAgcHJvamVjdENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBuYW1lKTtcclxuICBwcm9qZWN0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgY29uc3QgaGVhZGVyU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gIGhlYWRlclNwYW4uY2xhc3NMaXN0LmFkZChcImhlYWRlci1zcGFuXCIpO1xyXG5cclxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgaGVhZGVyLnRleHRDb250ZW50ID0gbmFtZTtcclxuXHJcbiAgY29uc3Qgcm12QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBybXZCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0LWRlbGV0ZVwiKTtcclxuICBybXZCdG4uY2xhc3NMaXN0LmFkZChcInByb2plY3QtZGVsZXRlXCIpO1xyXG5cclxuICBybXZCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIHByb2plY3RDb250YWluZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgbGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKSB8fCBbXTtcclxuICAgIHByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkICE9PSBpZCk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcblxyXG4gICAgbGV0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKSB8fCBbXTtcclxuICAgIHRhc2tzID0gdGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnByb2plY3QgIT09IG5hbWUpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0YXNrc1wiLCBKU09OLnN0cmluZ2lmeSh0YXNrcykpO1xyXG5cclxuICAgIGNvbnN0IHByb2plY3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByb2plY3QtJHtpZH1gKTtcclxuICAgIHByb2plY3RFbGVtZW50LnJlbW92ZSgpO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLXRhYnNcIik7XHJcbiAgY29uc3QgcHJvamVjdEVsZW1lbnQgPSBjcmVhdGVQcm9qZWN0VGFicyhuYW1lLCBpZCk7XHJcbiAgcHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKHByb2plY3RFbGVtZW50KTtcclxuXHJcbiAgaGVhZGVyU3Bhbi5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gIGhlYWRlclNwYW4uYXBwZW5kQ2hpbGQocm12QnRuKTtcclxuICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlclNwYW4pO1xyXG4gIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdENvbnRhaW5lcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlZGl0VGFzaygpIHtcclxuICBjb25zdCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSkgfHwgW107XHJcbiAgY29uc3QgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IFtdO1xyXG4gIGNvbnN0IGlkID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQudGFza0lkLCAxMCk7XHJcbiAgY29uc3QgZWRpdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtZm9ybVwiKTtcclxuICBjb25zdCB0aXRsZUVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtdGl0bGVcIik7XHJcbiAgY29uc3QgZGVzY3JpcHRpb25FZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LWRlc2NyaXB0aW9uXCIpO1xyXG4gIGNvbnN0IGR1ZURhdGVFZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXRhc2tEdWVEYXRlXCIpO1xyXG4gIGNvbnN0IHByaW9yaXR5RWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC10YXNrLXByaW9yaXR5XCIpO1xyXG4gIGNvbnN0IHByb2plY3RFZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXByb2plY3Qtc2VsZWN0XCIpO1xyXG5cclxuICBjb25zdCB0YXNrSW5kZXggPSB0YXNrcy5maW5kSW5kZXgoKHRhc2spID0+IHRhc2suaWQgPT09IGlkKTtcclxuICBjb25zdCB0YXNrID0gdGFza3NbdGFza0luZGV4XTtcclxuXHJcbiAgY29uc3Qgb2xkUHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gdGFzay5wcm9qZWN0KTtcclxuXHJcbiAgb2xkUHJvamVjdC50YXNrcyA9IG9sZFByb2plY3QudGFza3MuZmlsdGVyKCh0KSA9PiB0LmlkICE9PSB0YXNrLmlkKTtcclxuXHJcbiAgdGl0bGVFZGl0LnZhbHVlID0gdGFzay50aXRsZTtcclxuICBkZXNjcmlwdGlvbkVkaXQudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG4gIGR1ZURhdGVFZGl0LnZhbHVlID0gdGFzay5kdWVEYXRlO1xyXG4gIHByaW9yaXR5RWRpdC52YWx1ZSA9IHRhc2sucHJpb3JpdHk7XHJcbiAgcHJvamVjdEVkaXQudmFsdWUgPSB0YXNrLnByb2plY3Q7XHJcblxyXG4gIGVkaXRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHRhc2tzW3Rhc2tJbmRleF0udGl0bGUgPSB0aXRsZUVkaXQudmFsdWU7XHJcbiAgICB0YXNrc1t0YXNrSW5kZXhdLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25FZGl0LnZhbHVlO1xyXG4gICAgdGFza3NbdGFza0luZGV4XS5kdWVEYXRlID0gZHVlRGF0ZUVkaXQudmFsdWU7XHJcbiAgICB0YXNrc1t0YXNrSW5kZXhdLnByaW9yaXR5ID0gcHJpb3JpdHlFZGl0LnZhbHVlO1xyXG5cclxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBwcm9qZWN0cy5maW5kKFxyXG4gICAgICAocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lID09PSBwcm9qZWN0RWRpdC52YWx1ZVxyXG4gICAgKTtcclxuXHJcbiAgICBuZXdQcm9qZWN0LnRhc2tzLnB1c2godGFzayk7XHJcblxyXG4gICAgdGFza3NbdGFza0luZGV4XS5wcm9qZWN0ID0gcHJvamVjdEVkaXQudmFsdWU7XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0YXNrc1wiLCBKU09OLnN0cmluZ2lmeSh0YXNrcykpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG5cclxuICAgIGVkaXRGb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGVkaXRGb3JtLmRhdGFzZXQuaWQgPSBudWxsO1xyXG5cclxuICAgIHVwZGF0ZVVpKGlkLCB0YXNrc1t0YXNrSW5kZXhdKTtcclxuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVVaShpZCwgdGFzaykge1xyXG4gIGNvbnN0IHRhc2tFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdGFzay1pZD1cIiR7aWR9XCJdYCk7XHJcbiAgdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZVwiKS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcbiAgdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgIFwiLmRlc2NyaXB0aW9uXCJcclxuICApLnRleHRDb250ZW50ID0gYERlc2NyaXB0aW9uOiAke3Rhc2suZGVzY3JpcHRpb259YDtcclxuICB0YXNrRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgXCIuZHVlRGF0ZVwiXHJcbiAgKS50ZXh0Q29udGVudCA9IGBEdWUgRGF0ZTogJHt0YXNrLmR1ZURhdGV9YDtcclxuICB0YXNrRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgXCIucHJpb3JpdHlcIlxyXG4gICkudGV4dENvbnRlbnQgPSBgUHJpb3JpdHk6ICR7dGFzay5wcmlvcml0eX1gO1xyXG4gIHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICBcIi50YXNrLWVsZW1lbnQtcHJvamVjdFwiXHJcbiAgKS50ZXh0Q29udGVudCA9IGBQcm9qZWN0OiAke3Rhc2sucHJvamVjdH1gO1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBjb2xsYXBzaWJsZVRhYnMoKSB7XHJcbiAgY29uc3QgY29sbGFwc2libGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb2xsYXBzaWJsZVwiKTtcclxuXHJcbiAgY29sbGFwc2libGVzLmZvckVhY2goKGNvbGxhcHNpYmxlKSA9PiB7XHJcbiAgICBjb2xsYXBzaWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBjb2xsYXBzaWJsZS5xdWVyeVNlbGVjdG9yKFwiLmNvbGxhcC1jb250ZW50XCIpO1xyXG4gICAgICBpZiAoY29udGVudC5zdHlsZS5kaXNwbGF5ID09PSBcImJsb2NrXCIpIHtcclxuICAgICAgICBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgIH1cclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBjb250ZW50ID0gY29sbGFwc2libGUucXVlcnlTZWxlY3RvcihcIi5jb2xsYXAtY29udGVudFwiKTtcclxuICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0T3B0aW9ucygpIHtcclxuICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3Qtc2VsZWN0XCIpO1xyXG4gIGNvbnN0IGVkaXRTZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtcHJvamVjdC1zZWxlY3RcIik7XHJcbiAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHMtdGFic1wiKTtcclxuICBjb25zdCBpdGVtcyA9IGxpc3QuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInByb2plY3RcIik7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBvcHRpb24udmFsdWUgPSBpdGVtc1tpXS50ZXh0Q29udGVudDtcclxuICAgIG9wdGlvbi50ZXh0ID0gaXRlbXNbaV0udGV4dENvbnRlbnQ7XHJcbiAgICBcclxuICAgIC8vIGNoZWNrIGlmIG9wdGlvbiBhbHJlYWR5IGV4aXN0cyBpbiBzZWxlY3QgZWxlbWVudFxyXG4gICAgaWYgKCFzZWxlY3QucXVlcnlTZWxlY3RvcihgW3ZhbHVlPVwiJHtvcHRpb24udmFsdWV9XCJdYCkpIHtcclxuICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIGNyZWF0ZSBhIG5ldyBvcHRpb24gZWxlbWVudCBmb3IgdGhlIGVkaXQgZm9ybVxyXG4gICAgY29uc3QgZWRpdE9wdGlvbiA9IG9wdGlvbi5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICBpZiAoIWVkaXRTZWwucXVlcnlTZWxlY3RvcihgW3ZhbHVlPVwiJHtlZGl0T3B0aW9uLnZhbHVlfVwiXWApKSB7XHJcbiAgICAgIGVkaXRTZWwuYXBwZW5kQ2hpbGQoZWRpdE9wdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb3BlblRoZUZvcm0oKSB7XHJcbiAgY29uc3QgYWRkTmV3VGFzayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLW5ldy1idG5cIik7XHJcbiAgYWRkTmV3VGFzay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3B1cC1mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGFkZE5ld1Byb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0LWJ0blwiKTtcclxuICBhZGROZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtcG9wdXAtZm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VUaGVGb3JtKCkge1xyXG4gIGNvbnN0IGNsb3NlRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UtZm9ybVwiKTtcclxuICBjbG9zZUZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wdXAtZm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgfSk7XHJcbiAgY29uc3QgY2xvc2VQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UtcHJvamVjdC1mb3JtXCIpO1xyXG4gIGNsb3NlUHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1wb3B1cC1mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgY2xvc2VFZGl0UHJvamVjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtZm9ybS1jbG9zZVwiKVxyXG4gIGNsb3NlRWRpdFByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtZm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgfSk7XHJcblxyXG4gIHdpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IFwicHJvamVjdC1wb3B1cC1mb3JtXCIgfHxcclxuICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJwb3B1cC1mb3JtXCJcclxuICAgICkge1xyXG4gICAgICBldmVudC50YXJnZXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0YWJTd2l0Y2goKSB7XHJcbiAgY29uc3QgdGFicyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHMtdGFic1wiKTtcclxuICBjb25zdCBkZWZhdWx0VGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmJveFwiKTtcclxuICBsZXQgY3VycmVudFRhYiA9IGRlZmF1bHRUYWI7XHJcblxyXG4gIHRhYnMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgY29uc3QgY2xpY2tlZFRhYiA9IGV2ZW50LnRhcmdldDtcclxuICAgIGNvbnN0IHByb2plY3ROYW1lID0gY2xpY2tlZFRhYi5pbm5lclRleHQ7XHJcbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJvamVjdE5hbWUpO1xyXG5cclxuICAgIGlmIChwcm9qZWN0RGl2ICYmIGN1cnJlbnRUYWIgIT09IHByb2plY3REaXYpIHtcclxuICAgICAgaWYgKGN1cnJlbnRUYWIpIHtcclxuICAgICAgICBjdXJyZW50VGFiLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgfVxyXG4gICAgICBwcm9qZWN0RGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgIGN1cnJlbnRUYWIgPSBwcm9qZWN0RGl2O1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbiIsImltcG9ydCB7IHByb2plY3RPcHRpb25zIH0gZnJvbSBcIi4vZXZlbnRzaGFuZGxlclwiO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVwiO1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdEVsZW1lbnQgfSBmcm9tIFwiLi9kb21jcmVhdG9yXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdQcm9qZWN0KCkge1xuICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbmFtZVwiKTtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpO1xuICBjb25zdCBmb3JtV2luZG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXBvcHVwLWZvcm1cIik7XG5cbiAgbGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKSB8fCBbXTtcblxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgICBmb3JtV2luZG93LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgIGNvbnN0IGlkID0gRGF0ZS5ub3coKTtcblxuICAgIGNyZWF0ZVByb2plY3RFbGVtZW50KG5hbWUsIGlkKTtcblxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSB7IGlkOiBpZCwgbmFtZTogbmFtZSwgdGFza3M6IFtdIH07XG4gICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcblxuICAgIFN0b3JhZ2Uuc2F2ZU5ld1Byb2plY3QocHJvamVjdHMpO1xuXG4gICAgcHJvamVjdE9wdGlvbnMoKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBwcm9qZWN0T3B0aW9ucyB9IGZyb20gXCIuL2V2ZW50c2hhbmRsZXJcIjtcbmltcG9ydCB7IGNyZWF0ZVRhc2tFbGVtZW50IH0gZnJvbSBcIi4vZG9tY3JlYXRvclwiO1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdEVsZW1lbnQgfSBmcm9tIFwiLi9kb21jcmVhdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhZ2Uge1xuICBzdGF0aWMgc2F2ZU5ld1Byb2plY3QocHJvamVjdHMpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG4gIH1cblxuICBzdGF0aWMgbG9hZFByb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKTtcbiAgICBjb25zdCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSk7XG5cbiAgICBpZiAocHJvamVjdHMgJiYgcHJvamVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICBjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0Lm5hbWUsIHByb2plY3QuaWQpO1xuXG4gICAgICAgIGlmICh0YXNrcyAmJiB0YXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgcHJvamVjdFRhc2tzID0gdGFza3MuZmlsdGVyKFxuICAgICAgICAgICAgKHRhc2spID0+IHRhc2sucHJvamVjdCA9PT0gcHJvamVjdC5uYW1lXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHByb2plY3RUYXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXNrRWxlbWVudCA9IGNyZWF0ZVRhc2tFbGVtZW50KFxuICAgICAgICAgICAgICB0YXNrLnRpdGxlLFxuICAgICAgICAgICAgICB0YXNrLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICB0YXNrLmR1ZURhdGUsXG4gICAgICAgICAgICAgIHRhc2sucHJpb3JpdHksXG4gICAgICAgICAgICAgIHRhc2sucHJvamVjdCxcbiAgICAgICAgICAgICAgdGFzay5pZFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhc2sucHJvamVjdCk7XG4gICAgICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tFbGVtZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7IC8vaW1wb3J0YW50IHRvIHNhdmUgdGhlXG4gICAgICAvL3Byb2plY3RzIHNvIHRoYXQgaXRcbiAgICAgIC8vZG9lc250IGR1cGxpY2F0ZSB0aGUgdGFza3MgaW4gbG9jYWxzdG9yYWdlIGVhY2ggdGltZSBwYWdlIGlzIHJlbG9hZGVkXG5cbiAgICAgIHByb2plY3RPcHRpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHNhdmVOZXdUYXNrKHRhc2tzKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0YXNrc1wiLCBKU09OLnN0cmluZ2lmeSh0YXNrcykpO1xuICB9XG5cbiAgc3RhdGljIGxvYWRUYXNrcygpIHtcbiAgICBjb25zdCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSk7XG5cbiAgICBpZiAodGFza3MgJiYgdGFza3MubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IFtdO1xuICAgICAgY29uc3QgZGVmYXVsdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5ib3hcIik7XG5cbiAgICAgIGZvciAoY29uc3QgdGFzayBvZiB0YXNrcykge1xuICAgICAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QsIGlkIH0gPSB0YXNrO1xuXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nUHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHApID0+IHAubmFtZSA9PT0gcHJvamVjdCk7XG4gICAgICAgIGlmIChleGlzdGluZ1Byb2plY3QgJiYgZXhpc3RpbmdQcm9qZWN0LnRhc2tzLnNvbWUoKHQpID0+IHQuaWQgPT09IGlkKSkge1xuICAgICAgICAgIC8vIENoZWNrIGlmIHRhc2sgd2l0aCBzYW1lIElEIGFscmVhZHkgZXhpc3RzIGluIHByb2plY3QsIGlmIGl0IGRvZXM6IHNraXAgYWRkaW5nIGl0XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiAgIGNvbnN0IHRhc2tFbGVtZW50ID0gY3JlYXRlVGFza0VsZW1lbnQoXG4gICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgICBwcmlvcml0eSxcbiAgICAgICAgICBwcm9qZWN0LFxuICAgICAgICAgIGlkXG4gICAgICAgICk7ICovXG4gICAgICAgIC8qICAgICAgICAgZGVmYXVsdENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRWxlbWVudCk7XG4gICAgICAgICAqL1xuICAgICAgICBpZiAoZXhpc3RpbmdQcm9qZWN0KSB7XG4gICAgICAgICAgZXhpc3RpbmdQcm9qZWN0LnRhc2tzLnB1c2goe1xuICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGR1ZURhdGUsXG4gICAgICAgICAgICBwcmlvcml0eSxcbiAgICAgICAgICAgIGlkLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICBTdG9yYWdlLmxvYWRUYXNrcygpO1xuICBTdG9yYWdlLmxvYWRQcm9qZWN0cygpO1xufSk7XG4iLCJpbXBvcnQgeyBjcmVhdGVUYXNrRWxlbWVudCB9IGZyb20gXCIuL2RvbWNyZWF0b3JcIjtcclxuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IG5ld1Rhc2sgPSAoKSA9PiB7XHJcbiAgY29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIik7XHJcbiAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb25cIik7XHJcbiAgY29uc3QgZHVlRGF0ZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrRHVlRGF0ZVwiKTtcclxuICBjb25zdCBwcmlvcml0eUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXByaW9yaXR5XCIpO1xyXG4gIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zZWxlY3RcIik7XHJcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtXCIpO1xyXG4gIGNvbnN0IGZvcm1XaW5kb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvcHVwLWZvcm1cIik7XHJcblxyXG4gIGxldCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSkgfHwgW107XHJcblxyXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBpZCA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCB0aXRsZSA9IHRpdGxlSW5wdXQudmFsdWU7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uSW5wdXQudmFsdWU7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gZHVlRGF0ZUlucHV0LnZhbHVlO1xyXG4gICAgY29uc3QgcHJpb3JpdHkgPSBwcmlvcml0eUlucHV0LnZhbHVlO1xyXG4gICAgbGV0IHByb2plY3QgPSBwcm9qZWN0SW5wdXQudmFsdWU7XHJcbiAgICBpZiAoIXByb2plY3QpIHtcclxuICAgICAgcHJvamVjdCA9IFwiSW5ib3hcIjtcclxuICAgIH1cclxuXHJcbiAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICBmb3JtV2luZG93LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJvamVjdCk7XHJcbiAgICBjb25zdCB0YXNrRWxlbWVudCA9IGNyZWF0ZVRhc2tFbGVtZW50KFxyXG4gICAgICB0aXRsZSxcclxuICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgIGR1ZURhdGUsXHJcbiAgICAgIHByaW9yaXR5LFxyXG4gICAgICBwcm9qZWN0LFxyXG4gICAgICBpZFxyXG4gICAgKTtcclxuICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VsZW1lbnQpO1xyXG5cclxuICAgIGNvbnN0IG5ld1Rhc2sgPSB7XHJcbiAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgICBkdWVEYXRlOiBkdWVEYXRlLFxyXG4gICAgICBwcmlvcml0eTogcHJpb3JpdHksXHJcbiAgICAgIHByb2plY3Q6IHByb2plY3QsXHJcbiAgICAgIGlkOiBpZCxcclxuICAgIH07XHJcbiAgICB0YXNrcy5wdXNoKG5ld1Rhc2spO1xyXG4gICAgY29uc29sZS5sb2coaWQpO1xyXG4gICAgU3RvcmFnZS5zYXZlTmV3VGFzayh0YXNrcyk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBnZXRUaXRsZTogKCkgPT4gdGl0bGVJbnB1dC52YWx1ZSxcclxuICAgIGdldERlc2NyaXB0aW9uOiAoKSA9PiBkZXNjcmlwdGlvbklucHV0LnZhbHVlLFxyXG4gICAgZ2V0RHVlRGF0ZTogKCkgPT4gZHVlRGF0ZUlucHV0LnZhbHVlLFxyXG4gICAgZ2V0UHJpb3JpdHk6ICgpID0+IHByaW9yaXR5SW5wdXQudmFsdWUsXHJcbiAgICBnZXRQcm9qZWN0OiAoKSA9PiBwcm9qZWN0SW5wdXQudmFsdWUsXHJcbiAgfTtcclxufTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBuZXdUYXNrIH0gZnJvbSBcIi4vbW9kdWxlcy90YXNrc1wiO1xyXG5pbXBvcnQgeyBuZXdQcm9qZWN0IH0gZnJvbSBcIi4vbW9kdWxlcy9wcm9qZWN0c1wiO1xyXG5pbXBvcnQge1xyXG4gIHRhYlN3aXRjaCxcclxuICBvcGVuVGhlRm9ybSxcclxuICBjbG9zZVRoZUZvcm0sXHJcbiAgY29sbGFwc2libGVUYWJzLFxyXG59IGZyb20gXCIuL21vZHVsZXMvZXZlbnRzaGFuZGxlclwiO1xyXG5cclxuXHJcbm5ld1Rhc2soKTtcclxuY29sbGFwc2libGVUYWJzKCk7XHJcbm9wZW5UaGVGb3JtKCk7XHJcbmNsb3NlVGhlRm9ybSgpO1xyXG5uZXdQcm9qZWN0KCk7XHJcbnRhYlN3aXRjaCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=