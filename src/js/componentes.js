import { Todo } from "../js/classes";
import { todoList } from "../index";
// REFERENCIAS EN EL HTML
const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrarCompletados = document.querySelector(".clear-completed");
const ulFilter = document.querySelector(".filters");
const aFiltros = document.querySelectorAll(".filtro");
const count = document.querySelector(".todo-count");

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
    <li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.completado ? "checked" : ""
            }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> `;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;
};
// EVENTOS
txtInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13 && txtInput.value.length > 0) {
    // console.log(txtInput.value);
    const newTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(newTodo);
    // console.log(todoList);
    crearTodoHtml(newTodo);
    txtInput.value = "";
  }
  actualizar_count();
});

divTodoList.addEventListener("click", (e) => {
  const nombreElemento = e.target.localName;
  const todoElemento = e.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute("data-id");
  if (nombreElemento.includes("input")) {
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle("completed");
  }

  if (nombreElemento.includes("button")) {
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
  }
  // console.log(todoElemento);
  // console.log(todoList);
  actualizar_count();
});

btnBorrarCompletados.addEventListener("click", () => {
  todoList.eliminarCompletados();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    if (elemento.classList.contains("completed")) {
      divTodoList.removeChild(elemento);
    }
  }
});

ulFilter.addEventListener("click", (e) => {
  const filtro = e.target.text;
  if (!filtro) {
    return;
  }
  aFiltros.forEach((element) => {
    element.classList.remove("selected");
  });

  e.target.classList.add("selected");
  for (const elemento of divTodoList.children) {
    elemento.classList.remove("hidden");

    const completado = elemento.classList.contains("completed");
    switch (filtro) {
      case "Pendientes":
        if (completado) {
          elemento.classList.add("hidden");
        }
        break;
      case "Completados":
        if (!completado) {
          elemento.classList.add("hidden");
        }
        break;

      default:
        break;
    }
  }
});

export const actualizar_count = () => {
  count.children[0].textContent = todoList.getPendientes();
};
