import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import TaskItem from './TaskItem';
import { useTasks } from '../context/TaskContext';

const TaskList = () => {
  const { tasks, reorderTasks } = useTasks();

  const moveTask = (dragIndex, hoverIndex) => {
    const draggedTask = tasks[dragIndex];
    const newTasks = [...tasks];
    newTasks.splice(dragIndex, 1);
    newTasks.splice(hoverIndex, 0, draggedTask);
    reorderTasks(newTasks);
  };

  return (
    <div className="space-y-3 mt-4">
      {tasks.map((task, index) => (
        <DraggableTask 
          key={task._id} 
          task={task} 
          index={index}
          moveTask={moveTask} 
        />
      ))}
      {tasks.length === 0 && (
        <p className="text-center text-gray-500 py-4">No tasks found</p>
      )}
    </div>
  );
};

const DraggableTask = ({ task, index, moveTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task._id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (draggedItem) => {
      if (draggedItem.index === index) return;
      moveTask(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  return (
    <div 
      ref={(node) => drag(drop(node))}
      className={`bg-white rounded-lg shadow p-4 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <TaskItem task={task} />
    </div>
  );
};

export default TaskList;
// Update on 2025-02-14T08:38:07