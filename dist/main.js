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
  <div class="task-info">
    <p class="title">${title}</p>
    <p class="dueDate">Due Date: ${dueDate}</p>
    <p class="priority">Priority: ${priority}</p>
  </div>  
  <div class="task-collap-div>
    <p class="task-element-project">Project: ${project}</p>
    <p class="description">Description: ${description}</p>
  </div>
  `;

  const taskBtnsDiv = document.createElement("div");
  taskBtnsDiv.classList.add("task-btns-div")

  const rmvTaskBtn = document.createElement("button");
  rmvTaskBtn.classList.add("rmv-task-btn");
  rmvTaskBtn.textContent = "X";
  taskBtnsDiv.appendChild(rmvTaskBtn);
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
  taskBtnsDiv.appendChild(editBtn);

  taskElement.appendChild(taskBtnsDiv)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsOERBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSw0REFBbUI7QUFDdkIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzVEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOMEM7QUFDTTtBQU1mO0FBQ2pDO0FBQ0E7QUFDQSx1REFBTztBQUNQLHVFQUFlO0FBQ2YsbUVBQVc7QUFDWCxvRUFBWTtBQUNaLDZEQUFVO0FBQ1YsaUVBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvbW9kdWxlcy9kb21jcmVhdG9yLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9tb2R1bGVzL2V2ZW50c2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvbW9kdWxlcy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRhc2tFbGVtZW50KFxyXG4gIHRpdGxlLFxyXG4gIGRlc2NyaXB0aW9uLFxyXG4gIGR1ZURhdGUsXHJcbiAgcHJpb3JpdHksXHJcbiAgcHJvamVjdCxcclxuICBpZFxyXG4pIHtcclxuICBsZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IFtdO1xyXG5cclxuICBjb25zdCB0YXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgdGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XHJcbiAgdGFza0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS10YXNrLWlkXCIsIGlkKTsgLy8gU2V0IHRoZSBpZCBhcyBhIGRhdGEgYXR0cmlidXRlXHJcbiAgdGFza0VsZW1lbnQuaW5uZXJIVE1MID0gYFxyXG4gIDxkaXYgY2xhc3M9XCJ0YXNrLWluZm9cIj5cclxuICAgIDxwIGNsYXNzPVwidGl0bGVcIj4ke3RpdGxlfTwvcD5cclxuICAgIDxwIGNsYXNzPVwiZHVlRGF0ZVwiPkR1ZSBEYXRlOiAke2R1ZURhdGV9PC9wPlxyXG4gICAgPHAgY2xhc3M9XCJwcmlvcml0eVwiPlByaW9yaXR5OiAke3ByaW9yaXR5fTwvcD5cclxuICA8L2Rpdj4gIFxyXG4gIDxkaXYgY2xhc3M9XCJ0YXNrLWNvbGxhcC1kaXY+XHJcbiAgICA8cCBjbGFzcz1cInRhc2stZWxlbWVudC1wcm9qZWN0XCI+UHJvamVjdDogJHtwcm9qZWN0fTwvcD5cclxuICAgIDxwIGNsYXNzPVwiZGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjogJHtkZXNjcmlwdGlvbn08L3A+XHJcbiAgPC9kaXY+XHJcbiAgYDtcclxuXHJcbiAgY29uc3QgdGFza0J0bnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHRhc2tCdG5zRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWJ0bnMtZGl2XCIpXHJcblxyXG4gIGNvbnN0IHJtdlRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHJtdlRhc2tCdG4uY2xhc3NMaXN0LmFkZChcInJtdi10YXNrLWJ0blwiKTtcclxuICBybXZUYXNrQnRuLnRleHRDb250ZW50ID0gXCJYXCI7XHJcbiAgdGFza0J0bnNEaXYuYXBwZW5kQ2hpbGQocm12VGFza0J0bik7XHJcbiAgcm12VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgdGFza0VsZW1lbnQucmVtb3ZlKCk7XHJcblxyXG4gICAgbGV0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKSB8fCBbXTtcclxuICAgIHRhc2tzID0gdGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmlkICE9PSBpZCk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XHJcblxyXG4gICAgbGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKSB8fCBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHByb2plY3RzW2ldLm5hbWUgPT09IHByb2plY3QpIHtcclxuICAgICAgICBwcm9qZWN0c1tpXS50YXNrcyA9IHByb2plY3RzW2ldLnRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gaWQpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChwcm9qZWN0c1tpXS5uYW1lID09PSBwcm9qZWN0KSB7XHJcbiAgICAgIHByb2plY3RzW2ldLnRhc2tzLnB1c2goe1xyXG4gICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgZHVlRGF0ZTogZHVlRGF0ZSxcclxuICAgICAgICBwcmlvcml0eTogcHJpb3JpdHksXHJcbiAgICAgICAgaWQ6IGlkLFxyXG4gICAgICB9KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBlZGl0QnRuLmNsYXNzTGlzdC5hZGQoXCJlZGl0LXRhc2stYnRuXCIpO1xyXG4gIGVkaXRCdG4udGV4dENvbnRlbnQgPSBcIk9cIjtcclxuICBlZGl0QnRuLmRhdGFzZXQudGFza0lkID0gaWQ7XHJcblxyXG4gIGVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LWZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIGVkaXRUYXNrKCk7XHJcbiAgfSk7XHJcbiAgdGFza0J0bnNEaXYuYXBwZW5kQ2hpbGQoZWRpdEJ0bik7XHJcblxyXG4gIHRhc2tFbGVtZW50LmFwcGVuZENoaWxkKHRhc2tCdG5zRGl2KVxyXG5cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcblxyXG4gIHJldHVybiB0YXNrRWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RUYWJzKG5hbWUsIHByb2plY3RJZCkge1xyXG4gIGNvbnN0IGZvbGRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgZm9sZGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiKTtcclxuXHJcbiAgZm9sZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3QtaWRcIiwgcHJvamVjdElkKTtcclxuICBmb2xkZXJFbGVtZW50LnRleHRDb250ZW50ID0gbmFtZTtcclxuXHJcbiAgcmV0dXJuIGZvbGRlckVsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0RWxlbWVudChuYW1lLCBpZCkge1xyXG4gIGNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY29udGFpbmVyXCIpO1xyXG5cclxuICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWNvbnRhaW5lclwiKTtcclxuICBwcm9qZWN0Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIG5hbWUpO1xyXG4gIHByb2plY3RDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cclxuICBjb25zdCBoZWFkZXJTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgaGVhZGVyU3Bhbi5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyLXNwYW5cIik7XHJcblxyXG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBoZWFkZXIudGV4dENvbnRlbnQgPSBuYW1lO1xyXG5cclxuICBjb25zdCBybXZCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIHJtdkJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3QtZGVsZXRlXCIpO1xyXG4gIHJtdkJ0bi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1kZWxldGVcIik7XHJcblxyXG4gIHJtdkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgcHJvamVjdENvbnRhaW5lci5yZW1vdmUoKTtcclxuXHJcbiAgICBsZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IFtdO1xyXG4gICAgcHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QuaWQgIT09IGlkKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuXHJcbiAgICBsZXQgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpIHx8IFtdO1xyXG4gICAgdGFza3MgPSB0YXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2sucHJvamVjdCAhPT0gbmFtZSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XHJcblxyXG4gICAgY29uc3QgcHJvamVjdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHJvamVjdC0ke2lkfWApO1xyXG4gICAgcHJvamVjdEVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHMtdGFic1wiKTtcclxuICBjb25zdCBwcm9qZWN0RWxlbWVudCA9IGNyZWF0ZVByb2plY3RUYWJzKG5hbWUsIGlkKTtcclxuICBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEVsZW1lbnQpO1xyXG5cclxuICBoZWFkZXJTcGFuLmFwcGVuZENoaWxkKGhlYWRlcik7XHJcbiAgaGVhZGVyU3Bhbi5hcHBlbmRDaGlsZChybXZCdG4pO1xyXG4gIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyU3Bhbik7XHJcbiAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0Q29udGFpbmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRUYXNrKCkge1xyXG4gIGNvbnN0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKSB8fCBbXTtcclxuICBjb25zdCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkgfHwgW107XHJcbiAgY29uc3QgaWQgPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC50YXNrSWQsIDEwKTtcclxuICBjb25zdCBlZGl0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC1mb3JtXCIpO1xyXG4gIGNvbnN0IHRpdGxlRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC10aXRsZVwiKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbkVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtZGVzY3JpcHRpb25cIik7XHJcbiAgY29uc3QgZHVlRGF0ZUVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtdGFza0R1ZURhdGVcIik7XHJcbiAgY29uc3QgcHJpb3JpdHlFZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXRhc2stcHJpb3JpdHlcIik7XHJcbiAgY29uc3QgcHJvamVjdEVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtcHJvamVjdC1zZWxlY3RcIik7XHJcblxyXG4gIGNvbnN0IHRhc2tJbmRleCA9IHRhc2tzLmZpbmRJbmRleCgodGFzaykgPT4gdGFzay5pZCA9PT0gaWQpO1xyXG4gIGNvbnN0IHRhc2sgPSB0YXNrc1t0YXNrSW5kZXhdO1xyXG5cclxuICBjb25zdCBvbGRQcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lID09PSB0YXNrLnByb2plY3QpO1xyXG5cclxuICBvbGRQcm9qZWN0LnRhc2tzID0gb2xkUHJvamVjdC50YXNrcy5maWx0ZXIoKHQpID0+IHQuaWQgIT09IHRhc2suaWQpO1xyXG5cclxuICB0aXRsZUVkaXQudmFsdWUgPSB0YXNrLnRpdGxlO1xyXG4gIGRlc2NyaXB0aW9uRWRpdC52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb247XHJcbiAgZHVlRGF0ZUVkaXQudmFsdWUgPSB0YXNrLmR1ZURhdGU7XHJcbiAgcHJpb3JpdHlFZGl0LnZhbHVlID0gdGFzay5wcmlvcml0eTtcclxuICBwcm9qZWN0RWRpdC52YWx1ZSA9IHRhc2sucHJvamVjdDtcclxuXHJcbiAgZWRpdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgdGFza3NbdGFza0luZGV4XS50aXRsZSA9IHRpdGxlRWRpdC52YWx1ZTtcclxuICAgIHRhc2tzW3Rhc2tJbmRleF0uZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbkVkaXQudmFsdWU7XHJcbiAgICB0YXNrc1t0YXNrSW5kZXhdLmR1ZURhdGUgPSBkdWVEYXRlRWRpdC52YWx1ZTtcclxuICAgIHRhc2tzW3Rhc2tJbmRleF0ucHJpb3JpdHkgPSBwcmlvcml0eUVkaXQudmFsdWU7XHJcblxyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IHByb2plY3RzLmZpbmQoXHJcbiAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0Lm5hbWUgPT09IHByb2plY3RFZGl0LnZhbHVlXHJcbiAgICApO1xyXG5cclxuICAgIG5ld1Byb2plY3QudGFza3MucHVzaCh0YXNrKTtcclxuXHJcbiAgICB0YXNrc1t0YXNrSW5kZXhdLnByb2plY3QgPSBwcm9qZWN0RWRpdC52YWx1ZTtcclxuXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcblxyXG4gICAgZWRpdEZvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgZWRpdEZvcm0uZGF0YXNldC5pZCA9IG51bGw7XHJcblxyXG4gICAgdXBkYXRlVWkoaWQsIHRhc2tzW3Rhc2tJbmRleF0pO1xyXG4gICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVVpKGlkLCB0YXNrKSB7XHJcbiAgY29uc3QgdGFza0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS10YXNrLWlkPVwiJHtpZH1cIl1gKTtcclxuICB0YXNrRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlXCIpLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuICB0YXNrRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgXCIuZGVzY3JpcHRpb25cIlxyXG4gICkudGV4dENvbnRlbnQgPSBgRGVzY3JpcHRpb246ICR7dGFzay5kZXNjcmlwdGlvbn1gO1xyXG4gIHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICBcIi5kdWVEYXRlXCJcclxuICApLnRleHRDb250ZW50ID0gYER1ZSBEYXRlOiAke3Rhc2suZHVlRGF0ZX1gO1xyXG4gIHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICBcIi5wcmlvcml0eVwiXHJcbiAgKS50ZXh0Q29udGVudCA9IGBQcmlvcml0eTogJHt0YXNrLnByaW9yaXR5fWA7XHJcbiAgdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgIFwiLnRhc2stZWxlbWVudC1wcm9qZWN0XCJcclxuICApLnRleHRDb250ZW50ID0gYFByb2plY3Q6ICR7dGFzay5wcm9qZWN0fWA7XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNvbGxhcHNpYmxlVGFicygpIHtcclxuICBjb25zdCBjb2xsYXBzaWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbGxhcHNpYmxlXCIpO1xyXG5cclxuICBjb2xsYXBzaWJsZXMuZm9yRWFjaCgoY29sbGFwc2libGUpID0+IHtcclxuICAgIGNvbGxhcHNpYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgY29udGVudCA9IGNvbGxhcHNpYmxlLnF1ZXJ5U2VsZWN0b3IoXCIuY29sbGFwLWNvbnRlbnRcIik7XHJcbiAgICAgIGlmIChjb250ZW50LnN0eWxlLmRpc3BsYXkgPT09IFwiYmxvY2tcIikge1xyXG4gICAgICAgIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgfVxyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGNvbnRlbnQgPSBjb2xsYXBzaWJsZS5xdWVyeVNlbGVjdG9yKFwiLmNvbGxhcC1jb250ZW50XCIpO1xyXG4gICAgY29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHByb2plY3RPcHRpb25zKCkge1xyXG4gIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zZWxlY3RcIik7XHJcbiAgY29uc3QgZWRpdFNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC1wcm9qZWN0LXNlbGVjdFwiKTtcclxuICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy10YWJzXCIpO1xyXG4gIGNvbnN0IGl0ZW1zID0gbGlzdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdFwiKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIG9wdGlvbi52YWx1ZSA9IGl0ZW1zW2ldLnRleHRDb250ZW50O1xyXG4gICAgb3B0aW9uLnRleHQgPSBpdGVtc1tpXS50ZXh0Q29udGVudDtcclxuICAgIFxyXG4gICAgLy8gY2hlY2sgaWYgb3B0aW9uIGFscmVhZHkgZXhpc3RzIGluIHNlbGVjdCBlbGVtZW50XHJcbiAgICBpZiAoIXNlbGVjdC5xdWVyeVNlbGVjdG9yKGBbdmFsdWU9XCIke29wdGlvbi52YWx1ZX1cIl1gKSkge1xyXG4gICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gY3JlYXRlIGEgbmV3IG9wdGlvbiBlbGVtZW50IGZvciB0aGUgZWRpdCBmb3JtXHJcbiAgICBjb25zdCBlZGl0T3B0aW9uID0gb3B0aW9uLmNsb25lTm9kZSh0cnVlKTtcclxuICAgIGlmICghZWRpdFNlbC5xdWVyeVNlbGVjdG9yKGBbdmFsdWU9XCIke2VkaXRPcHRpb24udmFsdWV9XCJdYCkpIHtcclxuICAgICAgZWRpdFNlbC5hcHBlbmRDaGlsZChlZGl0T3B0aW9uKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvcGVuVGhlRm9ybSgpIHtcclxuICBjb25zdCBhZGROZXdUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtbmV3LWJ0blwiKTtcclxuICBhZGROZXdUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvcHVwLWZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgYWRkTmV3UHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXByb2plY3QtYnRuXCIpO1xyXG4gIGFkZE5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1wb3B1cC1mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9zZVRoZUZvcm0oKSB7XHJcbiAgY29uc3QgY2xvc2VGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1mb3JtXCIpO1xyXG4gIGNsb3NlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3B1cC1mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9KTtcclxuICBjb25zdCBjbG9zZVByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1wcm9qZWN0LWZvcm1cIik7XHJcbiAgY2xvc2VQcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXBvcHVwLWZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBjbG9zZUVkaXRQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC1mb3JtLWNsb3NlXCIpXHJcbiAgY2xvc2VFZGl0UHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC1mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9KTtcclxuXHJcbiAgd2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmIChcclxuICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJwcm9qZWN0LXBvcHVwLWZvcm1cIiB8fFxyXG4gICAgICBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcInBvcHVwLWZvcm1cIlxyXG4gICAgKSB7XHJcbiAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRhYlN3aXRjaCgpIHtcclxuICBjb25zdCB0YWJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy10YWJzXCIpO1xyXG4gIGNvbnN0IGRlZmF1bHRUYWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluYm94XCIpO1xyXG4gIGxldCBjdXJyZW50VGFiID0gZGVmYXVsdFRhYjtcclxuXHJcbiAgdGFicy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBjb25zdCBjbGlja2VkVGFiID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBjbGlja2VkVGFiLmlubmVyVGV4dDtcclxuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcm9qZWN0TmFtZSk7XHJcblxyXG4gICAgaWYgKHByb2plY3REaXYgJiYgY3VycmVudFRhYiAhPT0gcHJvamVjdERpdikge1xyXG4gICAgICBpZiAoY3VycmVudFRhYikge1xyXG4gICAgICAgIGN1cnJlbnRUYWIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICB9XHJcbiAgICAgIHByb2plY3REaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgY3VycmVudFRhYiA9IHByb2plY3REaXY7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgcHJvamVjdE9wdGlvbnMgfSBmcm9tIFwiLi9ldmVudHNoYW5kbGVyXCI7XG5pbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5pbXBvcnQgeyBjcmVhdGVQcm9qZWN0RWxlbWVudCB9IGZyb20gXCIuL2RvbWNyZWF0b3JcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG5ld1Byb2plY3QoKSB7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1uYW1lXCIpO1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm1cIik7XG4gIGNvbnN0IGZvcm1XaW5kb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtcG9wdXAtZm9ybVwiKTtcblxuICBsZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IFtdO1xuXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IG5hbWUgPSBuYW1lSW5wdXQudmFsdWU7XG4gICAgZm9ybS5yZXNldCgpO1xuICAgIGZvcm1XaW5kb3cuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgY29uc3QgaWQgPSBEYXRlLm5vdygpO1xuXG4gICAgY3JlYXRlUHJvamVjdEVsZW1lbnQobmFtZSwgaWQpO1xuXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IHsgaWQ6IGlkLCBuYW1lOiBuYW1lLCB0YXNrczogW10gfTtcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuXG4gICAgU3RvcmFnZS5zYXZlTmV3UHJvamVjdChwcm9qZWN0cyk7XG5cbiAgICBwcm9qZWN0T3B0aW9ucygpO1xuICB9KTtcbn1cbiIsImltcG9ydCB7IHByb2plY3RPcHRpb25zIH0gZnJvbSBcIi4vZXZlbnRzaGFuZGxlclwiO1xuaW1wb3J0IHsgY3JlYXRlVGFza0VsZW1lbnQgfSBmcm9tIFwiLi9kb21jcmVhdG9yXCI7XG5pbXBvcnQgeyBjcmVhdGVQcm9qZWN0RWxlbWVudCB9IGZyb20gXCIuL2RvbWNyZWF0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSB7XG4gIHN0YXRpYyBzYXZlTmV3UHJvamVjdChwcm9qZWN0cykge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcbiAgfVxuXG4gIHN0YXRpYyBsb2FkUHJvamVjdHMoKSB7XG4gICAgY29uc3QgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpO1xuICAgIGNvbnN0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKTtcblxuICAgIGlmIChwcm9qZWN0cyAmJiBwcm9qZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGNyZWF0ZVByb2plY3RFbGVtZW50KHByb2plY3QubmFtZSwgcHJvamVjdC5pZCk7XG5cbiAgICAgICAgaWYgKHRhc2tzICYmIHRhc2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBwcm9qZWN0VGFza3MgPSB0YXNrcy5maWx0ZXIoXG4gICAgICAgICAgICAodGFzaykgPT4gdGFzay5wcm9qZWN0ID09PSBwcm9qZWN0Lm5hbWVcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcHJvamVjdFRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tFbGVtZW50ID0gY3JlYXRlVGFza0VsZW1lbnQoXG4gICAgICAgICAgICAgIHRhc2sudGl0bGUsXG4gICAgICAgICAgICAgIHRhc2suZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgIHRhc2suZHVlRGF0ZSxcbiAgICAgICAgICAgICAgdGFzay5wcmlvcml0eSxcbiAgICAgICAgICAgICAgdGFzay5wcm9qZWN0LFxuICAgICAgICAgICAgICB0YXNrLmlkXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFzay5wcm9qZWN0KTtcbiAgICAgICAgICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VsZW1lbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTsgLy9pbXBvcnRhbnQgdG8gc2F2ZSB0aGVcbiAgICAgIC8vcHJvamVjdHMgc28gdGhhdCBpdFxuICAgICAgLy9kb2VzbnQgZHVwbGljYXRlIHRoZSB0YXNrcyBpbiBsb2NhbHN0b3JhZ2UgZWFjaCB0aW1lIHBhZ2UgaXMgcmVsb2FkZWRcblxuICAgICAgcHJvamVjdE9wdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgc2F2ZU5ld1Rhc2sodGFza3MpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XG4gIH1cblxuICBzdGF0aWMgbG9hZFRhc2tzKCkge1xuICAgIGNvbnN0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKTtcblxuICAgIGlmICh0YXNrcyAmJiB0YXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkgfHwgW107XG4gICAgICBjb25zdCBkZWZhdWx0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmJveFwiKTtcblxuICAgICAgZm9yIChjb25zdCB0YXNrIG9mIHRhc2tzKSB7XG4gICAgICAgIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgaWQgfSA9IHRhc2s7XG5cbiAgICAgICAgY29uc3QgZXhpc3RpbmdQcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocCkgPT4gcC5uYW1lID09PSBwcm9qZWN0KTtcbiAgICAgICAgaWYgKGV4aXN0aW5nUHJvamVjdCAmJiBleGlzdGluZ1Byb2plY3QudGFza3Muc29tZSgodCkgPT4gdC5pZCA9PT0gaWQpKSB7XG4gICAgICAgICAgLy8gQ2hlY2sgaWYgdGFzayB3aXRoIHNhbWUgSUQgYWxyZWFkeSBleGlzdHMgaW4gcHJvamVjdCwgaWYgaXQgZG9lczogc2tpcCBhZGRpbmcgaXRcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qICAgY29uc3QgdGFza0VsZW1lbnQgPSBjcmVhdGVUYXNrRWxlbWVudChcbiAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBkdWVEYXRlLFxuICAgICAgICAgIHByaW9yaXR5LFxuICAgICAgICAgIHByb2plY3QsXG4gICAgICAgICAgaWRcbiAgICAgICAgKTsgKi9cbiAgICAgICAgLyogICAgICAgICBkZWZhdWx0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tFbGVtZW50KTtcbiAgICAgICAgICovXG4gICAgICAgIGlmIChleGlzdGluZ1Byb2plY3QpIHtcbiAgICAgICAgICBleGlzdGluZ1Byb2plY3QudGFza3MucHVzaCh7XG4gICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgICAgIHByaW9yaXR5LFxuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIFN0b3JhZ2UubG9hZFRhc2tzKCk7XG4gIFN0b3JhZ2UubG9hZFByb2plY3RzKCk7XG59KTtcbiIsImltcG9ydCB7IGNyZWF0ZVRhc2tFbGVtZW50IH0gZnJvbSBcIi4vZG9tY3JlYXRvclwiO1xyXG5pbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9zdG9yYWdlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgbmV3VGFzayA9ICgpID0+IHtcclxuICBjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKTtcclxuICBjb25zdCBkdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tEdWVEYXRlXCIpO1xyXG4gIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stcHJpb3JpdHlcIik7XHJcbiAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXNlbGVjdFwiKTtcclxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm1cIik7XHJcbiAgY29uc3QgZm9ybVdpbmRvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wdXAtZm9ybVwiKTtcclxuXHJcbiAgbGV0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKSB8fCBbXTtcclxuXHJcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGlkID0gRGF0ZS5ub3coKTtcclxuICAgIGNvbnN0IHRpdGxlID0gdGl0bGVJbnB1dC52YWx1ZTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25JbnB1dC52YWx1ZTtcclxuICAgIGNvbnN0IGR1ZURhdGUgPSBkdWVEYXRlSW5wdXQudmFsdWU7XHJcbiAgICBjb25zdCBwcmlvcml0eSA9IHByaW9yaXR5SW5wdXQudmFsdWU7XHJcbiAgICBsZXQgcHJvamVjdCA9IHByb2plY3RJbnB1dC52YWx1ZTtcclxuICAgIGlmICghcHJvamVjdCkge1xyXG4gICAgICBwcm9qZWN0ID0gXCJJbmJveFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm0ucmVzZXQoKTtcclxuICAgIGZvcm1XaW5kb3cuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cclxuICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcm9qZWN0KTtcclxuICAgIGNvbnN0IHRhc2tFbGVtZW50ID0gY3JlYXRlVGFza0VsZW1lbnQoXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgZHVlRGF0ZSxcclxuICAgICAgcHJpb3JpdHksXHJcbiAgICAgIHByb2plY3QsXHJcbiAgICAgIGlkXHJcbiAgICApO1xyXG4gICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRWxlbWVudCk7XHJcblxyXG4gICAgY29uc3QgbmV3VGFzayA9IHtcclxuICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICAgIGR1ZURhdGU6IGR1ZURhdGUsXHJcbiAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcclxuICAgICAgcHJvamVjdDogcHJvamVjdCxcclxuICAgICAgaWQ6IGlkLFxyXG4gICAgfTtcclxuICAgIHRhc2tzLnB1c2gobmV3VGFzayk7XHJcbiAgICBjb25zb2xlLmxvZyhpZCk7XHJcbiAgICBTdG9yYWdlLnNhdmVOZXdUYXNrKHRhc2tzKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGdldFRpdGxlOiAoKSA9PiB0aXRsZUlucHV0LnZhbHVlLFxyXG4gICAgZ2V0RGVzY3JpcHRpb246ICgpID0+IGRlc2NyaXB0aW9uSW5wdXQudmFsdWUsXHJcbiAgICBnZXREdWVEYXRlOiAoKSA9PiBkdWVEYXRlSW5wdXQudmFsdWUsXHJcbiAgICBnZXRQcmlvcml0eTogKCkgPT4gcHJpb3JpdHlJbnB1dC52YWx1ZSxcclxuICAgIGdldFByb2plY3Q6ICgpID0+IHByb2plY3RJbnB1dC52YWx1ZSxcclxuICB9O1xyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IG5ld1Rhc2sgfSBmcm9tIFwiLi9tb2R1bGVzL3Rhc2tzXCI7XHJcbmltcG9ydCB7IG5ld1Byb2plY3QgfSBmcm9tIFwiLi9tb2R1bGVzL3Byb2plY3RzXCI7XHJcbmltcG9ydCB7XHJcbiAgdGFiU3dpdGNoLFxyXG4gIG9wZW5UaGVGb3JtLFxyXG4gIGNsb3NlVGhlRm9ybSxcclxuICBjb2xsYXBzaWJsZVRhYnMsXHJcbn0gZnJvbSBcIi4vbW9kdWxlcy9ldmVudHNoYW5kbGVyXCI7XHJcblxyXG5cclxubmV3VGFzaygpO1xyXG5jb2xsYXBzaWJsZVRhYnMoKTtcclxub3BlblRoZUZvcm0oKTtcclxuY2xvc2VUaGVGb3JtKCk7XHJcbm5ld1Byb2plY3QoKTtcclxudGFiU3dpdGNoKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==