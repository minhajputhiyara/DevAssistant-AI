import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoChatCard from './components/TodoChatCard';
import { Todo as TodoType } from './types/todo';
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";

// Create a LoadingView component
const LoadingView: React.FC = () => (
  <div className="todo-chat-loading">Processing your request...</div>
);

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

// this is for getting the context of the state for the copilot
  useCopilotReadable({
    description: "The list of todo items with their id, text content, completion status, and priority",
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
      {
        name: "priority",
        type: "string",
        description: "The priority level (high, medium, or low)",
        enum: ["high", "medium", "low"],
        required: false
      }
    ],
    handler: async ({ text, priority }: { text: string, priority?: 'high' | 'medium' | 'low' }) => {
      // Auto-prioritize based on keywords if priority not specified
      if (!priority) {
        const lowercaseText = text.toLowerCase();
        
        // High priority keywords
        if (lowercaseText.includes('critical') || 
            lowercaseText.includes('urgent') || 
            lowercaseText.includes('bug') || 
            lowercaseText.includes('fix') || 
            lowercaseText.includes('security') || 
            lowercaseText.includes('crash') ||
            lowercaseText.includes('blocking')) {
          priority = 'high';
        } 
        // Low priority keywords
        else if (lowercaseText.includes('refactor') || 
                lowercaseText.includes('document') || 
                lowercaseText.includes('cleanup') || 
                lowercaseText.includes('nice to have') ||
                lowercaseText.includes('test') ||
                lowercaseText.includes('comment')) {
          priority = 'low';
        } 
        // Default to medium priority
        else {
          priority = 'medium';
        }
      }
      
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
        priority
      };
      
      addTodo(text, priority);
      return { todo: newTodo };
    },
    // @ts-ignore - CopilotKit type definition issue
    render: ({ status, result }) => {
      if (status === 'inProgress') {
        return <LoadingView />;
      } else if (result && result.todo) {
        return <TodoChatCard todo={result.todo} status="created" />;
      }
      return null;
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
      const todo = todos.find(t => t.id === id);
      if (!todo) return { success: false };
      
      deleteTodo(id);
      return { todo };
    },
    // @ts-ignore - CopilotKit type definition issue
    render: ({ status, result }) => {
      if (status === 'inProgress') {
        return <LoadingView />;
      } else if (result && result.todo) {
        return <TodoChatCard todo={result.todo} status="deleted" />;
      }
      return null;
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
      const todo = todos.find(t => t.id === id);
      if (!todo) return { success: false };
      
      toggleTodo(id);
      
      const updatedTodo = { ...todo, completed: !todo.completed };
      return { todo: updatedTodo };
    },
    // @ts-ignore - CopilotKit type definition issue
    render: ({ status, result }) => {
      if (status === 'inProgress') {
        return <LoadingView />;
      } else if (result && result.todo) {
        return <TodoChatCard todo={result.todo} status="toggled" />;
      }
      return null;
    },
  });

  // Add Copilot action for setting todo priority
  // @ts-ignore - CopilotKit type definition issue
  useCopilotAction({
    name: "setPriority",
    description: "Set the priority of a todo item",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "The ID of the todo item",
      },
      {
        name: "priority",
        type: "string",
        description: "The priority level (high, medium, or low)",
        enum: ["high", "medium", "low"]
      }
    ],
    handler: async ({ id, priority }: { id: number, priority: 'high' | 'medium' | 'low' }) => {
      const todo = todos.find(t => t.id === id);
      if (!todo) return { success: false };
      
      setTodos(
        todos.map(todo => 
          todo.id === id ? { ...todo, priority } : todo
        )
      );
      
      const updatedTodo = { ...todo, priority };
      return { todo: updatedTodo };
    },
    // @ts-ignore - CopilotKit type definition issue
    render: ({ status, result }) => {
      if (status === 'inProgress') {
        return <LoadingView />;
      } else if (result && result.todo) {
        return <TodoChatCard todo={result.todo} status="priorityChanged" />;
      }
      return null;
    },
  });

  const addTodo = (text: string, priority: 'high' | 'medium' | 'low') => {
    const newTodo: TodoType = {
      id: Date.now(),
      text,
      completed: false,
      priority
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

  // Sort todos by priority (high first, then medium, then low)
  const sortedTodos = [...todos].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="todo-container">
      <h1>DEV ASSISTANT</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={sortedTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default Todo;