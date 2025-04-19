import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

function TaskList({workMode}){

    const { filteredTasks } = useTaskContext();

    return (
        <div className="max-h-64 overflow-y-auto">
          {filteredTasks.length > 0 ? (
            <ul className="space-y-2">
              {filteredTasks.map(task => (
                <TaskItem key={task.id} task={task} workMode={workMode} />
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 py-4">No tasks yet. Add one to get started!</div>
          )}
        </div>
      );
    }
    
    export default TaskList;
