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

function createProjectElement(name) {
  const folderElement = document.createElement("li");
  folderElement.classList.add("project");
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
  const projects = document.getElementById("project");

  tabs.addEventListener("click", function (event) {
    const clickedTab = event.target;
    console.log(clickedTab.textContent);
   
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
/* harmony import */ var _domcreator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domcreator */ "./src/modules/domcreator.js");
/* harmony import */ var _eventshandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventshandler */ "./src/modules/eventshandler.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/modules/storage.js");




function newProject() {
  const nameInput = document.getElementById("project-name");
  const form = document.getElementById("project-form");
  const formWindow = document.getElementById("project-popup-form");

  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  console.log(projects);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameInput.value;
    form.reset();
    formWindow.style.display = "none";

    const projectsList = document.getElementById("projects-tabs");
    const projectElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_0__.createProjectElement)(name);
    projectsList.appendChild(projectElement);

    const newProject = { name: name, tasks: [] };

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

    if (projects && projects.length > 0) {
      const projectsList = document.getElementById("projects-tabs");
      projects.forEach((project) => {
        const projectElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_0__.createProjectElement)(project.name);
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
      const mainContainer = document.getElementById("main-container");
      for (const task of tasks) {
        const taskElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_0__.createTaskElement)(
          task.title,
          task.description,
          task.dueDate,
          task.priority,
          task.project
        );
        mainContainer.appendChild(taskElement);
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

  let title, description, dueDate, priority, project;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    title = titleInput.value;
    description = descriptionInput.value;
    dueDate = dueDateInput.value;
    priority = priorityInput.value;
    project = projectInput.value;
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
      project
    );
    mainContainer.appendChild(taskElement);

    const newTask = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      project: project,
    };
    tasks.push(newTask);
    _storage__WEBPACK_IMPORTED_MODULE_1__["default"].saveNewTask(tasks);
  });

  return {
    getTitle: () => title,
    getDescription: () => description,
    getDueDate: () => dueDate,
    getPriority: () => priority,
    getProject: () => project,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxJQUFJLDREQUFtQjtBQUN2QixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDMURBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ044QztBQUNKO0FBQ007QUFDaEQ7QUFNaUM7QUFDakM7QUFDQSx1REFBTztBQUNQLHVFQUFlO0FBQ2YsbUVBQVc7QUFDWCxvRUFBWTtBQUNaLDZEQUFVO0FBQ1YsaUVBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvbW9kdWxlcy9kb21jcmVhdG9yLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9tb2R1bGVzL2V2ZW50c2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvbW9kdWxlcy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvX2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmV3UHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3RzXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGFza0VsZW1lbnQoXHJcbiAgdGl0bGUsXHJcbiAgZGVzY3JpcHRpb24sXHJcbiAgZHVlRGF0ZSxcclxuICBwcmlvcml0eSxcclxuICBwcm9qZWN0XHJcbikge1xyXG4gIGxldCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSkgfHwgW107XHJcblxyXG4gIGNvbnN0IHRhc2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICB0YXNrRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcclxuICB0YXNrRWxlbWVudC5pbm5lckhUTUwgPSBgXHJcbiAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPiR7dGl0bGV9PC9oMj5cclxuICAgIDxwIGNsYXNzPVwidGFzay1lbGVtZW50XCI+RGVzY3JpcHRpb246ICR7ZGVzY3JpcHRpb259PC9wPlxyXG4gICAgPHAgY2xhc3M9XCJ0YXNrLWVsZW1lbnRcIj5EdWUgRGF0ZTogJHtkdWVEYXRlfTwvcD5cclxuICAgIDxwIGNsYXNzPVwidGFzay1lbGVtZW50XCI+UHJpb3JpdHk6ICR7cHJpb3JpdHl9PC9wPlxyXG4gICAgPHA+UHJvamVjdDogJHtwcm9qZWN0fTwvcD5cclxuICBgO1xyXG5cclxuICBjb25zdCBybXZUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBybXZUYXNrQnRuLmNsYXNzTGlzdC5hZGQoXCJybXYtdGFzay1idG5cIik7XHJcbiAgcm12VGFza0J0bi50ZXh0Q29udGVudCA9IFwiWFwiO1xyXG4gIHRhc2tFbGVtZW50LmFwcGVuZENoaWxkKHJtdlRhc2tCdG4pXHJcbiAgcm12VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgdGFza0VsZW1lbnQucmVtb3ZlKCk7XHJcblxyXG4gICAgbGV0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKSB8fCBbXTtcclxuICAgIHRhc2tzID0gdGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLnRpdGxlICE9PSB0aXRsZSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIHRoZSB0YXNrIGZyb20gdGhlIGNvcnJlc3BvbmRpbmcgcHJvamVjdCdzIHRhc2tzIGFycmF5XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChwcm9qZWN0c1tpXS5uYW1lID09PSBwcm9qZWN0KSB7XHJcbiAgICAgICAgcHJvamVjdHNbaV0udGFza3MgPSBwcm9qZWN0c1tpXS50YXNrcy5maWx0ZXIoXHJcbiAgICAgICAgICAodGFzaykgPT4gdGFzay50aXRsZSAhPT0gdGl0bGVcclxuICAgICAgICApO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAocHJvamVjdHNbaV0ubmFtZSA9PT0gcHJvamVjdCkge1xyXG4gICAgICBwcm9qZWN0c1tpXS50YXNrcy5wdXNoKHtcclxuICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIGR1ZURhdGU6IGR1ZURhdGUsXHJcbiAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LFxyXG4gICAgICB9KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBTYXZlIHRoZSB1cGRhdGVkIHByb2plY3RzIGFycmF5IHRvIGxvY2FsIHN0b3JhZ2VcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcblxyXG4gIHJldHVybiB0YXNrRWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RFbGVtZW50KG5hbWUpIHtcclxuICBjb25zdCBmb2xkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIGZvbGRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XHJcbiAgZm9sZGVyRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XHJcblxyXG4gIHJldHVybiBmb2xkZXJFbGVtZW50O1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBjb2xsYXBzaWJsZVRhYnMoKSB7XHJcbiAgY29uc3QgY29sbGFwc2libGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbGxhcHNpYmxlXCIpO1xyXG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbGxhcC1jb250ZW50XCIpO1xyXG5cclxuICBjb2xsYXBzaWJsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgaWYgKGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9PT0gXCJibG9ja1wiKSB7XHJcbiAgICAgIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29udGVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJvamVjdE9wdGlvbnMoKSB7XHJcbiAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXNlbGVjdFwiKTtcclxuICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy10YWJzXCIpO1xyXG4gIGNvbnN0IGl0ZW1zID0gbGlzdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdFwiKTtcclxuXHJcbiAgLy8gUmVtb3ZlIGFsbCBleGlzdGluZyBvcHRpb25zIHNvIHRoYXQgZWFjaCB0aW1lIGl0IGxvYWRzIGl0IGRvZXNuJ3QgcmVwZWF0IGFsbCBleGlzdGluZyBvcHRpb25zXHJcbiAgc2VsZWN0LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIGNvbnN0IGRlZmF1bHRPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gIGRlZmF1bHRPcHRpb24udmFsdWUgPSBcIlwiO1xyXG4gIGRlZmF1bHRPcHRpb24udGV4dCA9IFwiSW5ib3hcIjtcclxuICBkZWZhdWx0T3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcclxuICBzZWxlY3QuYXBwZW5kQ2hpbGQoZGVmYXVsdE9wdGlvbik7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBvcHRpb24udmFsdWUgPSBpdGVtc1tpXS50ZXh0Q29udGVudDtcclxuICAgIG9wdGlvbi50ZXh0ID0gaXRlbXNbaV0udGV4dENvbnRlbnQ7XHJcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvcGVuVGhlRm9ybSgpIHtcclxuICBjb25zdCBhZGROZXdUYXNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtbmV3LWJ0blwiKTtcclxuICBhZGROZXdUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvcHVwLWZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgYWRkTmV3UHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXByb2plY3QtYnRuXCIpO1xyXG4gIGFkZE5ld1Byb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1wb3B1cC1mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9zZVRoZUZvcm0oKSB7XHJcbiAgY29uc3QgY2xvc2VGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1mb3JtXCIpO1xyXG4gIGNsb3NlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3B1cC1mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9KTtcclxuICBjb25zdCBjbG9zZVByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1wcm9qZWN0LWZvcm1cIik7XHJcbiAgY2xvc2VQcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXBvcHVwLWZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIH0pO1xyXG5cclxuICB3aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKFxyXG4gICAgICBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSBcInByb2plY3QtcG9wdXAtZm9ybVwiIHx8XHJcbiAgICAgIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09IFwicG9wdXAtZm9ybVwiXHJcbiAgICApIHtcclxuICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGFiU3dpdGNoKCkge1xyXG4gIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLXRhYnNcIik7XHJcbiAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RcIik7XHJcblxyXG4gIHRhYnMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgY29uc3QgY2xpY2tlZFRhYiA9IGV2ZW50LnRhcmdldDtcclxuICAgIGNvbnNvbGUubG9nKGNsaWNrZWRUYWIudGV4dENvbnRlbnQpO1xyXG4gICBcclxuICB9KTtcclxufVxyXG5cclxuIiwiaW1wb3J0IHsgY3JlYXRlUHJvamVjdEVsZW1lbnQgfSBmcm9tIFwiLi9kb21jcmVhdG9yXCI7XHJcbmltcG9ydCB7IHByb2plY3RPcHRpb25zIH0gZnJvbSBcIi4vZXZlbnRzaGFuZGxlclwiO1xyXG5pbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9zdG9yYWdlXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbmV3UHJvamVjdCgpIHtcclxuICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbmFtZVwiKTtcclxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWZvcm1cIik7XHJcbiAgY29uc3QgZm9ybVdpbmRvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1wb3B1cC1mb3JtXCIpO1xyXG5cclxuICBsZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IFtdO1xyXG4gIGNvbnNvbGUubG9nKHByb2plY3RzKTtcclxuXHJcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IG5hbWUgPSBuYW1lSW5wdXQudmFsdWU7XHJcbiAgICBmb3JtLnJlc2V0KCk7XHJcbiAgICBmb3JtV2luZG93LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHJcbiAgICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLXRhYnNcIik7XHJcbiAgICBjb25zdCBwcm9qZWN0RWxlbWVudCA9IGNyZWF0ZVByb2plY3RFbGVtZW50KG5hbWUpO1xyXG4gICAgcHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKHByb2plY3RFbGVtZW50KTtcclxuXHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0geyBuYW1lOiBuYW1lLCB0YXNrczogW10gfTtcclxuXHJcbiAgICBwcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xyXG4gICAgU3RvcmFnZS5zYXZlTmV3UHJvamVjdChwcm9qZWN0cyk7XHJcbiAgICBwcm9qZWN0T3B0aW9ucygpO1xyXG4gIH0pO1xyXG59XHJcbiIsImltcG9ydCB7IGNyZWF0ZVByb2plY3RFbGVtZW50IH0gZnJvbSBcIi4vZG9tY3JlYXRvclwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0T3B0aW9ucyB9IGZyb20gXCIuL2V2ZW50c2hhbmRsZXJcIjtcclxuaW1wb3J0IHsgY3JlYXRlVGFza0VsZW1lbnQgfSBmcm9tIFwiLi9kb21jcmVhdG9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlIHtcclxuICBzdGF0aWMgc2F2ZU5ld1Byb2plY3QocHJvamVjdHMpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBsb2FkUHJvamVjdHMoKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSk7XHJcblxyXG4gICAgaWYgKHByb2plY3RzICYmIHByb2plY3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy10YWJzXCIpO1xyXG4gICAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdEVsZW1lbnQgPSBjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0Lm5hbWUpO1xyXG4gICAgICAgIHByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0RWxlbWVudCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBwcm9qZWN0T3B0aW9ucygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyogc3RhdGljIHJlbW92ZVByb2plY3QoKSB7fSAqL1xyXG5cclxuICBzdGF0aWMgc2F2ZU5ld1Rhc2sodGFza3MpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza3NcIiwgSlNPTi5zdHJpbmdpZnkodGFza3MpKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBsb2FkVGFza3MoKSB7XHJcbiAgICBjb25zdCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSk7XHJcblxyXG4gICAgaWYgKHRhc2tzICYmIHRhc2tzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgbWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1jb250YWluZXJcIik7XHJcbiAgICAgIGZvciAoY29uc3QgdGFzayBvZiB0YXNrcykge1xyXG4gICAgICAgIGNvbnN0IHRhc2tFbGVtZW50ID0gY3JlYXRlVGFza0VsZW1lbnQoXHJcbiAgICAgICAgICB0YXNrLnRpdGxlLFxyXG4gICAgICAgICAgdGFzay5kZXNjcmlwdGlvbixcclxuICAgICAgICAgIHRhc2suZHVlRGF0ZSxcclxuICAgICAgICAgIHRhc2sucHJpb3JpdHksXHJcbiAgICAgICAgICB0YXNrLnByb2plY3RcclxuICAgICAgICApO1xyXG4gICAgICAgIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VsZW1lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gIFN0b3JhZ2UubG9hZFByb2plY3RzKCk7XHJcbiAgU3RvcmFnZS5sb2FkVGFza3MoKTtcclxufSk7XHJcbiIsImltcG9ydCB7IGNyZWF0ZVRhc2tFbGVtZW50IH0gZnJvbSBcIi4vZG9tY3JlYXRvclwiO1xyXG5pbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9zdG9yYWdlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgbmV3VGFzayA9ICgpID0+IHtcclxuICBjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKTtcclxuICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXNjcmlwdGlvblwiKTtcclxuICBjb25zdCBkdWVEYXRlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tEdWVEYXRlXCIpO1xyXG4gIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stcHJpb3JpdHlcIik7XHJcbiAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXNlbGVjdFwiKTtcclxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrLWZvcm1cIik7XHJcbiAgY29uc3QgZm9ybVdpbmRvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wdXAtZm9ybVwiKTtcclxuXHJcbiAgbGV0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRhc2tzXCIpKSB8fCBbXTtcclxuXHJcbiAgbGV0IHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3Q7XHJcblxyXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aXRsZSA9IHRpdGxlSW5wdXQudmFsdWU7XHJcbiAgICBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uSW5wdXQudmFsdWU7XHJcbiAgICBkdWVEYXRlID0gZHVlRGF0ZUlucHV0LnZhbHVlO1xyXG4gICAgcHJpb3JpdHkgPSBwcmlvcml0eUlucHV0LnZhbHVlO1xyXG4gICAgcHJvamVjdCA9IHByb2plY3RJbnB1dC52YWx1ZTtcclxuICAgIGlmICghcHJvamVjdCkge1xyXG4gICAgICBwcm9qZWN0ID0gXCJJbmJveFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcm0ucmVzZXQoKTtcclxuICAgIGZvcm1XaW5kb3cuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cclxuICAgIGNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgdGFza0VsZW1lbnQgPSBjcmVhdGVUYXNrRWxlbWVudChcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBkdWVEYXRlLFxyXG4gICAgICBwcmlvcml0eSxcclxuICAgICAgcHJvamVjdFxyXG4gICAgKTtcclxuICAgIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VsZW1lbnQpO1xyXG5cclxuICAgIGNvbnN0IG5ld1Rhc2sgPSB7XHJcbiAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgICBkdWVEYXRlOiBkdWVEYXRlLFxyXG4gICAgICBwcmlvcml0eTogcHJpb3JpdHksXHJcbiAgICAgIHByb2plY3Q6IHByb2plY3QsXHJcbiAgICB9O1xyXG4gICAgdGFza3MucHVzaChuZXdUYXNrKTtcclxuICAgIFN0b3JhZ2Uuc2F2ZU5ld1Rhc2sodGFza3MpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZ2V0VGl0bGU6ICgpID0+IHRpdGxlLFxyXG4gICAgZ2V0RGVzY3JpcHRpb246ICgpID0+IGRlc2NyaXB0aW9uLFxyXG4gICAgZ2V0RHVlRGF0ZTogKCkgPT4gZHVlRGF0ZSxcclxuICAgIGdldFByaW9yaXR5OiAoKSA9PiBwcmlvcml0eSxcclxuICAgIGdldFByb2plY3Q6ICgpID0+IHByb2plY3QsXHJcbiAgfTtcclxufTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjb21wYXJlQXNjLCBmb3JtYXQgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcclxuaW1wb3J0IHsgbmV3VGFzayB9IGZyb20gXCIuL21vZHVsZXMvdGFza3NcIjtcclxuaW1wb3J0IHsgbmV3UHJvamVjdCB9IGZyb20gXCIuL21vZHVsZXMvcHJvamVjdHNcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgdGFiU3dpdGNoLFxyXG4gIG9wZW5UaGVGb3JtLFxyXG4gIGNsb3NlVGhlRm9ybSxcclxuICBjb2xsYXBzaWJsZVRhYnMsXHJcbn0gZnJvbSBcIi4vbW9kdWxlcy9ldmVudHNoYW5kbGVyXCI7XHJcblxyXG5uZXdUYXNrKCk7XHJcbmNvbGxhcHNpYmxlVGFicygpO1xyXG5vcGVuVGhlRm9ybSgpO1xyXG5jbG9zZVRoZUZvcm0oKTtcclxubmV3UHJvamVjdCgpO1xyXG50YWJTd2l0Y2goKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9