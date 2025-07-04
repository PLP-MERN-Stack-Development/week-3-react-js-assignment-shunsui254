import React, { useState } from 'react';
import Button from './Button';
import { useTaskStorage } from '../hooks/useLocalStorage';

/**
 * TaskManager component for managing tasks with enhanced features
 */
const TaskManager = () => {
  const { 
    tasks, 
    addTask, 
    toggleTask, 
    deleteTask, 
    clearCompleted, 
    getTaskStats 
  } = useTaskStorage();
  
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');

  const stats = getTaskStats();

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all' filter
  });

  // Handle form submission for new task
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask(newTaskText);
      setNewTaskText('');
    }
  };

  // Handle editing task
  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditText('');
  };

  const saveEdit = (id) => {
    if (editText.trim()) {
      // We'll implement updateTask in the hook - for now just use current functionality
      setEditingTask(null);
      setEditText('');
    }
  };

  // Filter button data
  const filterButtons = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.remaining },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto" id="tasks">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          📋 Task Manager
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Stay organized with your daily tasks
        </p>
      </div>

      {/* Task input form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
            maxLength={200}
          />
          <Button 
            type="submit" 
            variant="primary"
            disabled={!newTaskText.trim()}
            className="px-6"
          >
            Add Task
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
          {newTaskText.length}/200 characters
        </div>
      </form>

      {/* Stats Overview */}
      {stats.total > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.remaining}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Remaining</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
        </div>
      )}

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterButtons.map(({ key, label, count }) => (
          <Button
            key={key}
            variant={filter === key ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter(key)}
            className="flex items-center gap-2"
          >
            {label}
            <span className="bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium">
              {count}
            </span>
          </Button>
        ))}
        
        {stats.completed > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={clearCompleted}
            className="ml-auto"
          >
            Clear Completed
          </Button>
        )}
      </div>

      {/* Task list */}
      <div className="space-y-2 min-h-[200px]">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">
              {filter === 'completed' ? '🎉' : filter === 'active' ? '📝' : '📋'}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {filter === 'completed' 
                ? 'No completed tasks yet' 
                : filter === 'active' 
                ? 'No active tasks remaining' 
                : 'No tasks yet. Add one above!'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className={`group flex items-center justify-between p-4 border rounded-lg transition-all duration-200 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 ${
                task.completed 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'bg-white dark:bg-gray-800 border-gray-200'
              }`}
              style={{ 
                animation: `slideUp 0.3s ease-out ${index * 0.1}s both` 
              }}
            >
              <div className="flex items-center gap-3 flex-grow">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                
                {editingTask === task.id ? (
                  <div className="flex items-center gap-2 flex-grow">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-grow px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      autoFocus
                      maxLength={200}
                    />
                    <Button variant="success" size="sm" onClick={() => saveEdit(task.id)}>
                      Save
                    </Button>
                    <Button variant="secondary" size="sm" onClick={cancelEditing}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex-grow">
                    <span
                      className={`text-base ${
                        task.completed 
                          ? 'line-through text-gray-500 dark:text-gray-400' 
                          : 'text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {task.text}
                    </span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
              
              {editingTask !== task.id && (
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => startEditing(task)}
                    aria-label="Edit task"
                    className="p-2"
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    aria-label="Delete task"
                    className="p-2"
                  >
                    🗑️
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Progress bar */}
      {stats.total > 0 && (
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round((stats.completed / stats.total) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(stats.completed / stats.total) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager; 