import { environment } from "@/utils/environment";

export async function getTodos() {
  const response = await fetch(environment.apiUrl + "/todos");
  const todos = await response.json();
  return todos;
}
