export function collapsibleTabs() {
  const coll = document.querySelectorAll(".collapsible");
  let i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.querySelector(".collap-content");
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}



const select = document.getElementById("project-select");
const list = document.getElementById("projects-tabs");
const items = list.getElementsByTagName("li");

for (let i = 0; i < items.length; i++) {
  const option = document.createElement("option");
  option.value = items[i].textContent;
  option.text = items[i].textContent;
  select.appendChild(option);
}