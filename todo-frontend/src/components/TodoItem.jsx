import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggleComplete = () => {
    onUpdate(todo._id, { ...todo, completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo._id, { ...todo, title: editTitle.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow p-4 border-l-4 ${
      todo.completed ? 'border-green-500 bg-gray-50' : 'border-blue-500'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
          />
          
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <span
              className={`flex-1 ${
                todo.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800'
              }`}
            >
              {todo.title}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {!isEditing && (
            <>
              <button
                onClick={handleEdit}
                className="text-blue-600 hover:text-blue-800 px-2 py-1 text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(todo._id)}
                className="text-red-600 hover:text-red-800 px-2 py-1 text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      
      {todo.createdAt && (
        <div className="text-xs text-gray-400 mt-2">
          Created: {new Date(todo.createdAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default TodoItem;