export function collapsibleTabs() {
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

export function projectOptions() {
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

export function openTheForm() {
  const addNewTask = document.getElementById("add-new-btn");
  addNewTask.addEventListener("click", () => {
    document.getElementById("popup-form").style.display = "block";
  });

  const addNewProject = document.getElementById("add-project-btn");
  addNewProject.addEventListener("click", () => {
    document.getElementById("project-popup-form").style.display = "block";
  });
}

export function closeTheForm() {
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

export function tabSwitch() {
  const tabs = document.getElementById("projects-tabs");
  let currentContainer = null;

  tabs.addEventListener("click", function (event) {
    const mainContainer = document.getElementById("main-container");
    const clickedTab = event.target;
    const projectId = parseInt(clickedTab.getAttribute("data-project-id"));
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const project = projects.find((p) => p.id === projectId);

    if (currentContainer && currentContainer.id === project.name) {
      return;
    }

    if (currentContainer && currentContainer.id !== project.name) {
      mainContainer.removeChild(currentContainer);
      currentContainer = null;
    }

    if (!currentContainer) {
      const newContainer = document.createElement("div");
      newContainer.id = project.name;
      newContainer.classList.add("project-container");
      mainContainer.appendChild(newContainer);
      currentContainer = newContainer;
    }

    
  });
}


/* console.log(project); */