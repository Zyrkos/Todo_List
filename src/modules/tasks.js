export const newTask = () => {
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const dueDateInput = document.getElementById("taskDueDate");
  const priorityInput = document.getElementById("task-priority");
  const form = document.getElementById("task-form");

  let title, description, dueDate, priority;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    title = titleInput.value;
    description = descriptionInput.value;
    dueDate = dueDateInput.value;
    priority = priorityInput.value;

    
  });

  return {
    getTitle: () => title,
    getDescription: () => description,
    getDueDate: () => dueDate,
    getPriority: () => priority,
  };
};
