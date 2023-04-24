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
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");



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
/* harmony export */   "projectOptions": () => (/* binding */ projectOptions)
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

/* export function tabSwitch() {
  const tabs = document.getElementById("projects-tabs");
  const projects = document.getElementById("project");

  tabs.addEventListener("click", function (event) {
    const clickedTab = event.target;
    const projectId = clickedTab.projectId; // assuming each tab has a "data-project-id" attribute that corresponds to the project ID in localStorage
    const project = JSON.parse(localStorage.getItem("projects")).find(p => p.id === projectId); // find the project with the corresponding ID in localStorage
    console.log(project.arrays); // log the arrays contained in the project
  });
} */


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

    // Generate a unique ID for the new project
    const id = Date.now();

    const projectsList = document.getElementById("projects-tabs");
    const projectElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_0__.createProjectElement)(name, id);
    projectsList.appendChild(projectElement);

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
      projects.forEach((project) => {
        const projectElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_0__.createProjectElement)(project.name);
        projectElement.dataset.projectId = project.id;
        projectsList.appendChild(projectElement);
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
  Storage.loadProjects();
  Storage.loadTasks();
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

    const mainContainer = document.getElementById("main-container");
    const taskElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_0__.createTaskElement)(
      title,
      description,
      dueDate,
      priority,
      project,
      id
    );
    mainContainer.appendChild(taskElement);

    const newTask = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      project: project,
      id: id,
    };
    tasks.push(newTask);
    console.log(id)
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
/* tabSwitch(); */

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDhEQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksNERBQW1CO0FBQ3ZCLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUM1REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ0o7QUFDTTtBQUNoRDtBQU1pQztBQUNqQztBQUNBLHVEQUFPO0FBQ1AsdUVBQWU7QUFDZixtRUFBVztBQUNYLG9FQUFZO0FBQ1osNkRBQVU7QUFDVixnQkFBZ0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvbW9kdWxlcy9kb21jcmVhdG9yLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9tb2R1bGVzL2V2ZW50c2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvbW9kdWxlcy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmV3UHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3RzXCI7XHJcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gXCJ1dWlkXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGFza0VsZW1lbnQoXHJcbiAgdGl0bGUsXHJcbiAgZGVzY3JpcHRpb24sXHJcbiAgZHVlRGF0ZSxcclxuICBwcmlvcml0eSxcclxuICBwcm9qZWN0LFxyXG4gIGlkXHJcbikge1xyXG4gIGxldCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkgfHwgW107XHJcblxyXG4gIGNvbnN0IHRhc2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICB0YXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcclxuICB0YXNrRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRhc2staWRcIiwgaWQpOyAvLyBTZXQgdGhlIGlkIGFzIGEgZGF0YSBhdHRyaWJ1dGVcclxuICB0YXNrRWxlbWVudC5pbm5lckhUTUwgPSBgXHJcbiAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPiR7dGl0bGV9PC9oMj5cclxuICAgIDxwIGNsYXNzPVwidGFzay1lbGVtZW50XCI+RGVzY3JpcHRpb246ICR7ZGVzY3JpcHRpb259PC9wPlxyXG4gICAgPHAgY2xhc3M9XCJ0YXNrLWVsZW1lbnRcIj5EdWUgRGF0ZTogJHtkdWVEYXRlfTwvcD5cclxuICAgIDxwIGNsYXNzPVwidGFzay1lbGVtZW50XCI+UHJpb3JpdHk6ICR7cHJpb3JpdHl9PC9wPlxyXG4gICAgPHA+UHJvamVjdDogJHtwcm9qZWN0fTwvcD5cclxuICBgO1xyXG5cclxuICBjb25zdCBybXZUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBybXZUYXNrQnRuLmNsYXNzTGlzdC5hZGQoXCJybXYtdGFzay1idG5cIik7XHJcbiAgcm12VGFza0J0bi50ZXh0Q29udGVudCA9IFwiWFwiO1xyXG4gIHRhc2tFbGVtZW50LmFwcGVuZENoaWxkKHJtdlRhc2tCdG4pO1xyXG4gIHJtdlRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIHRhc2tFbGVtZW50LnJlbW92ZSgpO1xyXG5cclxuICAgIGxldCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSkgfHwgW107XHJcbiAgICB0YXNrcyA9IHRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gaWQpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0YXNrc1wiLCBKU09OLnN0cmluZ2lmeSh0YXNrcykpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHByb2plY3RzW2ldLm5hbWUgPT09IHByb2plY3QpIHtcclxuICAgICAgICBwcm9qZWN0c1tpXS50YXNrcyA9IHByb2plY3RzW2ldLnRhc2tzLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gaWQpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAocHJvamVjdHNbaV0ubmFtZSA9PT0gcHJvamVjdCkge1xyXG4gICAgICBwcm9qZWN0c1tpXS50YXNrcy5wdXNoKHtcclxuICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIGR1ZURhdGU6IGR1ZURhdGUsXHJcbiAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LFxyXG4gICAgICAgIGlkOiBpZCxcclxuICAgICAgfSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG5cclxuICByZXR1cm4gdGFza0VsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0RWxlbWVudChuYW1lLCBwcm9qZWN0SWQpIHtcclxuICBjb25zdCBmb2xkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIGZvbGRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XHJcblxyXG4gIGZvbGRlckVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1wcm9qZWN0LWlkXCIsIHByb2plY3RJZCk7XHJcbiAgZm9sZGVyRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XHJcblxyXG4gIHJldHVybiBmb2xkZXJFbGVtZW50O1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBjb2xsYXBzaWJsZVRhYnMoKSB7XHJcbiAgY29uc3QgY29sbGFwc2libGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbGxhcHNpYmxlXCIpO1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbGxhcC1jb250ZW50XCIpO1xyXG5cclxuICBjb2xsYXBzaWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgaWYgKGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9PT0gXCJibG9ja1wiKSB7XHJcbiAgICAgIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29udGVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdE9wdGlvbnMoKSB7XHJcbiAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXNlbGVjdFwiKTtcclxuICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy10YWJzXCIpO1xyXG4gIGNvbnN0IGl0ZW1zID0gbGlzdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdFwiKTtcclxuXHJcbiAgLy8gUmVtb3ZlIGFsbCBleGlzdGluZyBvcHRpb25zIHNvIHRoYXQgZWFjaCB0aW1lIGl0IGxvYWRzIGl0IGRvZXNuJ3QgcmVwZWF0IGFsbCBleGlzdGluZyBvcHRpb25zXHJcbiAgc2VsZWN0LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIGNvbnN0IGRlZmF1bHRPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gIGRlZmF1bHRPcHRpb24udmFsdWUgPSBcIlwiO1xyXG4gIGRlZmF1bHRPcHRpb24udGV4dCA9IFwiSW5ib3hcIjtcclxuICBkZWZhdWx0T3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcclxuICBzZWxlY3QuYXBwZW5kQ2hpbGQoZGVmYXVsdE9wdGlvbik7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBvcHRpb24udmFsdWUgPSBpdGVtc1tpXS50ZXh0Q29udGVudDtcclxuICAgIG9wdGlvbi50ZXh0ID0gaXRlbXNbaV0udGV4dENvbnRlbnQ7XHJcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvcGVuVGhlRm9ybSgpIHtcclxuICBjb25zdCBhZGROZXdUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtbmV3LWJ0blwiKTtcclxuICBhZGROZXdUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvcHVwLWZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgYWRkTmV3UHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXByb2plY3QtYnRuXCIpO1xyXG4gIGFkZE5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1wb3B1cC1mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9zZVRoZUZvcm0oKSB7XHJcbiAgY29uc3QgY2xvc2VGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1mb3JtXCIpO1xyXG4gIGNsb3NlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3B1cC1mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9KTtcclxuICBjb25zdCBjbG9zZVByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1wcm9qZWN0LWZvcm1cIik7XHJcbiAgY2xvc2VQcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXBvcHVwLWZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIH0pO1xyXG5cclxuICB3aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKFxyXG4gICAgICBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcInByb2plY3QtcG9wdXAtZm9ybVwiIHx8XHJcbiAgICAgIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IFwicG9wdXAtZm9ybVwiXHJcbiAgICApIHtcclxuICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG4vKiBleHBvcnQgZnVuY3Rpb24gdGFiU3dpdGNoKCkge1xyXG4gIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLXRhYnNcIik7XHJcbiAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RcIik7XHJcblxyXG4gIHRhYnMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgY29uc3QgY2xpY2tlZFRhYiA9IGV2ZW50LnRhcmdldDtcclxuICAgIGNvbnN0IHByb2plY3RJZCA9IGNsaWNrZWRUYWIucHJvamVjdElkOyAvLyBhc3N1bWluZyBlYWNoIHRhYiBoYXMgYSBcImRhdGEtcHJvamVjdC1pZFwiIGF0dHJpYnV0ZSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBwcm9qZWN0IElEIGluIGxvY2FsU3RvcmFnZVxyXG4gICAgY29uc3QgcHJvamVjdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkuZmluZChwID0+IHAuaWQgPT09IHByb2plY3RJZCk7IC8vIGZpbmQgdGhlIHByb2plY3Qgd2l0aCB0aGUgY29ycmVzcG9uZGluZyBJRCBpbiBsb2NhbFN0b3JhZ2VcclxuICAgIGNvbnNvbGUubG9nKHByb2plY3QuYXJyYXlzKTsgLy8gbG9nIHRoZSBhcnJheXMgY29udGFpbmVkIGluIHRoZSBwcm9qZWN0XHJcbiAgfSk7XHJcbn0gKi9cclxuIiwiaW1wb3J0IHsgY3JlYXRlUHJvamVjdEVsZW1lbnQgfSBmcm9tIFwiLi9kb21jcmVhdG9yXCI7XHJcbmltcG9ydCB7IHByb2plY3RPcHRpb25zIH0gZnJvbSBcIi4vZXZlbnRzaGFuZGxlclwiO1xyXG5pbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9zdG9yYWdlXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbmV3UHJvamVjdCgpIHtcclxuICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbmFtZVwiKTtcclxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm1cIik7XHJcbiAgY29uc3QgZm9ybVdpbmRvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1wb3B1cC1mb3JtXCIpO1xyXG5cclxuICBsZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IFtdO1xyXG5cclxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgbmFtZSA9IG5hbWVJbnB1dC52YWx1ZTtcclxuICAgIGZvcm0ucmVzZXQoKTtcclxuICAgIGZvcm1XaW5kb3cuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cclxuICAgIC8vIEdlbmVyYXRlIGEgdW5pcXVlIElEIGZvciB0aGUgbmV3IHByb2plY3RcclxuICAgIGNvbnN0IGlkID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLXRhYnNcIik7XHJcbiAgICBjb25zdCBwcm9qZWN0RWxlbWVudCA9IGNyZWF0ZVByb2plY3RFbGVtZW50KG5hbWUsIGlkKTtcclxuICAgIHByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0RWxlbWVudCk7XHJcblxyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IHsgaWQ6IGlkLCBuYW1lOiBuYW1lLCB0YXNrczogW10gfTtcclxuICAgIHByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICBTdG9yYWdlLnNhdmVOZXdQcm9qZWN0KHByb2plY3RzKTtcclxuICAgIHByb2plY3RPcHRpb25zKCk7XHJcbiAgfSk7XHJcbn0iLCJpbXBvcnQgeyBjcmVhdGVQcm9qZWN0RWxlbWVudCB9IGZyb20gXCIuL2RvbWNyZWF0b3JcIjtcclxuaW1wb3J0IHsgcHJvamVjdE9wdGlvbnMgfSBmcm9tIFwiLi9ldmVudHNoYW5kbGVyXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVRhc2tFbGVtZW50IH0gZnJvbSBcIi4vZG9tY3JlYXRvclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSB7XHJcbiAgc3RhdGljIHNhdmVOZXdQcm9qZWN0KHByb2plY3RzKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgbG9hZFByb2plY3RzKCkge1xyXG4gICAgY29uc3QgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpO1xyXG4gICAgY29uc3QgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpO1xyXG5cclxuICAgIGlmIChwcm9qZWN0cyAmJiBwcm9qZWN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHMtdGFic1wiKTtcclxuICAgICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RFbGVtZW50ID0gY3JlYXRlUHJvamVjdEVsZW1lbnQocHJvamVjdC5uYW1lKTtcclxuICAgICAgICBwcm9qZWN0RWxlbWVudC5kYXRhc2V0LnByb2plY3RJZCA9IHByb2plY3QuaWQ7XHJcbiAgICAgICAgcHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKHByb2plY3RFbGVtZW50KTtcclxuICAgICAgfSk7XHJcbiAgICAgIHByb2plY3RPcHRpb25zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiBzdGF0aWMgcmVtb3ZlUHJvamVjdCgpIHt9ICovXHJcblxyXG4gIHN0YXRpYyBzYXZlTmV3VGFzayh0YXNrcykge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0YXNrc1wiLCBKU09OLnN0cmluZ2lmeSh0YXNrcykpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGxvYWRUYXNrcygpIHtcclxuICAgIGNvbnN0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKTtcclxuXHJcbiAgICBpZiAodGFza3MgJiYgdGFza3MubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkgfHwgW107XHJcbiAgICAgIGNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY29udGFpbmVyXCIpO1xyXG5cclxuICAgICAgZm9yIChjb25zdCB0YXNrIG9mIHRhc2tzKSB7XHJcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBpZCB9ID0gdGFzaztcclxuXHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdQcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocCkgPT4gcC5uYW1lID09PSBwcm9qZWN0KTtcclxuICAgICAgICBpZiAoZXhpc3RpbmdQcm9qZWN0ICYmIGV4aXN0aW5nUHJvamVjdC50YXNrcy5zb21lKCh0KSA9PiB0LmlkID09PSBpZCkpIHtcclxuICAgICAgICAgIC8vIENoZWNrIGlmIHRhc2sgd2l0aCBzYW1lIElEIGFscmVhZHkgZXhpc3RzIGluIHByb2plY3QsIGlmIGl0IGRvZXM6IHNraXAgYWRkaW5nIGl0XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRhc2tFbGVtZW50ID0gY3JlYXRlVGFza0VsZW1lbnQoXHJcbiAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgZHVlRGF0ZSxcclxuICAgICAgICAgIHByaW9yaXR5LFxyXG4gICAgICAgICAgcHJvamVjdCxcclxuICAgICAgICAgIGlkXHJcbiAgICAgICAgKTtcclxuICAgICAgICBtYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tFbGVtZW50KTtcclxuXHJcbiAgICAgICAgaWYgKGV4aXN0aW5nUHJvamVjdCkge1xyXG4gICAgICAgICAgZXhpc3RpbmdQcm9qZWN0LnRhc2tzLnB1c2goe1xyXG4gICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIGR1ZURhdGUsXHJcbiAgICAgICAgICAgIHByaW9yaXR5LFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICBTdG9yYWdlLmxvYWRQcm9qZWN0cygpO1xyXG4gIFN0b3JhZ2UubG9hZFRhc2tzKCk7XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBjcmVhdGVUYXNrRWxlbWVudCB9IGZyb20gXCIuL2RvbWNyZWF0b3JcIjtcclxuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IG5ld1Rhc2sgPSAoKSA9PiB7XHJcbiAgY29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIik7XHJcbiAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb25cIik7XHJcbiAgY29uc3QgZHVlRGF0ZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrRHVlRGF0ZVwiKTtcclxuICBjb25zdCBwcmlvcml0eUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLXByaW9yaXR5XCIpO1xyXG4gIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zZWxlY3RcIik7XHJcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFzay1mb3JtXCIpO1xyXG4gIGNvbnN0IGZvcm1XaW5kb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvcHVwLWZvcm1cIik7XHJcblxyXG4gIGxldCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSkgfHwgW107XHJcblxyXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBpZCA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCB0aXRsZSA9IHRpdGxlSW5wdXQudmFsdWU7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uSW5wdXQudmFsdWU7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gZHVlRGF0ZUlucHV0LnZhbHVlO1xyXG4gICAgY29uc3QgcHJpb3JpdHkgPSBwcmlvcml0eUlucHV0LnZhbHVlO1xyXG4gICAgbGV0IHByb2plY3QgPSBwcm9qZWN0SW5wdXQudmFsdWU7XHJcbiAgICBpZiAoIXByb2plY3QpIHtcclxuICAgICAgcHJvamVjdCA9IFwiSW5ib3hcIjtcclxuICAgIH1cclxuXHJcbiAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICBmb3JtV2luZG93LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgICBjb25zdCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnN0IHRhc2tFbGVtZW50ID0gY3JlYXRlVGFza0VsZW1lbnQoXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgZHVlRGF0ZSxcclxuICAgICAgcHJpb3JpdHksXHJcbiAgICAgIHByb2plY3QsXHJcbiAgICAgIGlkXHJcbiAgICApO1xyXG4gICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRWxlbWVudCk7XHJcblxyXG4gICAgY29uc3QgbmV3VGFzayA9IHtcclxuICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICAgIGR1ZURhdGU6IGR1ZURhdGUsXHJcbiAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcclxuICAgICAgcHJvamVjdDogcHJvamVjdCxcclxuICAgICAgaWQ6IGlkLFxyXG4gICAgfTtcclxuICAgIHRhc2tzLnB1c2gobmV3VGFzayk7XHJcbiAgICBjb25zb2xlLmxvZyhpZClcclxuICAgIFN0b3JhZ2Uuc2F2ZU5ld1Rhc2sodGFza3MpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZ2V0VGl0bGU6ICgpID0+IHRpdGxlSW5wdXQudmFsdWUsXHJcbiAgICBnZXREZXNjcmlwdGlvbjogKCkgPT4gZGVzY3JpcHRpb25JbnB1dC52YWx1ZSxcclxuICAgIGdldER1ZURhdGU6ICgpID0+IGR1ZURhdGVJbnB1dC52YWx1ZSxcclxuICAgIGdldFByaW9yaXR5OiAoKSA9PiBwcmlvcml0eUlucHV0LnZhbHVlLFxyXG4gICAgZ2V0UHJvamVjdDogKCkgPT4gcHJvamVjdElucHV0LnZhbHVlLFxyXG4gIH07XHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY29tcGFyZUFzYywgZm9ybWF0IH0gZnJvbSBcImRhdGUtZm5zXCI7XHJcbmltcG9ydCB7IG5ld1Rhc2sgfSBmcm9tIFwiLi9tb2R1bGVzL3Rhc2tzXCI7XHJcbmltcG9ydCB7IG5ld1Byb2plY3QgfSBmcm9tIFwiLi9tb2R1bGVzL3Byb2plY3RzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gIC8qIHRhYlN3aXRjaCwgKi9cclxuICBvcGVuVGhlRm9ybSxcclxuICBjbG9zZVRoZUZvcm0sXHJcbiAgY29sbGFwc2libGVUYWJzLFxyXG59IGZyb20gXCIuL21vZHVsZXMvZXZlbnRzaGFuZGxlclwiO1xyXG5cclxubmV3VGFzaygpO1xyXG5jb2xsYXBzaWJsZVRhYnMoKTtcclxub3BlblRoZUZvcm0oKTtcclxuY2xvc2VUaGVGb3JtKCk7XHJcbm5ld1Byb2plY3QoKTtcclxuLyogdGFiU3dpdGNoKCk7ICovXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==