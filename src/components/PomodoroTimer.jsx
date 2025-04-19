import { useTaskContext } from '../context/TaskContext';
import { useTimer } from '../hooks/useTimer';
import TimerControls from './TimerControls';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { Timer, Coffee } from 'lucide-react';

function PomodoroTimer() {
  const { activeTaskId, incrementTaskPomodoro } = useTaskContext();
  
  const handleTimerComplete = () => {
    incrementTaskPomodoro();
  };

  const { 
    minutes, seconds, isActive, mode, cycles,
    toggleTimer, resetTimer, switchMode, formatTime 
  } = useTimer({ onComplete: handleTimerComplete });

  // Get the active task text if there is one
  const { tasks } = useTaskContext();
  const activeTask = tasks.find(t => t.id === activeTaskId);

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pomodoro Timer</h1>
        <div className="bg-gray-200 rounded-full px-3 py-1 text-sm">
          Cycles: {cycles}
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className={`text-6xl font-bold ${mode === 'work' ? 'text-red-600' : 'text-green-600'}`}>
          {formatTime(minutes, seconds)}
        </div>
      </div>
      
      <div className="flex justify-center items-center mb-6">
        <div className={`text-lg font-medium ${mode === 'work' ? 'text-red-600' : 'text-green-600'} flex items-center`}>
          {mode === 'work' ? (
            <>
              <Timer className="mr-2" size={20} />
              Work Session
              {activeTaskId !== null && (
                <span className="ml-2 bg-gray-200 px-2 py-1 rounded text-sm">
                  {activeTask?.text.substring(0, 15)}
                  {activeTask?.text.length > 15 ? '...' : ''}
                </span>
              )}
            </>
          ) : (
            <>
              <Coffee className="mr-2" size={20} />
              Break Session
            </>
          )}
        </div>
      </div>
      
      <TimerControls 
        isActive={isActive} 
        toggleTimer={toggleTimer} 
        resetTimer={resetTimer} 
        switchMode={switchMode} 
        mode={mode} 
      />
      
      <div className="border-t pt-6">
        <TaskForm />
        <TaskList workMode={mode === 'work'} />
      </div>
    </div>
  );
}

export default PomodoroTimer;