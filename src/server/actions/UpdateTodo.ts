import { environment } from "@/utils/environment";
import { Todo } from "@/utils/interfaces/todo.interfaces";
import axios from "axios";

export async function updateTodo({ id, todo }: { id: number; todo: Todo }) {
  const response = await axios.put(`${environment.apiUrl}/todos/${id}`, todo);
  return response.data;
}
