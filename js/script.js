{
  const tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks.push({ content: newTaskContent });
    render();
  };

  const removeTask = (index) => {
    tasks.splice(index, 1);
    render();
  };

  const toggleTaskDone = (index) => {
    tasks[index].done = !tasks[index].done;
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const render = () => {
    let tasksListContent = "";

    for (const task of tasks) {
      tasksListContent += `
              <li class="tasks__item js__task">
              <button class="tasks__button tasks__button--done js-done">${task.done ? "✓" : ""}</button>
              <span class="tasks__content${ task.done ? " tasks__content--done" : ""}">${task.content}</span>
              <button class="tasks__button tasks__button--remove js-remove">🗑️</button>
              </li>
          `;
    }

    document.querySelector(".js-tasks").innerHTML = tasksListContent;

    document.querySelector(".js-stats").innerText = `
          Liczba wszystkich zadań: ${tasks.length}\n
          Liczba ukończonych zadań: ${tasks.filter((task) => task.done).length}
      `;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
