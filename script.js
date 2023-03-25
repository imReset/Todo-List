class TodoItem {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

const form = document.querySelector("form");
const submitBtn = document.querySelector('button[type="submit"]');
const todoList = document.querySelector(".todo-list");

// Create todo item
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  // check if required fields are empty
  const requiredFields = ["title", "dueDate", "priority"];
  const emptyFields = requiredFields.filter((field) => {
    return document.getElementById(field).value === "";
  });

  if (emptyFields.length > 0) {
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("error");
    errorMsg.classList = "Please fill in all required fields";
    form.insertBefore(errorMsg, submitBtn);
  } else {
    const todoItem = new TodoItem(title, description, dueDate, priority);
    console.log(todoItem); //! testing purposes

    window.addEventListener("load", () => {});
    const h2 = document.createElement("h2");
    h2.textContent = todoItem.title;

    const p = document.createElement("p");
    p.textContent = todoItem.description;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.padding = "5px 10px";
    editBtn.style.marginRight = "10px";
    editBtn.style.fontSize = "14px";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.style.padding = "5px 10px";
    deleteBtn.marginRight = "10px";
    deleteBtn.style.fontSize = "14px";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("flex");
    buttonContainer.style.justifyContent = "space-between";
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

    const div = document.createElement("div");
    div.classList.add("todo-items");
    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(buttonContainer);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);

    const dueDatePara = document.createElement("p");
    const dueDateObj = new Date(todoItem.dueDate);
    const options = { month: "long", day: "numeric", year: "numeric" };
    dueDatePara.textContent = dueDateObj.toLocaleDateString("en-US", options);
    div.appendChild(dueDatePara);

    const strong = document.createElement("strong");
    strong.textContent = todoItem.priority;
    div.appendChild(strong);

    document.body.appendChild(div);

    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this todo?")) {
        // Delete todo
        div.remove();
      }
    });
  }

  form.addEventListener("input", (e) => {
    if (e.target.required && e.target.value !== "") {
      const errorMsg = form.querySelector(".error");
      if (errorMsg) {
        errorMsg.remove();
      }
    }
  });
});

// sidebar
const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.querySelector(".sidebar-toggle");
const mainContent = document.querySelector(".main-content");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  mainContent.classList.toggle("active");
});

const projects = [{ name: "Default Project", todos: [] }];

// add projects
const projectForm = document.getElementById("projects");
const projectNameInput = projectForm.querySelector("input");
const projectList = document.querySelector(".project-list");

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const projectName = projectNameInput.value;

  const projectItem = document.createElement("li");
  projectItem.classList.add("project");
  projectItem.textContent = projectName;

  projectList.appendChild(projectItem);

  const project = { name: projectName, todos: [] };
  projects.push(project);

  projectNameInput.value = "";
});
