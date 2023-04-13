import { compareAsc, format } from "date-fns";

const domHandler = (() => {
  const createForm = () => {
    document.getElementById("new-btn");
    
  };

  const openTheForm = () => {
    document.getElementById("popup-form").style.display = "block";
  };

  const closeTheForm = () => {
    document.getElementById("popup-form").style.display = "none";
  };
})();

function openForm() {
  document.getElementById("loginPopup").style.display = "block";
}
function closeForm() {
  document.getElementById("loginPopup").style.display = "none";
  window.onclick = function (event) {
    let modal = document.getElementById("popup-form");
    if (event.target == modal) {
      closeForm();
    }
  };
}
