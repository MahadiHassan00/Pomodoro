import { Play, Pause, RotateCcw, Coffee, Timer } from 'lucide-react';

function TimerControls({ isActive, toggleTimer, resetTimer, switchMode, mode}){

    return (

        <div className="flex justify-between mb-8">

            <button onClick={toggleTimer} className={`flex items-center justify-center p-3 rounded-full ${
                isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors w-16 h-16`}> {isActive ? <Pause size={24} /> : <Play size ={24} />}
            </button>

            <button
        onClick={resetTimer}
        className="flex items-center justify-center p-3 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 transition-colors w-16 h-16"
      >
        <RotateCcw size={24} />
      </button>
      
      <button
        onClick={switchMode}
        className={`flex items-center justify-center p-3 rounded-full ${
          mode === 'work' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
        } text-white transition-colors w-16 h-16`}
      >
        {mode === 'work' ? <Coffee size={24} /> : <Timer size={24} />}
      </button>
    </div>
  );
}

export default TimerControls;