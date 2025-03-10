import React, { useState } from 'react';

interface TodoFormProps {
  addTodo: (text: string, priority: 'high' | 'medium' | 'low') => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, priority);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
      />
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
        className="priority-select"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
