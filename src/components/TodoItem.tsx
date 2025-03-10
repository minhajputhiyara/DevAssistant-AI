import React from 'react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
  // Priority color mapping
  const priorityColors = {
    high: '#ff5252',    // Red for high priority
    medium: '#ffb74d',  // Orange for medium priority
    low: '#ffeb3b'      // Yellow for low priority
  };

  return (
    <div className={`todo-item priority-${todo.priority}`}>
      <div 
        className="priority-indicator" 
        style={{ backgroundColor: priorityColors[todo.priority] }}
        title={`Priority: ${todo.priority}`}
      ></div>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => toggleTodo(todo.id)} 
      />
      <span className={todo.completed ? 'completed' : ''} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <div className="todo-actions">
        <span className="priority-badge" style={{ backgroundColor: priorityColors[todo.priority] }}>
          {todo.priority}
        </span>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
