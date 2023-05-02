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
/* harmony export */   "createTaskElement": () => (/* binding */ createTaskElement)
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

function createProjectElement(name, projectId) {
  const folderElement = document.createElement("li");
  folderElement.classList.add("project");

  folderElement.setAttribute("data-project-id", projectId);
  folderElement.textContent = name;

  return folderElement;
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
  const collapsible = document.getElementById("collapsible");
  const content = document.getElementById("collap-content");

  collapsible.addEventListener("click", () => {
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

function projectOptions() {
  const select = document.getElementById("project-select");
  const list = document.getElementById("projects-tabs");
  const items = list.getElementsByClassName("project");

  // Remove all existing options so that each time it loads it doesn't repeat all existing options
  select.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Inbox";
  defaultOption.selected = true;
  select.appendChild(defaultOption);

  for (let i = 0; i < items.length; i++) {
    const option = document.createElement("option");
    option.value = items[i].textContent;
    option.text = items[i].textContent;
    select.appendChild(option);
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
  let currentTab = null;

  tabs.addEventListener("click", function (event) {
    const clickedTab = event.target;
    const projectId = parseInt(clickedTab.getAttribute("data-project-id"));
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

/* console.log(project); */

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
/* harmony import */ var _domcreator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domcreator */ "./src/modules/domcreator.js");
/* harmony import */ var _eventshandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventshandler */ "./src/modules/eventshandler.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/modules/storage.js");




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

    const mainContainer = document.getElementById("main-container");

    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");
    projectContainer.setAttribute("id", name);
    projectContainer.style.display = "none";
    const headerSpan = document.createElement("span");

    const header = document.createElement("h2");
    header.textContent = name;

    const rmvBtn = document.createElement("button");
    rmvBtn.setAttribute("id", "project-delete");
    rmvBtn.classList.add("project-delete");

    const projectsList = document.getElementById("projects-tabs");
    const projectElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_0__.createProjectElement)(name, id);
    projectsList.appendChild(projectElement);

    headerSpan.appendChild(header);
    headerSpan.appendChild(rmvBtn);
    projectContainer.appendChild(headerSpan);
    mainContainer.appendChild(projectContainer);

    const newProject = { id: id, name: name, tasks: [] };
    projects.push(newProject);
    _storage__WEBPACK_IMPORTED_MODULE_2__["default"].saveNewProject(projects);
    (0,_eventshandler__WEBPACK_IMPORTED_MODULE_1__.projectOptions)();
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
/* harmony import */ var _domcreator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domcreator */ "./src/modules/domcreator.js");
/* harmony import */ var _eventshandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventshandler */ "./src/modules/eventshandler.js");




class Storage {
  static saveNewProject(projects) {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  static loadProjects() {
    const projects = JSON.parse(localStorage.getItem("projects"));
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (projects && projects.length > 0) {
      const projectsList = document.getElementById("projects-tabs");
      const mainContainer = document.getElementById("main-container");

      projects.forEach((project) => {
        const projectElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_0__.createProjectElement)(project.name);
        projectElement.dataset.projectId = project.id;
        projectsList.appendChild(projectElement);

        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        projectContainer.setAttribute("id", project.name);
        projectContainer.style.display = "none";
        const headerSpan = document.createElement("span");
        const header = document.createElement("h2");
        header.textContent = project.name;

        header.textContent = project.name;

        const rmvBtn = document.createElement("button");
        rmvBtn.setAttribute("id", "project-delete");
        rmvBtn.classList.add("project-delete");
        headerSpan.appendChild(header);
        headerSpan.appendChild(rmvBtn);
        projectContainer.appendChild(headerSpan);
        mainContainer.appendChild(projectContainer);

        if (tasks && tasks.length > 0) {
          const projectTasks = tasks.filter(
            (task) => task.project === project.name
          );

          projectTasks.forEach((task) => {
            const taskElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_0__.createTaskElement)(
              task.title,
              task.description,
              task.dueDate,
              task.priority,
              task.project,
              task.id
            );

            projectContainer.appendChild(taskElement);
          });
        }
      });

      (0,_eventshandler__WEBPACK_IMPORTED_MODULE_1__.projectOptions)();
    }
  }

  /* static removeProject() {} */

  static saveNewTask(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks && tasks.length > 0) {
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const mainContainer = document.getElementById("main-container");

      for (const task of tasks) {
        const { title, description, dueDate, priority, project, id } = task;

        const existingProject = projects.find((p) => p.name === project);
        if (existingProject && existingProject.tasks.some((t) => t.id === id)) {
          // Check if task with same ID already exists in project, if it does: skip adding it
          continue;
        }

        const taskElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_0__.createTaskElement)(
          title,
          description,
          dueDate,
          priority,
          project,
          id
        );
        mainContainer.appendChild(taskElement);

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

    const projectContainers = document.getElementById(`${project}`);
    const taskElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_0__.createTaskElement)(
      title,
      description,
      dueDate,
      priority,
      project,
      id
    );

    projectContainers.appendChild(taskElement)
   

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsSGdEO0FBQ2pCOztBQUV6QjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5REFBeUQsUUFBUTtBQUNqRSx3QkFBd0IsOERBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDREQUFtQjtBQUN2QixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM5REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjBDO0FBQ007QUFNZjs7O0FBR2pDLHVEQUFPO0FBQ1AsdUVBQWU7QUFDZixtRUFBVztBQUNYLG9FQUFZO0FBQ1osNkRBQVU7QUFDVixpRUFBUyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9tb2R1bGVzL2RvbWNyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL21vZHVsZXMvZXZlbnRzaGFuZGxlci5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvbW9kdWxlcy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY3JlYXRlVGFza0VsZW1lbnQoXG4gIHRpdGxlLFxuICBkZXNjcmlwdGlvbixcbiAgZHVlRGF0ZSxcbiAgcHJpb3JpdHksXG4gIHByb2plY3QsXG4gIGlkXG4pIHtcbiAgbGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKSB8fCBbXTtcblxuICBjb25zdCB0YXNrRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRhc2tFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuICB0YXNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2staWRcIiwgaWQpOyAvLyBTZXQgdGhlIGlkIGFzIGEgZGF0YSBhdHRyaWJ1dGVcbiAgdGFza0VsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+JHt0aXRsZX08L2gyPlxuICAgIDxwIGNsYXNzPVwidGFzay1lbGVtZW50XCI+RGVzY3JpcHRpb246ICR7ZGVzY3JpcHRpb259PC9wPlxuICAgIDxwIGNsYXNzPVwidGFzay1lbGVtZW50XCI+RHVlIERhdGU6ICR7ZHVlRGF0ZX08L3A+XG4gICAgPHAgY2xhc3M9XCJ0YXNrLWVsZW1lbnRcIj5Qcmlvcml0eTogJHtwcmlvcml0eX08L3A+XG4gICAgPHA+UHJvamVjdDogJHtwcm9qZWN0fTwvcD5cbiAgYDtcblxuICBjb25zdCBybXZUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcm12VGFza0J0bi5jbGFzc0xpc3QuYWRkKFwicm12LXRhc2stYnRuXCIpO1xuICBybXZUYXNrQnRuLnRleHRDb250ZW50ID0gXCJYXCI7XG4gIHRhc2tFbGVtZW50LmFwcGVuZENoaWxkKHJtdlRhc2tCdG4pO1xuICBybXZUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgdGFza0VsZW1lbnQucmVtb3ZlKCk7XG5cbiAgICBsZXQgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpIHx8IFtdO1xuICAgIHRhc2tzID0gdGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmlkICE9PSBpZCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0YXNrc1wiLCBKU09OLnN0cmluZ2lmeSh0YXNrcykpO1xuXG4gICAgbGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKSB8fCBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocHJvamVjdHNbaV0ubmFtZSA9PT0gcHJvamVjdCkge1xuICAgICAgICBwcm9qZWN0c1tpXS50YXNrcyA9IHByb2plY3RzW2ldLnRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gaWQpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocHJvamVjdHNbaV0ubmFtZSA9PT0gcHJvamVjdCkge1xuICAgICAgcHJvamVjdHNbaV0udGFza3MucHVzaCh7XG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgICBkdWVEYXRlOiBkdWVEYXRlLFxuICAgICAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gICAgICAgIGlkOiBpZCxcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuXG4gIHJldHVybiB0YXNrRWxlbWVudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RFbGVtZW50KG5hbWUsIHByb2plY3RJZCkge1xuICBjb25zdCBmb2xkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBmb2xkZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIpO1xuXG4gIGZvbGRlckVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0LWlkXCIsIHByb2plY3RJZCk7XG4gIGZvbGRlckVsZW1lbnQudGV4dENvbnRlbnQgPSBuYW1lO1xuXG4gIHJldHVybiBmb2xkZXJFbGVtZW50O1xufVxuXG5cblxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNvbGxhcHNpYmxlVGFicygpIHtcbiAgY29uc3QgY29sbGFwc2libGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbGxhcHNpYmxlXCIpO1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb2xsYXAtY29udGVudFwiKTtcblxuICBjb2xsYXBzaWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChjb250ZW50LnN0eWxlLmRpc3BsYXkgPT09IFwiYmxvY2tcIikge1xuICAgICAgY29udGVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdE9wdGlvbnMoKSB7XG4gIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zZWxlY3RcIik7XG4gIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLXRhYnNcIik7XG4gIGNvbnN0IGl0ZW1zID0gbGlzdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdFwiKTtcblxuICAvLyBSZW1vdmUgYWxsIGV4aXN0aW5nIG9wdGlvbnMgc28gdGhhdCBlYWNoIHRpbWUgaXQgbG9hZHMgaXQgZG9lc24ndCByZXBlYXQgYWxsIGV4aXN0aW5nIG9wdGlvbnNcbiAgc2VsZWN0LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgY29uc3QgZGVmYXVsdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gIGRlZmF1bHRPcHRpb24udmFsdWUgPSBcIlwiO1xuICBkZWZhdWx0T3B0aW9uLnRleHQgPSBcIkluYm94XCI7XG4gIGRlZmF1bHRPcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICBzZWxlY3QuYXBwZW5kQ2hpbGQoZGVmYXVsdE9wdGlvbik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnZhbHVlID0gaXRlbXNbaV0udGV4dENvbnRlbnQ7XG4gICAgb3B0aW9uLnRleHQgPSBpdGVtc1tpXS50ZXh0Q29udGVudDtcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlblRoZUZvcm0oKSB7XG4gIGNvbnN0IGFkZE5ld1Rhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1uZXctYnRuXCIpO1xuICBhZGROZXdUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3B1cC1mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIH0pO1xuXG4gIGNvbnN0IGFkZE5ld1Byb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0LWJ0blwiKTtcbiAgYWRkTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1wb3B1cC1mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VUaGVGb3JtKCkge1xuICBjb25zdCBjbG9zZUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlLWZvcm1cIik7XG4gIGNsb3NlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wdXAtZm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH0pO1xuICBjb25zdCBjbG9zZVByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1wcm9qZWN0LWZvcm1cIik7XG4gIGNsb3NlUHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtcG9wdXAtZm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH0pO1xuXG4gIHdpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKFxuICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJwcm9qZWN0LXBvcHVwLWZvcm1cIiB8fFxuICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJwb3B1cC1mb3JtXCJcbiAgICApIHtcbiAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGFiU3dpdGNoKCkge1xuICBjb25zdCB0YWJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy10YWJzXCIpO1xuICBsZXQgY3VycmVudFRhYiA9IG51bGw7XG5cbiAgdGFicy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc3QgY2xpY2tlZFRhYiA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBwcm9qZWN0SWQgPSBwYXJzZUludChjbGlja2VkVGFiLmdldEF0dHJpYnV0ZShcImRhdGEtcHJvamVjdC1pZFwiKSk7XG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBjbGlja2VkVGFiLmlubmVyVGV4dDtcbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJvamVjdE5hbWUpO1xuXG4gICAgaWYgKHByb2plY3REaXYgJiYgY3VycmVudFRhYiAhPT0gcHJvamVjdERpdikge1xuICAgICAgaWYgKGN1cnJlbnRUYWIpIHtcbiAgICAgICAgY3VycmVudFRhYi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9XG4gICAgICBwcm9qZWN0RGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICBjdXJyZW50VGFiID0gcHJvamVjdERpdjtcbiAgICB9XG4gIH0pO1xufVxuXG4vKiBjb25zb2xlLmxvZyhwcm9qZWN0KTsgKi8iLCJpbXBvcnQgeyBjcmVhdGVQcm9qZWN0RWxlbWVudCB9IGZyb20gXCIuL2RvbWNyZWF0b3JcIjtcbmltcG9ydCB7IHByb2plY3RPcHRpb25zIH0gZnJvbSBcIi4vZXZlbnRzaGFuZGxlclwiO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbmV3UHJvamVjdCgpIHtcbiAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LW5hbWVcIik7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtZm9ybVwiKTtcbiAgY29uc3QgZm9ybVdpbmRvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1wb3B1cC1mb3JtXCIpO1xuXG4gIGxldCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkgfHwgW107XG5cbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcbiAgICBmb3JtLnJlc2V0KCk7XG4gICAgZm9ybVdpbmRvdy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICBjb25zdCBpZCA9IERhdGUubm93KCk7XG5cbiAgICBjb25zdCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLWNvbnRhaW5lclwiKTtcblxuICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3RDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInByb2plY3QtY29udGFpbmVyXCIpO1xuICAgIHByb2plY3RDb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgbmFtZSk7XG4gICAgcHJvamVjdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgY29uc3QgaGVhZGVyU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IG5hbWU7XG5cbiAgICBjb25zdCBybXZCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHJtdkJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3QtZGVsZXRlXCIpO1xuICAgIHJtdkJ0bi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1kZWxldGVcIik7XG5cbiAgICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLXRhYnNcIik7XG4gICAgY29uc3QgcHJvamVjdEVsZW1lbnQgPSBjcmVhdGVQcm9qZWN0RWxlbWVudChuYW1lLCBpZCk7XG4gICAgcHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKHByb2plY3RFbGVtZW50KTtcblxuICAgIGhlYWRlclNwYW4uYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBoZWFkZXJTcGFuLmFwcGVuZENoaWxkKHJtdkJ0bik7XG4gICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXJTcGFuKTtcbiAgICBtYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RDb250YWluZXIpO1xuXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IHsgaWQ6IGlkLCBuYW1lOiBuYW1lLCB0YXNrczogW10gfTtcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgIFN0b3JhZ2Uuc2F2ZU5ld1Byb2plY3QocHJvamVjdHMpO1xuICAgIHByb2plY3RPcHRpb25zKCk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlUHJvamVjdEVsZW1lbnQgfSBmcm9tIFwiLi9kb21jcmVhdG9yXCI7XG5pbXBvcnQgeyBwcm9qZWN0T3B0aW9ucyB9IGZyb20gXCIuL2V2ZW50c2hhbmRsZXJcIjtcbmltcG9ydCB7IGNyZWF0ZVRhc2tFbGVtZW50IH0gZnJvbSBcIi4vZG9tY3JlYXRvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlIHtcbiAgc3RhdGljIHNhdmVOZXdQcm9qZWN0KHByb2plY3RzKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuICB9XG5cbiAgc3RhdGljIGxvYWRQcm9qZWN0cygpIHtcbiAgICBjb25zdCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSk7XG4gICAgY29uc3QgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpO1xuXG4gICAgaWYgKHByb2plY3RzICYmIHByb2plY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHMtdGFic1wiKTtcbiAgICAgIGNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY29udGFpbmVyXCIpO1xuXG4gICAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RFbGVtZW50ID0gY3JlYXRlUHJvamVjdEVsZW1lbnQocHJvamVjdC5uYW1lKTtcbiAgICAgICAgcHJvamVjdEVsZW1lbnQuZGF0YXNldC5wcm9qZWN0SWQgPSBwcm9qZWN0LmlkO1xuICAgICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEVsZW1lbnQpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWNvbnRhaW5lclwiKTtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBwcm9qZWN0Lm5hbWUpO1xuICAgICAgICBwcm9qZWN0Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgY29uc3QgaGVhZGVyU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcblxuICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XG5cbiAgICAgICAgY29uc3Qgcm12QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgcm12QnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicHJvamVjdC1kZWxldGVcIik7XG4gICAgICAgIHJtdkJ0bi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1kZWxldGVcIik7XG4gICAgICAgIGhlYWRlclNwYW4uYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICAgICAgaGVhZGVyU3Bhbi5hcHBlbmRDaGlsZChybXZCdG4pO1xuICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGhlYWRlclNwYW4pO1xuICAgICAgICBtYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RDb250YWluZXIpO1xuXG4gICAgICAgIGlmICh0YXNrcyAmJiB0YXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgcHJvamVjdFRhc2tzID0gdGFza3MuZmlsdGVyKFxuICAgICAgICAgICAgKHRhc2spID0+IHRhc2sucHJvamVjdCA9PT0gcHJvamVjdC5uYW1lXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHByb2plY3RUYXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXNrRWxlbWVudCA9IGNyZWF0ZVRhc2tFbGVtZW50KFxuICAgICAgICAgICAgICB0YXNrLnRpdGxlLFxuICAgICAgICAgICAgICB0YXNrLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICB0YXNrLmR1ZURhdGUsXG4gICAgICAgICAgICAgIHRhc2sucHJpb3JpdHksXG4gICAgICAgICAgICAgIHRhc2sucHJvamVjdCxcbiAgICAgICAgICAgICAgdGFzay5pZFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRWxlbWVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBwcm9qZWN0T3B0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIC8qIHN0YXRpYyByZW1vdmVQcm9qZWN0KCkge30gKi9cblxuICBzdGF0aWMgc2F2ZU5ld1Rhc2sodGFza3MpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XG4gIH1cblxuICBzdGF0aWMgbG9hZFRhc2tzKCkge1xuICAgIGNvbnN0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKTtcblxuICAgIGlmICh0YXNrcyAmJiB0YXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkgfHwgW107XG4gICAgICBjb25zdCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLWNvbnRhaW5lclwiKTtcblxuICAgICAgZm9yIChjb25zdCB0YXNrIG9mIHRhc2tzKSB7XG4gICAgICAgIGNvbnN0IHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCwgaWQgfSA9IHRhc2s7XG5cbiAgICAgICAgY29uc3QgZXhpc3RpbmdQcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocCkgPT4gcC5uYW1lID09PSBwcm9qZWN0KTtcbiAgICAgICAgaWYgKGV4aXN0aW5nUHJvamVjdCAmJiBleGlzdGluZ1Byb2plY3QudGFza3Muc29tZSgodCkgPT4gdC5pZCA9PT0gaWQpKSB7XG4gICAgICAgICAgLy8gQ2hlY2sgaWYgdGFzayB3aXRoIHNhbWUgSUQgYWxyZWFkeSBleGlzdHMgaW4gcHJvamVjdCwgaWYgaXQgZG9lczogc2tpcCBhZGRpbmcgaXRcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhc2tFbGVtZW50ID0gY3JlYXRlVGFza0VsZW1lbnQoXG4gICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgICBwcmlvcml0eSxcbiAgICAgICAgICBwcm9qZWN0LFxuICAgICAgICAgIGlkXG4gICAgICAgICk7XG4gICAgICAgIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VsZW1lbnQpO1xuXG4gICAgICAgIGlmIChleGlzdGluZ1Byb2plY3QpIHtcbiAgICAgICAgICBleGlzdGluZ1Byb2plY3QudGFza3MucHVzaCh7XG4gICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZHVlRGF0ZSxcbiAgICAgICAgICAgIHByaW9yaXR5LFxuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIFN0b3JhZ2UubG9hZFRhc2tzKCk7XG4gIFN0b3JhZ2UubG9hZFByb2plY3RzKCk7XG59KTtcbiIsImltcG9ydCB7IGNyZWF0ZVRhc2tFbGVtZW50IH0gZnJvbSBcIi4vZG9tY3JlYXRvclwiO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5leHBvcnQgY29uc3QgbmV3VGFzayA9ICgpID0+IHtcbiAgY29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIik7XG4gIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlc2NyaXB0aW9uXCIpO1xuICBjb25zdCBkdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tEdWVEYXRlXCIpO1xuICBjb25zdCBwcmlvcml0eUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXByaW9yaXR5XCIpO1xuICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3Qtc2VsZWN0XCIpO1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm1cIik7XG4gIGNvbnN0IGZvcm1XaW5kb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvcHVwLWZvcm1cIik7XG5cbiAgbGV0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKSB8fCBbXTtcblxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBpZCA9IERhdGUubm93KCk7XG4gICAgY29uc3QgdGl0bGUgPSB0aXRsZUlucHV0LnZhbHVlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25JbnB1dC52YWx1ZTtcbiAgICBjb25zdCBkdWVEYXRlID0gZHVlRGF0ZUlucHV0LnZhbHVlO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gcHJpb3JpdHlJbnB1dC52YWx1ZTtcbiAgICBsZXQgcHJvamVjdCA9IHByb2plY3RJbnB1dC52YWx1ZTtcbiAgICBpZiAoIXByb2plY3QpIHtcbiAgICAgIHByb2plY3QgPSBcIkluYm94XCI7XG4gICAgfVxuXG4gICAgZm9ybS5yZXNldCgpO1xuICAgIGZvcm1XaW5kb3cuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgY29uc3QgcHJvamVjdENvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwcm9qZWN0fWApO1xuICAgIGNvbnN0IHRhc2tFbGVtZW50ID0gY3JlYXRlVGFza0VsZW1lbnQoXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgZHVlRGF0ZSxcbiAgICAgIHByaW9yaXR5LFxuICAgICAgcHJvamVjdCxcbiAgICAgIGlkXG4gICAgKTtcblxuICAgIHByb2plY3RDb250YWluZXJzLmFwcGVuZENoaWxkKHRhc2tFbGVtZW50KVxuICAgXG5cbiAgICBjb25zdCBuZXdUYXNrID0ge1xuICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgZHVlRGF0ZTogZHVlRGF0ZSxcbiAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcbiAgICAgIHByb2plY3Q6IHByb2plY3QsXG4gICAgICBpZDogaWQsXG4gICAgfTtcbiAgICB0YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgIGNvbnNvbGUubG9nKGlkKTtcbiAgICBTdG9yYWdlLnNhdmVOZXdUYXNrKHRhc2tzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRUaXRsZTogKCkgPT4gdGl0bGVJbnB1dC52YWx1ZSxcbiAgICBnZXREZXNjcmlwdGlvbjogKCkgPT4gZGVzY3JpcHRpb25JbnB1dC52YWx1ZSxcbiAgICBnZXREdWVEYXRlOiAoKSA9PiBkdWVEYXRlSW5wdXQudmFsdWUsXG4gICAgZ2V0UHJpb3JpdHk6ICgpID0+IHByaW9yaXR5SW5wdXQudmFsdWUsXG4gICAgZ2V0UHJvamVjdDogKCkgPT4gcHJvamVjdElucHV0LnZhbHVlLFxuICB9O1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgbmV3VGFzayB9IGZyb20gXCIuL21vZHVsZXMvdGFza3NcIjtcbmltcG9ydCB7IG5ld1Byb2plY3QgfSBmcm9tIFwiLi9tb2R1bGVzL3Byb2plY3RzXCI7XG5pbXBvcnQge1xuICB0YWJTd2l0Y2gsXG4gIG9wZW5UaGVGb3JtLFxuICBjbG9zZVRoZUZvcm0sXG4gIGNvbGxhcHNpYmxlVGFicyxcbn0gZnJvbSBcIi4vbW9kdWxlcy9ldmVudHNoYW5kbGVyXCI7XG5cblxubmV3VGFzaygpO1xuY29sbGFwc2libGVUYWJzKCk7XG5vcGVuVGhlRm9ybSgpO1xuY2xvc2VUaGVGb3JtKCk7XG5uZXdQcm9qZWN0KCk7XG50YWJTd2l0Y2goKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==