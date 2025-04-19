import {useState} from 'react';
import { useTaskContext } from '../context/TaskContext';
import {Plus, List} from 'lucide-react';

function TaskForm(){

    const [newTasktext, setNewTaskText] = useState('');
    const  {addTask, showcompleted, setShowCompleted} = useTaskContext();


    // Prevens form submission from refreshing the page
    // and calls the addTask function from the context to add a new task
    const handleSubmit = (e) => {

        e.preventDefault();
        addTask(newTasktext);
        setNewTaskText('');
    };


    // Handles the Enter key press to add a new task
    const handleKeyPress = (e) => {

        if(e.key === 'Enter'){

            e.preventDefault();
            addTask(newTasktext);
            setNewTaskText('');
        }
    };

    return (

        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                    <List className="mr-2" size={20} />
                        Tasks
                </h2>
                <button 
                    onClick={() => setShowCompleted(!showCompleted)}
                    className="text-sm text-blue-500 hover:text-blue-700 flex items-center"
                >
                    {showcompleted ? 'Hide Completed' : 'Show Completed'}
                </button>
            </div>

            <form onSubmit={handleSubmit} className ="flex mb-4">

                <input type = "text" value ={newTasktext} onChange={(e) => setNewTaskText(e.target.value)} onKeyPress = {handleKeyPress} placeholder = "Add a New Task" className = "flex-grow p-2 border rounder-1 focus :outline-none focus:ring-2 focus:ring-blue-300" />
                <button type ="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r">
                    <Plus size ={20} />
                </button>
            </form>
        </> 

    );
}
export default TaskForm;
