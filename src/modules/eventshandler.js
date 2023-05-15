export function collapsibleTabs() {
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
export function projectOptions() {
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

export function tabSwitch() {
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
