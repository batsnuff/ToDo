let tasks = [];
let hideCompletedTasks = false;

const toggleAllTasks = () => {
  const allDone = tasks.every(task => task.done);
  tasks = tasks.map(task => ({ ...task, done: !allDone }));
  render();
};

const toggleCompletedTasks = () => {
  hideCompletedTasks = !hideCompletedTasks;
  render();
};

const addNewTask = (newTaskContent) => {
  tasks = [...tasks, { content: newTaskContent, done: false }];
  render();
};

const removeTask = (index) => {
  tasks = tasks.filter((_, taskIndex) => taskIndex !== index);
  render();
};

const toggleTaskDone = (index) => {
  tasks = tasks.map((task, taskIndex) => taskIndex === index
    ? { ...task, done: !task.done }
    : task
  );
  render();
};

const bindEvents = () => {
  const removeButtons = document.querySelectorAll(".js-remove");

  removeButtons.forEach((removeButton, index) => {
    removeButton.addEventListener("click", function () {
      removeTask(index);
    });
  });

  const toggleDoneButtons = document.querySelectorAll(".js-done");

  toggleDoneButtons.forEach((toggleDoneButton, index) => {
    toggleDoneButton.addEventListener("click", function () {
      toggleTaskDone(index);
    });
  });

  document.querySelector(".js-toggle-completed-tasks").addEventListener("click", toggleCompletedTasks);
  document.querySelector(".js-toggle-all-tasks").addEventListener("click", toggleAllTasks);
};

const renderTask = () => {
  let tasksListContent = "";

  for (const task of tasks) {
    if (!hideCompletedTasks || !task.done) {
      tasksListContent += `
        <li class="tasks__item js__task">
          <button class="tasks__button tasks__button--done js-done">${task.done ? "✓" : ""}</button>
          <span class="tasks__content${task.done ? " tasks__content--done" : ""}">${task.content}</span>
          <button class="tasks__button tasks__button--remove js-remove">🗑️</button>
        </li>
      `;
    }
  }

  document.querySelector(".js-tasks").innerHTML = tasksListContent;
  bindEvents();
};

const renderStats = () => {
  const statsContainer = document.querySelector(".js-stats");
  statsContainer.innerHTML = `
    <div class="stats-text">Liczba wszystkich zadań: ${tasks.length}</div>
    <div class="stats-text">Liczba ukończonych zadań: ${tasks.filter((task) => task.done).length}</div>
  `;
  statsContainer.classList.add("stats-style");
};

const updateToggleButtonsVisibility = () => {
  const toggleCompletedTasksButton = document.querySelector(".js-toggle-completed-tasks");
  const toggleAllButton = document.getElementById("toggleAllButton");
    document.getElementById("toggleButton");
    const hasTasks = tasks.length > 0;
  const hasCompletedTasks = tasks.some(task => task.done);

  if (!hasTasks || !hasCompletedTasks) {
    toggleCompletedTasksButton.style.display = "none";
  } else {
    toggleCompletedTasksButton.style.display = "inline-block";
  }

  if (hasTasks) {
    toggleAllButton.style.display = "inline-block";
  } else {
    toggleAllButton.style.display = "none";
  }
};

const render = () => {
  bindEvents();
  renderTask();
  renderStats();
  updateToggleButtonsVisibility();
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

  const toggleCompletedButton = document.getElementById("toggleButton");
  const toggleAllButton = document.getElementById("toggleAllButton");

  toggleCompletedButton.addEventListener("click", () => {
    if (tasks.some(task => task.done)) {
      if (toggleCompletedButton.innerText === "Ukryj ukończone") {
        toggleCompletedButton.innerText = "Pokaż ukończone";
      } else {
        toggleCompletedButton.innerText = "Ukryj ukończone";
      }
    }
  });

  toggleAllButton.addEventListener("click", () => {
    if (tasks.length > 0) {
      if (toggleAllButton.innerText === "Zaznacz wszystkie") {
        toggleAllButton.innerText = "Odznacz wszystkie";
      } else {
        toggleAllButton.innerText = "Zaznacz wszystkie";
      }
    }
  });
};

init();