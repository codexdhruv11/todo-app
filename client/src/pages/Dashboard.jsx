import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const { logout } = useAuth();
  const { filter, setFilter } = useTasks();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              All Tasks
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter('done')}
              className={`px-4 py-2 rounded ${filter === 'done' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Completed
            </button>
          </div>
          
          <button 
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <TaskForm onClose={() => setShowForm(false)} />
          </div>
        )}

        <TaskList />
      </main>
    </div>
  );
};

export default Dashboard;
// Update on 2025-02-18T11:32:31
// Update on 2025-02-19T14:03:13
// Update on 2025-02-22T04:42:14