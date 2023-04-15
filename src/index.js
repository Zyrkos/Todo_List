import { compareAsc, format } from "date-fns";
import { newTask } from "./modules/tasks";

(() => {
  const openTheForm = () => {
    const addNewTask = document.getElementById("add-new-btn");
    addNewTask.addEventListener("click", () => {
      document.getElementById("popup-form").style.display = "block";
    });

    const addNewProject = document.getElementById("add-project")
  };

  const closeTheForm = () => {
    const closeForm = document.getElementById("close-form");

    closeForm.addEventListener("click", () => {
      document.getElementById("popup-form").style.display = "none";
    });

    window.onclick = function (event) {
      if (event.target.className === "popup-form") {
        event.target.style.display = "none";
      }
    };
  };

  openTheForm();
  closeTheForm();
  newTask();
})();
