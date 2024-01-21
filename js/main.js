const modal = document.querySelector(".modal");
const addTask = document.querySelector(".page__add-task");
const closeButton = document.querySelector(".close-button");
const deleteButtom = document.querySelector(".button-delete");
const saveButton = document.querySelector(".button-save");
const page = document.querySelector(".page");
const search = document.querySelector(".header__search");
const filterButton = document.querySelector(".filter__button");
const filterSelect = document.querySelector(".filter__select");

const allTasks = [];
let taskTarget = "";

const today = new Date().toISOString().split("T")[0];
const dateForMin = document.querySelector("#date");
dateForMin.min = today;

const deleteModalFields = () => {
  const name = document.querySelector("#name");
  name.value = "";

  const date = document.querySelector("#date");
  date.value = "";

  const description = document.querySelector("#description");
  description.value = "";

  const select = document.querySelector(".state-box__state-new");
  select.value = "До виконання";
};

addTask.addEventListener("click", () => {
  modal.style.display = "block";
  deleteModalFields();
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";

  taskTarget = "";
});

deleteButtom.addEventListener("click", () => {
  modal.style.display = "none";

  deleteModalFields();

  if (Boolean(taskTarget)) {
    page.removeChild(taskTarget);
  }

  taskTarget = "";
});

saveButton.addEventListener("click", () => {
  modal.style.display = "none";

  const taskValues = getFieldsFromModal();

  if (!taskTarget) {
    const task = document.createElement("div");
    task.className = "page__new-task";

    const title = document.createElement("h3");
    title.innerHTML = taskValues.name.value;
    task.appendChild(title);
    title.className = "new-task__title";

    const date = document.createElement("p");
    date.innerHTML = taskValues.date.value;
    task.appendChild(date);
    date.className = "new-task__date";
    const description = document.createElement("p");
    description.innerHTML = taskValues.description.value;
    task.appendChild(description);
    description.className = "new-task__description";

    const select = document.createElement("p");
    select.innerHTML = taskValues.state.value;
    task.appendChild(select);
    select.className = "new-task__state";

    page.insertBefore(task, addTask);

    allTasks.push(task);
  }

  if (taskTarget) {
    let oldName = taskTarget.querySelector(".new-task__title");
    oldName.innerHTML = taskValues.name.value;

    let oldDate = taskTarget.querySelector(".new-task__date");
    oldDate.innerHTML = taskValues.date.value;

    let oldDescription = taskTarget.querySelector(".new-task__description");
    oldDescription.innerHTML = taskValues.description.value;

    let oldState = taskTarget.querySelector(".new-task__state");
    oldState.innerHTML = taskValues.state.value;
  }

  const allTasksHtml = document.querySelectorAll(".page__new-task");

  for (item of allTasksHtml) {
    item.addEventListener("click", (event) => {
      taskTarget = event.target;
      const name = taskTarget.querySelector(".new-task__title");
      const nameModal = document.querySelector("#name");
      nameModal.value = name.innerHTML;

      const date = taskTarget.querySelector(".new-task__date");
      const dateModal = document.querySelector("#date");
      dateModal.value = date.innerHTML;

      const description = taskTarget.querySelector(".new-task__description");
      const descriptionModal = document.querySelector("#description");
      descriptionModal.value = description.innerHTML;

      const state = taskTarget.querySelector(".new-task__state");
      const stateModal = document.querySelector("#state");
      stateModal.value = state.innerHTML;

      modal.style.display = "block";
    });
  }

  taskTarget = "";
});

search.oninput = () => {
  allTasks.forEach((item) => {
    if (item.firstElementChild.innerHTML.includes(search.value)) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
};

filterButton.addEventListener("click", () => {
  allTasks.forEach((item) => {
    if (item.lastElementChild.innerHTML === filterSelect.value) {
      item.classList.remove("hide");
    } else if ("Усі" === filterSelect.value) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
});

const getFieldsFromModal = () => {
  const name = document.querySelector("#name");
  const date = document.querySelector("#date");
  const description = document.querySelector("#description");
  const state = document.querySelector(".state-box__state-new");

  return { name, date, description, state };
};
