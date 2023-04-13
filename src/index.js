import { compareAsc, format } from "date-fns";

const domHandler = (() => {
  const openTheForm = () => {
    document.getElementById("new-btn");
    document.getElementById("popup-form").style.display = "block";
  };

  const closeTheForm = () => {
    document.getElementById("popup-form").style.display = "none";
  };
})();
