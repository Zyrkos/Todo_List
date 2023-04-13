import { compareAsc, format } from "date-fns";

const domHandler = (() => {
  const openTheForm = () => {
    const addNewTask = document.getElementById("add-new-btn");
    addNewTask.addEventListener("click", () => {
      document.getElementById("popup-form").style.display = "block";
    });
  };

  const closeTheForm = () => {
    const closeForm = document.getElementById("close-form");

    closeForm.addEventListener("click", () => {
      document.getElementById("popup-form").style.display = "none";
    });
  };

  openTheForm();
  closeTheForm();
})();
