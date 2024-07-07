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

const updateToggleCompletedTasksButton = () => {
  const toggleCompletedTasksButton = document.querySelector(".js-toggle-completed-tasks");
  const allDone = tasks.length > 0 && tasks.every(task => task.done);

  if (allDone) {
    toggleCompletedTasksButton.style.display = "none";
  } else {
    toggleCompletedTasksButton.style.display = "inline-block";
  }
};

const render = () => {
  bindEvents();
  renderTask();
  renderStats();
  updateToggleCompletedTasksButton();
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