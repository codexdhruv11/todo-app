import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const { currentUser } = useAuth();

  const fetchTasks = async () => {
    if (!currentUser) return;
    const params = filter !== 'all' ? { status: filter } : {};
    const response = await axios.get('/api/tasks', { params });
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [currentUser, filter]);

  const createTask = async (task) => {
    const response = await axios.post('/api/tasks', task);
    setTasks([...tasks, response.data]);
  };

  const updateTask = async (id, updates) => {
    const response = await axios.put(`/api/tasks/${id}`, updates);
    setTasks(tasks.map(task => task._id === id ? response.data : task));
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  const reorderTasks = async (newTasks) => {
    setTasks(newTasks);
    await axios.post('/api/tasks/reorder', { tasks: newTasks });
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      filter,
      setFilter,
      createTask, 
      updateTask, 
      deleteTask,
      reorderTasks,
      fetchTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
// Update on 2025-02-20T10:31:51
// Update on 2025-02-15T10:39:26
// Update on 2025-02-16T10:06:45