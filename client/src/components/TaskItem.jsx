import React, { useState } from 'react';
import { format } from 'date-fns';
import { useTasks } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
  });
  
  const { updateTask, deleteTask } = useTasks();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(task._id, formData);
    setIsEditing(false);
  };

  const toggleStatus = async () => {
    await updateTask(task._id, { 
      status: task.status === 'pending' ? 'done' : 'pending' 
    });
  };

  return (
    <div className="flex justify-between items-start">
      <div className="flex-1">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              rows="2"
            />
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            />
            <div className="flex space-x-2 mt-2">
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.status === 'done'}
                onChange={toggleStatus}
                className="mr-2 h-4 w-4 text-blue-600"
              />
              <h3 className={`text-lg font-medium ${task.status === 'done' ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
            </div>
            {task.description && (
              <p className="text-gray-600 mt-1">{task.description}</p>
            )}
            {task.dueDate && (
              <p className="text-sm text-gray-500 mt-1">
                Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
              </p>
            )}
          </div>
        )}
      </div>
      
      {!isEditing && (
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button 
            onClick={() => deleteTask(task._id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
// Update on 2025-02-11T22:28:27
// Update on 2025-02-15T03:24:27
// Update on 2025-02-14T21:16:57