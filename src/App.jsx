import { TaskProvider } from './context/TaskContext';
import PomodoroTimer from './components/PomodoroTimer';
import './index.css';

function App() {
  return (
  
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-900 p-6">
      <TaskProvider>
        <PomodoroTimer />
      </TaskProvider>
    </div>

  );
}

export default App;