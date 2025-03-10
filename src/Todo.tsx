import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Todo as TodoType } from './types/todo';
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

// this is for getting the context of the state for the copilot
  useCopilotReadable({
    description: "The list of todo items with their id, text content, and completion status",
    value: todos,
  });

  // Add Copilot action for adding a todo
  // @ts-ignore - CopilotKit type definition issue
  useCopilotAction({
    name: "addTodo",
    description: "Add a new todo item to the list",
    parameters: [
      {
        name: "text",
        type: "string",
        description: "The text content of the todo item to add",
      },
    ],
    handler: async ({ text }: { text: string }) => {
      addTodo(text);
      return "Todo created successfully!";
    },
  });

  // Add Copilot action for deleting a todo
  // @ts-ignore - CopilotKit type definition issue
  useCopilotAction({
    name: "deleteTodo",
    description: "Delete a todo item from the list by its ID",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "The ID of the todo item to delete",
      },
    ],
    handler: async ({ id }: { id: number }) => {
      deleteTodo(id);
      return "Todo deleted successfully!";
    },
  });

  // Add Copilot action for marking a todo as done/completed
  // @ts-ignore - CopilotKit type definition issue
  useCopilotAction({
    name: "toggleTodo",
    description: "Mark a todo item as completed or incomplete by toggling its status",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "The ID of the todo item to toggle completion status",
      },
    ],
    handler: async ({ id }: { id: number }) => {
      toggleTodo(id);
      return "Todo status toggled successfully!";
    },
  });

  const addTodo = (text: string) => {
    const newTodo: TodoType = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>DEV ASSISTANT</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default Todo;