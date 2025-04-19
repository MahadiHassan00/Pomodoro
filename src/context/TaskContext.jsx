import { createContext, useState, useContext } from 'react';


//object to share between components
const TaskContext = createContext();

export function useTaskContext() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);

  const addTask = (text) => {
    if (text.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        pomodoros: 0
      };
      
      setTasks([...tasks, newTask]);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (activeTaskId === id) {
      setActiveTaskId(null);
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    if (activeTaskId === id) {
      setActiveTaskId(null);
    }
  };

  const setTaskActive = (id) => {
    setActiveTaskId(id);
  };

  const completeActiveTask = () => {
    if (activeTaskId !== null) {
      setTasks(prev => prev.map(task => 
        task.id === activeTaskId ? { ...task, completed: true, pomodoros: task.pomodoros + 1 } : task
      ));
      setActiveTaskId(null);
      return true;
    }
    return false;
  };

  const incrementTaskPomodoro = () => {
    if (activeTaskId !== null) {
      setTasks(prev => prev.map(task => 
        task.id === activeTaskId ? { ...task, pomodoros: task.pomodoros + 1 } : task
      ));
      return true;
    }
    return false;
  };

  const filteredTasks = tasks.filter(task => showCompleted || !task.completed);

  const value = {
    tasks,
    filteredTasks,
    activeTaskId,
    showCompleted,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    setTaskActive,
    completeActiveTask,
    incrementTaskPomodoro,
    setShowCompleted
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}
