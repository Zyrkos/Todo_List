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
  headerSpan.classList.add("header-span")

  const header = document.createElement("h2");
  header.textContent = name;

  const rmvBtn = document.createElement("button");
  rmvBtn.setAttribute("id", "project-delete");
  rmvBtn.classList.add("project-delete");

  const projectsList = document.getElementById("projects-tabs");
  const projectElement = createProjectTabs(name, id);
  projectsList.appendChild(projectElement);

  headerSpan.appendChild(header);
  headerSpan.appendChild(rmvBtn);
  projectContainer.appendChild(headerSpan);
  mainContainer.appendChild(projectContainer);
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

        const taskElement = (0,_domcreator__WEBPACK_IMPORTED_MODULE_1__.createTaskElement)(
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
(0,_modules_eventshandler__WEBPACK_IMPORTED_MODULE_2__.tabSwitch)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNqQjs7QUFFekI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsOERBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDREQUFtQjtBQUN2Qjs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQzlEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOMEM7QUFDTTtBQU1mOzs7QUFHakMsdURBQU87QUFDUCx1RUFBZTtBQUNmLG1FQUFXO0FBQ1gsb0VBQVk7QUFDWiw2REFBVTtBQUNWLGlFQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL21vZHVsZXMvZG9tY3JlYXRvci5qcyIsIndlYnBhY2s6Ly90b2RvX2xpc3QvLi9zcmMvbW9kdWxlcy9ldmVudHNoYW5kbGVyLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG9fbGlzdC8uL3NyYy9tb2R1bGVzL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL21vZHVsZXMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9fbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kb19saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb19saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYXNrRWxlbWVudChcbiAgdGl0bGUsXG4gIGRlc2NyaXB0aW9uLFxuICBkdWVEYXRlLFxuICBwcmlvcml0eSxcbiAgcHJvamVjdCxcbiAgaWRcbikge1xuICBsZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IFtdO1xuXG4gIGNvbnN0IHRhc2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRhc2tcIik7XG4gIHRhc2tFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtdGFzay1pZFwiLCBpZCk7IC8vIFNldCB0aGUgaWQgYXMgYSBkYXRhIGF0dHJpYnV0ZVxuICB0YXNrRWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgPGgyIGNsYXNzPVwidGl0bGVcIj4ke3RpdGxlfTwvaDI+XG4gICAgPHAgY2xhc3M9XCJ0YXNrLWVsZW1lbnRcIj5EZXNjcmlwdGlvbjogJHtkZXNjcmlwdGlvbn08L3A+XG4gICAgPHAgY2xhc3M9XCJ0YXNrLWVsZW1lbnRcIj5EdWUgRGF0ZTogJHtkdWVEYXRlfTwvcD5cbiAgICA8cCBjbGFzcz1cInRhc2stZWxlbWVudFwiPlByaW9yaXR5OiAke3ByaW9yaXR5fTwvcD5cbiAgICA8cD5Qcm9qZWN0OiAke3Byb2plY3R9PC9wPlxuICBgO1xuXG4gIGNvbnN0IHJtdlRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBybXZUYXNrQnRuLmNsYXNzTGlzdC5hZGQoXCJybXYtdGFzay1idG5cIik7XG4gIHJtdlRhc2tCdG4udGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgdGFza0VsZW1lbnQuYXBwZW5kQ2hpbGQocm12VGFza0J0bik7XG4gIHJtdlRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICB0YXNrRWxlbWVudC5yZW1vdmUoKTtcblxuICAgIGxldCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSkgfHwgW107XG4gICAgdGFza3MgPSB0YXNrcy5maWx0ZXIoKHRhc2spID0+IHRhc2suaWQgIT09IGlkKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XG5cbiAgICBsZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpIHx8IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwcm9qZWN0c1tpXS5uYW1lID09PSBwcm9qZWN0KSB7XG4gICAgICAgIHByb2plY3RzW2ldLnRhc2tzID0gcHJvamVjdHNbaV0udGFza3MuZmlsdGVyKCh0YXNrKSA9PiB0YXNrLmlkICE9PSBpZCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChwcm9qZWN0c1tpXS5uYW1lID09PSBwcm9qZWN0KSB7XG4gICAgICBwcm9qZWN0c1tpXS50YXNrcy5wdXNoKHtcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgICAgIGR1ZURhdGU6IGR1ZURhdGUsXG4gICAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG5cbiAgcmV0dXJuIHRhc2tFbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJvamVjdFRhYnMobmFtZSwgcHJvamVjdElkKSB7XG4gIGNvbnN0IGZvbGRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIGZvbGRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIik7XG5cbiAgZm9sZGVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXByb2plY3QtaWRcIiwgcHJvamVjdElkKTtcbiAgZm9sZGVyRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XG5cbiAgcmV0dXJuIGZvbGRlckVsZW1lbnQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RFbGVtZW50KG5hbWUsIGlkKSB7XG4gIGNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY29udGFpbmVyXCIpO1xuXG4gIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWNvbnRhaW5lclwiKTtcbiAgcHJvamVjdENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBuYW1lKTtcbiAgcHJvamVjdENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGNvbnN0IGhlYWRlclNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaGVhZGVyU3Bhbi5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyLXNwYW5cIilcblxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gIGhlYWRlci50ZXh0Q29udGVudCA9IG5hbWU7XG5cbiAgY29uc3Qgcm12QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgcm12QnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicHJvamVjdC1kZWxldGVcIik7XG4gIHJtdkJ0bi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1kZWxldGVcIik7XG5cbiAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy10YWJzXCIpO1xuICBjb25zdCBwcm9qZWN0RWxlbWVudCA9IGNyZWF0ZVByb2plY3RUYWJzKG5hbWUsIGlkKTtcbiAgcHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKHByb2plY3RFbGVtZW50KTtcblxuICBoZWFkZXJTcGFuLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGhlYWRlclNwYW4uYXBwZW5kQ2hpbGQocm12QnRuKTtcbiAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXJTcGFuKTtcbiAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0Q29udGFpbmVyKTtcbn1cblxuXG4iLCJleHBvcnQgZnVuY3Rpb24gY29sbGFwc2libGVUYWJzKCkge1xuICBjb25zdCBjb2xsYXBzaWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29sbGFwc2libGVcIik7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbGxhcC1jb250ZW50XCIpO1xuXG4gIGNvbGxhcHNpYmxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9PT0gXCJibG9ja1wiKSB7XG4gICAgICBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9qZWN0T3B0aW9ucygpIHtcbiAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXNlbGVjdFwiKTtcbiAgY29uc3QgbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHMtdGFic1wiKTtcbiAgY29uc3QgaXRlbXMgPSBsaXN0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwcm9qZWN0XCIpO1xuXG4gIC8vIFJlbW92ZSBhbGwgZXhpc3Rpbmcgb3B0aW9ucyBzbyB0aGF0IGVhY2ggdGltZSBpdCBsb2FkcyBpdCBkb2Vzbid0IHJlcGVhdCBhbGwgZXhpc3Rpbmcgb3B0aW9uc1xuICBzZWxlY3QuaW5uZXJIVE1MID0gXCJcIjtcblxuICBjb25zdCBkZWZhdWx0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgZGVmYXVsdE9wdGlvbi52YWx1ZSA9IFwiXCI7XG4gIGRlZmF1bHRPcHRpb24udGV4dCA9IFwiSW5ib3hcIjtcblxuICBzZWxlY3QuYXBwZW5kQ2hpbGQoZGVmYXVsdE9wdGlvbik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgb3B0aW9uLnZhbHVlID0gaXRlbXNbaV0udGV4dENvbnRlbnQ7XG4gICAgb3B0aW9uLnRleHQgPSBpdGVtc1tpXS50ZXh0Q29udGVudDtcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlblRoZUZvcm0oKSB7XG4gIGNvbnN0IGFkZE5ld1Rhc2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1uZXctYnRuXCIpO1xuICBhZGROZXdUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb3B1cC1mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIH0pO1xuXG4gIGNvbnN0IGFkZE5ld1Byb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1wcm9qZWN0LWJ0blwiKTtcbiAgYWRkTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1wb3B1cC1mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VUaGVGb3JtKCkge1xuICBjb25zdCBjbG9zZUZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlLWZvcm1cIik7XG4gIGNsb3NlRm9ybS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wdXAtZm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH0pO1xuICBjb25zdCBjbG9zZVByb2plY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZS1wcm9qZWN0LWZvcm1cIik7XG4gIGNsb3NlUHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtcG9wdXAtZm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIH0pO1xuXG4gIHdpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKFxuICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJwcm9qZWN0LXBvcHVwLWZvcm1cIiB8fFxuICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJwb3B1cC1mb3JtXCJcbiAgICApIHtcbiAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGFiU3dpdGNoKCkge1xuICBjb25zdCB0YWJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy10YWJzXCIpO1xuICBjb25zdCBkZWZhdWx0VGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmJveFwiKTtcbiAgbGV0IGN1cnJlbnRUYWIgPSBkZWZhdWx0VGFiO1xuXG4gIHRhYnMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNvbnN0IGNsaWNrZWRUYWIgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBjbGlja2VkVGFiLmlubmVyVGV4dDtcbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJvamVjdE5hbWUpO1xuXG4gICAgaWYgKHByb2plY3REaXYgJiYgY3VycmVudFRhYiAhPT0gcHJvamVjdERpdikge1xuICAgICAgaWYgKGN1cnJlbnRUYWIpIHtcbiAgICAgICAgY3VycmVudFRhYi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9XG4gICAgICBwcm9qZWN0RGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICBjdXJyZW50VGFiID0gcHJvamVjdERpdjtcbiAgICB9XG4gIH0pO1xufVxuXG4vKiBjb25zb2xlLmxvZyhwcm9qZWN0KTsgKi9cbiIsImltcG9ydCB7IHByb2plY3RPcHRpb25zIH0gZnJvbSBcIi4vZXZlbnRzaGFuZGxlclwiO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVwiO1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdEVsZW1lbnQgfSBmcm9tIFwiLi9kb21jcmVhdG9yXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdQcm9qZWN0KCkge1xuICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbmFtZVwiKTtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1mb3JtXCIpO1xuICBjb25zdCBmb3JtV2luZG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LXBvcHVwLWZvcm1cIik7XG5cbiAgbGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKSB8fCBbXTtcblxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBuYW1lID0gbmFtZUlucHV0LnZhbHVlO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgICBmb3JtV2luZG93LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgIGNvbnN0IGlkID0gRGF0ZS5ub3coKTtcblxuICAgIGNyZWF0ZVByb2plY3RFbGVtZW50KG5hbWUsIGlkKTtcblxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSB7IGlkOiBpZCwgbmFtZTogbmFtZSwgdGFza3M6IFtdIH07XG4gICAgcHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcblxuICAgIFN0b3JhZ2Uuc2F2ZU5ld1Byb2plY3QocHJvamVjdHMpO1xuXG4gICAgcHJvamVjdE9wdGlvbnMoKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBwcm9qZWN0T3B0aW9ucyB9IGZyb20gXCIuL2V2ZW50c2hhbmRsZXJcIjtcbmltcG9ydCB7IGNyZWF0ZVRhc2tFbGVtZW50IH0gZnJvbSBcIi4vZG9tY3JlYXRvclwiO1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdEVsZW1lbnQgfSBmcm9tIFwiLi9kb21jcmVhdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhZ2Uge1xuICBzdGF0aWMgc2F2ZU5ld1Byb2plY3QocHJvamVjdHMpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG4gIH1cblxuICBzdGF0aWMgbG9hZFByb2plY3RzKCkge1xuICAgIGNvbnN0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKTtcbiAgICBjb25zdCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0YXNrc1wiKSk7XG5cbiAgICBpZiAocHJvamVjdHMgJiYgcHJvamVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICBjcmVhdGVQcm9qZWN0RWxlbWVudChwcm9qZWN0Lm5hbWUsIHByb2plY3QuaWQpO1xuXG4gICAgICAgIGlmICh0YXNrcyAmJiB0YXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3QgcHJvamVjdFRhc2tzID0gdGFza3MuZmlsdGVyKFxuICAgICAgICAgICAgKHRhc2spID0+IHRhc2sucHJvamVjdCA9PT0gcHJvamVjdC5uYW1lXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHByb2plY3RUYXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXNrRWxlbWVudCA9IGNyZWF0ZVRhc2tFbGVtZW50KFxuICAgICAgICAgICAgICB0YXNrLnRpdGxlLFxuICAgICAgICAgICAgICB0YXNrLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICB0YXNrLmR1ZURhdGUsXG4gICAgICAgICAgICAgIHRhc2sucHJpb3JpdHksXG4gICAgICAgICAgICAgIHRhc2sucHJvamVjdCxcbiAgICAgICAgICAgICAgdGFzay5pZFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhc2sucHJvamVjdCk7XG4gICAgICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tFbGVtZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7IC8vaW1wb3J0YW50IHRvIHNhdmUgdGhlXG4gICAgICAvL3Byb2plY3RzIHNvIHRoYXQgaXRcbiAgICAgIC8vZG9lc250IGR1cGxpY2F0ZSB0aGUgdGFza3MgaW4gbG9jYWxzdG9yYWdlIGVhY2ggdGltZSBwYWdlIGlzIHJlbG9hZGVkXG5cbiAgICAgIHByb2plY3RPcHRpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgLyogc3RhdGljIHJlbW92ZVByb2plY3QoKSB7fSAqL1xuXG4gIHN0YXRpYyBzYXZlTmV3VGFzayh0YXNrcykge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza3NcIiwgSlNPTi5zdHJpbmdpZnkodGFza3MpKTtcbiAgfVxuXG4gIHN0YXRpYyBsb2FkVGFza3MoKSB7XG4gICAgY29uc3QgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpO1xuXG4gICAgaWYgKHRhc2tzICYmIHRhc2tzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKSB8fCBbXTtcbiAgICAgIGNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tY29udGFpbmVyXCIpO1xuXG4gICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgdGFza3MpIHtcbiAgICAgICAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0LCBpZCB9ID0gdGFzaztcblxuICAgICAgICBjb25zdCBleGlzdGluZ1Byb2plY3QgPSBwcm9qZWN0cy5maW5kKChwKSA9PiBwLm5hbWUgPT09IHByb2plY3QpO1xuICAgICAgICBpZiAoZXhpc3RpbmdQcm9qZWN0ICYmIGV4aXN0aW5nUHJvamVjdC50YXNrcy5zb21lKCh0KSA9PiB0LmlkID09PSBpZCkpIHtcbiAgICAgICAgICAvLyBDaGVjayBpZiB0YXNrIHdpdGggc2FtZSBJRCBhbHJlYWR5IGV4aXN0cyBpbiBwcm9qZWN0LCBpZiBpdCBkb2VzOiBza2lwIGFkZGluZyBpdFxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFza0VsZW1lbnQgPSBjcmVhdGVUYXNrRWxlbWVudChcbiAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBkdWVEYXRlLFxuICAgICAgICAgIHByaW9yaXR5LFxuICAgICAgICAgIHByb2plY3QsXG4gICAgICAgICAgaWRcbiAgICAgICAgKTtcbiAgICAgICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGV4aXN0aW5nUHJvamVjdCkge1xuICAgICAgICAgIGV4aXN0aW5nUHJvamVjdC50YXNrcy5wdXNoKHtcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBkdWVEYXRlLFxuICAgICAgICAgICAgcHJpb3JpdHksXG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgU3RvcmFnZS5sb2FkVGFza3MoKTtcbiAgU3RvcmFnZS5sb2FkUHJvamVjdHMoKTtcbn0pO1xuIiwiaW1wb3J0IHsgY3JlYXRlVGFza0VsZW1lbnQgfSBmcm9tIFwiLi9kb21jcmVhdG9yXCI7XG5pbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbmV4cG9ydCBjb25zdCBuZXdUYXNrID0gKCkgPT4ge1xuICBjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKTtcbiAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb25cIik7XG4gIGNvbnN0IGR1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza0R1ZURhdGVcIik7XG4gIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stcHJpb3JpdHlcIik7XG4gIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1zZWxlY3RcIik7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stZm9ybVwiKTtcbiAgY29uc3QgZm9ybVdpbmRvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9wdXAtZm9ybVwiKTtcblxuICBsZXQgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIikpIHx8IFtdO1xuXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGlkID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCB0aXRsZSA9IHRpdGxlSW5wdXQudmFsdWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbklucHV0LnZhbHVlO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBkdWVEYXRlSW5wdXQudmFsdWU7XG4gICAgY29uc3QgcHJpb3JpdHkgPSBwcmlvcml0eUlucHV0LnZhbHVlO1xuICAgIGxldCBwcm9qZWN0ID0gcHJvamVjdElucHV0LnZhbHVlO1xuICAgIGlmICghcHJvamVjdCkge1xuICAgICAgcHJvamVjdCA9IFwiSW5ib3hcIjtcbiAgICB9XG5cbiAgICBmb3JtLnJlc2V0KCk7XG4gICAgZm9ybVdpbmRvdy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICBjb25zdCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCB0YXNrRWxlbWVudCA9IGNyZWF0ZVRhc2tFbGVtZW50KFxuICAgICAgdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIGR1ZURhdGUsXG4gICAgICBwcmlvcml0eSxcbiAgICAgIHByb2plY3QsXG4gICAgICBpZFxuICAgICk7XG4gICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRWxlbWVudCk7XG5cbiAgICBjb25zdCBuZXdUYXNrID0ge1xuICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgZHVlRGF0ZTogZHVlRGF0ZSxcbiAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcbiAgICAgIHByb2plY3Q6IHByb2plY3QsXG4gICAgICBpZDogaWQsXG4gICAgfTtcbiAgICB0YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgIGNvbnNvbGUubG9nKGlkKVxuICAgIFN0b3JhZ2Uuc2F2ZU5ld1Rhc2sodGFza3MpO1xuICAgIFxuXG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgZ2V0VGl0bGU6ICgpID0+IHRpdGxlSW5wdXQudmFsdWUsXG4gICAgZ2V0RGVzY3JpcHRpb246ICgpID0+IGRlc2NyaXB0aW9uSW5wdXQudmFsdWUsXG4gICAgZ2V0RHVlRGF0ZTogKCkgPT4gZHVlRGF0ZUlucHV0LnZhbHVlLFxuICAgIGdldFByaW9yaXR5OiAoKSA9PiBwcmlvcml0eUlucHV0LnZhbHVlLFxuICAgIGdldFByb2plY3Q6ICgpID0+IHByb2plY3RJbnB1dC52YWx1ZSxcbiAgfTtcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBuZXdUYXNrIH0gZnJvbSBcIi4vbW9kdWxlcy90YXNrc1wiO1xuaW1wb3J0IHsgbmV3UHJvamVjdCB9IGZyb20gXCIuL21vZHVsZXMvcHJvamVjdHNcIjtcbmltcG9ydCB7XG4gIHRhYlN3aXRjaCxcbiAgb3BlblRoZUZvcm0sXG4gIGNsb3NlVGhlRm9ybSxcbiAgY29sbGFwc2libGVUYWJzLFxufSBmcm9tIFwiLi9tb2R1bGVzL2V2ZW50c2hhbmRsZXJcIjtcblxuXG5uZXdUYXNrKCk7XG5jb2xsYXBzaWJsZVRhYnMoKTtcbm9wZW5UaGVGb3JtKCk7XG5jbG9zZVRoZUZvcm0oKTtcbm5ld1Byb2plY3QoKTtcbnRhYlN3aXRjaCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9