import { useTaskContext } from "../context/TaskContext"
import { CheckCircle2, Play, X } from "lucide-react"

function TaskItem({task,workMode}){

    const {activeTaskId, toggleTaskCompletion, deleteTask, setTaskActive} = useTaskContext();

    return(

        <li 
        className={`flex items-center justify-between p-3 rounded ${
          task.completed ? 'bg-gray-100' : 
          activeTaskId === task.id ? 'bg-blue-100 border border-blue-300' : 'bg-white border'
        }`}
      >
        <div className="flex items-center flex-grow">
          <button
            onClick={() => toggleTaskCompletion(task.id)}
            className={`mr-2 ${task.completed ? 'text-green-500' : 'text-gray-300'}`}
          >
            <CheckCircle2 size={20} />
          </button>
          <span className={task.completed ? 'line-through text-gray-500' : ''}>
            {task.text}
          </span>
          {task.pomodoros > 0 && (
            <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
              {task.pomodoros} {task.pomodoros === 1 ? 'pomodoro' : 'pomodoros'}
            </span>
          )}
        </div>
        <div className="flex">
          {!task.completed && workMode && (
            <button
              onClick={() => setTaskActive(task.id)}
              className={`mr-2 p-1 rounded ${
                activeTaskId === task.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              title="Work on this task"
            >
              <Play size={16} />
            </button>
          )}
          <button
            onClick={() => deleteTask(task.id)}
            className="p-1 text-red-500 hover:text-red-700"
            title="Delete task"
          >
            <X size={16} />
          </button>
        </div>
      </li>
    );
  }
  
  export default TaskItem;