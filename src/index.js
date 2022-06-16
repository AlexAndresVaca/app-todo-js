import "./styles.css";

import { TodoList } from "./js/classes/index";
import { crearTodoHtml, actualizar_count } from "./js/componentes";

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);

console.log(todoList.todos);

actualizar_count();
