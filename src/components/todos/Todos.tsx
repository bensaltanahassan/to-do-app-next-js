"use client";

import { addTodo } from "@/server/actions/AddTodo";
import { getTodos } from "@/server/actions/GetTodos";
import { updateTodo } from "@/server/actions/UpdateTodo";
import { Todo } from "@/utils/interfaces/todo.interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([] as Todo[]);
  const [showAddTodo, setShowAddTodo] = useState(true);
  const [newTodo, setNewTodo] = useState("");

  const mutation = useMutation({
    mutationFn: (newTodo: Todo) => {
      return addTodo(newTodo);
    },
    onSuccess: (data) => {
      setNewTodo("");
      data.id = todos.length + 1;
      setTodos([data, ...todos]);
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, todo }: { id: number; todo: Todo }) => {
      return updateTodo({ id, todo });
    },
    onSuccess: (data) => {
      setTodos([...todos]);
    },
  });

  const handleAddTodo = () => {
    if (showAddTodo == false) {
      setNewTodo("");
    }
    setShowAddTodo(!showAddTodo);
  };

  const handleChange = (e: any) => {
    setNewTodo(e.target.value);
  };

  const saveTodo = () => {
    const isCompleted = Math.random() < 0.5;
    const newTodoObj: Todo = {
      id: todos.length + 1,
      title: newTodo,
      completed: isCompleted,
      userId: 1,
    };
    mutation.mutate(newTodoObj);
    setShowAddTodo(false);
  };

  const { error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await getTodos();
      setTodos(response);
      return todos;
    },
  });

  function handleUpdateTodo(id: number): void {
    console.log(id);
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      update.mutate({ id, todo });
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex items-center justify-center w-screen bg-gray-100 py-24 px-4 flex-col">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-2/3 lg:w-1/2 mb-4">
        <div className="flex flex-row justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold">Todos</h1>
            <p className="text-gray-500">A list of todos</p>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddTodo}
            >
              Add Todo
            </button>
          </div>
        </div>
        {showAddTodo && (
          <div>
            <input
              type="text"
              placeholder="Add todo"
              className="border border-gray-200 rounded p-2 mr-2"
              value={newTodo}
              onChange={handleChange}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={saveTodo}
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded shadow-md  w-full md:w-2/3 lg:w-1/2">
        <ul className="mt-4">
          {todos.map((todo: Todo) => (
            <div key={todo.id} className="border-b border-gray-200 py-2">
              <li className="flex items-center justify-between">
                <span>{todo.title}</span>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="h-4 w-4 text-blue-500"
                  onChange={(e) => handleUpdateTodo(todo.id)}
                />
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
