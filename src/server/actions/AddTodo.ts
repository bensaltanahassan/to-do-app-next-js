import { environment } from "@/utils/environment";
import { Todo } from "@/utils/interfaces/todo.interfaces";
import axios from "axios";

export async function addTodo(todo: Todo) {
  const response = await axios.post(environment.apiUrl + "/todos", todo);
  return response.data;
}
