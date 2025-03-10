import React from 'react';
import { Todo } from '../types/todo';

interface TodoChatCardProps {
  todo: Todo;
  status?: 'created' | 'deleted' | 'toggled' | 'priorityChanged';
}

const TodoChatCard: React.FC<TodoChatCardProps> = ({ todo, status = 'created' }) => {
  // Priority color mapping
  const priorityColors = {
    high: '#ff5252',    // Red for high priority
    medium: '#ffb74d',  // Orange for medium priority
    low: '#ffeb3b'      // Yellow for low priority
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'created':
        return 'New todo created:';
      case 'deleted':
        return 'Todo deleted:';
      case 'toggled':
        return todo.completed ? 'Todo marked as completed:' : 'Todo marked as incomplete:';
      case 'priorityChanged':
        return `Todo priority changed to ${todo.priority}:`;
      default:
        return '';
    }
  };

  return (
    <div className="todo-chat-card">
      <div className="todo-chat-status">{getStatusMessage()}</div>
      <div className="todo-chat-item" style={{ borderLeft: `4px solid ${priorityColors[todo.priority]}` }}>
        <div className="todo-chat-header">
          <span className="todo-chat-priority" style={{ backgroundColor: priorityColors[todo.priority] }}>
            {todo.priority}
          </span>
          {todo.completed && <span className="todo-chat-completed">✓ Completed</span>}
        </div>
        <div className="todo-chat-text" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </div>
      </div>
    </div>
  );
};

export default TodoChatCard;
